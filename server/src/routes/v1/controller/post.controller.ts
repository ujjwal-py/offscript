import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { NewPostBody, UpdatePostBody } from "../../../schemas/post.schema";
import { CustomError, UnauthorizedError } from "../../../errors/CustomErrors";
import { Prisma } from "../../../../generated/prisma/client";



export const createPost = async (req: Request<{}, any, NewPostBody>, res: Response) => {
    const { title, description, published } = req.body;
    const authorId = req.user?.user_id;
    if (!authorId) {
        throw new UnauthorizedError();
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newPost = await prisma.posts.create({
        data: {
            title,
            description,
            published,
            authorId,
            imageUrl
        }
    })
    res.status(200).json(newPost)
};

export const editPost = async (req: Request<{ id: string }, any, UpdatePostBody>, res: Response) => {
    const authorId = req.user?.user_id;
    if (!authorId) {
        throw new UnauthorizedError();
    }
    const id = parseInt(req.params.id, 10);
    const { title, description, published } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;



    const post = await prisma.posts.update({
        where: {
            id,
            authorId,
        },
        data: {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(published !== undefined && { published }),
            ...(imageUrl !== null && { imageUrl }),
        }
    });

    res.status(200).json(post);
}

export const getAllPosts = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = 9;
    const offset = (page - 1) * limit;
    const order: Prisma.SortOrder = req.query.order === "asc" ? "asc" : "desc";
    const sortBy = req.query.sort_by === "updatedAt" ? "updatedAt" : "likes";
    const orderBy = sortBy === "likes" ? { Likes: { _count: order } } : { updatedAt: order };

    const posts = await prisma.posts.findMany({
        where: {
            published: true
        },
        skip: offset,
        take: limit,
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            author: {
                select: {
                    name: true,
                    email: true
                }
            },
            Likes: {
                select: {
                    userId: true,
                    postId: true
                }
            }
        }
    });
    res.status(200).json(posts);
}
export const searchPublicPosts = async (req: Request, res: Response) => {
    const q = String(req.query.q || "").trim();
    if (!q) {
        return res.status(400).json({ message: "Search query is required" });
    }
    const order: Prisma.SortOrder = req.query.order === "asc" ? "asc" : "desc";
    const sortBy = req.query.sort_by;
    const orderBy = sortBy === "likes" ? { Likes: { _count: order } } : { updatedAt: order };

    const posts = await prisma.posts.findMany({
        where: {
            title: {
                contains: q,
                mode: "insensitive"
            },
            published: true
        },
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            published: true,
            updatedAt: true,
            imageUrl: true,
            Likes: true,
            author: {
                select: {
                    name: true,
                    email: true
                }
            },
        }
    })
    res.status(200).json(posts);
}

export const userDraftPosts = async (req: Request, res: Response) => {
    const authorId = req.user?.user_id;
    const posts = await prisma.posts.findMany({
        where: {
            authorId: authorId,
            published: false
        },
        select: {
            id: true,
            title: true,
            description: true,
            published: true,
            updatedAt: true,
            Likes: {
                select: {
                    userId: true,
                    postId: true
                }
            },
            imageUrl: true,
        }
    });
    res.status(200).json(posts);
}
export const userPublishedPosts = async (req: Request, res: Response) => {
    const authorId = req.user?.user_id;
    const order: Prisma.SortOrder = req.query.order === "asc" ? "asc" : "desc";
    const sortBy = req.query.sort_by === "updatedAt" ? "updatedAt" : "likes";
    const orderBy = sortBy === "likes" ? { Likes: { _count: order } } : { updatedAt: order };
    const posts = await prisma.posts.findMany({
        where: {
            authorId: authorId,
            published: true
        },
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            published: true,
            updatedAt: true,
            imageUrl: true,
            Likes: true
        }
    });
    res.status(200).json(posts);
}

export const searchUserPosts = async (req: Request, res: Response) => {
    const authorId = req.user?.user_id;
    const q = String(req.query.q || "").trim();
    if (!q) {
        return res.status(400).json({ message: "Search query is required" });
    }
    const order: Prisma.SortOrder = req.query.order === "asc" ? "asc" : "desc";
    const sortBy = req.query.sort_by === "updatedAt" ? "updatedAt" : "likes";
    const orderBy = sortBy === "likes" ? { Likes: { _count: order } } : { updatedAt: order };
    const posts = await prisma.posts.findMany({
        where: {
            authorId: authorId,
            title: {
                contains: q
            },
            published: true
        },
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            published: true,
            updatedAt: true,
            imageUrl: true,
            Likes: true
        }
    })
    res.status(200).json(posts);
}




export const deletePost = async (req: Request<{ id: string }>, res: Response) => {
    const authorId = req.user?.user_id;
    if (!authorId) {
        throw new UnauthorizedError();
    }
    const id = parseInt(req.params.id, 10);
    const post = await prisma.posts.delete({
        where: {
            id,
            authorId,
        }
    });
    res.status(200).json({ message: "Post deleted successfully" });
}

export const likePost = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.user?.user_id;
    if (!userId) {
        throw new UnauthorizedError();
    }
    const postId = parseInt(req.params.id, 10);

    const validPost = await prisma.posts.findUnique({
        where: {
            id: postId,
            published: true
        }
    });
    if (!validPost) {
        throw new CustomError(404, "POST_NOT_FOUND", "Post not found or not published");
    }
    const existingLike = await prisma.likes.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            }
        },
    });
    if (existingLike) {
        throw new CustomError(400, "ALREADY_LIKED", "You have already liked this post");
    }
    const response = await prisma.likes.create({
        data: {
            postId,
            userId
        }
    });
    res.status(200).json({ message: "Post liked successfully" });
}

export const dislikePost = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.user?.user_id;
    if (!userId) {
        throw new UnauthorizedError();
    }
    const postId = parseInt(req.params.id, 10);

    const validPost = await prisma.posts.findUnique({
        where: {
            id: postId,
            published: true
        }
    });
    if (!validPost) {
        throw new CustomError(404, "POST_NOT_FOUND", "Post not found or not published");
    }
    const existingLike = await prisma.likes.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            }
        },
    });
    if (!existingLike) {
        throw new CustomError(400, "NOT_LIKED", "You have not liked this post yet");
    }
    const response = await prisma.likes.delete({
        where: {
            userId_postId: {
                userId,
                postId,
            }
        }
    });
    res.status(200).json({ message: "Post disliked successfully" });
}