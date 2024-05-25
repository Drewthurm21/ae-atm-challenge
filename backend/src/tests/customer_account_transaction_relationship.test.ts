import { PrismaClient } from '@prisma/client';
import { testAccounts } from './test_data';
import Decimal from 'decimal.js';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

const generateRandomAccountIndex = () => {
  return Math.floor(Math.random() * testAccounts.length);
};

let transactionId: number;
const TEST_ACCOUNT = testAccounts[1];
const ACCOUNT_ID = TEST_ACCOUNT.customer_id;
const CUSTOMER_ID = TEST_ACCOUNT.customer_id;
const INITIAL_BALANCE = new Decimal(TEST_ACCOUNT.balance);
const WITHDRAWAL_AMOUNT = new Decimal(105.26);
const DEPOSIT_AMOUNT = new Decimal(200.52);

describe('Customer, Account, and Transaction Relationships', () => {
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('create a deposit, update account, check result through customer', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        account_id: ACCOUNT_ID,
        customer_id: CUSTOMER_ID,
        type: 'DEPOSIT',
        credit: DEPOSIT_AMOUNT,
        debit: new Decimal(0.00),
        net_effect: DEPOSIT_AMOUNT,
        status: 'COMPLETED',
      },
    });

    transactionId = transaction.id;

    expect(transaction).toHaveProperty('id');
    expect(transaction.account_id).toBe(ACCOUNT_ID);
    expect(transaction.customer_id).toBe(CUSTOMER_ID);
    expect(transaction.credit.toString()).toBe(`${DEPOSIT_AMOUNT}`);

    await prisma.account.update({
      where: { id: ACCOUNT_ID },
      data: {
        balance: { increment: transaction.net_effect },
      },
    });

    const customer = await prisma.customer.findUnique({
      where: { id: CUSTOMER_ID },
      include: { accounts: true, transactions: true},
    });
    
    if (customer) {
      expect(customer.accounts.length).toBe(1);
      expect(customer.accounts[0].balance.toString()).toBe(INITIAL_BALANCE.plus(DEPOSIT_AMOUNT).toString());
      expect(customer.transactions.length).toBeGreaterThanOrEqual(1);
      expect(customer.transactions[customer.transactions.length - 1].id).toBe(transactionId);
    }
  });

  test('fetch a customer with accounts and transactions', async () => {
    const customer = await prisma.customer.findUnique({
      where: { id: CUSTOMER_ID },
      include: {
        accounts: true,
          transactions:      {
           orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (customer) {
      expect(customer.accounts.length).toBe(1);
      expect(customer.transactions.length).toBeGreaterThan(1);
      expect(customer.transactions[customer.transactions.length - 1].id).toBe(transactionId);
    }
  });

  test('fetch an account with transactions', async () => {
    const account = await prisma.account.findUnique({
      where: { id: ACCOUNT_ID },
      include: {
        transactions: true,
      },
    });

    if (account) {
      expect(account.customer_id).toBe(CUSTOMER_ID);
      expect(account.transactions.length).toBeGreaterThan(1);
      expect(account.transactions[account.transactions.length - 1].id).toBe(transactionId);
    }
  });

  test('fetch a transaction with account and customer', async () => {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        account: true,
        customer: true,
      },
    });

    if (transaction) {
      expect(transaction.account.id).toBe(ACCOUNT_ID);
      expect(transaction.customer.id).toBe(CUSTOMER_ID);
    };
  });

  test('create withdrawl and verify transaction effect', async () => {

    const initialAccountData = await prisma.account.findUnique({
      where: { id: ACCOUNT_ID },
    });

    let initialBalance: Decimal;
    if (!initialAccountData) {
      throw new Error('Account not found');
    }
    initialBalance = new Decimal(initialAccountData.balance);

    await prisma.transaction.create({
      data: {
        account_id: ACCOUNT_ID,
        customer_id: CUSTOMER_ID,
        type: 'WITHDRAWAL',
        credit: 0,
        debit: WITHDRAWAL_AMOUNT,
        net_effect: WITHDRAWAL_AMOUNT.neg(),
        status: 'COMPLETED',
      },
    });

    const updatedAccount = await prisma.account.update({
      where: { id: ACCOUNT_ID },
      data: {
        balance: { decrement: WITHDRAWAL_AMOUNT },
      },
    });

    if (updatedAccount.type === "CREDIT") {
      expect(updatedAccount.balance.toString()).toBe(initialBalance.plus(WITHDRAWAL_AMOUNT).toString());
    } else {
      expect(updatedAccount.balance.toString()).toBe(initialBalance.minus(WITHDRAWAL_AMOUNT).toString());
    }
  });

  test('verify account accuracy through customer query', async () => {
    console.log(TEST_ACCOUNT, DEPOSIT_AMOUNT, WITHDRAWAL_AMOUNT)
    const customer = await prisma.customer.findUnique({
      where: { id: CUSTOMER_ID },
      include: { accounts: true, transactions: true }
    });

    if (customer) {
      let finalBalance = customer.transactions.reduce((acc, transaction) => {
        return acc.plus(transaction.net_effect);
      }, new Decimal(0));
  
      expect(finalBalance.toString()).toBe(INITIAL_BALANCE.plus(DEPOSIT_AMOUNT).minus(WITHDRAWAL_AMOUNT).toString());
    }

  });
});
