<template>
  <div class="edit-container">
    <a-form :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
      <a-form-item label="状态" name="state">
        <a-switch v-model:checked="form.state" checked-children="上架" un-checked-children="下架" />
      </a-form-item>
      <a-form-item label="内容类型" name="show_type">
        <a-radio-group v-model:value="form.show_type">
          <a-radio :value="0">文字</a-radio>
          <a-radio :value="1">图标</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="form.show_type == 0" label="名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入展示名称"> </a-input>
      </a-form-item>
      <a-form-item v-if="form.show_type == 1" label="图标" name="icons">
        <upload-image v-model:value="form.icons"></upload-image>
      </a-form-item>
      <a-form-item label="列表展示类型" name="list_show_type">
        <a-radio-group v-model:value="form.show_type">
          <a-radio :value="0">瀑布流</a-radio>
          <a-radio :value="1">合集</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否展示拍同款" name="is_show">
        <a-switch v-model:checked="form.is_show" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="是否隐藏分栏" name="is_hidden_child">
        <a-switch v-model:checked="form.is_hidden_child" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="是否开启Lite多贴纸" name="is_enable_lite_list">
        <a-switch v-model:checked="form.is_enable_lite_list" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="是否展示全部栏目" name="is_show_all">
        <a-switch v-model:checked="form.is_show_all" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="社区贴纸类型" name="community_camera_tag_type_ids">
        <a-checkbox-group v-model:value="form.community_camera_tag_type_ids" :options="communityTags.map(item => ({ label: item.name, value: item.id }))" name="checkboxgroup" />
      </a-form-item>
      <a-form-item label="标签集合" name="gather_ids">
        <tag-gatter v-model:value="form.gather_ids" :tags="tags"></tag-gatter>
      </a-form-item>
      <a-form-item label="选择标签" name="label_ids">
        <a-input-number v-model:value="form.sort" placeholder="请输入权重"> </a-input-number>
      </a-form-item>
      <a-form-item label="权重" name="sort">
        <a-input-number v-model:value="form.sort" placeholder="请输入权重"> </a-input-number>
      </a-form-item>
      <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
        <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
        <a-button @click="router.back()">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import * as Api from "~/api/ptkType";
import { TypeRecord, TagRecord } from "#/api/ptkType";
import TagGatter from "./tag-gatter.vue";

let route = useRoute();
let router = useRouter();
let id = ref(Number(route.query.id || 0));
let initFormData = (): TypeRecord => ({
  icon_url: "",
  icons: [],
  community_camera_tag_type_ids: [],
  gather_ids: [],
  label_ids: [],
});
let form = ref<TypeRecord>(initFormData());
let loading = ref<boolean>(false);
let rules = {};
let communityTags = ref<TagRecord[]>([]);
let tags = ref<TagRecord[]>([]);
let typeTags = ref<TagRecord[]>([]);

let fetchData = async () => {
  if (!id.value) return;
  let d = await Api.detail({ id: id.value });
  d.icons = d.icon_url ? [{ url: d.icon_url, filename: d.icon }] : [];
  form.value = { ...form.value, ...d };
};
let fetchCommunityTags = async () => {
  let { list } = await Api.communityTags();
  communityTags.value = list;
};
let fetchTags = async () => {
  let { list } = await Api.tags();
  tags.value = list;
};
let fetchTypeTags = async () => {
  let { list } = await Api.typeTags();
  typeTags.value = list;
};
let onFinish = async () => {
  loading.value = true;
};
fetchData();
fetchCommunityTags();
fetchTags();
fetchTypeTags();
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkTypeDetail",
});
</script>

<style lang="less" scoped>
.edit-container {
  padding: 40px 6px;
}
</style>
