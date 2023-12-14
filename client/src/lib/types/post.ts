import { TUser } from "./user";

export type TPost = {
	id: string;
	creatorId: string;
	caption: string;
	tags: string;
	imageUrl: string;
	imageId: string;
	location: string;
	createdBy?: Partial<TUser>;
	createdAt?: string;
	updatedAt?: string;
};

export type TNewPost = Omit<TPost, "creatorId" | "id">;

export type TPostStatsProps = {
	post: TPost;
	userId: string;
};

export type TPostStats = {
	id: number;
	userId: string;
	postId?: string;
};
