<template>
  <div class="value" middle-flex>
    <div
      v-for="(it, i) in value"
      :key="it.url"
      draggable="true"
      class="image cover"
      animation-fadeIn
      :style="{ backgroundImage: `url(${it.url})` }"
      @dragover.prevent
      @dragstart="dragstart($event, i)"
      @drop="onDrop($event, i)"
    >
      <!-- 是否封面 -->
      <div v-if="showCover && i === current" class="cover-text">封面</div>
      <!-- 是否视频 -->
      <div v-if="isVideo" class="video-mask center-flex">
        <img :src="video" alt="" class="icon" />
      </div>
      <!-- edit remove -->
      <div class="mask-action center-flex">
        <div class="icons center-flex">
          <EditOutlined @click="edit(i)" />
          <DeleteOutlined @click="remove(i)" />
          <EyeOutlined @click="preview(i)" />
        </div>
        <div v-if="showCover && i != current" class="set-cover" @click="changeCover(i)">设为封面</div>
      </div>
    </div>
    <!-- upload -->
    <div v-if="value.length < limit" class="image upload-item center-flex" @click="upload">
      <UploadOutlined></UploadOutlined>
      <p>上传（{{ value.length }}/{{ limit }}）</p>
    </div>
  </div>
  <a-badge style="margin-top: 6px" color="yellow" :text="`单文件限制${size}mb`" />
</template>

<script lang="ts" setup>
import { getFileUrl } from "~/utils/upload/index";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons-vue";

const props = withDefaults(
  defineProps<{
    value: { url: string }[];
    current?: number;
    showCover?: boolean;
    limit?: 1;
    accept?: string;
    size?: number;
  }>(),
  {
    size: 10,
    accept: "image/*",
    limit: 1,
    current: 0,
    showCover: false,
  }
);

const emits = defineEmits(["update:value", "cancel", "update:current"]);
const { video } = useLocalImage();
let startIndex = ref<number>(0);
let photoSwiper = usePhotoSwiper();
let isVideo = computed(() => {
  return props.accept.includes("video");
});

let dragstart = (e: DragEvent, index: number) => {
  startIndex.value = index;
};
let onDrop = (e: DragEvent, index: number) => {
  let imgs = [...props.value];
  let { current } = props;
  let d = imgs[index];
  imgs[index] = imgs[startIndex.value];
  imgs[startIndex.value] = d;
  emits("update:value", imgs);
  if (startIndex.value === current || index === current) {
    if (startIndex.value === current) emits("update:current", index);
    if (index === current) emits("update:current", startIndex.value);
  }
};

const edit = async (i: number) => {
  let { accept } = props;
  let value = await getFileUrl({ size: 1, accept });
  let imgs = [...props.value];
  imgs.splice(i, 1, value[0]);
  emits("update:value", imgs);
};
const remove = (i: number) => {
  let { current } = props;
  if (current === i) emits("update:current", 0);
  emits(
    "update:value",
    props.value.filter((it, index) => index != i)
  );
};

const preview = (index: number) => {
  let { value } = props;
  if (isVideo.value) return window.open(value[index].url);
  photoSwiper({
    dataSource: value,
    index,
  });
};

const upload = async () => {
  let { value, limit, accept, size } = props;
  let images = await getFileUrl({ accept, size });
  if (value.length + images.length > limit) {
    images = images.slice(0, limit - value.length);
  }
  emits("update:value", [...props.value, ...images]);
};

const changeCover = (i: number) => {
  emits("update:current", i);
};
</script>

<style lang="less" scoped>
.value {
  position: relative;
  flex-wrap: wrap;
  .image {
    width: 128px;
    height: 128px;
    background-color: #fafafa;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 8px 8px 0;
    overflow: hidden;
    position: relative;
    .video-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      .icon {
        width: 42px;
        height: 30px;
      }
    }
    &:hover {
      .mask-action {
        opacity: 1;
        pointer-events: auto;
      }
    }
    .cover-text {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 14px;
      color: #fff;
      padding: 4px 6px;
      border-radius: 6px 0 6px 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .mask-action {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      pointer-events: none;
      flex-direction: column;
      color: #fff;
      font-size: 20px;
      transition: 0.2s linear;
      span {
        margin-right: 10px;
      }
      .set-cover {
        justify-self: end;
        font-size: 14px;
        border: 1px solid #fff;
        padding: 6px 10px;
        margin-top: 10px;
        border-radius: 6px;
      }
    }
  }
  .upload-item {
    font-size: 30px;
    color: #666;
    flex-direction: column;
    border: 1px dashed #d9d9d9;
    padding-top: 12px;
    p {
      font-size: 14px;
      margin-top: 8px;
    }
    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }
  }
}
</style>
