import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Transaction Model', () => {
  const ACCOUNT_ID = 1;
  const CUSTOMER_ID = 1;

  let transactionId: number;

  afterAll(async () => { 
    await prisma.$disconnect();
  });

  test('create a new transaction', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        account_id: ACCOUNT_ID,
        customer_id: CUSTOMER_ID,
        type: 'DEPOSIT',
        credit: new Decimal(200.00),
        debit: new Decimal(0.00),
        net_effect: new Decimal(200.00),
        status: 'PENDING',
      },
    });

    transactionId = transaction.id;

    expect(transaction).toHaveProperty('id');
    expect(transaction.account_id).toBe(ACCOUNT_ID);
    expect(transaction.credit.toString()).toBe('200');
  });

  test('read transactions', async () => {
    const transactions = await prisma.transaction.findMany({
      where: { account_id: ACCOUNT_ID },
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
        account_id: ACCOUNT_ID,
        customer_id: CUSTOMER_ID,
        type: 'WITHDRAWAL',
        credit: new Decimal(0.00),
        debit: new Decimal(100.00),
        net_effect: new Decimal(-100.00),
        status: 'PENDING',
      },
    });

    expect(transaction).toHaveProperty('id');
    expect(transaction.account_id).toBe(ACCOUNT_ID);
    expect(transaction.net_effect.toString()).toBe('-100');
    expect(transaction.debit.toString()).toBe('100');
  });

});
