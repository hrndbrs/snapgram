<script lang="ts" setup>
import { Loader, GridPostList } from "@/components/shared";
import { useGetCurrentUser } from "../lib/ts-query/queriesAndMutation";

const { data: currentUser } = useGetCurrentUser();
</script>

<template>
	<div v-if="!currentUser" class="flex-center w-full h-full">
		<Loader />
	</div>
	<template v-else>
		<p v-if="currentUser.liked?.length === 0" class="text-light-4">
			No liked posts
		</p>
		<GridPostList v-else :posts="currentUser.liked!" :showStats="false" />
	</template>
</template>
