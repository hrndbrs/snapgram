<script setup lang="ts">
import {
	ref,
	// computed
} from "vue";
// import { SearchResults, GridPostList } from "@/components/shared";
import { Input } from "@/components/ui/input";

const searchInput = ref("");
// const showSearchResults = computed<boolean>(() => {
// 	return searchInput.value !== "";
// });
// const showPosts = computed<boolean>(() => {
// 	return (
// 		!showSearchResults &&
// 		posts.pages.every((item: any) => item.documents.length === 0)
// 	);
// });
const iconSize = 24;
</script>

<template>
	{{ searchInput }}
	<div class="explore-container">
		<div class="explore-inner_container">
			<h2 class="h3-bold md:h2-bold w-full">Search Posts</h2>
			<div class="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
				<img
					src="@/assets/icons/search.svg"
					:width="iconSize"
					:height="iconSize"
					alt="search"
				/>
				<Input
					type="text"
					placeholder="Search"
					class="explore-search"
					v-model="searchInput"
				/>
			</div>
		</div>
		<div class="flex-between w-full max-w-5xl mt-16 mb-7">
			<h3 class="body-bold md:h3-bold">Popular Today</h3>
			<div
				class="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer"
			>
				<p class="small-medium md:base-medium text-light-2">All</p>
				<img
					src="@/assets/icons/filter.svg"
					alt="filter"
					:width="(5 / 6) * iconSize"
					:height="(5 / 6) * iconSize"
				/>
			</div>
		</div>
		<!-- <div class="flex flex-wrap gap-9 w-full max-w-5xl">
			<SearchResults v-if="showSearchResults" />
			<p v-else-if="showPosts" class="text-light-4 mt-10 text-center w-full">
				End of posts
			</p>
			<GridPostList
				v-for="(posts, i) in posts.pages"
				v-else
				:key="`page-${i}`"
				:posts="posts"
			/>
		</div> -->
	</div>
</template>
