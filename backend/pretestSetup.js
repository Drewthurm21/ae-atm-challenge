const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const { testUsers, testAccounts, testTransactions } = require('./src/tests/test_data.js')

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});


const setup = async () => {
  try {
    console.log('Spinning up a fresh test db');
    execSync(`docker exec challenge_db psql -U user -d postgres -c "DROP DATABASE IF EXISTS testdb;"`, { stdio: 'inherit' });
    execSync(`docker exec challenge_db psql -U user -d postgres -c "CREATE DATABASE testdb;"`, { stdio: 'inherit' });

    console.log('Running migrations');
    execSync(`DATABASE_URL=${process.env.TEST_DATABASE_URL} npx prisma migrate deploy --schema=./prisma/schema.prisma`, { stdio: 'inherit' });

    console.log('Seeding test data');
    await prisma.customer.createMany({ data: testUsers });
    await prisma.account.createMany({ data: testAccounts });
    await prisma.transaction.createMany({ data: testTransactions });

    console.log('Test DB setup complete');
  } catch (error) {
    console.error('Error during test DB setup:', error);
  } finally {
    await prisma.$disconnect();
  }
};


setup();
