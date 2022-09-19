<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-slide" mode="out-in">
      <keep-alive :include="cacheTabs">
        <component :is="Component" v-if="route.path !== settingStore.refreshPath"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import setting from "~/store/setting";

let route = useRoute();
let settingStore = setting();
let cacheTabs = computed(() => {
  return settingStore.cacheTabs.filter(item => item.path != settingStore.refreshPath).map(item => item.name as string);
});
</script>
