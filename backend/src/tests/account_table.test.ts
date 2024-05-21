import { PrismaClient, AccountType } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

describe('Prisma Account Model', () => {
  let accountId: number;
  let testAccountType = AccountType.CHECKING;

  beforeAll(async () => {
    await prisma.account.deleteMany();
    await prisma.customer.deleteMany();

  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('create a new account', async () => {
    // Assuming a customer with ID 1 exists
    const newCustomer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        hashed_pass: 'hashedpassword123',
      },
    });

    const newAccount = await prisma.account.create({
      data: {
        customer_id: newCustomer.id,
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

  test('delete an account', async () => {
    const deletedAccount = await prisma.account.delete({
      where: { id: accountId },
    });

    expect(deletedAccount).toHaveProperty('id');
  });
});
