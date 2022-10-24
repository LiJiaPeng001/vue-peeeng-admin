vue
<template>
  <a-form ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form" @finish="ok">
    <a-form-item v-if="images.length" label="文件列表" name="img_array">
      <template v-if="record.tag_type == 0">
        <div v-for="it in images" :key="it.file_name" class="img cover fadeIn" :style="{ backgroundImage: `url(${it.file_name})` }" @click="onPushIndex(it.original_file_name)">
          <span v-if="(form.img_array as string[]).some(item => item == it.original_file_name)">已选择</span>
        </div>
      </template>
      <template v-if="record.tag_type == 2">
        <div v-for="it in images" :key="it.file_name" class="video">
          <my-video has-click :url="it.file_name" :poster="record.cover_url" @click="onPushIndex(it.original_file_name)"></my-video>
          <span v-if="(form.img_array as string[]).some(item => item == it.original_file_name)">已选择</span>
        </div>
      </template>
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
      <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
      <a-button @click="router.back()">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { find } from "~/api/work/index";
import { RecordItem, FindRecord } from "#/api/work/index";
import { message } from "ant-design-vue";

const props = defineProps<{
  record: RecordItem;
}>();
let router = useRouter();
const emits = defineEmits<{
  (e: "ok", v: void): void;
}>();
let loading = ref<boolean>(false);
const images = computed(() => {
  return props.record.real_img_list || [];
});

let form = ref<FindRecord>({
  img_array: [],
});
let formRef = ref();
let rules = {
  img_array: [{ required: true, message: "请选择文件" }],
};
let onPushIndex = (i: string) => {
  let { img_array = [] } = form.value;
  let current = img_array.findIndex(it => it == i);
  if (current > -1) {
    img_array.splice(current, 1);
  } else {
    img_array.push(i);
  }
  form.value.img_array = img_array;
};
let ok = async () => {
  let { id = 0 } = props.record;
  await formRef.value.validate();
  await find({
    id,
    ...form.value,
  });
  message.success("操作成功");
  emits("ok");
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
</style>
