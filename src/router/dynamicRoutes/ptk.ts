import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/ptk",
    name: "ptk",
    meta: {
      title: "拍同款",
      icon: "CameraOutlined",
    },
    redirect: "/ptk/list",
    component: () => import("~/pages/ptk/index.vue"),
    children: [
      {
        path: "/ptk/list",
        name: "ptk-list",
        meta: {
          title: "作品列表",
        },
        component: () => import("~/pages/ptk/index.vue"),
      },
      {
        path: "/ptk/detail",
        name: "ptk-detail",
        meta: {
          title: "作品编辑",
          hidden: true,
        },
        component: () => import("~/pages/ptk/detail/index.vue"),
      },
      {
        path: "/ptk/type",
        name: "ptk-type",
        meta: {
          title: "热门分类",
        },
        component: () => import("~/pages/ptk/type/index.vue"),
      },
      {
        path: "/ptk/type/detail",
        name: "ptk-type-detail",
        meta: {
          title: "分类编辑",
          hidden: true,
        },
        component: () => import("~/pages/ptk/type/detail/index.vue"),
      },
      {
        path: "/ptk/tagGather",
        name: "ptk-tag-gather",
        meta: {
          title: "标签集合",
        },
        component: () => import("~/pages/ptk/tagGather/index.vue"),
      },
      {
        path: "/ptk/hotword",
        name: "ptk-hotword",
        meta: {
          title: "搜索热词",
        },
        component: () => import("~/pages/ptk/hotword/index.vue"),
      },
    ],
  },
];

export default routes;
