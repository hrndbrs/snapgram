export type TStatAttributes = {
	id: number;
	userId: string;
	postId: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type TStatCreationAttributes = Omit<
	TStatAttributes,
	"id" | "updatedAt" | "createdAt"
>;
