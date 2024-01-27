import { TUser } from "./user";

export type TImage = {
	imageUrl: string;
	imageId: string;
};

export type TNewPost = {
	caption: string;
	tags: string;
	file: File;
	location: string;
};

export type TPost = Omit<TNewPost, "file"> &
	TImage & {
		id: string;
		creatorId: string;
		createdBy?: Partial<TUser>;
		createdAt?: string;
		updatedAt?: string;
	};

export type TPostStatsProps = {
	post: TPost;
	userId: string;
};

export type TPostStats = {
	id: number;
	userId: string;
	postId: string;
};
