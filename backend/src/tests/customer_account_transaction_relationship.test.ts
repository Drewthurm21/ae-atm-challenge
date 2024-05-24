import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Customer, Account, and Transaction Relationships', () => {
  let transactionId: number;
  let initialBalance: Decimal;

  const CUSTOMER_ID = 1;
  const ACCOUNT_ID = 1;
  const WITHDRAWAL_AMOUNT = 105;
  const DEPOSIT_AMOUNT = new Decimal(200.52);

  beforeAll(async () => {
    let account = await prisma.account.findUnique({
      where: { id: ACCOUNT_ID },
    });

    if (account) {
      initialBalance = new Decimal(account.balance)
    }
  });
  
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
        status: 'PENDING',
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
      expect(customer.accounts[0].balance.toString()).toBe('1200.52');
      expect(customer.transactions.length).toBeGreaterThan(1);
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
    await prisma.transaction.create({
      data: {
        account_id: ACCOUNT_ID,
        customer_id: CUSTOMER_ID,
        type: 'WITHDRAWAL',
        credit: new Decimal(0.00),
        debit: WITHDRAWAL_AMOUNT,
        net_effect: WITHDRAWAL_AMOUNT * -1,
        status: 'COMPLETED',
      },
    });

    const updatedAccount = await prisma.account.update({
      where: { id: ACCOUNT_ID },
      data: {
        balance: { decrement: WITHDRAWAL_AMOUNT },
      },
    });

    expect(updatedAccount.balance.toString()).toBe('1095.52');
  });

  test('verify account accuracy through customer query', async () => {
    const customer = await prisma.customer.findUnique({
      where: { id: CUSTOMER_ID },
      include: { accounts: true, transactions: true }
    });

    if (customer) {
      let finalBalance = customer.transactions.reduce((acc, transaction) => {
        return acc.plus(transaction.net_effect);
      }, new Decimal(0));
  
      expect(finalBalance.toString()).toBe(initialBalance.plus(DEPOSIT_AMOUNT).minus(WITHDRAWAL_AMOUNT).toString());
    }

  });
});
