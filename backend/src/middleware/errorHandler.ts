import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error handler:', err.stack);
  console.log('Error message:', err.message);
  console.log('Request body:', req.body);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
