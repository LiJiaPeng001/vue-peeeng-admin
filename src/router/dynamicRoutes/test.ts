import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/iu",
    name: "iu",
    meta: {
      title: "IUIU",
      icon: "SettingOutlined",
    },
    redirect: "/test/test1",
    component: () => import("~/layouts/page-layout.vue"),
    children: [
      {
        path: "/iu/iu1",
        name: "IuIu1",
        meta: {
          title: "IU一号",
        },
        component: () => import("~/pages/test/index.vue"),
      },
    ],
  },
  {
    path: "/test2",
    name: "Test2",
    meta: {
      title: "测试二号",
      icon: "SettingOutlined",
    },
    component: () => import("~/pages/test2.vue"),
  },
];

export default routes;
