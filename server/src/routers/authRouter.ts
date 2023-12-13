import express from "express";
import AuthController from "../controllers/AuthController";
import { authenticateUser } from "../lib/middlewares/authentication";

const router = express.Router();

router
	.post("/register", AuthController.createNewUser)
	.post("/signin", AuthController.signInUser)

	.use(authenticateUser)

	.get("/user", AuthController.getUser)
	.post("/logout", AuthController.removeAuthToken);

export default router;
