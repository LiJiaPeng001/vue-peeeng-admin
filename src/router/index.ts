import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import constantRoutes from "./constantRoutes/index";
import dynamicRoutes from "./dynamicRoutes/index";

import "nprogress/nprogress.css";
import user from "~/store/user";

function flattenRoute(routes: RouteRecordRaw[]) {
  return routes.reduce((all, item) => {
    if (item.children) all.push(...flattenRoute(item.children));
    else all.push(item);
    return all;
  }, [] as RouteRecordRaw[]);
}

function changeChildRoutes(routes: RouteRecordRaw[]) {
  let deepRoutes = [...routes];
  let currentRoute = deepRoutes.find(item => item.path === "/") as RouteRecordRaw;
  let indexRoutes = currentRoute?.children as RouteRecordRaw[];
  let current = deepRoutes.findIndex(item => item.path === "/");
  deepRoutes.splice(current, 1, { ...currentRoute, children: flattenRoute(indexRoutes) });
  return deepRoutes;
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...changeChildRoutes(dynamicRoutes)],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let userStore = user();
  if (!userStore.isLogin && to.path !== "/login") return next("/login");
  if (userStore.isLogin && to.path == "/login") return next("/");
  next();
});

router.afterEach(route => {
  let title = import.meta.env.title || route.meta.title;
  document.title = title;
  NProgress.done();
});

export default router;
