<template>
  <div class="edit-container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="基本信息">
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
            <a-radio-group v-model:value="form.list_show_type">
              <a-radio :value="0">瀑布流</a-radio>
              <a-radio :value="1">合集</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="社区贴纸类型" name="community_camera_tag_type_ids">
            <a-checkbox-group
              v-model:value="form.community_camera_tag_type_ids"
              :options="communityTags.map(item => ({ label: item.name, value: item.id }))"
              name="checkboxgroup"
            />
          </a-form-item>
          <a-form-item label="标签集合" name="gather_ids">
            <a-checkbox-group v-model:value="form.gather_ids" :options="tags.map(item => ({ label: item.name, value: item.id }))" name="checkboxgroup" />
          </a-form-item>
          <a-form-item label="选择标签" name="label_ids">
            <tag-type v-model:value="form.label_ids" :tags="typeTags"></tag-type>
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
          <a-form-item label="权重" name="sort">
            <a-input-number v-model:value="form.sort" placeholder="请输入权重"> </a-input-number>
          </a-form-item>
          <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
            <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
            <a-button @click="router.back()">返回</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>

      <a-tab-pane :key="2" tab="子分类管理"><child-tab></child-tab> </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import { list as tagsList } from "~/api/ptkTagGather";
import * as Api from "~/api/ptkType";
import { upload } from "~/api/upload";
import { TypeRecord, TagRecord } from "#/api/ptkType";
import TagType from "./tag-type.vue";
import ChildTab from "./child-tab.vue";

let route = useRoute();
let router = useRouter();
let activeKey = ref<number>(1);
let id = ref(Number(route.query.id || 0));
let initFormData = (): TypeRecord => ({
  show_type: 0,
  list_show_type: 0,
  is_show: 0,
  is_hidden_child: 0,
  is_enable_lite_list: 0,
  is_show_all: 0,
  sort: 0,
  icon_url: "",
  icons: [],
  community_camera_tag_type_ids: [],
  gather_ids: [],
  label_ids: [],
});
let form = ref<TypeRecord>(initFormData());
let loading = ref<boolean>(false);
let rules = computed(() => {
  let r: Record<string, Rule[]> = {};
  if (form.value.show_type == 0) {
    r.name = [{ required: true }];
  } else {
    r.icons = [{ required: true, message: "请上传图标" }];
  }
  return r;
});
let communityTags = ref<TagRecord[]>([]);
let tags = ref<TagRecord[]>([]);
let typeTags = ref<TagRecord[]>([]);

let fetchData = async () => {
  if (!id.value) return;
  let d = await Api.detail({ id: id.value });
  let { icon_url = "", icon = "", is_show = 0, is_hidden_child = 0, is_enable_lite_list = 0, is_show_all = 0 } = d;
  d.icons = icon_url ? [{ url: icon_url, filename: icon }] : [];
  d.is_show = is_show ? true : false;
  d.is_hidden_child = is_hidden_child ? true : false;
  d.is_enable_lite_list = is_enable_lite_list ? true : false;
  d.is_show_all = is_show_all ? true : false;
  form.value = { ...form.value, ...d };
};
let fetchCommunityTags = async () => {
  let { list } = await Api.communityTags();
  communityTags.value = list;
};
let fetchTags = async () => {
  let { list } = await tagsList();
  tags.value = list;
};
let fetchTypeTags = async () => {
  let { list } = await Api.typeTags();
  typeTags.value = list;
};
let onFinish = async () => {
  loading.value = true;
  let {
    state,
    show_type,
    name,
    icons,
    icon,
    list_show_type,
    community_camera_tag_type_ids,
    gather_ids,
    label_ids,
    is_show,
    is_hidden_child,
    is_enable_lite_list,
    is_show_all,
    sort,
  } = form.value;
  let p: TypeRecord = {};
  p.state = state;
  p.show_type = show_type;
  p.name = name;
  p.list_show_type = list_show_type;
  p.community_camera_tag_type_ids = community_camera_tag_type_ids;
  p.gather_ids = gather_ids;
  p.label_ids = label_ids;
  p.is_show = is_show ? 1 : 0;
  p.is_hidden_child = is_hidden_child ? 1 : 0;
  p.is_enable_lite_list = is_enable_lite_list ? 1 : 0;
  p.is_show_all = is_show_all ? 1 : 0;
  p.sort = sort;
  // image
  if (icons && icons.length && icons[0].file) {
    let image = await upload({ file: icons[0].file, type: 0 });
    p.icon = image.file_name;
  }
  p.icon = p.icon || icon;
  p.id = id.value;
  await Api.edit(p).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  message.success("保存成功");
  loading.value = false;
};
fetchData();
fetchCommunityTags();
fetchTags();
fetchTypeTags();
onActivated(() => {
  if (Number(route.query.id) != id.value) {
    id.value = Number(route.query.id);
    form.value = initFormData();
    fetchData();
    activeKey.value = 1;
  }
});
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkTypeDetail",
});
</script>

<style lang="less" scoped>
.edit-container {
  padding: 0 6px;
}
</style>
