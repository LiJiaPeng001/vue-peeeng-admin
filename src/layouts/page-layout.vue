<template>
  <div class="page-layout">
    <route-tabs></route-tabs>
    <div class="route-page">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <keep-alive
            :include="settingStore.cacheTabs.map(item => item.name) as []"
          >
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import setting from "~/store/setting";
import RouteTabs from "./components/route-tabs.vue";

let settingStore = setting();
</script>

<style lang="less" scoped>
.page-layout {
  padding: 20px;
  .route-page {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }
}
</style>
