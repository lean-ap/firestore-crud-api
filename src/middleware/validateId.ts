import { Request, Response, NextFunction } from 'express';

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid or missing product ID' });
  }
  next();
};
