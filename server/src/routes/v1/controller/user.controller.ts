import { Request, Response } from "express"
import { prisma } from "../../../lib/prisma"
import jwt from "jsonwebtoken"
import "dotenv/config"
import bcrypt from "bcrypt"


interface UserBody {
    name?: string,
    email: string,
    password: string
}

const jwt_secret = process.env.JWT_SECRET!


export const createUser = async (req: Request<{}, any, UserBody>, res: Response) => {
    const { name, email, password } = req.body
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
    res.status(200).json({ user: newUser, token: token });
}

export const logIn = async (req: Request<{}, any, UserBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(404).json({ message: "invalid password" })
    }
    const token = jwt.sign({ user_id: user.id }, jwt_secret)
    res.cookie("jwt_token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    })
    res.status(200).json({ user: user, token: token });

}

export const allUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true
        }
    });
    res.status(200).json(users);
}
