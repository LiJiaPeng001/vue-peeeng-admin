<template>
  <div class="container">
    <a-button @click="openSwiper">点击开启弹窗</a-button>
    <upload-image v-model:images="images" v-model:current="current" show-cover></upload-image>
  </div>
</template>

<script lang="ts" setup>
let images = ref([
  { src: "https://wuta-tmp.oss-cn-shanghai.aliyuncs.com/community_debug/works/20220830110145_97_187811.jpg?x-oss-process=style/lq" },
  { src: "https://wuta-tmp.oss-cn-shanghai.aliyuncs.com/community_debug/works/20220830110145_97_057591.jpg?x-oss-process=style/lq" },
]);

let photoSwiper = usePhotoSwiper();
let current = ref<number>(0);

function openSwiper() {
  photoSwiper({
    dataSource: images.value,
    index: 1,
  });
}
</script>

<script lang="ts">
export default defineComponent({
  name: "Test",
});
</script>
