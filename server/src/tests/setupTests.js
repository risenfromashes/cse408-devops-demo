import sequelize from '../config/database.js';
import '../models/todo.js'; // Import models to ensure they're initialized

// Global setup before all tests
beforeAll(async () => {
  // Ensure we have a clean database for tests
  try {
    await sequelize.authenticate();
    console.log('Database connection established for testing.');
    
    // Sync all models with the SQLite in-memory database
    await sequelize.sync({ force: true });
    console.log('Database models synced for testing.');
  } catch (error) {
    console.error('Unable to set up the database for testing:', error);
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