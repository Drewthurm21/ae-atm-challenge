const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const { testUsers, testAccounts, testTransactions } = require('../src/tests/test_data');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Setting up the dev db...');
  execSync(`docker exec challenge_db psql -U ${process.env.POSTGRES_USER} -d postgres -c "DROP DATABASE IF EXISTS ${process.env.POSTGRES_DB};"`, { stdio: 'inherit' });
  execSync(`docker exec challenge_db psql -U ${process.env.POSTGRES_USER} -d postgres -c "CREATE DATABASE ${process.env.POSTGRES_DB};"`, { stdio: 'inherit' });

  console.log('Running migrations...');
  execSync(`DATABASE_URL=${process.env.DATABASE_URL} npx prisma migrate deploy --schema=./prisma/schema.prisma`, { stdio: 'inherit' });


  console.log('Seeding database...');
  await prisma.customer.createMany({ data: testUsers });
  await prisma.account.createMany({ data: testAccounts });
  await prisma.transaction.createMany({ data: testTransactions });

  console.log('Dev DB setup complete!');
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });