import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const SignInValidationSchema = toTypedSchema(
	z.object({
		email: z.string().email({ message: "Invalid email format" }),
		password: z
			.string()
			.min(8, { message: "Password should be at least 8 characters" }),
	})
);

export const SignUpValidationSchema = toTypedSchema(
	z.object({
		name: z
			.string()
			.min(2, { message: "Name should be at least 2 characters" }),
		username: z
			.string()
			.min(2, { message: "Username should be at least 2 characters" }),
		email: z.string().email({ message: "Invalid email format" }),
		password: z
			.string()
			.min(8, { message: "Password should be at least 8 characters" }),
	})
);

export const PostValidation = toTypedSchema(
	z.object({
		caption: z.string().max(2200),
		file: z.custom<File>(),
		location: z.string().max(100),
		tags: z.string(),
	})
);
