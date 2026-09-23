import { z } from "zod"

export const createPostSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(100, "Title Can't exceed 100 characters"),
    description: z.string().trim().max(10000, "Desc can't exceed 10000 characters").optional(),
    imageUrl: z.string().url("Image URL must be a valid URL").optional()
});

export const updatePostSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(100, "Title Can't exceed 100 characters").optional(),
    description: z.string().trim().max(10000, "Desc can't exceed 10000 characters").optional(),
    imageUrl: z.string().url("Image URL must be a valid URL").optional()
});

export const likesSchema = z.object({
    postId: z.number().int().positive("Post ID must be a positive integer")
});

export type NewPostBody = z.infer<typeof createPostSchema>;
export type UpdatePostBody = z.infer<typeof updatePostSchema>;
export type LikesBody = z.infer<typeof likesSchema>;