import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from 'nprogress'
import constantRoutes from './constantRoutes/index'
import dynamicRoutes from './dynamicRoutes/index'

import "nprogress/nprogress.css"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...constantRoutes,
    ...dynamicRoutes
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
