import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { NewPostBody, UpdatePostBody } from "../../../schemas/post.schema";


export const createPost = async (req: Request<{}, any, NewPostBody>, res: Response) => {
    const { title, description } = req.body;
    const authorId = req.user?.user_id;
    if (!authorId) {
        return res.status(401).json({ message: "unauthorized" })
    }
    const newPost = await prisma.posts.create({
        data: {
            title,
            description,
            authorId
        }
    })
    res.status(200).json(newPost)
};

export const editPost = async (req: Request<{ id: string }, any, UpdatePostBody>, res: Response) => {
    const authorId = req.user?.user_id;
    if (!authorId) {
        return res.status(401).json({ message: "unauthorized" })
    }
    const id = parseInt(req.params.id, 10);
    const { title, description, published } = req.body;


    const post = await prisma.posts.update({
        where: {
            id,
            authorId,
        },
        data: {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(published !== undefined && { published }),
        }
    });

    res.status(200).json(post);
}

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await prisma.posts.findMany({
        where: {
            published: true
        }
    });
    res.status(200).json(posts);
}

