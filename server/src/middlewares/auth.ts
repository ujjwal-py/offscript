import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthUser } from "../types/express";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt_token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded as AuthUser; // or extend Request type properly
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

};