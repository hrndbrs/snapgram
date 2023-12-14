"use strict";
import { Model, Sequelize, AbstractDataTypeConstructor } from "sequelize";
import {
	ISequelizeModel,
	TStatAttributes,
	TStatCreationAttributes,
} from "../../lib/types";

export default (
	sequelize: Sequelize,
	{ UUID }: { UUID: AbstractDataTypeConstructor }
) => {
	class Like extends Model<
		Omit<TStatAttributes, "id" | "createdAt" | "updatedAt">,
		TStatCreationAttributes
	> {
		static associate(models: ISequelizeModel<Like>) {
			Like.belongsTo(models.User, {
				foreignKey: "userId",
				as: "liked",
			});
			Like.belongsTo(models.Post, {
				foreignKey: "postId",
				as: "likes",
			});
		}
	}
	Like.init(
		{
			userId: UUID,
			postId: UUID,
		},
		{
			sequelize,
			modelName: "Like",
		}
	);
	return Like;
};
