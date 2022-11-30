<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-slide" mode="out-in">
      <keep-alive :include="cacheTabs">
        <component :is="Component" v-if="route.name !== settingStore.refreshName"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
let route = useRoute();
let settingStore = useSettingStore();
let cacheTabs = computed(() => {
  return settingStore.getCacheTabs.filter(item => item.name != settingStore.refreshName).map(item => item.name as string);
});
</script>
