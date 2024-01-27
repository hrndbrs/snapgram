<script setup lang="ts">
import Loader from "@/components/shared/Loader.vue";
import { useGetRecentPosts } from "@/lib/ts-query/queriesAndMutation";
import { PostCard } from "@/components/shared";

const { data: posts, isPending, isError } = useGetRecentPosts();
</script>

<template>
	<div class="flex flex-1">
		<div class="home-container">
			<div class="home-posts">
				<h2 class="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
				<Loader v-if="isPending && !posts" />
				<ul v-else-if="!isError" class="flex flex-col flex-1 gap-9 w-full">
					<li v-for="post in posts" :key="post.id">
						<PostCard :post="post" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
