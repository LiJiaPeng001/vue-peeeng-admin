<template>
  <a-drawer
    :visible="!settingStore.collapsed"
    :body-style="{ padding: 0, width: settingStore.menuW + 'px' }"
    title=""
    :closable="false"
    placement="left"
    :width="settingStore.menuW"
    @close="close"
  >
    <slot></slot>
  </a-drawer>
</template>

<script lang="ts" setup>
let settingStore = useSettingStore();

function close() {
  settingStore.collapsed = true;
}
</script>
