<template>
  <div
    class="video-icon center-flex cover"
    :style="{ width: width + 'px', height: height + 'px', backgroundImage: `url(${poster})` }"
    @click.stop="hasClick ? emits('click') : (visible = true)"
  >
    <img :src="video" class="icon" @click.stop="!hasClick ? undefined : (visible = true)" />
  </div>
  <a-modal v-model:visible="visible" @ok="close">
    <video v-if="visible" :poster="poster" preload="auto" class="video-play" :src="url" controls></video>
  </a-modal>
</template>

<script lang="ts" setup>
defineProps<{
  url?: string;
  width?: number;
  height?: number;
  poster?: string;
  hasClick?: boolean;
}>();

const emits = defineEmits<{
  (v: "click"): void;
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
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #000;
  .icon {
    width: 30%;
    display: block;
  }
}
.video-play {
  max-width: 100%;
  border-radius: 10px;
  margin: 20px auto 0;
}
</style>
