export type TPostAttributes = {
	id: string;
	creatorId: string;
	caption: string;
	tags: string;
	imageUrl: string;
	imageId: string;
	location: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TPostCreationAttributes = Omit<
	TPostAttributes,
	"createdAt" | "updatedAt"
>;
