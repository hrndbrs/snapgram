import express from "express";
import AuthController from "../controllers/AuthController";
import { authenticateUser } from "../lib/middlewares/authentication";

const router = express.Router();

router.post("/register", AuthController.createNewUser);
router.post("/signin", AuthController.signInUser);

router.use(authenticateUser);

router.get("/user", AuthController.getUser);
router.post("/logout", AuthController.removeAuthToken);

export default router;
