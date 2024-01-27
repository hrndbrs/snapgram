import express from "express";
import UserController from "../controllers/UserController";
import { authenticateUser } from "../lib/middlewares/authentication";

const router = express.Router();

router
	.post("/register", UserController.createNewUser)
	.post("/signin", UserController.signInUser)

	.use(authenticateUser)

	.get("/user", UserController.getUser)
	.post("/logout", UserController.removeAuthToken);

export default router;
