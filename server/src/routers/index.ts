import express from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import { authenticateUser } from "../lib/middlewares/authentication";

const router = express.Router();

router.use(authRouter);
router.use(authenticateUser);
router.use("/posts", postRouter);

export default router;
