const { execSync } = require('child_process');

module.exports = async () => {
  try {
    console.log('Tearing down test db');
    // Connect to the 'postgres' database to drop the 'testdb' database
    execSync(`docker exec challenge_db psql -U user -d postgres -c "DROP DATABASE IF EXISTS testdb;"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error during teardown:', error);
  }
};
