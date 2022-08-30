<template>
  <img
    v-if="src"
    :class="`${type || 'cover'} my-image`"
    :src="src"
    :style="{ width: width + 'px', height: height + 'px' }"
    alt=""
    @click="photoSwiper({ dataSource: [{ src }] })"
  />
</template>

<script lang="ts" setup>
defineProps<{
  src: string;
  width?: number;
  height?: number;
  type?: string;
}>();

let photoSwiper = usePhotoSwiper();
</script>

<style lang="less" scoped>
.my-image {
  border-radius: 4px;
  display: block;
  width: 120px;
  height: 120px;
}
</style>
