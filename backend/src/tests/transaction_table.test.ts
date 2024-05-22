import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

describe('Transaction Model', () => {
  let accountId: number;
  let customerId: number;
  let transactionId: number;

  beforeAll(async () => {
    // Clear existing data
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.customer.deleteMany();

    // Create a customer and account for testing
    const customer = await prisma.customer.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        hashed_pass: 'hashedpassword123',
      },
    });

    const account = await prisma.account.create({
      data: {
        customer_id: customer.id,
        type: 'CHECKING',
        balance: new Decimal(1000.00),
        credit_limit: 500,
      },
    });

    customerId = customer.id;
    accountId = account.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('create a new transaction', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        account_id: accountId,
        customer_id: customerId,
        type: 'DEPOSIT',
        credit: new Decimal(200.00),
        debit: new Decimal(0.00),
        net_effect: new Decimal(200.00),
        status: 'PENDING',
      },
    });

    transactionId = transaction.id;

    expect(transaction).toHaveProperty('id');
    expect(transaction.account_id).toBe(accountId);
    expect(transaction.credit.toString()).toBe('200');
  });

  test('read transactions', async () => {
    const transactions = await prisma.transaction.findMany({
      where: { account_id: accountId },
    });

    expect(transactions.length).toBeGreaterThan(0);
  });

  test('update a transaction', async () => {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: 'COMPLETED' },
    });

    expect(updatedTransaction.status).toBe('COMPLETED');
  });

  test('create a withdrawal transaction', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        account_id: accountId,
        customer_id: customerId,
        type: 'WITHDRAWAL',
        credit: new Decimal(0.00),
        debit: new Decimal(100.00),
        net_effect: new Decimal(-100.00),
        status: 'PENDING',
      },
    });

    expect(transaction).toHaveProperty('id');
    expect(transaction.account_id).toBe(accountId);
    expect(transaction.net_effect.toString()).toBe('-100');
    expect(transaction.debit.toString()).toBe('100');
  });

});
