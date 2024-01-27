import { Request, Response, NextFunction } from "express";
import db from "../db/models";
import cld from "../config/cloudinary";
import { type TPostCreationAttributes } from "../lib/types";
import { BaseError } from "../lib/classes";

export default class PostController {
	static async uploadImage(req: Request, res: Response, next: NextFunction) {
		try {
			const { image: base64data } = req.body;
			const result = await cld.uploader.upload(base64data);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	}

	static async deleteImageFromStorage(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { imageId } = req.params;
			const result = await cld.uploader.destroy(imageId);

			if (result.result !== "ok")
				throw new BaseError("InternalServer", "Unable to delete image");

			res.status(200).json({ message: "Image deleted successfully" });
		} catch (err) {
			next(err);
		}
	}

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

	static async updatePost(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { caption, location, imageUrl, imageId, tags } = req.body;

			const post = await db.Post.findByPk(id);

			if (!post) throw new BaseError("NotFound", "Post was not found");

			const payload = { caption, tags, imageId, imageUrl, location };

			await db.Post.update(payload, { where: { id } });

			res.status(200).json({
				postId: id,
				message: `Post ${id} has been updated successfully`,
			});
		} catch (err) {
			next(err);
		}
	}

	static async deletePost(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const post = await db.Post.findByPk(id);

			if (!post) throw new BaseError("NotFound", "Post is not found");

			await db.Post.destroy({ where: { id } });

			res.status(200).json({
				postId: id,
				message: `Post ${id} has been deleted successfully`,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPostById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const postDetail = await db.Post.findByPk(id, {
				include: {
					model: db.User,
					as: "createdBy",
					attributes: ["imageUrl", "name", "username"],
				},
			});
			if (!postDetail) throw new BaseError("NotFound", "Post is not available");

			res.status(200).json(postDetail);
		} catch (err) {
			next(err);
		}
	}

	static async getRecentPosts(
		_req: Request,
		res: Response,
		next: NextFunction
	) {
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

			const postStats = {
				likes,
				count,
				saves,
			};

			res.status(200).json(postStats);
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
			const { id: userId } = (req as Request & { user: { id: string } }).user;
			const { id: postId } = req.params;

			const options = {
				where: { userId, postId },
			};

			const deletedLike = await db.Like.findOne(options);

			if (!deletedLike) throw new BaseError("NotFound", "Like is not found");
			await db.Like.destroy(options);

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
			const { id: postId } = req.params;
			const { id: userId } = (req as Request & { user: { id: string } }).user;

			const options = {
				where: { userId, postId },
			};

			const deletedSave = await db.Save.findOne(options);

			if (!deletedSave) throw new BaseError("NotFound", "Record is not found");
			await db.Save.destroy(options);

			res.status(200).json(deletedSave);
		} catch (err) {
			next(err);
		}
	}
}
