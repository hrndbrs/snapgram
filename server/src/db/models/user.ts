"use strict";
import {
	Model,
	Sequelize,
	StringDataTypeConstructor,
	TextDataTypeConstructor,
	AbstractDataTypeConstructor,
} from "sequelize";
import { hashPassword } from "../../lib/middlewares/bcryptjs";
import {
	type TUserAttributes,
	type TUserCreationAttributes,
	type ISequelizeModel,
} from "../../lib/types";

export default (
	sequelize: Sequelize,
	{
		STRING,
		UUID,
		TEXT,
	}: {
		STRING: StringDataTypeConstructor;
		UUID: AbstractDataTypeConstructor;
		TEXT: TextDataTypeConstructor;
	}
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
		declare imageUrl: URL;
		declare bio: string;
		declare createdAt: Date;
		declare updatedAt: Date;

		static associate(models: ISequelizeModel<User>) {
			User.hasMany(models.Post, {
				foreignKey: "creatorId",
				as: "creator",
			});
			User.belongsToMany(models.Post, {
				foreignKey: "userId",
				through: models.Like,
				as: "liked",
			});
			User.belongsToMany(models.Post, {
				foreignKey: "userId",
				through: models.Save,
				as: "saved",
			});
		}
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
				unique: { name: "username", msg: "Username is already taken" },
				allowNull: false,
			},
			email: {
				type: STRING,
				unique: { name: "email", msg: "Email is already taken" },
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: STRING,
				allowNull: false,
			},
			imageUrl: STRING,
			bio: TEXT,
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
