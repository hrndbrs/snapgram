export type TUser = {
	id: string;
	name: string;
	email: string;
	username: string;
	imageUrl: string;
};

export type TNewUser = Omit<TUser, "imageUrl" | "id"> & { password: string };
