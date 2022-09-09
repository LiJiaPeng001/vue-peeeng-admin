<template>
  <!-- {{ route.name }} -->
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade-slide" mode="out-in">
      <keep-alive v-if="route.path !== settingStore.refreshPath" :include="settingStore.cacheTabs.map(item => item.name as string)">
        <component :is="Component" :key="route.name"></component>
      </keep-alive>
    </transition>
  </router-view> -->
  <router-view></router-view>
</template>
<!-- 
<script lang="ts" setup>
import setting from "~/store/setting";

let settingStore = setting();
let route = useRoute();
</script> -->
