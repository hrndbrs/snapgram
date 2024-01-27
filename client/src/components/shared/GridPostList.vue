<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/store";
import { PostStats } from ".";
import { TPost } from "@/lib/types";

const { loggedUser } = useAuthStore();
const { posts, showUser, showStats } = withDefaults(
	defineProps<{
		posts: TPost[];
		showUser?: boolean;
		showStats?: boolean;
		isProfile?: boolean;
	}>(),
	{
		showUser: true,
		showStats: true,
		isProfile: false,
	}
);
</script>

<template>
	<ul class="grid-container">
		<li v-for="post in posts" :key="post.id" class="relative min-w-80 h-80">
			<RouterLink :to="`/posts/${post.id}`" class="grid-post_link">
				<img
					:src="post.imageUrl"
					alt="post"
					class="h-full w-full object-cover"
				/>
			</RouterLink>
			<div class="grid-post_user">
				<div
					v-if="showUser"
					class="flex items-center justify-start gap-2 flex-1"
				>
					<img
						:src="post.createdBy?.imageUrl"
						alt="creator"
						class="w-8 h-8 rounded-full"
					/>
					<p class="line-clamp-1">{{ post.createdBy?.name }}</p>
				</div>
				<PostStats v-if="showStats" :post="post" :userId="loggedUser.id" />
			</div>
		</li>
	</ul>
</template>
