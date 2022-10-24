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
        path: "/work/list",
        name: "WorkList",
        meta: {
          title: "作品列表",
        },
        component: () => import("~/pages/work/index.vue"),
      },
      {
        path: "/work/detail",
        name: "WorkDetail",
        meta: {
          title: "作品详情",
          hidden: true,
        },
        component: () => import("~/pages/work/detail/index.vue"),
      },
      {
        path: "/work/prize",
        name: "WorkPrize",
        meta: {
          title: "奖项清单",
        },
        component: () => import("~/pages/work/prize/index.vue"),
      },
      {
        path: "/work/comment",
        name: "WorkComment",
        meta: {
          title: "作品评论",
        },
        component: () => import("~/pages/work/comment/index.vue"),
      },
    ],
  },
];

export default routes;
