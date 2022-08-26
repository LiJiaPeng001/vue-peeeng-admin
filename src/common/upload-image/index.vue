<template>
  <div class="images middle-flex">
    <!-- images -->
    <div v-for="(it, i) in images" :key="it.url" class="image cover" :style="{ backgroundImage: `url(${it.url})` }">
      <!-- edit remove -->
      <div class="mask-action center-flex">
        <EditOutlined @click="edit(i)" />
        <DeleteOutlined @click="remove(i)" />
      </div>
    </div>
    <!-- upload -->
    <div class="image upload-item center-flex" @click="upload">
      <UploadOutlined></UploadOutlined>
      <p>上传文件</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getFileUrl } from "~/utils/upload/index";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  images: { url: string }[];
}>();

const emits = defineEmits(["update:images", "cancel"]);

const edit = async (i: number) => {
  let images = await getFileUrl();
  let imgs = [...props.images];
  imgs.splice(i, 1, images[0]);
  emits("update:images", imgs);
};
const remove = (i: number) => {
  emits(
    "update:images",
    props.images.filter((it, index) => index != i)
  );
};

const upload = async () => {
  let images = await getFileUrl({ multiple: true });
  emits("update:images", [...props.images, ...images]);
};
console.log(props, emits);
</script>

<style lang="less" scoped>
.images {
  position: relative;
  flex-wrap: wrap;
  .image {
    width: 128px;
    height: 128px;
    background-color: #fafafa;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 8px;
    overflow: hidden;
    position: relative;
    &:hover {
      .mask-action {
        opacity: 1;
        pointer-events: auto;
      }
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
      color: #fff;
      font-size: 20px;
      transition: 0.2s linear;
      span {
        margin-right: 10px;
      }
    }
  }
  .upload-item {
    font-size: 30px;
    color: #666;
    flex-direction: column;
    border: 1px dashed #d9d9d9;
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
