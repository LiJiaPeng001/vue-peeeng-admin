<template>
  <img
    v-if="url"
    :class="`${type || 'cover'} my-image`"
    :src="url"
    :style="{ width: width + 'px', height: height + 'px' }"
    alt=""
    @click="photoSwiper({ dataSource: [{ url }] })"
  />
</template>

<script lang="ts" setup>
defineProps<{
  url: string;
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
