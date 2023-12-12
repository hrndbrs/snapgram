<script setup lang="ts">
import { RouterView } from "vue-router";
import { TopBar, LeftSideBar, BottomBar } from "@/components/shared";
</script>

<template>
	<div class="w-full md:flex">
		<TopBar />
		<LeftSideBar />
		<section class="flex flex-1 h-full">
			<RouterView />
		</section>
		<BottomBar />
	</div>
</template>
