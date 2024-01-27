<script setup lang="ts">
const { value, label } = defineProps<{
	value: string | number;
	label: string;
}>();
</script>

<template>
	<div class="flex-center gap-2">
		<p class="small-semibold lg:body-bold text-primary-500">{{ value }}</p>
		<p class="small-medium lg:base-medium text-light-2">{{ label }}</p>
	</div>
</template>
