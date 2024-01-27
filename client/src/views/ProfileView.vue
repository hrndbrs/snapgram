<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/store";
import { useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { StatBlock, Loader } from "@/components/shared";
import { useGetUserByUsername } from "../lib/ts-query/queriesAndMutation";

const route = useRoute();
const { loggedUser } = useAuthStore();
const { username } = route.params;
const { data: user } = useGetUserByUsername(username as string);
</script>

<template>
	<div v-if="!user" class="flex-center w-full h-full">
		<Loader />
	</div>
	<div v-else class="profile-container">
		<div class="profile-inner_container">
			<div class="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
				<img
					:src="user.imageUrl"
					alt="profile"
					class="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
				/>
				<div class="flex flex-col flex-1 justify-between md:mt-2">
					<div class="flex flex-col w-full">
						<h1 class="text-center xl:text-left h3-bold md:h1-semibold w-full">
							{{ user.name }}
						</h1>
						<p
							class="small-regular md:body-medium text-light-3 text-center xl:text-left"
						>
							@{{ user.username }}
						</p>
					</div>
					<div
						class="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20"
					>
						<template v-if="user">
							<StatBlock :value="user.posted!.length" label="Posts" />
							<StatBlock :value="20" label="Followers" />
							<StatBlock :value="20" label="Following" />
						</template>
					</div>
					<p
						class="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm"
					>
						{{ user.bio }}
					</p>
				</div>
				<div class="flex justify-center gap-4">
					<div :class="`${user.id !== loggedUser.id && 'hidden'}`">
						<RouterLink
							:to="`/users/${loggedUser.id}/update-profile`"
							:class="`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
								user.id !== loggedUser.username && 'hidden'
							}`"
						>
							<img
								src="../assets/icons/edit.svg"
								alt="edit"
								width="20"
								height="20"
							/>
							<p class="flex whitespace-nowrap small-medium">Edit Profile</p>
						</RouterLink>
					</div>
					<div :class="`${user.id === loggedUser.id && 'hidden'}`">
						<Button type="button" class="shad-button_primary px-8">
							Follow
						</Button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="user.id === loggedUser.id" class="flex max-w-5xl w-full">
			<RouterLink
				:to="`/users/${user.username}`"
				class="profile-tab rounded-l-lg"
				:class="`${route.fullPath === `/users/${username}` && '!bg-dark-3'}`"
			>
				<img
					src="../assets/icons/posts.svg"
					alt="posts"
					width="20"
					height="20"
				/>
				Posts
			</RouterLink>
			<RouterLink
				:to="`/users/${username}/likes`"
				class="profile-tab rounded-r-lg"
				:class="`${
					route.fullPath === `/users/${username}/likes` && '!bg-dark-3'
				}`"
			>
				<img src="../assets/icons/like.svg" alt="like" width="20" height="20" />
				Liked Posts
			</RouterLink>
		</div>
		<RouterView :posts="user.posted!" />
	</div>
</template>
