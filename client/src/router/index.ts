import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "../store/auth.ts";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/RootLayout.vue"),
			beforeEnter: (_to, _from, next) => {
				const userStore = useAuthStore();
				if (!userStore.isAuthenticated) next({ name: "signup" });
				else next();
			},

			children: [
				{
					path: "/",
					name: "Home",
					component: () => import("../views/HomeView.vue"),
				},
			],
		},
		{
			path: "/",
			component: () => import("../layouts/AuthLayout.vue"),
			beforeEnter: (_to, _from, next) => {
				const userStore = useAuthStore();
				if (userStore.isAuthenticated) next({ name: "home" });
				else next();
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
