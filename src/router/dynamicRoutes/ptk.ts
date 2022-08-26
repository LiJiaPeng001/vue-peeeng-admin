import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/ptk",
    name: "Ptk",
    meta: {
      title: "拍同款",
      icon: "CameraOutlined",
    },
    redirect: "/ptk/list",
    component: () => import("~/pages/ptk/index.vue"),
    children: [
      {
        path: "/ptk/list",
        name: "PtkList",
        meta: {
          title: "作品列表",
        },
        component: () => import("~/pages/ptk/index.vue"),
      },
    ],
  },
];

export default routes;
