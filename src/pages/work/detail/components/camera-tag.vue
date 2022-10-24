vue
<template>
  <a-form ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form" @finish="ok">
    <a-form-item label="贴纸类型" name="tagType">
      <a-select
        v-model:value="form.tagType"
        show-search
        allow-clear
        :filter-option="filterOption"
        :options="typeList"
        :field-names="{ label: 'name', value: 'id' }"
        placeholder="请选择贴纸类型 (可搜索) "
        @select="fetchTags"
      >
      </a-select>
    </a-form-item>
    <a-form-item label="Android贴纸" name="android_camera_tag_id">
      <tag-table v-model:value="form.android_camera_tag_id" v-model:record="form.android_camera_tag" :list="androidTags"></tag-table>
    </a-form-item>
    <a-form-item label="IOS贴纸" name="ios_camera_tag_id">
      <tag-table v-model:value="form.ios_camera_tag_id" v-model:record="form.ios_camera_tag" :list="iosTags"></tag-table>
    </a-form-item>
    <a-form-item label="相机模式" name="camera_tag_open_type">
      <a-radio-group v-model:value="form.camera_tag_open_type">
        <a-radio :value="0">原模式</a-radio>
        <a-radio :value="1">Lite模式</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="预览模式" name="camera_tag_preview_mode">
      <a-select ref="select" v-model:value="form.camera_tag_preview_mode" placeholder="请选择预览模式">
        <a-select-option v-for="it in modeMaps" :key="it.value">{{ it.label }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
      <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
      <a-button @click="router.back()">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { modeMaps } from "~/utils/utils";
import { cameraTag } from "~/api/work/index";
import { RecordItem } from "#/api/work/index";
import { message } from "ant-design-vue";
import { typeTags, types } from "~/api/ptk/index";
import { TagTypeRecord } from "#/api/ptk";
import TagTable from "./tag-table.vue";

const props = defineProps<{
  record: RecordItem;
}>();
let router = useRouter();
const emits = defineEmits<{
  (e: "ok", v: void): void;
}>();
let loading = ref<boolean>(false);
let typeList = ref<TagTypeRecord[]>([]);
let form = ref<RecordItem>({
  tagType: undefined,
  ...props.record,
});
let formRef = ref();
let rules = {};
let androidTags = ref([]);
let iosTags = ref([]);

let ok = async () => {
  loading.value = true;
  let { id = 0 } = props.record;
  await formRef.value.validate();
  let { android_camera_tag_id = 0, ios_camera_tag_id = 0, camera_tag_open_type = 0, camera_tag_preview_mode = "" } = form.value;
  await cameraTag({
    id,
    android_camera_tag_id,
    ios_camera_tag_id,
    camera_tag_open_type,
    camera_tag_preview_mode,
  }).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  loading.value = false;
  message.success("操作成功");
  emits("ok");
};
let filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
let fetchTypes = async () => {
  let { list } = await types();
  typeList.value = list.map((item: TagTypeRecord) => ({ ...item, name: item.name + "=>" + item.type_text }));
};
let fetchTags = async () => {
  if (!form.value.tag_type) return;
  let { android_tags, ios_tags } = await typeTags({ camera_tag_type_id: form.value.tag_type });
  androidTags.value = android_tags;
  iosTags.value = ios_tags;
};
fetchTags();
fetchTypes();
</script>

<style lang="less" scoped>
.ant-input-number {
  width: 100%;
}
.img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin: 0 10px 10px 0;
  position: relative;
  cursor: pointer;
  background-color: #eee;
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
