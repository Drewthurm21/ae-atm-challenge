import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const ACCOUNT_ID = 3;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('DailyTotal Model', () => {

  afterAll(async () => { 
    await prisma.$disconnect();
  });

  test('create a new daily total record', async () => {
    const dailyTotal = await prisma.dailyTotal.create({
      data: {
        account_id: ACCOUNT_ID,
        total_deposit: new Decimal(200.00),
        total_witdrawal: new Decimal(50.00),
        total_transfer: new Decimal(0.00),
      },
    });

    expect(dailyTotal).toHaveProperty('id');
    expect(dailyTotal.account_id).toBe(ACCOUNT_ID);
    expect(dailyTotal.total_deposit.toString()).toBe('200');
    expect(dailyTotal.total_witdrawal.toString()).toBe('50');
  });

  test('prevent duplicate daily total records for the same account and date', async () => {
    await expect(
      prisma.dailyTotal.create({
        data: {
          account_id: ACCOUNT_ID,
          date: new Date(),
          total_deposit: new Decimal(100.00),
          total_witdrawal: new Decimal(25.00),
          total_transfer: new Decimal(10.00),
        },
      }),
    ).rejects.toThrow();
  });

  test('read daily total records', async () => {
    const dailyTotals = await prisma.dailyTotal.findFirst({
      where: { account_id: ACCOUNT_ID },
    });
    expect(dailyTotals).toBeTruthy();
  });

  test('update a daily total record', async () => {
    const dailyTotal = await prisma.dailyTotal.findFirst({
      where: { account_id: ACCOUNT_ID },
    });

    const updatedDailyTotal = await prisma.dailyTotal.update({
      where: { id: dailyTotal?.id },
      data: { total_deposit: new Decimal(300.50) },
    });

    expect(updatedDailyTotal.total_deposit.toString()).toBe('300.5');
  });

  test('delete a daily total record', async () => {
    const dailyTotal = await prisma.dailyTotal.findFirst({
      where: { account_id: ACCOUNT_ID },
    });

    const deletedDailyTotal = await prisma.dailyTotal.delete({
      where: { id: dailyTotal?.id },
    });

    expect(deletedDailyTotal).toHaveProperty('id');
  });
});
