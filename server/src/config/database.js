import { Sequelize } from 'sequelize';

// Determine environment
const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest 
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'todo_db',
      process.env.DB_USER || 'user',
      process.env.DB_PASSWORD || 'password',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: process.env.DB_LOGGING === 'true',
      }
    );

export default sequelize;