// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError, ValidationError } from '../errors/CustomErrors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ message: err.message, Errors: err.errors })
    }
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message, errCode: err.errorCode });
    }
    res.status(500).json({ message: "Something went wrong", errCode: "SE500" });
};