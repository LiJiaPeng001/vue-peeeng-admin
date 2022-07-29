import { RouteRecordRaw } from "vue-router";

const files = import.meta.globEager("./*.ts");

let childrenRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      title: "Dashboard",
      icon: "HomeOutlined",
    },
    component: () => import("~/layouts/page-layout.vue"),
    redirect: "/dashboard/work",
    children: [
      {
        path: "/dashboard/work",
        name: "DashboardWork",
        meta: {
          title: "Dashboard",
        },
        component: () => import("~/pages/dashboard/index.vue"),
      },
      {
        path: "/dashboard/work/detail",
        name: "DashboardWorkDetail",
        meta: {
          title: "详情页面wuhu",
          hidden: true,
        },
        component: () => import("~/pages/dashboard/detail.vue"),
      },
    ],
  },
];

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
    name: "Index",
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
