import express from "express";
import PostController from "../controllers/PostController";

const router = express.Router();

router
	.get("/", PostController.getRecentPosts)
	.get("/:id/stats", PostController.getPostStats)
	.post("/upload", PostController.createNewPost)
	.post("/:id/likes", PostController.addNewLike)
	.post("/:id/saves", PostController.addSaveToRecord)
	.delete("/likes/:likeId", PostController.removeLikeFromPost)
	.delete("/saves/:saveId", PostController.removeSaveFromRecord);

export default router;
