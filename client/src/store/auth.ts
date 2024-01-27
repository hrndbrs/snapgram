import { reactive } from "vue";
import { defineStore } from "pinia";
import { serverClient } from "@/config/axios";
import { type TNewUser, type TUser } from "@/lib/types";

const useAuthStore = defineStore("auth", () => {
	const loggedUser = reactive({
		id: "",
		name: "",
		username: "",
		imageUrl: "",
		isLoggedIn: false,
	});

	function setLoggedUser(user: TUser) {
		loggedUser.id = user.id;
		loggedUser.name = user.name;
		loggedUser.username = user.username;
		loggedUser.imageUrl = user.imageUrl;
		loggedUser.isLoggedIn = true;
	}

	async function createNewUser(payload: TNewUser) {
		await serverClient.post("/register", payload);
		return { email: payload.email, password: payload.password };
	}

	async function signInUser(payload: { email: string; password: string }) {
		const { data: user } = await serverClient.post<TUser>("/signin", payload);
		setLoggedUser(user);
	}

	function signOutAccount() {
		return serverClient.post("/logout");
	}

	async function getUser() {
		const { data: user } = await serverClient.get<TUser>("/user");
		return user;
	}

	async function getUserProfile(username: string) {
		const { data: user } = await serverClient.get<TUser>(
			`/users/${username}/profile`
		);
		return user;
	}

	return {
		loggedUser,
		setLoggedUser,
		createNewUser,
		signInUser,
		getUser,
		signOutAccount,
		getUserProfile,
	};
});

export default useAuthStore;
