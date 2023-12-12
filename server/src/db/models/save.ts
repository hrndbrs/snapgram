"use strict";
import { Model, Sequelize, AbstractDataTypeConstructor } from "sequelize";

export default (
	sequelize: Sequelize,
	{ UUID }: { UUID: AbstractDataTypeConstructor }
) => {
	class Save extends Model {}
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
