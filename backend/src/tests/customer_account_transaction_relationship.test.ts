import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

describe('Customer, Account, and Transaction Relationships', () => {
  let customerId: number;
  let accountId: number;
  let transactionId: number;
  let initialBalance: Decimal = new Decimal(1000.00);
  let withdrawalAmount: number = 105;
  let depositAmount: Decimal = new Decimal(200.52);

  beforeAll(async () => {
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.customer.deleteMany();

    const customer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        hashed_pass: 'hashedpassword123',
      },
    });

    const account = await prisma.account.create({
      data: {
        customer_id: customer.id,
        type: 'CHECKING',
        balance: initialBalance,
        credit_limit: 500,
      },
    });

    customerId = customer.id;
    accountId = account.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('create a deposit, update account, check result through customer', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        account_id: accountId,
        customer_id: customerId,
        type: 'DEPOSIT',
        credit: depositAmount,
        debit: new Decimal(0.00),
        net_effect: depositAmount,
        status: 'PENDING',
      },
    });

    transactionId = transaction.id;

    expect(transaction).toHaveProperty('id');
    expect(transaction.account_id).toBe(accountId);
    expect(transaction.customer_id).toBe(customerId);
    expect(transaction.credit.toString()).toBe(`${depositAmount}`);

    await prisma.account.update({
      where: { id: accountId },
      data: {
        balance: { increment: transaction.net_effect },
      },
    });

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { accounts: true, transactions: true},
    });
    
    expect(customer?.accounts[0].balance.toString()).toBe('1200.52');
    expect(customer?.transactions.length).toBe(1);
  });

  test('fetch a customer with accounts and transactions', async () => {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        accounts: true,
        transactions: true,
      },
    });

    expect(customer).toHaveProperty('id');
    expect(customer?.accounts.length).toBe(1);
    expect(customer?.transactions.length).toBe(1);
  });

  test('fetch an account with transactions', async () => {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        transactions: true,
      },
    });

    expect(account).toHaveProperty('id');
    expect(account?.customer_id).toBe(customerId);
    expect(account?.transactions.length).toBe(1);
  });

  test('fetch a transaction with account and customer', async () => {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        account: true,
        customer: true,
      },
    });

    expect(transaction).toHaveProperty('id');
    expect(transaction?.account.id).toBe(accountId);
    expect(transaction?.customer.id).toBe(customerId);
  });

  test('create withdrawl and verify transaction effect', async () => {
    await prisma.transaction.create({
      data: {
        account_id: accountId,
        customer_id: customerId,
        type: 'WITHDRAWAL',
        credit: new Decimal(0.00),
        debit: withdrawalAmount,
        net_effect: withdrawalAmount * -1,
        status: 'COMPLETED',
      },
    });

    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: {
        balance: { decrement: withdrawalAmount },
      },
    });

    expect(updatedAccount.balance.toString()).toBe('1095.52');
  });

  test('verify account accuracy through customer query', async () => {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { accounts: true, transactions: true }
    });

    let finalBalance = customer?.transactions.reduce((acc, transaction) => {
      return acc.plus(transaction.net_effect);
    }, initialBalance);

    expect(finalBalance?.toString()).toBe(initialBalance.plus(depositAmount).minus(withdrawalAmount).toString());

  });
});
