<template>
  <div class="edit-container">
    <a-form :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
      <a-form-item label="是否限定" name="is_qualify">
        <a-switch v-model:checked="form.is_qualify" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="状态" name="state">
        <a-radio-group v-model:value="form.state">
          <a-radio :value="0">下架</a-radio>
          <a-radio :value="1">上架</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="热门分类" name="tabMaps">
        <a-cascader
          v-model:value="form.tabMaps"
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
      <a-form-item label="瀑布流简介" name="desc">
        <a-textarea v-model:value="form.desc" show-count :maxlength="200" :rows="4" placeholder="请输入瀑布流简介"> </a-textarea>
      </a-form-item>
      <a-form-item label="内容类型" name="content_type">
        <a-radio-group v-model:value="form.content_type">
          <a-radio :value="0">图片</a-radio>
          <a-radio :value="1">视频</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="图片列表" name="images">
        <upload-image v-model:value="form.images" v-model:current="form.current" :limit="9" show-cover></upload-image>
      </a-form-item>
      <a-form-item label="按钮图片" name="button_img">
        <upload-image v-model:value="form.button_img"></upload-image>
      </a-form-item>
      <a-form-item label="权重" name="sort">
        <a-input-number v-model:value="form.sort" placeholder="请输入权重"> </a-input-number>
      </a-form-item>
      <a-form-item label="热门权重" name="hot_sort">
        <a-input-number v-model:value="form.hot_sort" placeholder="请输入热门权重"> </a-input-number>
      </a-form-item>
      <a-form-item label="功能类型" name="func_type">
        <a-radio-group v-model:value="form.func_type">
          <a-radio :value="0">贴纸</a-radio>
          <a-radio :value="1">拼图</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 贴纸 -->g
      <template v-if="form.func_type == 0">
        <a-form-item label="贴纸类型" name="tag_type">
          <a-select
            ref="select"
            v-model:value="form.tag_type"
            show-search
            allow-clear
            :filter-option="filterOption"
            :options="typeList"
            placeholder="请选择贴纸类型 (可搜索) "
            @select="onSelectTag"
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
        <a-form-item label="贴纸展示名" name="camera_tag_name">
          <a-input v-model:value="form.camera_tag_name" placeholder="请输入贴纸展示名"> </a-input>
        </a-form-item>
        <a-form-item label="贴纸简介" name="camera_tag_desc">
          <a-textarea v-model:value="form.camera_tag_desc" show-count :maxlength="200" :rows="4" placeholder="请输入贴纸简介"> </a-textarea>
        </a-form-item>
        <a-form-item label="标签数据" name="content_labels">
          <tag-label v-model:value="form.content_labels"></tag-label>
        </a-form-item>
      </template>
      <!-- 拼图 -->
      <template v-else>
        <a-form-item label="拼图名" name="puzzle_name">
          <a-input v-model:value="form.puzzle_name" placeholder="请输入拼图名"> </a-input>
        </a-form-item>
        <a-form-item label="拼图使用数" name="puzzle_use_number">
          <a-input-number v-model:value="form.puzzle_use_number" placeholder="请输入拼图使用数"> </a-input-number>
        </a-form-item>
        <a-form-item label="拼图背景色" name="puzzle_background_color">
          <a-input v-model:value="form.puzzle_background_color" placeholder="请输入拼图背景色" style="max-width: 140px"> </a-input>
          <!-- <a-input v-model:value="form.puzzle_background_color" style="width: 60px" type="color"> </a-input> -->
        </a-form-item>
        <a-form-item label="模板图" name="puzzle_img">
          <upload-image v-model:value="form.puzzle_img"></upload-image>
        </a-form-item>
        <a-form-item label="模板背景图" name="puzzle_special_effects_img">
          <upload-image v-model:value="form.puzzle_special_effects_img"></upload-image>
        </a-form-item>
        <a-form-item label="模板数据" name="puzzle_params">
          <image-table v-model:value="form.puzzle_params"></image-table>
        </a-form-item>
      </template>
      <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { linkMaps } from "~/utils/utils";
import { detail, cates as cateList, types, typeTags } from "~/api/ptk";
import { RecordItem } from "#/api/ptk";
import TagTable from "./tag-table.vue";
import TagLabel from "./tab-label.vue";
import ImageTable from "./image-table.vue";

interface TypeRecord {
  id: number;
  type_text: string;
  name: string;
}

let route = useRoute();
let id = ref(Number(route.query.id || 0));
let form = ref<RecordItem>({
  is_qualify: 0,
  state: -1,
  tabMaps: [],
  uid: 0,
  type: 0,
  open_type: 0,
  url: "",
  desc: "",
  content_type: 0,
  images: [],
  button_img: [],
  sort: 0,
  hot_sort: 0,
  func_type: 0,
  tag_type: 0,
  android_camera_tag_id: 0,
  ios_camera_tag_id: 0,
  camera_tag_open_type: 0,
  camera_tag_preview_mode: 0,
  camera_tag_name: "",
  camera_tag_desc: "",
  content_labels: [],
  puzzle_name: "",
  puzzle_use_number: 0,
  puzzle_background_color: "",
  puzzle_img: [],
  puzzle_special_effects_img: [],
  puzzle_params: [],
});
let cates = ref([]);
let typeList = ref<TypeRecord[]>([]);
let androidTags = ref([]);
let iosTags = ref([]);
let rules: Record<string, Rule[]> = {
  state: [{ required: true }],
  tabMaps: [{ required: true, trigger: "change" }],
};
let typeMaps = {
  0: "社区",
  1: "微博",
  2: "抖音",
  3: "绿洲",
  4: "广告",
};
let modeMaps = [
  { label: "拍照 ", value: "" },
  { label: "GIF", value: "GIF" },
  { label: "视频", value: "VIDEO" },
  { label: "LivePhoto (仅IOS支持，Android仍为普通拍照)", value: "LIVEPHOTO" },
];

let fetchData = async () => {
  if (!id.value) return;
  form.value = await detail({ id: id.value });
  let { button_img_url, button_img, img_list_data, camera_tag_tab_id, camera_tag_child_tab_id, puzzle_info } = form.value;
  form.value.button_img = button_img_url ? [{ url: button_img_url, src: button_img }] : [];
  form.value.images = img_list_data.map((item: { filename: string; url: string }) => ({ src: item.filename, url: item.url }));
  form.value.puzzle_img = puzzle_info.puzzle_img_url ? [{ url: puzzle_info.puzzle_img_url }] : [];
  form.value.puzzle_special_effects_img = puzzle_info.puzzle_special_effects_img_url ? [{ src: puzzle_info.puzzle_special_effects_img_url }] : [];
  form.value.puzzle_params = puzzle_info.puzzle_params;
  if (camera_tag_tab_id) {
    form.value.tabMaps = [camera_tag_tab_id, camera_tag_child_tab_id].filter(item => item);
  }
};

let fetchCate = async () => {
  let { list } = await cateList();
  cates.value = list;
};
let fetchTypes = async () => {
  let { list } = await types();
  typeList.value = list.map((item: TypeRecord) => ({ value: item.id, label: item.name + "=>" + item.type_text }));
};
let fetchTags = async (camera_tag_type_id: number) => {
  let { android_tags, ios_tags } = await typeTags({ camera_tag_type_id });
  androidTags.value = android_tags;
  iosTags.value = ios_tags;
};

let filterOption = (input: string, option: { label: string }) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

let onSelectTag = (value: number) => {
  fetchTags(value);
};

let onFinish = (values: any) => {
  console.log(values, "ok");
};

fetchData();
fetchCate();
fetchTypes();

onActivated(() => {
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
