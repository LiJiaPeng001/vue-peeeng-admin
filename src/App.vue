<template>
  <a-config-provider :locale="local">
    <router-view> </router-view>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";

console.log(isDark.value);
let local = ref(zhCN);
</script>
