import { Request, Response, NextFunction } from "express";
import { Schema, ZodSchema } from "zod";



export const validate = (schema: ZodSchema) => (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error: any) {
        // return res.status(400).json({
        //     message: 'Validation failed',
        //     errors: error.errors,
        next(error); // pass error to error handler instead of handling here
    }
};
