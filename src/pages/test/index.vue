<template>
  <div class="container">
    <upload-image v-model:images="images"></upload-image>
  </div>
</template>

<script lang="ts" setup>
let images = ref([
  { url: "https://ljpeng.fun/static/images/4f4536d9c49e729d394486dfe81b1998.jpeg" },
  { url: "https://ljpeng.fun/static/images/ab2877da7ab79cafbaf51008744b3348.jpeg" },
]);
</script>

<style lang="less" scoped>
div:has(span) {
  color: red;
}
</style>
