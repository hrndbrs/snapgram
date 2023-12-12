import { TErrorName } from "../types";

export class BaseError extends Error {
	name: TErrorName;
	status: number;

	constructor(name: TErrorName, message: string) {
		super(message);
		this.name = name;
		this.status = BaseError.getStatus(name);
	}

	static getStatus(name: string): number {
		let status = 500;
		switch (name) {
			case "BadRequest":
				status = 400;
				break;
			case "Unauthorized":
				status = 401;
				break;
			case "Forbidden":
				status = 403;
				break;
			case "NotFound":
				status = 404;
				break;
		}

		return status;
	}
}
