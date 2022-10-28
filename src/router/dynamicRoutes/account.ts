import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/account",
    name: "Account",
    meta: {
      title: "用户管理",
      icon: "UserOutlined",
    },
    redirect: "/account/list",
    children: [
      {
        path: "/account/join",
        name: "AccountJoin",
        meta: {
          title: "参与统计",
        },
        component: () => import("~/pages/account/join/index.vue"),
      },
    ],
  },
];

export default routes;
