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
					const { loggedUser, getUser, setLoggedUser } = useAuthStore();

					if (!loggedUser.isLoggedIn) {
						const user = await getUser();
						setLoggedUser(user);
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
				{
					path: "explore",
					name: "explore",
					component: () => import("../views/ExploreView.vue"),
				},
				{
					path: "users",
					children: [
						{
							path: "",
							name: "users",
							component: () => import("../views/AllUsersView.vue"),
						},
						{
							path: ":userId/update-profile",
							component: {
								template: "update string",
							},
						},
						{
							path: ":username",
							component: () => import("../views/ProfileView.vue"),
							children: [
								{
									path: "",
									component: () =>
										import("../components/shared/ProfilePostDisplay.vue"),
								},
								{
									path: "likes",
									beforeEnter: (to, _from, next) => {
										const { username } = to.params;
										const { loggedUser } = useAuthStore();
										if (loggedUser.username === username) next();
										else next(`/users/${username}`);
									},
									component: () => import("../views/LikedPosts.vue"),
								},
							],
						},
					],
				},
				{
					path: "saved",
					name: "saved",
					component: () => import("../views/SavedPostsView.vue"),
				},
				{
					path: "posts",
					children: [
						{
							path: ":id",
							children: [
								{
									path: "",
									component: () => import("../views/PostDetailsView.vue"),
								},
								{
									path: "update",
									component: () => import("../views/UpdatePostView.vue"),
								},
							],
						},
						{
							path: "create",
							name: "create",
							component: () => import("../views/CreatePostView.vue"),
						},
					],
				},
			],
		},
		{
			path: "/",
			component: () => import("../layouts/AuthLayout.vue"),
			beforeEnter: async (_to, _from, next) => {
				try {
					const { loggedUser, getUser, setLoggedUser } = useAuthStore();
					const user = await getUser();
					setLoggedUser(user);

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
