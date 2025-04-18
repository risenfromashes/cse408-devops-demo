import { Sequelize } from 'sequelize';

// Determine environment
const isTest = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize(
  isTest ? (process.env.TEST_DB_NAME || 'todo_test') : (process.env.DB_NAME || 'todo_db'),
  isTest ? (process.env.TEST_DB_USER || 'user') : (process.env.DB_USER || 'user'),
  isTest ? (process.env.TEST_DB_PASSWORD || 'password') : (process.env.DB_PASSWORD || 'password'),
  {
    host: isTest ? (process.env.TEST_DB_HOST || 'localhost') : (process.env.DB_HOST || 'localhost'),
    dialect: 'postgres',
    logging: isTest ? false : process.env.DB_LOGGING === 'true',
  }
);

export default sequelize;