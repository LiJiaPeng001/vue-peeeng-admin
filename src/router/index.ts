import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import NProgress from "nprogress";
import constantRoutes from "./constantRoutes/index";
import dynamicRoutes from "./dynamicRoutes/index";

// import "nprogress/nprogress.css";

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
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // NProgress.start();
  let user = useUserStore();
  if (!user.isLogin && to.path !== "/login") return next("/login");
  if (user.isLogin && to.path == "/login") return next("/");
  next();
});

router.afterEach(route => {
  document.title = import.meta.env.title || route.meta.title || "后台管理";
  // NProgress.done();
});

export default router;
