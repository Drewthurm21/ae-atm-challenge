import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Prisma Customer Model', () => {
  let customerId: number;

  beforeAll(async () => {
    await prisma.customer.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('create a new customer', async () => {
    const newCustomer = await prisma.customer.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        hashed_pass: 'hashedpassword123',
      },
    });
    customerId = newCustomer.id;

    expect(newCustomer).toHaveProperty('id');
    expect(newCustomer.name).toBe('John Doe');
  });

  test('read all customers', async () => {
    const allCustomers = await prisma.customer.findMany();
    expect(allCustomers.length).toBeGreaterThan(0);
  });

  test('update a customer', async () => {
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: { name: 'John Doe Updated' },
    });

    expect(updatedCustomer.name).toBe('John Doe Updated');
  });

  test('delete a customer', async () => {
    const deletedCustomer = await prisma.customer.delete({
      where: { id: customerId },
    });

    expect(deletedCustomer).toHaveProperty('id');
  });
});
