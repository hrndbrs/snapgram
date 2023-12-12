<script setup lang="ts">
import { RouterLink } from "vue-router";
import { bottomBarLinks } from "@/constants";
import { generateLogoURL } from "@/lib/helpers";

const size = 16;
</script>

<template>
	<section class="bottom-bar gap-4">
		<RouterLink
			v-for="(link, i) in bottomBarLinks"
			:key="i"
			v-slot="{ href, navigate, isExactActive }"
			:to="link.route"
			custom
		>
			<a
				:href="href"
				@click="navigate"
				class="flex-center flex-col gap-1 p-2 transition flex-1"
				:class="isExactActive && 'bg-primary-500 rounded-[10px]'"
			>
				<img
					:src="generateLogoURL(link.imgURL, '../../')"
					:alt="link.label"
					:width="size"
					:height="size"
					:class="isExactActive && 'invert-white'"
				/>
				<p class="tiny-medium text-light-2">
					{{ link.label }}
				</p>
			</a>
		</RouterLink>
	</section>
</template>
