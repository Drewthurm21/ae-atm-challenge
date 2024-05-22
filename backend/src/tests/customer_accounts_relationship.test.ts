import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';

const prisma = new PrismaClient();

describe('Prisma Customer and Account Relationship', () => {
  const testAccountType = 'CHECKING';

  let customerId: number;
  let accountId: number;
  let alternateAccountId: number;

  beforeAll(async () => {
    await prisma.account.deleteMany();
    await prisma.customer.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('create a new customer and account', async () => {
    const newCustomer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        hashed_pass: 'hashedpassword123',
        accounts: {
          create: {
            type: testAccountType,
            balance: new Decimal(500),
            credit_limit: 1000,
          },
        },
      },
      include: { accounts: true },
    });
    customerId = newCustomer.id;
    accountId = newCustomer.accounts[0].id;

    expect(newCustomer).toHaveProperty('id');
    expect(newCustomer.accounts.length).toBe(1);
    expect(newCustomer.accounts[0].balance.toString()).toBe('500');
  });

  test('fetch customer with accounts', async () => {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { accounts: true },
    });

    expect(customer).toHaveProperty('id');
    expect(customer?.accounts.length).toBeGreaterThan(0);
  });

  test('create additional account for customer', async () => {
    const newAccount = await prisma.account.create({
      data: {
        customer_id: customerId,
        type: testAccountType,
        balance: new Decimal(1000),
        credit_limit: 2000,
      },
    });
    alternateAccountId = newAccount.id;

    expect(newAccount).toHaveProperty('id');
    expect(newAccount.balance.toString()).toBe('1000');
  });

  test('update single bank account', async () => {
    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: new Decimal(700) },
    });

    expect(updatedAccount.balance.toString()).toBe('700');
  });

  test('ensure proper account ownership', async () => {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { accounts: true },
    });

    const customerAccounts = await prisma.account.findMany({
      where: { customer_id: customerId },
    });

    expect(customer?.accounts.length).toBe(customerAccounts.length);
    expect(customerAccounts[1].id).toBe(accountId);
    expect(customerAccounts[0].id).toBe(alternateAccountId);
  });

});
