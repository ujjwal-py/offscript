import express from "express"
import {
    allUsers, createUser,
    getMe, logIn, logout
} from "./controller/user.controller"
import {
    createPost, getAllPosts,
    editPost, userDraftPosts,
    userPublishedPosts, deletePost
} from "./controller/post.controller";
import { authenticate } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createPostSchema, updatePostSchema } from "../../schemas/post.schema";
import { UserSchema } from "../../schemas/user.schema";
import { upload } from "../../middlewares/upload";

const v1 = express.Router()

// auth or user routes
v1.post("/signup", validate(UserSchema), createUser);
v1.get("/users", allUsers);
v1.post("/signin", validate(UserSchema), logIn)
v1.get("/me", authenticate, getMe);
v1.post("/logout", authenticate, logout);


// post routes
v1.post("/new-post", authenticate, upload.single("image"), validate(createPostSchema), createPost)
v1.get("/posts", getAllPosts)
v1.get("/drafts", authenticate, userDraftPosts)
v1.get("/published", authenticate, userPublishedPosts)
v1.put("/update-post/:id", authenticate, upload.single("image"), validate(updatePostSchema), editPost)
v1.delete("/delete-post/:id", authenticate, deletePost)
export default v1;