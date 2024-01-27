import express from "express";
import PostController from "../controllers/PostController";

const router = express.Router();

router
	.post("/image", PostController.uploadImage)
	.get("/", PostController.getRecentPosts)
	.get("/:id", PostController.getPostById)
	.get("/:id/stats", PostController.getPostStats)
	.post("/upload", PostController.createNewPost)
	.post("/:id/likes", PostController.addNewLike)
	.post("/:id/saves", PostController.addSaveToRecord)
	.delete("/:id", PostController.deletePost)
	.delete("/image/:imageId", PostController.deleteImageFromStorage)
	.delete("/likes/:id", PostController.removeLikeFromPost)
	.delete("/saves/:id", PostController.removeSaveFromRecord)
	.put("/:id", PostController.updatePost);

export default router;
