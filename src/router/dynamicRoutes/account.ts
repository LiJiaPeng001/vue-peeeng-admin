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
        path: "/account/user",
        name: "AccountUser",
        meta: {
          title: "用户列表",
        },
        component: () => import("~/pages/account/user/index.vue"),
      },
      {
        path: "/account/user/detail",
        name: "AccountUserDetail",
        meta: {
          title: "用户详情",
          hidden: true,
        },
        component: () => import("~/pages/account/user/detail/index.vue"),
      },
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
