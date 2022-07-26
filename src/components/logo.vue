<template>
  <img class="logo" :src="logo" />
</template>

<script lang="ts" setup>
let { logo } = useLocalImage();
</script>

<style lang="less" scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>
