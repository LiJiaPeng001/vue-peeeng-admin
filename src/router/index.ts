import { createRouter, createWebHashHistory } from "vue-router";
import constantRoutes from './constantRoutes/index'
import dynamicRoutes from './dynamicRoutes/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...constantRoutes,
    ...dynamicRoutes
  ]
});

router.beforeEach((to, from, next) => {
  next()
})

export default router;
