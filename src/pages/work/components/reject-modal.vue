vue
<template>
  <a-modal title="拒绝" :visible="visible" @ok="ok" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form">
      <a-form-item label="文字内容" name="review_content">
        <a-radio-group v-model:value="form.review_content">
          <a-radio :value="2">失败</a-radio>
          <a-radio :value="1">成功</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="文件" name="review_img">
        <a-radio-group v-model:value="form.review_img">
          <a-radio :value="2">失败</a-radio>
          <a-radio :value="1">成功</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="images.length" label="文件列表" name="disable_image_array">
        <template v-if="record.tag_type == 0">
          <div v-for="(it, i) in images" :key="it.file_name" class="img cover fadeIn" :style="{ backgroundImage: `url(${it.file_name})` }" @click="onPushIndex(i)">
            <span v-if="(form.disable_image_array as number[]).some(it => it == i)">已选择</span>
          </div>
        </template>
        <template v-if="record.tag_type == 2">
          <div class="video">
            <my-video v-for="it in images" :key="it.file_name" has-click :url="it.file_name" :poster="record.cover_url" @click="onPushIndex(0)"></my-video>
            <span v-if="(form.disable_image_array as number[]).some(it => it == 0)">已选择</span>
          </div>
        </template>
      </a-form-item>
      <a-form-item label="审核意见" name="review_desc">
        <a-input v-model:value="form.review_desc" placeholder="请输入审核意见"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { reject } from "~/api/work/index";
import { RecordItem, RejectRecord } from "#/api/work/index";
import { message } from "ant-design-vue";

const props = defineProps<{
  visible: boolean;
  record: RecordItem;
}>();

const emits = defineEmits<{
  (e: "update:visible", v: boolean): void;
  (e: "ok", v: void): void;
}>();

const images = computed(() => {
  return props.record.real_img_list || [];
});

let form = ref<RejectRecord>({
  review_img: 2,
  review_content: 2,
  review_desc: "",
  disable_image_array: [],
});
let formRef = ref();
let rules = {};
let onPushIndex = (i: number) => {
  let { disable_image_array = [] } = form.value;
  let current = disable_image_array.findIndex(it => it == i);
  if (current > -1) {
    disable_image_array.splice(current, 1);
  } else {
    disable_image_array.push(i);
  }
  form.value.disable_image_array = disable_image_array;
};
let ok = async () => {
  let { id = 0 } = props.record;
  await formRef.value.validate();
  await reject({
    id,
    ...form.value,
  });
  message.success("操作成功");
  emits("ok");
  close();
};
let close = () => {
  emits("update:visible", false);
};
</script>

<style lang="less" scoped>
.ant-input-number {
  width: 100%;
}
.img,
.video {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin: 0 10px 10px 0;
  position: relative;
  cursor: pointer;
  span {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 2px 4px;
    border-radius: 6px 0 6px 0;
    color: #fff;
    font-size: 12px;
  }
}
.video {
  position: relative;
}
</style>
