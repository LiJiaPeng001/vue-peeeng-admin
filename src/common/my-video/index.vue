<template>
  <div class="video-icon center-flex" :style="{ width: width + 'px', height: height + 'px' }" @click="visible = true">
    <img :src="video" class="icon" />
  </div>
  <a-modal v-model:visible="visible" @ok="close">
    <video v-if="visible" preload="auto" class="video-play" :src="url" controls autoplay></video>
  </a-modal>
</template>

<script lang="ts" setup>
defineProps<{
  url?: string;
  width?: number;
  height?: number;
}>();

const { video } = useLocalImage();
let visible = ref<boolean>(false);
let close = () => {
  visible.value = false;
};
</script>

<style lang="less" scoped>
.video-icon {
  border-radius: 4px;
  width: 120px;
  height: 120px;
  cursor: pointer;
  background-color: #000;
  .icon {
    width: 30%;
    height: 30%;
    display: block;
  }
}
.video-play {
  max-width: 100%;
  border-radius: 10px;
  margin: 20px auto 0;
}
</style>
