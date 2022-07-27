import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/iu",
    name: "iu",
    meta: {
      title: "IUIU",
      icon: "SettingOutlined"
    },
    redirect: '/test/test1',
    component: () => import("~/layouts/page-layout.vue"),
    children: [
      {
        path: "/iu/iu1",
        name: "IuIu1",
        meta: {
          title: "IU一号",
        },
        component: () => import("~/pages/test/index.vue")
      },
      {
        path: "/iu/deng",
        name: "IuDeng",
        meta: {
          title: "邓紫棋",
          icon: "SettingOutlined"
        },
        component: () => import("~/pages/test1.vue"),
        children: [
          {
            path: "/iu/deng/deng1",
            name: "IuDengDeng1",
            meta: {
              title: "邓紫棋一号",
            },
            component: () => import("~/pages/test1.vue")
          }
        ]
      }
    ]
  },
]

export default routes