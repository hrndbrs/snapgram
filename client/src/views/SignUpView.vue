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
import { Loader } from "@/components/shared";

import { SignUpValidationSchema } from "@/lib/validation";
import {
	useCreateUserAccount,
	useSignInAccount,
} from "@/lib/ts-query/queriesAndMutation";

const { mutateAsync: createUserAccount, isPending } = useCreateUserAccount();
const { mutateAsync: signInUser } = useSignInAccount();
const router = useRouter();
const { toast } = useToast();
const { handleSubmit, resetForm } = useForm({
	validationSchema: SignUpValidationSchema,
});

const onSubmit = handleSubmit(async (payload) => {
	try {
		const newUser = await createUserAccount(payload);
		await signInUser(newUser);
		router.push({ name: "home" });
		resetForm();
	} catch (err) {
		if (err instanceof AxiosError) {
			toast({
				title: "Sign up failed",
				description: err.response?.data as string,
			});
		}
	}
});
</script>

<template>
	<div class="sm:w-420 flex-center flex-col">
		<img src="@/assets/images/logo.svg" alt="logo" />
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
				<div v-if="isPending" class="flex-center gap-2">
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
