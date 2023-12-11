<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<section class="flex flex-1 justify-center items-center flex-col py-10">
		<RouterView />
	</section>
	<img
		src="../assets/images/side-img.svg"
		alt="logo"
		class="hidden xl:block h-screen w-1/2 bg-no-repeat object-cover"
	/>
</template>
