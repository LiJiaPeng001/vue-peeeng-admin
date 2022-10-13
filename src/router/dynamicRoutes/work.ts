import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/work",
    name: "Work",
    meta: {
      title: "作品管理",
      icon: "FileImageOutlined",
    },
    redirect: "/work/list",
    component: () => import("~/pages/work/index.vue"),
    children: [
      {
        path: "/work/prize",
        name: "WorkPrize",
        meta: {
          title: "奖项清单",
        },
        component: () => import("~/pages/work/prize/index.vue"),
      },
    ],
  },
];

export default routes;
