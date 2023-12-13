import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from "@tanstack/vue-query";
import { useAuthStore, usePostStore } from "@/store";
// import { type TNewUser, type TNewPost } from "../types";
import { QUERY_KEYS } from "./queryKeys";

const { createNewUser, signInUser, signOutAccount } = useAuthStore();
const { uploadPost, getPosts } = usePostStore();

export function useCreateUserAccount() {
	return useMutation({
		mutationFn: createNewUser,
	});
}

export function useSignInAccount() {
	return useMutation({
		mutationFn: signInUser,
	});
}

export function useSignOut() {
	return useMutation({
		mutationFn: signOutAccount,
	});
}

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: uploadPost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
}

export function useGetRecentPosts() {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getPosts,
	});
}
