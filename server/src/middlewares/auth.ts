import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthUser } from "../types/express";
import { CustomError, UnauthorizedError } from "../errors/CustomErrors";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt_token;
    if (!token) {
        throw new UnauthorizedError();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded as AuthUser;
        next();
    } catch (err) {
        throw new UnauthorizedError("Invalid or Expired Token");
    }
};

export const requireRole = (allowedRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== allowedRole) {
            throw new CustomError(403, "INSUFFICIENT_PERMISSIONS", "Insufficient permissions for this action");
        }
        next();
    };
}