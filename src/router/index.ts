import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from 'nprogress'
import constantRoutes from './constantRoutes/index'
import dynamicRoutes from './dynamicRoutes/index'

import "nprogress/nprogress.css"
import user from "~/store/user";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...constantRoutes,
    ...dynamicRoutes
  ]
});

router.beforeEach((to, from, next) => {
  let userStore = user()
  if (!userStore.isLogin) {
    next("/login")
    return
  }
  NProgress.start()
  next()
})

router.afterEach((route) => {
  NProgress.done()
  let title = import.meta.env.title || route.meta.title
  document.title = title
})

export default router;
