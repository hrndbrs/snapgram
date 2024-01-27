import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/:username/profile", UserController.getUserProfile);

export default router;
