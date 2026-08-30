import express from "express"
import { allUsers, createUser, logIn } from "./controller/user.controller"
import { createPost, getAllPosts, editPost } from "./controller/post.controller";
import { authenticate } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { createPostSchema, updatePostSchema } from "../../schemas/post.schema";

const v1 = express.Router()
v1.post("/new-user", createUser);
v1.get("/users", allUsers)
v1.post("/new-post", authenticate, validate(createPostSchema), createPost)
v1.get("/posts", getAllPosts)
v1.put("/update-post/:id", authenticate, validate(updatePostSchema), editPost)
v1.post("/signin", logIn)
export default v1;