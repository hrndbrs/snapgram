"use strict";
import {
	Model,
	Sequelize,
	type AbstractDataTypeConstructor,
	type StringDataTypeConstructor,
	type TextDataTypeConstructor,
} from "sequelize";
import {
	type TPostAttributes,
	type TPostCreationAttributes,
	type ISequelizeModel,
} from "../../lib/types";

export default (
	sequelize: Sequelize,
	{
		UUID,
		TEXT,
		STRING,
	}: {
		UUID: AbstractDataTypeConstructor;
		TEXT: TextDataTypeConstructor;
		STRING: StringDataTypeConstructor;
	}
) => {
	class Post extends Model<
		Omit<TPostAttributes, "createdAt" | "updatedAt">,
		TPostCreationAttributes
	> {
		declare id: string;
		declare creatorId: string;
		declare caption: string;
		declare tags: string;
		declare imageUrl: string;
		declare location: string;
		declare createdAt: Date;
		declare updatedAt: Date;

		static associate(models: ISequelizeModel<Post>) {
			Post.belongsTo(models.User, {
				foreignKey: "creatorId",
				as: "createdBy",
			});
			Post.belongsToMany(models.User, {
				foreignKey: "postId",
				through: models.Like,
				as: "likes",
			});
			Post.belongsToMany(models.User, {
				foreignKey: "postId",
				through: models.Save,
				as: "saves",
			});
		}
	}
	Post.init(
		{
			id: {
				type: UUID,
				unique: true,
				primaryKey: true,
				allowNull: false,
			},
			creatorId: {
				type: UUID,
				allowNull: false,
			},
			caption: TEXT,
			tags: TEXT,
			imageUrl: {
				type: STRING,
				allowNull: false,
			},
			imageId: {
				type: STRING,
				allowNull: false,
			},
			location: STRING,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	Post.beforeValidate((post) => {
		post.id = crypto.randomUUID();
	});

	return Post;
};
