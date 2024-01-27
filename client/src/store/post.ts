import { defineStore } from "pinia";
import { serverClient } from "@/config/axios";
import {
	type TImage,
	type TNewPost,
	type TPost,
	type TPostStats,
} from "@/lib/types";

const usePostStore = defineStore("post", () => {
	function uploadImage(imageFile: File): Promise<TImage> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = async () => {
				const base64data = reader.result;
				const { data }: { data: { secure_url: string; public_id: string } } =
					await serverClient.post("/posts/image", { image: base64data });
				resolve({ imageId: data.public_id, imageUrl: data.secure_url });
			};

			reader.onerror = reject;
			reader.readAsDataURL(imageFile);
		});
	}

	function deleteImage(imageId: string) {
		return serverClient.delete(`/posts/image/${imageId}`);
	}

	async function updatePost({ post, input }: { post: TPost; input: TNewPost }) {
		const { id, imageId, imageUrl } = post;
		const { caption, location, file, tags } = input;
		const payload = {
			caption,
			location,
			tags,
			imageId,
			imageUrl,
		};

		if (file) {
			const newImage = await uploadImage(file);
			await deleteImage(post.imageId);
			payload.imageUrl = newImage.imageUrl;
			payload.imageId = newImage.imageId;
		}

		const { data } = await serverClient.put(`/posts/${id}`, payload);

		return data;
	}

	async function uploadPost(input: TNewPost) {
		const { caption, file, location, tags } = input;

		const { imageUrl, imageId } = await uploadImage(file);

		const newPost = {
			caption,
			location,
			tags,
			imageUrl,
			imageId,
		};
		await serverClient.post("/posts/upload", newPost);
	}

	async function deletePost(post: TPost) {
		const { data } = await serverClient.delete(`/posts/${post.id}`);
		await deleteImage(post.imageId);

		return data;
	}

	// async function getExplorePosts(pageParam: number) {}

	async function getPosts(): Promise<TPost[]> {
		const { data } = await serverClient.get("/posts");
		return data;
	}
	async function getPostById(postId: string): Promise<TPost> {
		const { data } = await serverClient.get(`/posts/${postId}`);
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
	async function removeLikedPost(postId: string): Promise<TPostStats> {
		const { data } = await serverClient.delete(`/posts/likes/${postId}`);
		return data;
	}
	async function savePost(postId: string): Promise<TPostStats> {
		const { data } = await serverClient.post(`/posts/${postId}/saves`);
		return data;
	}
	async function removeSavedPost(postId: string): Promise<TPostStats> {
		const { data } = await serverClient.delete(`/posts/saves/${postId}`);
		return data;
	}

	return {
		uploadPost,
		updatePost,
		deletePost,
		getPosts,
		getPostById,
		getPostStat,
		likePost,
		removeLikedPost,
		savePost,
		removeSavedPost,
	};
});

export default usePostStore;
