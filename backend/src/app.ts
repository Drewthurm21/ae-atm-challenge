import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes'

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(bodyParser.json());


// Routers
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 404 middleware
app.use((req, res, next) => {
  res.status(404);
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, prisma };