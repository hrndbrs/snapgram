import express from "express";
import PostController from "../controllers/PostController";

const router = express.Router();

router.post("/upload", PostController.createNewPost);
router.get("/", PostController.getRecentPosts);

export default router;
