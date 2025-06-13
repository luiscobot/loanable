import "./assets/main.css";

import { FirstStep, SecondStep, ThirdStep } from "@/components/loan";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const routes = [
  { path: "/", redirect: "/loan/step-1" },
  { path: "/loan", redirect: "/loan/step-1" },
  { path: "/loan/step-1", component: FirstStep },
  { path: "/loan/step-2", component: SecondStep },
  { path: "/loan/step-3", component: ThirdStep },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
