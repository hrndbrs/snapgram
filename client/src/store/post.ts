import { defineStore } from "pinia";
import { serverClient } from "@/config/axios";
import { type TNewPost, type TPost } from "@/lib/types";

const usePostStore = defineStore("post", () => {
	function uploadPost(newPost: TNewPost) {
		return serverClient.post("/posts/upload", newPost);
	}

	async function getPosts(): Promise<TPost[]> {
		const { data } = await serverClient.get("/posts");

		return data;
	}

	return { uploadPost, getPosts };
});

export default usePostStore;
