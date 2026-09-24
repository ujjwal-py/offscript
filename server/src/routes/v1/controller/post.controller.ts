import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";
import { NewPostBody, UpdatePostBody } from "../../../schemas/post.schema";
import { CustomError, NotFoundError, UnauthorizedError } from "../../../errors/CustomErrors";
import { Prisma } from "../../../generated/prisma/client";
import { supabase } from "../../../lib/supabase";


export const createPost = async (req: Request<{}, any, NewPostBody>, res: Response) => {
    const { title, description, status } = req.body;
    const authorId = req.user?.user_id;
    if (!authorId) {
        throw new UnauthorizedError();
    }
    let imageUrl: string | null = null;
    if (req.file) {
        const ext = req.file.mimetype.split("/")[1];
        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;

        const { error } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET!)
            .upload(imagePath, req.file.buffer, {
                contentType: req.file.mimetype, // e.g. "image/png", "image/jpeg"
            });

        if (error) {
            // console.error(error);
            throw new CustomError(500, "SUPABASE_UPLOAD_ERROR", "Failed to upload image");
        }
        imageUrl = supabase.storage
            .from(process.env.SUPABASE_BUCKET!)
            .getPublicUrl(imagePath).data.publicUrl;
    }
    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newPost = await prisma.posts.create({
        data: {
            title,
            description,
            authorId,
            imageUrl,
            status
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
    const { title, description, status } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await prisma.posts.update({
        where: {
            id,
            authorId,
        },
        data: {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(imageUrl !== null && { imageUrl }),
            ...(status !== undefined && { status }),
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
            status: "PUBLISHED"
        },
        skip: offset,
        take: limit,
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
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
            },
            updatedAt: true,
        }
    });
    res.status(200).json(posts);
}
export const searchPublicPosts = async (req: Request, res: Response) => {
    const q = String(req.query.q || "").trim();
    if (!q) {
        // return res.status(400).json({ message: "Search query is required" });
        throw new CustomError(400, "SEARCH_QUERY_REQUIRED", "Search query is required");
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
            status: "PUBLISHED"
        },
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
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

export const userUnPublishedPosts = async (req: Request, res: Response) => {
    const authorId = req.user?.user_id;
    const posts = await prisma.posts.findMany({
        where: {
            authorId: authorId,
            status: {
                in: ["DRAFT", "PENDING", "REJECTED"]
            }
        },
        select: {
            id: true,
            title: true,
            description: true,
            updatedAt: true,
            status: true,
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
            status: "PUBLISHED"
        },
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
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
        throw new CustomError(400, "SEARCH_QUERY_REQUIRED", "Search query is required");
    }
    const order: Prisma.SortOrder = req.query.order === "asc" ? "asc" : "desc";
    const sortBy = req.query.sort_by === "updatedAt" ? "updatedAt" : "likes";
    const orderBy = sortBy === "likes" ? { Likes: { _count: order } } : { updatedAt: order };
    const posts = await prisma.posts.findMany({
        where: {
            authorId: authorId,
            title: {
                contains: q,
                mode: "insensitive"
            },
            status: "PUBLISHED"
        },
        orderBy,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            updatedAt: true,
            imageUrl: true,
            Likes: true
        }
    })
    res.status(200).json(posts);
}

export const deletePostAdmin = async (req: Request<{ id: string }>, res: Response) => {
    const authorId = req.user?.user_id;
    if (!authorId) {
        throw new UnauthorizedError();
    }
    const id = parseInt(req.params.id, 10);

    const existingPost = await prisma.posts.findUnique({
        where: {
            id,
        }
    });

    if (!existingPost) {
        throw new NotFoundError("Post not found");
    }

    // first delete the likes associated with the post 
    const deleteLikes = await prisma.likes.deleteMany({
        where: {
            postId: id
        }
    });

    // delete post
    const post = await prisma.posts.delete({
        where: {
            id,
        }
    });

    res.status(200).json({ message: "Post deleted successfully" });
}

export const deletePostUser = async (req: Request<{ id: string }>, res: Response) => {
    const authorId = req.user?.user_id;
    const id = parseInt(req.params.id, 10);

    const existingPost = await prisma.posts.findUnique({
        where: {
            id,
            authorId
        }
    });

    if (!existingPost) {
        throw new NotFoundError("Post not found or it does not belong to the user");
    }

    // first delete the likes associated with the post 
    const deleteLikes = await prisma.likes.deleteMany({
        where: {
            postId: id,
        }
    });

    // delete post
    const post = await prisma.posts.delete({
        where: {
            id,
            authorId
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
            status: "PUBLISHED"
        }
    });
    if (!validPost) {
        throw new NotFoundError("Post not found or not published");
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
            status: "PUBLISHED"
        }
    });
    if (!validPost) {
        throw new NotFoundError("Post not found or not published");
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



export const editPostStatusAdmin = async (req: Request<{ id: string }>, res: Response) => {
    const postId = parseInt(req.params.id, 10);
    const { status } = req.body;
    if (!["PUBLISHED", "REJECTED", "REMOVED"].includes(status)) {
        throw new CustomError(400, "INVALID_STATUS", "Invalid admin post status");
    }

    const response = await prisma.posts.update({
        where: {
            id: postId
        },
        data: {
            status
        }
    });
    res.status(200).json({ message: "Post status updated successfully" });
}

export const getPendingPostsAdmin = async (req: Request, res: Response) => {
    const pendingPosts = await prisma.posts.findMany({
        where: {
            status: "PENDING"
        },
        orderBy: { updatedAt: "desc" },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            updatedAt: true,
            imageUrl: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            Likes: {
                select: {
                    userId: true,
                    postId: true,
                }
            }
        }
    });
    res.status(200).json({ posts: pendingPosts })
}
