import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes); // Use the base path /api for routes

// Function to start the server (separated for testing purposes)
export const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

// Start the server unless in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;