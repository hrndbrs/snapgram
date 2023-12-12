import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "@/router";
import "@/style.css";
import App from "@/App.vue";

createApp(App).use(VueQueryPlugin).use(createPinia()).use(router).mount("#app");
