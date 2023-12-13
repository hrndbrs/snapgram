import { Request, Response, NextFunction } from "express";
import db from "../db/models";
import { type TPostCreationAttributes } from "../lib/types";

export default class PostController {
	static async createNewPost(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: creatorId } = (req as Request & { user: { id: string } })
				.user;
			const { caption, tags, imageUrl, imageId, location } = req.body;
			const payload: Omit<TPostCreationAttributes, "id"> = {
				caption,
				tags,
				imageUrl,
				imageId,
				location,
				creatorId,
			};

			await db.Post.create(payload);

			res.status(201).json({ message: "Successfully upload a new post" });
		} catch (err) {
			next(err);
		}
	}

	static async getRecentPosts(req: Request, res: Response, next: NextFunction) {
		try {
			const posts = await db.Post.findAll({
				order: [["createdAt", "DESC"]],
				limit: 20,
				include: {
					model: db.User,
					as: "createdBy",
					attributes: ["imageUrl", "name", "username"],
				},
			});

			res.status(200).json(posts);
		} catch (err) {
			next(err);
		}
	}
}
