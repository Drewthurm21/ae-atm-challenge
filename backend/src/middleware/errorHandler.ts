import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
  errors?: string[];
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const messaging = [
    ['Error handler:', err.stack], 
    ['Error message:', err.message], 
    ['Request type:', req.method], 
    ['Request body:', req.body],
  ];

  messaging.forEach(([label, message]) => console.error(label, message));

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  });
};
