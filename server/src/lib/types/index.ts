import {
	ModelStatic,
	Model,
	UniqueConstraintError,
	ValidationError,
	BulkRecordError,
} from "sequelize";
import { VerifyErrors } from "jsonwebtoken";
import { BaseError } from "../classes";

export {
	type TUserAttributes,
	type TUserCreationAttributes,
} from "./userTypes";
export {
	type TPostAttributes,
	type TPostCreationAttributes,
} from "./postTypes";
export {
	type TStatAttributes,
	type TStatCreationAttributes,
} from "./statTypes";

export interface ISequelizeModel<T extends Model<any, any>> {
	[key: string]: ModelStatic<T>;
}

export type TErrorName =
	| "Unauthorized"
	| "Forbidden"
	| "NotFound"
	| "BadRequest"
	| "InternalServer";

export type TError =
	| BaseError
	| UniqueConstraintError
	| ValidationError
	| BulkRecordError
	| VerifyErrors;
