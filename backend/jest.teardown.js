const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const { server } = require('./src/app')
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

module.exports = async () => {
  try {
    await prisma.$disconnect();
    server.close();

    // Connect to the 'postgres' database to drop the 'testdb' database
    execSync(`docker exec challenge_db psql -U user -d postgres -c "DROP DATABASE IF EXISTS testdb;"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error during teardown:', error);
  }
};
