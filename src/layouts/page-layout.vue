<template>
  <div class="page-layout">
    <route-tabs></route-tabs>
    <div class="route-page">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <!-- <keep-alive :include="keepRoutes"> -->
          <component :is="Component" v-if="route.path !== settingStore.refreshPath" :key="route.name"></component>
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import setting from "~/store/setting";
import RouteTabs from "./components/route-tabs.vue";

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
