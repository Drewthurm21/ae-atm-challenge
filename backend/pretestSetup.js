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
    console.log('Spinning up test db');
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



// const testUsers = [
//   {
//     name: 'Larry',
//     email: 'larry@threestooges.com',
//     hashed_pass: 'larrypass',
//   },
//   {
//     name: 'Curly',
//     email: 'curly@threestooges.com',
//     hashed_pass: 'curlypass',
//   },
//   {
//     name: 'Moe',
//     email: 'moe@threestooges.com',
//     hashed_pass: 'moepass',
//   }
// ];

// const testAccounts = [
//   {
//     customer_id: 1,
//     type: 'CHECKING',
//     balance: 1000,
//     credit_limit: 0,
//   },
//   {
//     customer_id: 2,
//     type: 'SAVINGS',
//     balance: 1000,
//     credit_limit: 0,
//   },
//   {
//     customer_id: 3,
//     type: 'CREDIT',
//     balance: 1000,
//     credit_limit: 5000,
//   }
// ];

// const testTransactions = [
//   {
//     account_id: 1,
//     customer_id: 1,
//     type: 'DEPOSIT',
//     credit: 1000,
//     debit: 0,
//     net_effect: 1000,
//     status: 'COMPLETED',
//   },
//   {
//     account_id: 2,
//     customer_id: 2,
//     type: 'DEPOSIT',
//     credit: 1000,
//     debit: 0,
//     net_effect: 1000,
//     status: 'COMPLETED',
//   },
//   {
//     account_id: 3,
//     customer_id: 3,
//     type: 'WITHDRAWAL',
//     credit: 0,
//     debit: 1000,
//     net_effect: -1000,
//     status: 'COMPLETED',
//   },

// ];

setup();
