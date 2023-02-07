<template>
  <div class="container">
    <keep-alive>
      <Child></Child>
    </keep-alive>
  </div>
</template>

<script lang="ts" setup>
import Child from "./child.vue";
</script>

<style lang="less" scoped></style>
