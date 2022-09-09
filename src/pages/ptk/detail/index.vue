<template>
  <div class="edit-container">
    <a-form :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
      <a-form-item label="状态" name="state">
        <a-select ref="select" v-model:value="form.state">
          <a-select-option v-for="(it, i) in stateMaps" :key="Number(i)">{{ it }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="热门分类" name="tabMaps">
        <a-cascader
          v-model:value="tabMaps"
          :field-names="{ label: 'name', value: 'id', children: 'camera_tag_child_tabs' }"
          :options="cates"
          placeholder="请选择分类"
          change-on-select
        />
      </a-form-item>
      <a-form-item label="社区用户ID" name="uid">
        <a-input v-model:value="form.uid" placeholder="请输入用户ID"> </a-input>
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-select ref="select" v-model:value="form.type" placeholder="请选择类型">
          <a-select-option v-for="(it, i) in typeMaps" :key="Number(i)">{{ it }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="链接跳转方式" name="open_type">
        <a-select ref="select" v-model:value="form.open_type" placeholder="请选择链接跳转方式">
          <a-select-option v-for="(it, i) in linkMaps" :key="Number(i)">{{ it }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="跳转链接" name="url">
        <a-input v-model:value="form.url" placeholder="请输入跳转链接"> </a-input>
      </a-form-item>
      <a-form-item label="内容类型" name="content_type_text">
        <a-radio-group v-model:value="form.content_type_text">
          <a-radio :value="0">图片</a-radio>
          <a-radio :value="1">视频</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="图片列表" name="images">
        <upload-image v-model:value="form.images"></upload-image>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { stateMaps, linkMaps } from "~/utils/utils";
import { detail, cates as cateList } from "~/api/ptk";
import { RecordItem } from "#/api/ptk";

let route = useRoute();
let id = ref(Number(route.query.id || 0));
let form = ref<RecordItem>({
  state: -1,
  content_type_text: 0,
  images: [],
});
let tabMaps = ref<number[]>([]);
let cates = ref([]);
let rules: Record<string, Rule[]> = {
  state: [{ required: true }],
  tabMaps: [{ required: true }],
};
let typeMaps = {
  0: "社区",
  1: "微博",
  2: "抖音",
  3: "绿洲",
  4: "广告",
};

let filterTabs = () => {
  if (form.value.camera_tag_tab_id) {
    tabMaps.value = [form.value.camera_tag_tab_id, form.value.camera_tag_child_tab_id].filter(item => item);
  }
};

let fetchData = async () => {
  if (!id.value) return;
  form.value = await detail({ id: id.value });
  form.value.images = form.value.real_img_list.map((item: string) => ({ src: item }));
  filterTabs();
};

let fetchCate = async () => {
  let { list } = await cateList();
  cates.value = list;
};

let onFinish = () => {
  console.log("ok");
};

fetchData();
fetchCate();

onActivated(() => {
  console.log(Number(route.query.id), id.value);
  if (Number(route.query.id) != id.value) {
    id.value = Number(route.query.id);
    fetchData();
  }
});
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkDetail",
});
</script>

<style lang="less" scoped>
.edit-container {
  padding: 40px 20px;
}
</style>
