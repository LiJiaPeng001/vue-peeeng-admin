<template>
  <div class="layout-slider">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.layout-slider {
  flex-shrink: 0;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 9;
  top: 0;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
</style>
