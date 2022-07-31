<template>
  <div class="base-layout flex">
    <slide-menu></slide-menu>
    <div class="right-layout flex1">
      <page-head />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import pageHead from "./page-head.vue";
import slideMenu from "./slide-menu.vue";
</script>

<style lang="less" scoped>
.base-layout {
  min-height: 100%;
  .right-layout {
    transition: width 0.2s linear;
  }
}
</style>
