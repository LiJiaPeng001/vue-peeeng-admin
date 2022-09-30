import { RouteRecordRaw } from "vue-router";

const files = import.meta.globEager("./*.ts");
const mode = import.meta.env.MODE;

let childrenRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "工作台",
      icon: "HomeOutlined",
    },
    component: () => import("~/pages/dashboard/index.vue"),
  },
];

if (mode === "development") {
  childrenRoutes.push({
    path: "/test",
    name: "test",
    meta: {
      title: "Debugger",
      icon: "BugOutlined",
    },
    component: () => import("~/pages/test/index.vue"),
  });
}

for (const key in files) {
  const route = files[key].default;
  if (Array.isArray(route)) {
    childrenRoutes = [...childrenRoutes, ...route];
  } else {
    childrenRoutes.push(route);
  }
}

let routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/dashboard",
    component: () => import("~/layouts/base-layout.vue"),
    children: childrenRoutes as RouteRecordRaw[],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "dashboard" },
  },
];

export default routes;
