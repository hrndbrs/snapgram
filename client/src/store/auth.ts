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
		const { data: user }: { data: TUser } = await serverClient.post(
			"/signin",
			payload
		);
		setLoggedUser(user);
	}

	async function getUser() {
		const { data: user }: { data: TUser } = await serverClient.get("/user");
		setLoggedUser(user);
	}

	return { loggedUser, createNewUser, signInUser, getUser };
});

export default useAuthStore;
