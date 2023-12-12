import { sign, verify } from "jsonwebtoken";
import { TUserAttributes } from "../types";

const secretKey = process.env.JWT_SECRET!;

export function createToken(user: Partial<TUserAttributes>) {
	return sign(user, secretKey);
}

export function verifyToken(token: string) {
	return verify(token, secretKey);
}
