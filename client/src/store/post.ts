import { defineStore } from "pinia";
import { serverClient } from "@/config/axios";
import { type TNewPost, type TPost, type TPostStats } from "@/lib/types";

const usePostStore = defineStore("post", () => {
	function uploadPost(newPost: TNewPost) {
		return serverClient.post("/posts/upload", newPost);
	}

	async function getPosts(): Promise<TPost[]> {
		const { data } = await serverClient.get("/posts");
		return data;
	}

	async function getPostStat(postId: string): Promise<{
		likes: TPostStats[];
		count: number;
		saves: TPostStats[];
	}> {
		const { data } = await serverClient.get(`/posts/${postId}/stats`);
		return data;
	}
	async function likePost(postId: string): Promise<TPostStats> {
		const { data } = await serverClient.post(`/posts/${postId}/likes`);
		return data;
	}
	async function removeLikedPost(likeId: number): Promise<TPostStats> {
		const { data } = await serverClient.delete(`/posts/likes/${likeId}`);
		return data;
	}
	async function savePost(postId: string): Promise<TPostStats> {
		const { data } = await serverClient.post(`/posts/${postId}/saves`);
		return data;
	}
	async function removeSavedPost(saveId: number): Promise<TPostStats> {
		const { data } = await serverClient.delete(`/posts/saves/${saveId}`);
		return data;
	}

	return {
		uploadPost,
		getPosts,
		getPostStat,
		likePost,
		removeLikedPost,
		savePost,
		removeSavedPost,
	};
});

export default usePostStore;
