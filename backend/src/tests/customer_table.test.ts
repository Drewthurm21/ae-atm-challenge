import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Prisma Customer Model', () => {
  let customerId: number;

  afterAll(async () => { 
    await prisma.$disconnect();
  });

  test('create a new customer', async () => {
    const newCustomer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'customer.table@email.com',
        hashed_pass: 'hashedpassword123',
      },
    });

    customerId = newCustomer.id;

    expect(newCustomer).toHaveProperty('id');
    expect(newCustomer.name).toBe('John Doe');
  });

  test('read all customers', async () => {
    const allCustomers = await prisma.customer.findMany();
    expect(allCustomers.length).toBeGreaterThan(3);
  });

  test('update a customer', async () => {
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: { name: 'John Doe Updated' },
    });

    expect(updatedCustomer.name).toBe('John Doe Updated');
  });

});
