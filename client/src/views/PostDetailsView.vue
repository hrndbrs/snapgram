<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import { useAuthStore } from "@/store";
import { useGetPostBydId } from "@/lib/ts-query/queriesAndMutation";
import { Button } from "@/components/ui/button";
import { Loader, PostStats } from "@/components/shared";
import { formatDate, separateTags } from "@/lib/helpers";

const { loggedUser: user } = useAuthStore();
const { id } = useRoute().params;
const { data: post, isPending } = useGetPostBydId(id as string);
const modBtnSize = 24;

function handleDeletePost() {}
</script>

<template>
	<div class="post_details-container">
		<Loader v-if="isPending" />
		<div v-else class="post_details-card">
			<img :src="post?.imageUrl" alt="post" class="post_details-img" />
			<div class="post_details-info">
				<div class="flex-between w-full">
					<RouterLink
						:to="`/users/${post?.creatorId}`"
						class="flex items-center gap-3"
					>
						<img
							:src="post?.createdBy?.imageUrl"
							:alt="`@${post?.createdBy?.username}`"
							class="rounded-full w-8 h-8 lg:w-12 lg:h-12 object-cover"
						/>
						<div class="flex flex-col">
							<p class="base-medium lg:body-bold text-light-1">
								{{ post?.createdBy?.name }}
							</p>
							<div class="flex-center gap-2 text-light-3">
								<p class="subtle-semibold lg:small-regular">
									{{ formatDate(post?.createdAt) }}
								</p>
								-
								<p class="subtle-semibold lg:small-regular">
									{{ post?.location }}
								</p>
							</div>
						</div>
					</RouterLink>
					<div class="flex-center">
						<RouterLink
							:to="`/post/${id}/update`"
							:class="user.id !== post?.creatorId && 'hidden'"
						>
							<img
								src="@/assets/icons/edit.svg"
								alt="edit"
								:width="modBtnSize"
								:height="modBtnSize"
							/>
						</RouterLink>
						<Button
							type="button"
							class="ghost_details-delete_btn"
							:class="user.id !== post?.creatorId && 'hidden'"
							variant="ghost"
							@click="handleDeletePost"
						>
							<img
								src="@/assets/icons/delete.svg"
								:width="modBtnSize"
								:height="modBtnSize"
								alt="delete"
							/>
						</Button>
					</div>
				</div>
				<hr class="border w-full border-dark-4/80" />
				<div class="flex flex-col flex-1 w-full small-medium lg:base-regular">
					<p>{{ post?.caption }}</p>
					<ul>
						<li v-for="(tag, i) in separateTags(post?.tags)" :key="i">
							#{{ tag }}
						</li>
					</ul>
				</div>
				<div class="w-full">
					<PostStats :post="post!" :userId="user.id" />
				</div>
			</div>
		</div>
	</div>
</template>
