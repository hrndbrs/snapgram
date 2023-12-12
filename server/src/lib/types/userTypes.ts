export type TUserAttributes = {
	id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	imageUrl: URL;
	bio: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TUserCreationAttributes = Omit<
	TUserAttributes,
	"createdAt" | "updatedAt"
>;
