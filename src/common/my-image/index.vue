<template>
  <img v-if="url" :class="`${type || 'cover'}`" b-rounded-4 block w-120 h-120 :src="url" :style="{ width: width + 'px', height: height + 'px' }" alt="" @click="openSwiper" />
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
