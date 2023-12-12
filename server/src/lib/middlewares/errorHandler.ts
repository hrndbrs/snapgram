import { Request, Response, NextFunction } from "express";
import {
	UniqueConstraintError,
	ValidationError,
	BulkRecordError,
} from "sequelize";
import { BaseError } from "../classes";
import { TError } from "../types";

export default function (
	err: TError,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (err instanceof UniqueConstraintError)
		err = new BaseError("BadRequest", err.errors[0].message);
	else if (err instanceof ValidationError)
		err = new BaseError("BadRequest", err.errors[0].message);
	else if (err instanceof BulkRecordError)
		err = new BaseError("InternalServer", err.errors.message);
	else if (!(err instanceof BaseError))
		err = new BaseError("Unauthorized", err.message);

	res.status(err.status).json(err.message);
}
