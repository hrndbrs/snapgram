<script setup lang="ts">
import { RouterLink } from "vue-router";
import { TPost } from "@/lib/types";
import { formatDate, separateTags } from "@/lib/helpers";
import { useAuthStore } from "@/store";
import PostStats from "./PostStats.vue";

const { post } = defineProps<{ post: TPost }>();
const { loggedUser } = useAuthStore();
const editIconSize = 20;
</script>
<template>
	<div class="post-card">
		<div class="flex-between">
			<div class="flex item-center gap-3">
				<RouterLink :to="`/users/${post.creatorId}`">
					<img
						:src="post.createdBy?.imageUrl"
						:alt="`@${post.createdBy?.username}`"
						class="rounded-full w-12 h-12 object-cover"
					/>
				</RouterLink>
				<div class="flex flex-col">
					<p class="base-medium lg:body-bold text-light-1">
						{{ post.createdBy?.name }}
					</p>
					<div class="flex-center gap-2 text-light-3">
						<p class="subtle-semibold lg:small-regular">
							{{ formatDate(post.createdAt) }}
						</p>
						-
						<p class="subtle-semibold lg:small-regular">{{ post.location }}</p>
					</div>
				</div>
			</div>
			<RouterLink
				v-show="loggedUser.id === post.creatorId"
				:to="`/post/${post.id}/update`"
			>
				<img
					src="@/assets/icons/edit.svg"
					alt="edit"
					:width="editIconSize"
					:height="editIconSize"
				/>
			</RouterLink>
		</div>
		<RouterLink :to="`/post/${post.id}`">
			<div class="small-medium lg:base-medium py-5">
				<p>{{ post.caption }}</p>
				<ul>
					<li v-for="(tag, i) in separateTags(post.tags)" :key="i">
						#{{ tag }}
					</li>
				</ul>
			</div>
			<img :src="post.imageUrl" :alt="post.id" class="post-card_img" />
		</RouterLink>
		<PostStats :post="post" :userId="loggedUser.id" />
	</div>
</template>
