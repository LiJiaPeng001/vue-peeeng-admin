import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import constantRoutes from '~/router/constantRoutes/index'
import dynamicRoutes from '~/router/dynamicRoutes/index'

let routes: RouteRecordRaw[] = [...constantRoutes, ...dynamicRoutes]

export default defineStore('permission', {
  state() {
    return {
      routes,
      currentRoutes: routes.find((item) => item.path === '/')?.children || [],
    }
  },
})
