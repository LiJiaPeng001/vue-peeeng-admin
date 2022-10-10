<template>
  <div class="edit-container">
    <a-form :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
      <a-form-item label="状态" name="state">
        <a-radio-group v-model:value="form.state">
          <a-radio :value="0">上架</a-radio>
          <a-radio :value="1">下架</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="标题" name="name">
        <a-input v-model:value="form.name" placeholder="请输入活动标题"> </a-input>
      </a-form-item>
      <a-form-item label="官方账号" name="official_uid">
        <a-input v-model:value="form.official_uid" placeholder="请输入活动标题"> </a-input>
      </a-form-item>
      <a-form-item label="样式类型" name="style_type">
        <a-radio-group v-model:value="form.style_type">
          <a-radio :value="0">普通</a-radio>
          <a-radio :value="1">挑战赛</a-radio>
          <a-radio :value="2">单贴纸挑战赛</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="简介" name="desc">
        <a-textarea v-model:value="form.desc" show-count :maxlength="200" :rows="4" placeholder="请输入活动简介"> </a-textarea>
      </a-form-item>
      <a-form-item label="参加按钮文案" name="join_text">
        <a-input v-model:value="form.join_text" placeholder="请输入参加按钮文案"> </a-input>
      </a-form-item>
      <a-form-item label="背景图" name="bg_detail_imgs">
        <upload-image v-model:value="form.bg_detail_imgs"></upload-image>
      </a-form-item>
      <a-form-item label="区间时间" name="intervalTime">
        <a-range-picker v-model:value="form.intervalTime" show-time />
      </a-form-item>
      <a-form-item label="单用户发布作品数量" name="works_limit">
        <a-input-number v-model:value="form.works_limit" />
      </a-form-item>
      <a-form-item label="有奖显示" name="is_has_award">
        <a-radio-group v-model:value="form.is_has_award">
          <a-radio :value="0">不显示</a-radio>
          <a-radio :value="1">显示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="活动列表置顶" name="is_top">
        <a-radio-group v-model:value="form.is_top">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="获奖名单" name="is_show_award_list">
        <a-radio-group v-model:value="form.is_show_award_list">
          <a-radio :value="0">不显示</a-radio>
          <a-radio :value="1">显示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="精选列表" name="is_show_choicness_list">
        <a-radio-group v-model:value="form.is_show_choicness_list">
          <a-radio :value="0">不显示</a-radio>
          <a-radio :value="1">显示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="排行榜" name="is_show_ranking_list">
        <a-radio-group v-model:value="form.is_show_ranking_list">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="form.is_show_ranking_list == 1" label="排行榜总数" name="ranking_number">
        <a-input-number v-model:value="form.ranking_number" placeholder="请输入排行榜总数"></a-input-number>
      </a-form-item>
      <a-form-item v-if="form.is_show_ranking_list == 1" label="排行榜点赞" name="ranking_like_num_line">
        <a-input-number v-model:value="form.ranking_like_num_line" placeholder="请输入排行榜点赞"></a-input-number>
      </a-form-item>
      <a-form-item label="道具" name="is_has_prop">
        <a-radio-group v-model:value="form.is_has_prop">
          <a-radio :value="0">没有</a-radio>
          <a-radio :value="1">有</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="冻结" name="is_freeze">
        <a-radio-group v-model:value="form.is_freeze">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="form.is_freeze == 1" label="冻结数" name="freeze_number">
        <a-input-number v-model:value="form.freeze_number" placeholder="请输入冻结数"></a-input-number>
      </a-form-item>
      <a-form-item label="推荐位作品ID" name="recommend_work_id">
        <a-input-number v-model:value="form.recommend_work_id" placeholder="请输入推荐位作品ID"></a-input-number>
      </a-form-item>
      <!-- 贴纸功能 -->
      <a-form-item label="贴纸功能">
        <a-form-item-rest><a-switch v-model:checked="showForm.sticker" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.sticker">
        <a-form-item label="Android贴纸类型">
          <a-select
            ref="select"
            show-search
            allow-clear
            :filter-option="filterOption"
            :options="typeList"
            :field-names="{ label: 'name', value: 'id' }"
            placeholder="请选择贴纸类型 (可搜索) "
            @select="fetchTags($event, 'android')"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="Android贴纸" name="android_tag_ids">
          <tag-table v-model:value="form.android_tag_ids" v-model:record="form.android_tags" :list="androidTags"></tag-table>
        </a-form-item>
        <a-form-item label="IOS贴纸类型">
          <a-select
            ref="select"
            show-search
            allow-clear
            :filter-option="filterOption"
            :options="typeList"
            :field-names="{ label: 'name', value: 'id' }"
            placeholder="请选择贴纸类型 (可搜索) "
            @select="fetchTags($event, 'ios')"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="IOS贴纸" name="ios_tag_ids">
          <tag-table v-model:value="form.ios_tag_ids" v-model:record="form.ios_tags" :list="iosTags"></tag-table>
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
      </template>
      <!-- 奖品配置 -->
      <a-form-item label="奖品配置">
        <a-form-item-rest><a-switch v-model:checked="showForm.prize" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.prize">
        <a-form-item label="奖品图" name="award_imgs">
          <upload-image v-model:value="form.award_imgs"></upload-image>
        </a-form-item>
        <a-form-item label="奖品图跳转方式" name="bg_detail_imgs">
          <a-select ref="select" v-model:value="form.award_img_url_skip_type" placeholder="请选择跳转方式">
            <a-select-option v-for="(it, i) in linkMaps" :key="Number(i)">{{ it }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="奖品图跳转链接" name="award_img_skip_url">
          <a-input v-model:value="form.award_img_skip_url" placeholder="请输入奖品图跳转链接"></a-input>
        </a-form-item>
      </template>
      <!-- 拍同款配置 -->
      <a-form-item label="拍同款配置">
        <a-form-item-rest><a-switch v-model:checked="showForm.ptk" /></a-form-item-rest>
      </a-form-item>
      <temaplte v-if="showForm.ptk">
        <a-form-item label="拍同款一级Tab" name="camera_tag_tab_id">
          <a-select
            ref="select"
            v-model:value="form.camera_tag_tab_id"
            show-search
            allow-clear
            :filter-option="filterOption"
            :options="cates"
            :field-names="{ label: 'name', value: 'id' }"
            placeholder="请选择拍同款一级Tab (可搜索) "
            @select="onSelectTabOne"
          >
          </a-select>
        </a-form-item>
        <a-form-item v-if="form.camera_tag_tab_id" label="拍同款一级分类子标签类型" name="camera_tag_tab_child_tab_type">
          <a-select v-model:value="form.camera_tag_tab_child_tab_type" allow-clear :options="tabTypes" placeholder="请选择拍同款一级Tab " @select="onSelectTagType"> </a-select>
        </a-form-item>
        <a-form-item
          v-if="form.camera_tag_tab_child_tab_type != -1"
          :label="(tabTypes.find(it => it.value == form.camera_tag_tab_child_tab_type) || { label: '' }).label"
          name="camera_tag_tab_child_tab_id"
        >
          <a-select
            v-model:value="form.camera_tag_tab_child_tab_id"
            :field-names="{ label: 'name', value: 'id' }"
            allow-clear
            :options="tabTypeLists"
            placeholder="请选择拍同款一级Tab "
          >
          </a-select>
        </a-form-item>
      </temaplte>
      <!-- 嗨嗨趣评 -->
      <a-form-item label="嗨嗨趣评">
        <a-form-item-rest><a-switch v-model:checked="showForm.hi" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.hi">
        <a-form-item label="趣评使用次数限制" name="use_speedy_comment_limit">
          <a-input-number v-model:value="form.use_speedy_comment_limit" placeholder="请输入趣评使用次数限制"></a-input-number>
        </a-form-item>
        <a-form-item label="趣评字体/边框色" name="background_color">
          <a-input v-model:value="form.background_color" placeholder="请输入趣评背景/字体/边框色"></a-input>
        </a-form-item>
      </template>
      <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
        <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
        <a-button @click="router.back()">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import * as Api from "~/api/activity/index";
import { typeTags, types, cates as cateList, tabTypeList } from "~/api/ptk/index";
// import { upload } from "~/api/upload";
import day from "dayjs";
import { TagTypeRecord, CateResult, TabTypeRecord } from "#/api/ptk";
import { RecordItem, StickerTagType } from "#/api/activity/index";
import TagTable from "./tag-table.vue";
import { modeMaps, linkMaps } from "~/utils/utils";

let route = useRoute();
let router = useRouter();
let showForm = ref({
  sticker: false,
  prize: false,
  ptk: false,
  hi: true,
});
let tabTypes = [
  { label: "全部", value: -1 },
  { label: "子分类", value: 0 },
  { label: "贴纸标签", value: 1 },
  { label: "贴纸标签集合", value: 2 },
];
let tabTypeLists = ref<TabTypeRecord[]>([]);
let cates = ref<CateResult[]>([]);
let typeList = ref<TagTypeRecord[]>([]);
let androidTags = ref<StickerTagType[]>([]);
let iosTags = ref<StickerTagType[]>([]);
let id = ref(Number(route.query.id || 0));
let initFormData = (): RecordItem => ({
  bg_detail_imgs: [],
  intervalTime: [],
  android_tags: [],
  ios_tags: [],
  android_tag_ids: [],
  ios_tag_ids: [],
  camera_tag_open_type: 0,
  award_imgs: [],
});
let form = ref<RecordItem>(initFormData());
let loading = ref<boolean>(false);
let rules = computed(() => {
  let r: Record<string, Rule[]> = {};
  return r;
});

let fetchData = async () => {
  if (!id.value) return;
  let d = await Api.detail({ id: id.value });
  let { bg_detail_img = "", bg_detail_img_url = "", start_time = "", end_time = "", award_img = "", award_img_url = "" } = d;
  d.bg_detail_imgs = bg_detail_img_url ? [{ url: bg_detail_img_url, filename: bg_detail_img }] : [];
  d.intervalTime = start_time ? [day(start_time), day(end_time)] : [];
  d.award_imgs = award_img ? [{ url: award_img_url, filename: award_img }] : [];
  form.value = { ...form.value, ...d };
};

let fetchTags = async (camera_tag_type_id: number, type: string) => {
  let { android_tags, ios_tags } = await typeTags({ camera_tag_type_id });
  if (type == "ios") iosTags.value = ios_tags;
  else androidTags.value = android_tags;
};
let fetchCate = async () => {
  let { list } = await cateList();
  cates.value = list;
};
let fetchTypes = async () => {
  let { list } = await types();
  typeList.value = list.map((item: TagTypeRecord) => ({ ...item, name: item.name + "=>" + item.type_text }));
};
let onSelectTabOne = () => {
  form.value.camera_tag_tab_child_tab_type = -1;
  form.value.camera_tag_tab_child_tab_id = 0;
};
let onSelectTagType = async (type: number) => {
  form.value.camera_tag_tab_child_tab_id = 0;
  if (type == -1) return;
  let { list = [] } = await tabTypeList({ id: form.value.camera_tag_tab_id as number, type });
  tabTypeLists.value = [{ id: 0, name: "全部" }, ...list];
};

let filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
let onFinish = async () => {
  loading.value = true;
  console.log(form.value);
  message.success("保存成功");
  loading.value = false;
};

fetchData();
fetchTypes();
fetchCate();

onActivated(() => {
  if (Number(route.query.id) != id.value) {
    id.value = Number(route.query.id);
    form.value = initFormData();
    fetchData();
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
