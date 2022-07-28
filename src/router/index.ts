import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import constantRoutes from "./constantRoutes/index";
import dynamicRoutes from "./dynamicRoutes/index";

import "nprogress/nprogress.css";
import user from "~/store/user";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...dynamicRoutes],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let userStore = user();
  if (!userStore.isLogin && to.path !== "/login") next("/login");
  next();
});

router.afterEach(route => {
  let title = import.meta.env.title || route.meta.title;
  document.title = title;
  NProgress.done();
});

export default router;
