import sequelize from '../config/database.js';

// Global setup before all tests
beforeAll(async () => {
  // Ensure we have a clean database for tests
  try {
    await sequelize.authenticate();
    console.log('Database connection established for testing.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
});

// Global teardown after all tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed after testing.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
});