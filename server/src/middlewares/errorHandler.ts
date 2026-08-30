// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError, ValidationError } from '../errors/CustomErrors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ message: err.message, Errors: err.errors })
    }
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Unexpected/unknown errors — don't leak internals
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
};