<template>
  <img v-if="url" :class="`${type || 'cover'} my-image`" :src="url" :style="{ width: width + 'px', height: height + 'px' }" alt="" @click="openSwiper" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  url?: string;
  width?: number;
  height?: number;
  type?: string;
  images?: string[];
}>();

let url = computed(() => {
  return props.images ? props.images[0] : props.url;
});

let photoSwiper = usePhotoSwiper();

let openSwiper = () => {
  let images = [];
  if (props.images) {
    images = props.images.map(item => ({ url: item }));
  } else {
    images = [{ url: props.url }];
  }
  photoSwiper({
    dataSource: images,
  });
};
</script>

<style lang="less" scoped>
.my-image {
  border-radius: 4px;
  display: block;
  width: 120px;
  height: 120px;
}
</style>
