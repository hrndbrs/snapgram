"use strict";
import {
	Model,
	Sequelize,
	StringDataTypeConstructor,
	AbstractDataTypeConstructor,
} from "sequelize";
import { hashPassword } from "../../middlewares/bcryptjs";
import {
	type TUserAttributes,
	type TUserCreationAttributes,
} from "../../types";

export default (
	sequelize: Sequelize,
	{
		STRING,
		UUID,
	}: { STRING: StringDataTypeConstructor; UUID: AbstractDataTypeConstructor }
) => {
	class User extends Model<
		Omit<TUserAttributes, "createdAt" | "updatedAt">,
		TUserCreationAttributes
	> {
		declare id: string;
		declare name: string;
		declare email: string;
		declare username: string;
		declare password: string;

		static associate(models: any) {}
	}
	User.init(
		{
			id: {
				type: UUID,
				unique: true,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: STRING,
				allowNull: false,
			},
			username: {
				type: STRING,
				unique: true,
				allowNull: false,
			},
			email: {
				type: STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeValidate((user) => {
		user.id = crypto.randomUUID();
	});

	User.beforeCreate((user) => {
		user.password = hashPassword(user.password);
	});
	return User;
};
