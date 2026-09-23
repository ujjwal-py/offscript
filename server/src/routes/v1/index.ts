import express from "express"
import {
    allUsers,
    createUser,
    getMe,
    logIn,
    logout
} from "./controller/user.controller"
import {
    createPost,
    getAllPosts,
    editPost,
    userUnPublishedPosts,
    userPublishedPosts,
    deletePostAdmin,
    dislikePost,
    likePost,
    searchPublicPosts,
    searchUserPosts,
    deletePostUser,
    editPostStatusAdmin,
    setPendingPostUser
} from "./controller/post.controller";
import { authenticate, requireRole } from "../../middlewares/auth";
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


// posts routes
v1.post("/new-post", authenticate, upload.single("image"), validate(createPostSchema), createPost)
v1.get("/posts", getAllPosts)
v1.get("/unpublished", authenticate, userUnPublishedPosts)
v1.get("/published", authenticate, userPublishedPosts)
v1.put("/update-post/:id", authenticate, upload.single("image"), validate(updatePostSchema), editPost)
v1.delete("/delete-post-admin/:id", authenticate, requireRole("ADMIN"), deletePostAdmin);
v1.delete("/delete-post/:id", authenticate, deletePostUser);
v1.post("/like-post/:id", authenticate, likePost)
v1.delete("/dislike-post/:id", authenticate, dislikePost)
v1.get("/search-public", searchPublicPosts)
v1.get("/search-user-posts", authenticate, searchUserPosts)
v1.put("/set-pending/:id", authenticate, setPendingPostUser)
v1.put("/update-post-status/:id", authenticate, requireRole("ADMIN"), editPostStatusAdmin)
export default v1;