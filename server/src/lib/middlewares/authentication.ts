import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";
import { BaseError } from "../classes";

export function authenticateUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	interface JwtPayload {
		id: string;
		email: string;
	}

	try {
		const token: string | undefined = req.cookies.auth_key;

		if (!token) throw new BaseError("Unauthorized", "Please sign in");

		const { id, email } = verifyToken(token) as JwtPayload;

		(req as Request & { user: { id: string; email: string } }).user = {
			id,
			email,
		};

		next();
	} catch (err) {
		next(err);
	}
}
