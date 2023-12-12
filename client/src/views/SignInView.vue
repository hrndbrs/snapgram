<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import Loader from "@/components/shared/Loader.vue";

import { SignInValidationSchema } from "@/lib/validation";
import { useSignInAccount } from "@/lib/ts-query/queriesAndMutation";

const { mutateAsync: signInUser, isPending } = useSignInAccount();
const router = useRouter();
const { toast } = useToast();
const { handleSubmit, resetForm } = useForm({
	validationSchema: SignInValidationSchema,
});

const onSubmit = handleSubmit(async (payload) => {
	try {
		await signInUser(payload);
		router.push({ name: "home" });
		resetForm();
	} catch (err) {
		if (err instanceof AxiosError) {
			toast({
				title: "Sign in failed",
				description: err.response?.data as string,
			});
		}
	}
});
</script>

<template>
	<div class="sm:w-420 flex-center flex-col">
		<img src="../assets/images/logo.svg" alt="logo" />
		<h2 class="h3-bold md:h2-bold pt-5 sm:pt-12">Login to your account</h2>
		<p class="text-light-3 small-medium md:base-regular mt-2">
			Welcome back! Enter your details to get started
		</p>
		<form @submit="onSubmit" class="flex flex-col gap-5 w-full mt-4">
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
				<div v-if="isPending" class="flex-center gap-2">
					<Loader /> Loading...
				</div>
				<template v-else>Sign in</template>
			</Button>
			<p class="text-small-regular text-light-2 text-center mt-2">
				Dont't have an account?
				<RouterLink
					class="text-primary-500 text-small-semibold ml-1"
					:to="{ name: 'signup' }"
				>
					Sign up
				</RouterLink>
			</p>
		</form>
	</div>
</template>
