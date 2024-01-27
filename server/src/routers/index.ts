import express from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import userRouter from "./userRouter";
import { authenticateUser } from "../lib/middlewares/authentication";

const router = express.Router();

router.use(authRouter);
router.use(authenticateUser);
router.use("/posts", postRouter);
router.use("/users", userRouter);

export default router;
