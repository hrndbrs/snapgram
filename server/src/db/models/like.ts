"use strict";
import { Model, Sequelize, AbstractDataTypeConstructor } from "sequelize";

export default (
	sequelize: Sequelize,
	{ UUID }: { UUID: AbstractDataTypeConstructor }
) => {
	class Like extends Model {}
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
