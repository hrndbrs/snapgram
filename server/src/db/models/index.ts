"use strict";

import fs from "fs";
import path from "path";
import process from "process";
import { Sequelize, DataTypes, Options } from "sequelize";
import database from "../../config/config.json";

type TDb = {
	sequelize?: Sequelize;
	Sequelize?: typeof Sequelize;
	[key: string]: any;
};

type Environment = "development" | "test" | "production";

const basename = path.basename(__filename);
const env: Environment = (process.env.NODE_ENV as Environment) || "development";
const config = database[env];
const db: TDb = {};

let sequelize: Sequelize;

if ("use_env_variable" in config) {
	sequelize = new Sequelize(
		process.env[config.use_env_variable]!,
		config as Options
	);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config as Options
	);
}

fs.readdirSync(__dirname)
	.filter((file: string) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".ts" &&
			file.indexOf(".test.ts") === -1
		);
	})
	.forEach((file: string) => {
		const modelFn = require(path.join(__dirname, file));
		const model = modelFn.default(sequelize, DataTypes);
		db[model.name] = model;
	});
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(db.User);

export default db;
