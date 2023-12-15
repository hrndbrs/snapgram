<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { useDropzone } from "vue3-dropzone";
import { FileWithPath } from "file-selector";

// const files = ref<FileWithPath[]>([]);

const { fieldChange, mediaUrl } = defineProps<{
	fieldChange: (files: FileWithPath) => void;
	mediaUrl?: string;
}>();

const fileUrl = ref(mediaUrl);
function onDrop(acceptedFiles: FileWithPath[]) {
	// files.value = acceptedFiles;
	fieldChange(acceptedFiles[0]);
	fileUrl.value = URL.createObjectURL(acceptedFiles[0]);
}

const { getRootProps, getInputProps } = useDropzone({
	onDrop,
	accept: ["image/png", "image/svg", "image/jpg", "image/jpeg"],
});
</script>
<template>
	<div
		class="flex flex-center flex-col bg-dark-3 rounded-xl cursor pointer"
		v-bind="getRootProps()"
	>
		<input class="cursor-pointer" v-bind="getInputProps()" />
		<div v-if="!fileUrl" class="file_uploader-box">
			<img
				src="@/assets/icons/file-upload.svg"
				alt="file-upload"
				width="96"
				height="77"
			/>
			<h3 class="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
			<p class="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
			<Button class="shad-button_dark_4">Select from computer</Button>
		</div>
		<template v-else>
			<div class="flex flex-1 justify-center w-full p-5 lg:p-10">
				<img :src="fileUrl" alt="post" class="file_uploader-img" />
			</div>
			<p class="file_uploader-label">Click or drag photo to replace</p>
		</template>
	</div>
</template>
