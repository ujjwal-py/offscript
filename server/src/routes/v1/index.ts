import express from "express"
import { allUsers, createUser, getMe, logIn, logout } from "./controller/user.controller"
import { createPost, getAllPosts, editPost, getUserPosts } from "./controller/post.controller";
import { authenticate } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createPostSchema, updatePostSchema } from "../../schemas/post.schema";
import { UserSchema } from "../../schemas/user.schema";

const v1 = express.Router()

// auth or user routes
v1.post("/signup", validate(UserSchema), createUser);
v1.get("/users", allUsers);
v1.post("/signin", validate(UserSchema), logIn)
v1.get("/me", authenticate, getMe);
v1.post("/logout", authenticate, logout);


// post routes
v1.post("/new-post", authenticate, validate(createPostSchema), createPost)
v1.get("/posts", getAllPosts)
v1.get("/user-posts", authenticate, getUserPosts)
v1.put("/update-post/:id", authenticate, validate(updatePostSchema), editPost)
export default v1;