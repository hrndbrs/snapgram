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
	class Save extends Model<
		Omit<TStatAttributes, "id" | "createdAt" | "updatedAt">,
		TStatCreationAttributes
	> {
		static associate(models: ISequelizeModel<Save>) {
			Save.belongsTo(models.User, {
				foreignKey: "userId",
				as: "saved",
			});
			Save.belongsTo(models.Post, {
				foreignKey: "postId",
				as: "saves",
			});
		}
	}
	Save.init(
		{
			userId: UUID,
			postId: UUID,
		},
		{
			sequelize,
			modelName: "Save",
		}
	);
	return Save;
};
