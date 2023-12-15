<script setup lang="ts">
import { PostForm } from "@/components/forms";

const logoSize = 36;
</script>

<template>
	<div class="flex flex-1">
		<div class="common-container">
			<div class="max-w-5xl flex-start gap-3 justify-start w-full">
				<img
					src="@/assets/icons/add-post.svg"
					alt="add"
					:width="logoSize"
					:height="logoSize"
				/>
				<h2 class="h3-bold md:h2-bold text-left w-full">Create Post</h2>
			</div>
			<PostForm action="add" />
		</div>
	</div>
</template>
