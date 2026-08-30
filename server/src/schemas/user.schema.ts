import { z } from "zod"

export const UserSchema = z.object({
    name: z.string().trim().toLowerCase().optional(),
    email: z.string().trim().toLowerCase().email("Invalid Email address"),
    password: z.string().trim().min(8, "Password should be minimum of 8 characters")
})

export type UserBody = z.infer<typeof UserSchema>