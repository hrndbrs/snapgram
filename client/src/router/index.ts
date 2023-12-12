import { createRouter, createWebHistory } from "vue-router";
import { AxiosError } from "axios";
import useAuthStore from "@/store/auth.ts";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/RootLayout.vue"),
			beforeEnter: async (_to, _from, next) => {
				try {
					const { loggedUser, getUser } = useAuthStore();

					if (!loggedUser.isLoggedIn) {
						await getUser();
					}
					next();
				} catch (err) {
					next({ name: "signin" });
				}
			},

			children: [
				{
					path: "/",
					name: "home",
					component: () => import("../views/HomeView.vue"),
				},
			],
		},
		{
			path: "/",
			component: () => import("../layouts/AuthLayout.vue"),
			beforeEnter: async (_to, _from, next) => {
				try {
					const { loggedUser, getUser } = useAuthStore();
					await getUser();

					if (loggedUser.isLoggedIn) throw new Error();

					next();
				} catch (err) {
					if (err instanceof AxiosError) next();
					else next({ name: "home" });
				}
			},
			children: [
				{
					path: "sign-in",
					name: "signin",
					component: () => import("../views/SignInView.vue"),
				},
				{
					path: "sign-up",
					name: "signup",
					component: () => import("../views/SignUpView.vue"),
				},
			],
		},
	],
});

export default router;
