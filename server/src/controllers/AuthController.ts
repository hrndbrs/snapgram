import { Request, Response, NextFunction } from "express";
import db from "../db/models";
import { comparePassword } from "../lib/middlewares/bcryptjs";
import { createToken } from "../lib/middlewares/jwt";
import {
	type TUserAttributes,
	type TUserCreationAttributes,
} from "../lib/types";
import { BaseError } from "../lib/classes";

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

			res.status(201).json({ message: "User creation is successful" });
		} catch (err) {
			next(err);
		}
	}

	static async signInUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password }: { email: string; password: string } = req.body;

			const user: TUserAttributes = await db.User.findOne({ where: { email } });

			if (!user) throw new BaseError("NotFound", "Email/Password is incorrect");

			if (!comparePassword(password, user.password))
				throw new BaseError("NotFound", "Email/Password is incorrect");

			const payload: Partial<TUserAttributes> = {
				id: user.id,
				email: user.email,
			};
			const token = createToken(payload);

			res
				.status(200)
				.cookie("auth_key", token, {
					httpOnly: true,
				})
				.json({
					id: user.id,
					name: user.name,
					username: user.username,
					imageUrl: user.imageUrl,
				});
		} catch (err) {
			next(err);
		}
	}

	static removeAuthToken(req: Request, res: Response) {
		res
			.clearCookie("auth_key")
			.status(200)
			.json({ message: "Removed session successfully" });
	}

	static async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { id, email } = (
				req as Request & { user: { id: string; email: string } }
			).user;

			const user = await db.User.findOne({
				where: { id, email },
				attributes: { exclude: ["password", "createdAt", "updatedAt"] },
			});

			if (!user) throw new BaseError("NotFound", "User is not found");

			res.status(200).json(user);
		} catch (err) {
			next(err);
		}
	}
}
