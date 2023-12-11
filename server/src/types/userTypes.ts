export type TUserAttributes = {
	id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TUserCreationAttributes = Omit<
	TUserAttributes,
	"createdAt" & "updatedAt"
>;
