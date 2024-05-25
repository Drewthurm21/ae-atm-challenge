import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes'
import transactionRoutes from './routes/transactionRoutes';

const app = express();

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
    },
  },
});

// Middleware
app.use(bodyParser.json());


// Routers
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, prisma, server };