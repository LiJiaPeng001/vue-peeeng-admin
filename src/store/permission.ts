import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import constantRoutes from "~/router/constantRoutes/index";
import dynamicRoutes from "~/router/dynamicRoutes/index";

export const usePermissionStore = defineStore("permission", () => {
  let routes = ref<RouteRecordRaw[]>([...constantRoutes, ...dynamicRoutes]);
  let currentRoutes = computed(() => routes.value.find(item => item.path === "/")?.children || []);

  return {
    routes,
    currentRoutes,
  };
});
