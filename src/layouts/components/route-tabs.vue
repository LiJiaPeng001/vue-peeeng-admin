<template>
  <a-tabs
    :activeKey="activeKey"
    size="small"
    :tabBarStyle="{
      borderRadius: '10px',
    }"
    :hideAdd="true"
    :tabBarGutter="3"
    type="editable-card"
    @tabClick="go"
  >
    <a-tab-pane
      v-for="(pane, i) in settingStore.cacheTabs"
      :key="pane.path"
      :tab="pane.meta?.title"
      :closable="i ? true : false"
    >
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import permission from "~/store/permission";
import setting from "~/store/setting";
import { getRouteItem } from "~/composables/useGo";

let settingStore = setting();
let { cacheTabs = [] } = settingStore;

let permissionStore = permission();
let { currentRoutes = [] } = permissionStore;

let route = useRoute();
let go = useGo();

let dashboard = getRouteItem(currentRoutes, "/dashboard/work");
let currentRoute = [] as RouteRecordRaw[];

if (route.path !== "/dashboard/work") {
  let r = getRouteItem(currentRoutes, route.path);
  r.path = route.fullPath;
  currentRoute = [r];
}
settingStore.setCacheTabs([dashboard, ...currentRoute, ...cacheTabs]);

let activeKey = computed(() => {
  let path = route.fullPath;
  return path.split("?")[0];
});
</script>
