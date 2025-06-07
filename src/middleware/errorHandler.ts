import { Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  console.error('Error:', err.message);
  //handling Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      ...(process.env.NODE_ENV === 'development' && { errors: err.errors }),
    });
  }

  res.status(500).json({
    message: 'Internal server Error',
    // details: err.message,
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
};
