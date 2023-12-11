import { ref } from "vue";
import { defineStore } from "pinia";
import { serverClient } from "@/config/axios";
import { type TNewUser } from "@/lib/types";

const useAuthStore = defineStore("auth", () => {
	const isAuthenticated = ref(false);

	const createNewUser = async (payload: TNewUser) => {
		await serverClient.post("/register", payload);
	};

	return { isAuthenticated, createNewUser };
});

export default useAuthStore;
