<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { Button } from "../ui/button";
import { useSignOut } from "@/lib/ts-query/queriesAndMutation";
import useAuthStore from "@/store/auth";

const router = useRouter();
const { loggedUser } = useAuthStore();
const { mutateAsync: signOutAccount, isSuccess } = useSignOut();

async function signOut() {
	try {
		await signOutAccount();
		if (!isSuccess) throw {};

		router.push({ name: "signin" });
	} catch (err) {
		console.log(err);
	}
}
</script>

<template>
	<section class="topbar">
		<div class="flex-between py-4 px-5">
			<RouterLink :to="{ name: 'home' }" class="flex gap-3 items-center">
				<img
					src="@/assets/images/logo.svg"
					alt="logo"
					:width="130"
					:height="325"
				/>
			</RouterLink>
			<div class="flex gap-4">
				<Button variant="ghost" class="shad-button_ghost" @click="signOut">
					<img src="@/assets/icons/logout.svg" alt="logout" />
				</Button>
				<RouterLink :to="`/users/${loggedUser.id}`" class="flex-center gap-3">
					<img
						:src="loggedUser.imageUrl"
						alt="profile"
						class="h-8 w-8 rounded-full object-cover"
					/>
				</RouterLink>
			</div>
		</div>
	</section>
</template>
