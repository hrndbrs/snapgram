<script lang="ts" setup>
import { GridPostList } from "@/components/shared";
import { TPost } from "@/lib/types";

const { posts } = defineProps<{ posts: TPost[] }>();
</script>

<template>
	<p v-if="posts.length === 0" class="text-light-4">No posts to show</p>
	<GridPostList v-else :showUser="false" :posts="posts" />
</template>
