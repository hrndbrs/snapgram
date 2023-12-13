<script setup lang="ts">
import { useForm } from "vee-validate";
import { PostValidation } from "@/lib/validation";
import { useCreatePost } from "@/lib/ts-query/queriesAndMutation";
import { TPost } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/shared";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "vue-router";
import axios, { AxiosError } from "axios";

const router = useRouter();
const { toast } = useToast();
const { post } = defineProps<{ post?: TPost }>();
const { mutateAsync: createPost } = useCreatePost();

const { handleSubmit, resetForm } = useForm({
	validationSchema: PostValidation,
});

const onSubmit = handleSubmit(async (payload) => {
	try {
		const { caption, file, location, tags } = payload;
		const image = new FormData();
		image.append("file", file);

		const { data }: { data: { secure_url: string; public_id: string } } =
			await axios.post(
				`https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUDINARY_NAME
				}/upload`,
				image,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					params: {
						upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
					},
				}
			);

		// console.log(data, 51);

		const imageUrl = data.secure_url;
		const imageId = data.public_id;

		const newPost = {
			caption,
			location,
			tags,
			imageUrl,
			imageId,
		};

		await createPost(newPost);
		resetForm();
		router.push({ name: "home" });
	} catch (err) {
		if (err instanceof AxiosError)
			toast({
				title: "Failed creating new post",
				description: err.response?.data as string,
			});
	}
});
</script>
<template>
	<form @submit="onSubmit" class="flex flex-col gap-9 w-full max-w-5xl">
		<FormField v-slot="{ componentField }" name="caption">
			<FormItem>
				<FormLabel class="shad-form_label">Caption</FormLabel>
				<FormControl>
					<Textarea
						class="shad-textarea custom-scrollbar"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage class="shad-form_message" />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="file">
			<FormItem>
				<FormLabel class="shad-form_label">Add Photos</FormLabel>
				<FormControl>
					<FileUploader
						:fieldChange="componentField.onChange"
						:mediaUrl="post?.imageUrl"
					/>
				</FormControl>
				<FormMessage class="shad-form_message" />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="location">
			<FormItem>
				<FormLabel class="shad-form_label">Add Location</FormLabel>
				<FormControl>
					<Input type="text" class="shad-input" v-bind="componentField" />
				</FormControl>
				<FormMessage class="shad-form_message" />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="tags">
			<FormItem>
				<FormLabel class="shad-form_label"
					>Add Tags (separated by comma " , ")</FormLabel
				>
				<FormControl>
					<Input
						type="text"
						class="shad-input"
						v-bind="componentField"
						placeholder="Movies, Sports, Education"
					/>
				</FormControl>
				<FormMessage class="shad-form_message" />
			</FormItem>
		</FormField>
		<div class="flex gap-4 items-center justify-end">
			<Button type="button" class="shad-button_dark_4">Cancel</Button>
			<Button type="submit" class="whitespace-nowrap shad-button_primary">
				Submit
			</Button>
		</div>
	</form>
</template>
