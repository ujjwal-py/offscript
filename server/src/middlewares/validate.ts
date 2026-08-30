import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../errors/CustomErrors";
import { ZodType } from "zod"
export const validate = <T>(schema: ZodType<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError("Validation Error", result?.error.flatten().fieldErrors)
        }
        req.body = result.data;
        next();
    }