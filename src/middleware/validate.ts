import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      // return res.status(400).json({
      //     message: 'Validation failed',
      //     errors: error.errors,
      if (error instanceof ZodError) {
        // Zod-specific error, safe to pass to error handler or return custom response
        return next(error);
      }
      next(error); // pass unknown error to error handler instead of handling here
    }
  };
