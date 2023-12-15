<script setup lang="ts">
import { useRoute } from "vue-router";
import { useGetPostBydId } from "@/lib/ts-query/queriesAndMutation";
import { PostForm } from "@/components/forms";
import { Loader } from "@/components/shared";

const { id } = useRoute().params;
const { data: post, isPending } = useGetPostBydId(id as string);
const logoSize = 36;
</script>

<template>
	<Loader v-if="isPending" />
	<div v-else class="flex flex-1">
		<div class="common-container">
			<div class="max-w-5xl flex-start gap-3 justify-start w-full">
				<img
					src="@/assets/icons/add-post.svg"
					alt="add"
					:width="logoSize"
					:height="logoSize"
				/>
				<h2 class="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
			</div>
			<PostForm :post="post" action="update" />
		</div>
	</div>
</template>
