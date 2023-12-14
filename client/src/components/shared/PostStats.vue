<script setup lang="ts">
import { TPostStatsProps } from "@/lib/types/post";
import { generateLogoURL } from "@/lib/helpers/index";
import {
	useLikePost,
	useSavePost,
	useGetPostStats,
	useRemoveLikedPost,
	useRemoveSavedPost,
} from "@/lib/ts-query/queriesAndMutation";

const { post, userId } = defineProps<TPostStatsProps>();

const { data: stats } = useGetPostStats(post.id);
const { mutateAsync: likePost } = useLikePost();
const { mutateAsync: savePost } = useSavePost();
const { mutateAsync: removeLikedPost } = useRemoveLikedPost();
const { mutateAsync: removeSavedPost } = useRemoveSavedPost();

const iconSize = 20;

function handleLikePost() {
	const liked = stats.value?.likes.find((like) => like.userId === userId);
	if (!liked) return likePost(post.id);
	return removeLikedPost(liked.id);
}
function handleSavePost() {
	const saved = stats.value?.saves.find((save) => save.userId === userId);
	if (!saved) return savePost(post.id);
	return removeSavedPost(saved.id);
}
</script>
<template>
	<div class="flex justify-between items-center z-20">
		<div class="flex gap-2 mr-5">
			<img
				:src="
					stats?.likes.find((like) => like.userId === userId)
						? generateLogoURL('@/assets/icons/liked.svg', '../../')
						: generateLogoURL('@/assets/icons/like.svg', '../../')
				"
				alt="heart"
				:width="iconSize"
				:height="iconSize"
				@click.stop="handleLikePost"
				class="cursor-pointer"
			/>
			<p class="small-medium lg:base-medium">{{ stats?.count }}</p>
		</div>
		<div class="flex gap-2">
			<img
				:src="
					stats?.saves.find((save) => save.userId === userId)
						? generateLogoURL('@/assets/icons/saved.svg', '../../')
						: generateLogoURL('@/assets/icons/save.svg', '../../')
				"
				alt="heart"
				:width="iconSize"
				:height="iconSize"
				@click.stop="handleSavePost"
				class="cursor-pointer"
			/>
		</div>
	</div>
</template>
