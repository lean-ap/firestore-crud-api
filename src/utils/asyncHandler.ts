import { Request, Response, NextFunction } from "express";

// Type definition for async route handlers.
type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
 ) => Promise<any>;


 /**
 * Wraps an async route handler and automatically catches errors,
 * forwarding them to Express's error-handling middleware.
 */
export const asyncHandler = (fn: AsyncHandler) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(fn(req,res,next)).catch(next);
};