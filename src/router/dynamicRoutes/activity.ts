import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/activity",
    name: "Activity",
    meta: {
      title: "活动管理",
      icon: "CreditCardOutlined",
    },
    redirect: "/ptk/list",
    component: () => import("~/pages/activity/index.vue"),
    children: [
      {
        path: "/activity/list",
        name: "ActivityList",
        meta: {
          title: "活动列表",
        },
        component: () => import("~/pages/activity/index.vue"),
      },
      {
        path: "/activity/detail",
        name: "ActivityDetail",
        meta: {
          title: "活动编辑",
          hidden: true,
        },
        component: () => import("~/pages/activity/detail/index.vue"),
      },
    ],
  },
];

export default routes;
