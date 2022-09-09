<template>
  <div class="base-layout flex">
    <slide-menu></slide-menu>
    <div class="flex1">
      <page-head />
      <div class="page-layout">
        <route-tabs></route-tabs>
        <div class="route-page">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <keep-alive :include="settingStore.cacheTabs.map(item => item.name as string)">
                <component :is="Component" v-if="route.path !== settingStore.refreshPath" :key="route.name"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import setting from "~/store/setting";
import pageHead from "./page-head.vue";
import slideMenu from "./slide-menu.vue";
import RouteTabs from "./components/route-tabs.vue";

let route = useRoute();
let settingStore = setting();
</script>

<style lang="less" scoped>
.base-layout {
  min-height: 100%;
  .page-layout {
    padding: 10px 12px;
    .route-page {
      background-color: white;
      border-radius: 2px;
      padding: 6px;
    }
  }
}
</style>
