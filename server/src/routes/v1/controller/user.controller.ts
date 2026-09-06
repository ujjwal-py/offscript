import { Request, Response } from "express"
import { prisma } from "../../../lib/prisma"
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt"
import { CustomError, NotFoundError, UnauthorizedError } from "../../../errors/CustomErrors"
import { UserBody } from "../../../schemas/user.schema"

const jwt_secret = process.env.JWT_SECRET!

export const createUser = async (req: Request<{}, any, UserBody>, res: Response) => {
    const { name, email, password } = req.body
    const isExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (isExist) {
        throw new CustomError(409, "UE409", "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });
    const token = jwt.sign({ user_id: newUser.id }, jwt_secret)
    res.cookie("jwt_token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })
    res.status(200).json({ message: "user created" });
}

export const logIn = async (req: Request<{}, any, UserBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        throw new NotFoundError("User Not Found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new UnauthorizedError("Invalid Password");
    }
    const token = jwt.sign({ user_id: user.id }, jwt_secret)
    res.cookie("jwt_token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })
    res.status(200).json({ message: "User signin Succesfully" });

}

export const allUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true
        }
    });
    res.status(200).json(users);
}

export const getMe = async (req: Request, res: Response) => {
    const id = req.user?.user_id;
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if (!user) {
        throw new UnauthorizedError();
    }
    res.status(200).json(user);
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("jwt_token", {
        httpOnly: true
    });
    res.status(200).json({ message: "Logged out" });
}