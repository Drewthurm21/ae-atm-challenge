import { PrismaClient, AccountType } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Prisma Account Model', () => {
  let accountId: number;
  let testAccountType = AccountType.CHECKING;

  afterAll(async () => { 
    await prisma.$disconnect();
  });

  test('create a new account', async () => {
    const newAccount = await prisma.account.create({
      data: {
        customer_id: 1,
        type: testAccountType,
        balance: new Decimal(500),
        credit_limit: 1000,
      },
    });

    accountId = newAccount.id;

    expect(newAccount).toHaveProperty('id');
    expect(newAccount.type).toBe(testAccountType);
    expect(newAccount.balance.toString()).toBe('500');
  });

  test('read all accounts', async () => {
    const allAccounts = await prisma.account.findMany();
    expect(allAccounts.length).toBeGreaterThan(0);
  });

  test('update an account', async () => {
    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: new Decimal(600) },
    });

    expect(updatedAccount.balance.toString()).toBe('600');
  });

});
