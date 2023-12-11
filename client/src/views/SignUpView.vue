<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader.vue";
import { SignUpValidationSchema } from "@/lib/validation";
import useAuthStore from "@/store/auth";

const isLoading = ref(false);
const router = useRouter();

const { createNewUser } = useAuthStore();
const { handleSubmit } = useForm({
	validationSchema: SignUpValidationSchema,
});

const onSubmit = handleSubmit(async (payload) => {
	isLoading.value = true;
	try {
		await createNewUser(payload);
		router.push({ name: "signin" });
	} catch (err) {
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<div class="sm:w-420 flex-center flex-col">
		<img src="../assets/images/logo.svg" alt="logo" />
		<h2 class="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
		<p class="text-light-3 small-medium md:base-regular mt-2">It's free!</p>
		<form @submit="onSubmit" class="flex flex-col gap-5 w-full mt-4">
			<FormField v-slot="{ componentField }" name="name">
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input type="text" class="shad-input" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="username">
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input type="text" class="shad-input" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="email">
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input type="email" class="shad-input" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="password">
				<FormItem>
					<FormLabel>Password</FormLabel>
					<FormControl>
						<Input type="password" class="shad-input" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<Button type="submit" class="shad-button_primary">
				<div v-if="isLoading" class="flex-center gap-2">
					<Loader /> Loading...
				</div>
				<template v-else>Sign up</template>
			</Button>
			<p class="text-small-regular text-light-2 text-center mt-2">
				Already have an account?
				<RouterLink
					class="text-primary-500 text-small-semibold ml-1"
					:to="{ name: 'signin' }"
				>
					Log in
				</RouterLink>
			</p>
		</form>
	</div>
</template>
