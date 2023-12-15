import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	// useInfiniteQuery,
} from "@tanstack/vue-query";
import { useAuthStore, usePostStore } from "@/store";
import { QUERY_KEYS } from "./queryKeys";

const { createNewUser, signInUser, signOutAccount } = useAuthStore();
const {
	uploadPost,
	updatePost,
	deletePost,
	getPosts,
	getPostById,
	getPostStat,
	likePost,
	savePost,
	removeLikedPost,
	removeSavedPost,
} = usePostStore();

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

export function useUpdatePost() {
	const queryClient = new QueryClient();

	return useMutation({
		mutationFn: updatePost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.postId],
			});
		},
	});
}

export function deletePostById() {
	const queryClient = new QueryClient();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.postId],
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

export function useGetPostBydId(postId: string) {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
		queryFn: () => getPostById(postId),
		enabled: !!postId,
	});
}

export function useGetPostStats(postId: string) {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_POST_STATS, postId],
		queryFn: () => getPostStat(postId),
		enabled: !!postId,
	});
}

export function useLikePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: likePost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_STATS, data.postId],
			});
		},
	});
}
export function useSavePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: savePost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_STATS, data.postId],
			});
		},
	});
}
export function useRemoveLikedPost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeLikedPost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_STATS, data.postId],
			});
		},
	});
}
export function useRemoveSavedPost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeSavedPost,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_STATS, data.postId],
			});
		},
	});
}
