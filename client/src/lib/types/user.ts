import { TPost } from "./post";

export type TUser = {
	id: string;
	name: string;
	email: string;
	username: string;
	imageUrl: string;
	bio: string;
	liked?: TPost[];
	posted?: TPost[];
};

export type TNewUser = Omit<TUser, "imageUrl" | "id"> & { password: string };
