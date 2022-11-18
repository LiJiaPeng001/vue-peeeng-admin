<template>
  <div
    b-rounded-4
    center-flex
    cover
    w-full
    h-full
    cursor-pointer
    bg-hex-000
    :style="{ width: width + 'px', height: height + 'px', backgroundImage: `url(${poster})` }"
    @click.stop="hasClick ? emits('click') : (visible = true)"
  >
    <img class="w-30%" block :src="video" @click.stop="!hasClick ? undefined : (visible = true)" />
  </div>
  <a-modal v-model:visible="visible" @ok="close">
    <video v-if="visible" max-w-full b-rounded-10 class="m-[0-auto-20]" :poster="poster" preload="auto" :src="url" controls></video>
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
