import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from "@tanstack/vue-query";
import useAuthStore from "@/store/auth";
import { TNewUser } from "../types";

const { createNewUser, signInUser, signOutAccount } = useAuthStore();

export function useCreateUserAccount() {
	return useMutation({
		mutationFn: (user: TNewUser) => createNewUser(user),
	});
}

export function useSignInAccount() {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) => signInUser(user),
	});
}

export function useSignOut() {
	return useMutation({
		mutationFn: signOutAccount,
	});
}
