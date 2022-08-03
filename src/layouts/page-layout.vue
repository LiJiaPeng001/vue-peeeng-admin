<template>
  <div class="page-layout">
    <route-tabs></route-tabs>
    <div class="route-page">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" v-if="route.path !== settingStore.refreshPath" :key="route.name"></component>
        </transition>
      </router-view>
      <transition name="fade-slide" mode="out-in">
        <slot v-if="route.path !== settingStore.refreshPath" :key="route.name"></slot>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import setting from "~/store/setting";
import RouteTabs from "./components/route-tabs.vue";

let route = useRoute();
let settingStore = setting();
// let keepRoutes = computed(() => {
//   let cacheTabs = settingStore.cacheTabs.filter(item => item.path !== settingStore.refreshPath);
//   return cacheTabs.map(item => item.name) as [];
// });
</script>

<style lang="less" scoped>
.page-layout {
  padding: 10px 12px;
  .route-page {
    background-color: white;
    border-radius: 2px;
    padding: 6px;
  }
}
</style>
