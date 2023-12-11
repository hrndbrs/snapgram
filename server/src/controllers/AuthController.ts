import { Request, Response, NextFunction } from "express";
import db from "../db/models";
import { type TUserCreationAttributes } from "../types";

export default class AuthController {
	static async createNewUser(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				name,
				username,
				email,
				password,
			}: Omit<TUserCreationAttributes, "id"> = req.body;
			const payload = {
				name,
				username,
				email,
				password,
			};
			await db.User.create(payload);

			res.status(201).json({ message: "User creation was successful" });
		} catch (err) {
			if (err instanceof Error) next(err);
		}
	}
}
