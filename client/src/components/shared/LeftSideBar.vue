<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { Button } from "../ui/button";
import { useSignOut } from "@/lib/ts-query/queriesAndMutation";
import useAuthStore from "@/store/auth";
import { sideBarLinks } from "@/constants";
import { generateLogoURL } from "@/lib/helpers";

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
	<nav class="leftsidebar">
		<div class="flex flex-col gap-11">
			<RouterLink :to="{ name: 'home' }" class="flex gap-3 items-center">
				<img
					src="@/assets/images/logo.svg"
					alt="logo"
					:width="170"
					:height="36"
				/>
			</RouterLink>
			<RouterLink
				:to="`/users/${loggedUser.username}`"
				class="flex gap-3 items-center"
			>
				<img
					:src="loggedUser.imageUrl"
					alt="profile"
					class="h-14 w-14 rounded-full object-cover"
				/>
				<div class="flex flex-col">
					<p class="body-bold">
						{{ loggedUser.name }}
					</p>
					<p class="small-regular text-light-3">@{{ loggedUser.username }}</p>
				</div>
			</RouterLink>
			<ul class="flex flex-col gap-6">
				<RouterLink
					v-for="(link, i) in sideBarLinks"
					:key="i"
					v-slot="{ href, navigate, isExactActive }"
					:to="link.route"
					custom
				>
					<li
						class="leftsidebar-link group"
						:class="isExactActive && 'bg-primary-500'"
					>
						<a
							:href="href"
							@click="navigate"
							class="flex items-center gap-4 p-4"
						>
							<img
								:src="generateLogoURL(link.imgURL, '../../')"
								:alt="link.label"
								class="group-hover:invert-white"
								:class="isExactActive && 'invert-white'"
							/>
							{{ link.label }}
						</a>
					</li>
				</RouterLink>
			</ul>
		</div>
		<Button variant="ghost" class="shad-button_ghost" @click="signOut">
			<img src="@/assets/icons/logout.svg" alt="logout" />
			<p class="small-medium lg:base-medium">Logout</p>
		</Button>
	</nav>
</template>
