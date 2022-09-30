import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: () => import("~/pages/login/index.vue"),
  },
];

export default routes;
