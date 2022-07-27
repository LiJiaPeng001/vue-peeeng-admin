<template>
  <a-tabs
    :active-key="activeKey"
    size="small"
    :tab-bar-style="{
      borderRadius: '10px',
    }"
    :hide-add="true"
    :tab-bar-gutter="3"
    type="editable-card"
    @tab-click="go"
  >
    <a-tab-pane v-for="(pane, i) in settingStore.cacheTabs" :key="pane.path" :tab="pane.meta?.title" :closable="i ? true : false"> </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import setting from "~/store/setting";

let settingStore = setting();
let route = useRoute();
let go = useGo();

let activeKey = computed(() => {
  let path = route.fullPath;
  return path.split("?")[0];
});
</script>
