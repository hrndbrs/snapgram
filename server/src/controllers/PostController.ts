import { Request, Response, NextFunction } from "express";
import db from "../db/models";
import { type TPostCreationAttributes } from "../lib/types";
import { BaseError } from "../lib/classes";

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

	static async getPostStats(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: postId } = req.params;

			const options = { where: { postId }, attributes: ["id", "userId"] };

			const { count, rows: likes } = await db.Like.findAndCountAll(options);
			const saves = await db.Save.findAll(options);

			res.status(200).json({
				likes,
				count,
				saves,
			});
		} catch (err) {
			next(err);
		}
	}

	static async addNewLike(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: postId } = req.params;
			const { id: userId } = (req as Request & { user: { id: string } }).user;

			const payload = { postId, userId };

			const newLike = await db.Like.create(payload);

			res.status(201).json(newLike);
		} catch (err) {
			next(err);
		}
	}

	static async removeLikeFromPost(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { likeId: id } = req.params;
			const deletedLike = await db.Like.findByPk(id);
			if (!deletedLike) throw new BaseError("NotFound", "Like is not found");
			await db.Like.destroy({
				where: { id },
			});

			res.status(200).json(deletedLike);
		} catch (err) {
			next(err);
		}
	}

	static async addSaveToRecord(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id: postId } = req.params;
			const { id: userId } = (req as Request & { user: { id: string } }).user;

			const payload = { postId, userId };

			const newSave = await db.Save.create(payload);

			res.status(201).json(newSave);
		} catch (err) {
			next(err);
		}
	}

	static async removeSaveFromRecord(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { saveId: id } = req.params;
			const deletedSave = await db.Save.findByPk(id);
			if (!deletedSave) throw new BaseError("NotFound", "Record is not found");
			await db.Save.destroy({
				where: { id },
			});

			res.status(200).json(deletedSave);
		} catch (err) {
			next(err);
		}
	}
}
