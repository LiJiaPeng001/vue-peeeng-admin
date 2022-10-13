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
        <a-select v-model:value="form.official_uid" allow-clear :options="users" :field-names="{ label: 'nick', value: 'id' }" placeholder="请选择官方账号 "> </a-select>
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
        <a-input-number v-model:value="form.works_limit" style="min-width: 150px" placeholder="请输入单用户发布作品数量" />
      </a-form-item>
      <a-form-item label="活动列表置顶" name="is_top">
        <a-radio-group v-model:value="form.is_top">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="有奖显示" name="is_has_award">
        <a-radio-group v-model:value="form.is_has_award">
          <a-radio :value="0">不显示</a-radio>
          <a-radio :value="1">显示</a-radio>
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
        <a-input-number v-model:value="form.ranking_number" style="min-width: 150px" placeholder="请输入排行榜总数"></a-input-number>
      </a-form-item>
      <a-form-item v-if="form.is_show_ranking_list == 1" label="排行榜点赞下限" name="ranking_like_num_line">
        <a-input-number v-model:value="form.ranking_like_num_line" style="min-width: 150px" placeholder="请输入排行榜点赞"></a-input-number>
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
        <a-input-number v-model:value="form.freeze_number" style="min-width: 150px" placeholder="请输入冻结数"></a-input-number>
      </a-form-item>
      <a-form-item label="推荐位作品ID" name="recommend_work_id">
        <a-input-number v-model:value="form.recommend_work_id" style="min-width: 150px" placeholder="请输入推荐位作品ID"></a-input-number>
      </a-form-item>
      <a-form-item label="规则" name="rule" :wrapper-col="{ span: 16 }">
        <handy-editor v-model:value="form.rule"></handy-editor>
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
        <a-form-item label="奖品图跳转方式" name="award_img_url_skip_type">
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
      <template v-if="showForm.ptk">
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
          v-if="form.camera_tag_tab_id && form.camera_tag_tab_child_tab_type != -1"
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
      </template>
      <!-- 嗨嗨趣评 -->
      <a-form-item label="嗨嗨趣评">
        <a-form-item-rest><a-switch v-model:checked="showForm.hi" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.hi">
        <a-form-item label="趣评使用次数限制" name="use_speedy_comment_limit">
          <a-input-number v-model:value="form.use_speedy_comment_limit" style="min-width: 150px" placeholder="请输入趣评使用次数限制"></a-input-number>
        </a-form-item>
        <a-form-item label="趣评字体/边框色" name="background_color">
          <a-input v-model:value="form.background_color" placeholder="请输入趣评背景/字体/边框色"></a-input>
        </a-form-item>
        <a-form-item label="趣评按钮图" name="speedy_comment_button_imgs">
          <upload-image v-model:value="form.speedy_comment_button_imgs" placeholder="请上传趣评按钮图"></upload-image>
        </a-form-item>
        <a-form-item label="趣评展示图" name="speedy_comment_show_imgs">
          <upload-image v-model:value="form.speedy_comment_show_imgs" placeholder="请上传趣评展示图"></upload-image>
        </a-form-item>
        <a-form-item label="趣评边框图" name="speedy_comment_frame_imgs">
          <upload-image v-model:value="form.speedy_comment_frame_imgs" placeholder="请上传趣评边框图"></upload-image>
        </a-form-item>
        <a-form-item label="趣评内容" name="speedy_comment_content">
          <a-textarea v-model:value="form.speedy_comment_content" show-count :maxlength="200" :rows="4" placeholder="请输入趣评内容,用|||分割"></a-textarea>
        </a-form-item>
      </template>
      <!-- 嗨嗨趣评 -->
      <a-form-item label="分享配置">
        <a-form-item-rest><a-switch v-model:checked="showForm.share" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.share">
        <a-form-item label="分享标题" name="share_title">
          <a-input v-model:value="form.share_title" placeholder="请输入分享标题"></a-input>
        </a-form-item>
        <a-form-item label="分享简介" name="share_desc">
          <a-input v-model:value="form.share_desc" placeholder="请输入分享简介"></a-input>
        </a-form-item>
        <a-form-item label="分享背景图" name="share_background_imgs">
          <upload-image v-model:value="form.share_background_imgs"></upload-image>
        </a-form-item>
        <a-form-item label="分享边框图" name="share_frame_imgs">
          <upload-image v-model:value="form.share_frame_imgs"></upload-image>
        </a-form-item>
        <a-form-item label="分享顶部图" name="share_top_imgs">
          <upload-image v-model:value="form.share_top_imgs"></upload-image>
        </a-form-item>
        <a-form-item label="分享banner图" name="share_banner_imgs">
          <upload-image v-model:value="form.share_banner_imgs"></upload-image>
        </a-form-item>
        <a-form-item label="分享描边色" name="share_outline_color">
          <a-input v-model:value="form.share_outline_color" placeholder="请输入分享页描边色"></a-input>
        </a-form-item>
        <a-form-item label="分享填充色" name="share_fill_color">
          <a-input v-model:value="form.share_fill_color" placeholder="请输入分享页填充色"></a-input>
        </a-form-item>
        <a-form-item label="分享投影色" name="share_projection_color">
          <a-input v-model:value="form.share_projection_color" placeholder="请输入分享页投影色"></a-input>
        </a-form-item>
      </template>
      <!-- 微博配置 -->
      <a-form-item label="微博配置">
        <a-form-item-rest><a-switch v-model:checked="showForm.wb" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.wb">
        <a-form-item label="微博扩展话题" name="weibo_topics">
          <a-input v-model:value="form.weibo_topics" placeholder="请输入微博扩展话题，用 ||| 分割，仅用户同步微博时的列表展示和发送"></a-input>
        </a-form-item>
        <a-form-item label="同步微博" name="sync_weibo">
          <a-radio-group v-model:value="form.sync_weibo">
            <a-radio :value="0">不同步</a-radio>
            <a-radio :value="1">同步</a-radio>
          </a-radio-group>
        </a-form-item>
      </template>
      <!-- 金币配置 -->
      <a-form-item label="金币配置">
        <a-form-item-rest><a-switch v-model:checked="showForm.gold" /></a-form-item-rest>
      </a-form-item>
      <template v-if="showForm.gold">
        <a-form-item label="金币配置">
          <a-badge color="yellow" text="例如：1 ~ 20 50 则为 1~20名 50金币奖励 自动发放列表根据排行榜数据 若配置大于排行榜数 超出部分则不生效"></a-badge>
          <a-badge color="yellow" text="例如：1 ~ 20 50 但是排行榜展示数为10 则只会发放前十的奖励"></a-badge>
          <a-badge color="yellow" text="此逻辑为了防止手误导致超发 如需去除此逻辑 以配置尾数为主 请联系开发进行修改"></a-badge>
          <a-button size="small" type="primary" style="margin: 10px 0; display: block" @click="openGlod">添加</a-button>
          <a-form-item-rest>
            <div v-for="(rank, i) in form.ranking_award_gold_config" :key="i" class="gold-item middle-flex">
              <a-input-number v-model:value="rank.lte" placeholder="起始名次" class="rank-input"></a-input-number>
              <a-input-number v-model:value="rank.gte" placeholder="结束名次" class="rank-input"></a-input-number>
              <a-input-number v-model:value="rank.gold_number" placeholder="金币数量" class="rank-input"></a-input-number>
              <DeleteOutlined @click="removeGold(i)" />
            </div>
          </a-form-item-rest>
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
import { list as officialList } from "~/api/account/official";
import day from "dayjs";
import { TagTypeRecord, CateResult, TabTypeRecord } from "#/api/ptk";
import { RecordItem, StickerTagType } from "#/api/activity/index";
import { modeMaps, linkMaps } from "~/utils/utils";
import { RecordItem as OfficialRecord } from "#/api/account/official";
import { uploadFiles } from "~/utils/upload/index";
import HandyEditor from "~/components/handy-editor/index.vue";
import TagTable from "./tag-table.vue";

let route = useRoute();
let router = useRouter();
let showForm = ref({
  sticker: false,
  prize: false,
  ptk: false,
  hi: false,
  share: false,
  wb: false,
  gold: false,
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
let users = ref<OfficialRecord[]>([]);
let initFormData = (): RecordItem => ({
  state: 0,
  bg_detail_imgs: [],
  intervalTime: [],
  android_tags: [],
  ios_tags: [],
  android_tag_ids: [],
  ios_tag_ids: [],
  camera_tag_open_type: 0,
  award_imgs: [],
  style_type: 0,
  speedy_comment_button_imgs: [],
  speedy_comment_show_imgs: [],
  speedy_comment_frame_imgs: [],
  share_background_imgs: [],
  share_frame_imgs: [],
  share_top_imgs: [],
  share_banner_imgs: [],
  ranking_award_gold_config: [],
  is_top: 0,
  is_has_award: 0,
  is_show_award_list: 0,
  is_show_choicness_list: 0,
  is_show_ranking_list: 0,
  ranking_number: 0,
  ranking_like_num_line: 0,
  is_has_prop: 0,
  is_freeze: 0,
  freeze_number: 0,
  sync_weibo: 0,
  rule: "",
});
let form = ref<RecordItem>(initFormData());
let loading = ref<boolean>(false);
let rules = computed(() => {
  let r: Record<string, Rule[]> = {};
  r.name = [{ required: true }];
  r.intervalTime = [{ required: true }];
  return r;
});
let fetchOfficial = async () => {
  let { official_users = [] } = await officialList();
  users.value = official_users;
};
let fetchData = async () => {
  if (!id.value) return;
  let d = await Api.detail({ id: id.value });
  let {
    bg_detail_img = "",
    bg_detail_img_url = "",
    start_time = "",
    end_time = "",
    award_img = "",
    award_img_url = "",
    speedy_comment_button_img = "",
    speedy_comment_button_img_url = "",
    speedy_comment_show_img = "",
    speedy_comment_show_img_url = "",
    speedy_comment_frame_img = "",
    speedy_comment_frame_img_url = "",
    share_background_img = "",
    share_background_img_url = "",
    share_frame_img = "",
    share_frame_img_url = "",
    share_top_img = "",
    share_top_img_url = "",
    share_banner_img = "",
    share_banner_img_url = "",
  } = d;
  d.bg_detail_imgs = bg_detail_img_url ? [{ url: bg_detail_img_url, filename: bg_detail_img }] : [];
  d.intervalTime = start_time ? [day(start_time), day(end_time)] : [];
  d.award_imgs = award_img ? [{ url: award_img_url, filename: award_img }] : [];
  d.speedy_comment_button_imgs = speedy_comment_button_img ? [{ url: speedy_comment_button_img_url, filename: speedy_comment_button_img }] : [];
  d.speedy_comment_show_imgs = speedy_comment_show_img ? [{ url: speedy_comment_show_img_url, filename: speedy_comment_show_img }] : [];
  d.speedy_comment_frame_imgs = speedy_comment_frame_img ? [{ url: speedy_comment_frame_img_url, filename: speedy_comment_frame_img }] : [];
  d.share_background_imgs = share_background_img ? [{ url: share_background_img_url, filename: share_background_img }] : [];
  d.share_frame_imgs = share_frame_img ? [{ url: share_frame_img_url, filename: share_frame_img }] : [];
  d.share_top_imgs = share_top_img ? [{ url: share_top_img_url, filename: share_top_img }] : [];
  d.share_banner_imgs = share_banner_img ? [{ url: share_banner_img_url, filename: share_banner_img }] : [];
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
let openGlod = () => {
  form.value.ranking_award_gold_config && form.value.ranking_award_gold_config.push({ lte: 0, gte: 0, gold_number: 0 });
};
let removeGold = (i: number) => {
  form.value.ranking_award_gold_config && form.value.ranking_award_gold_config.splice(i, 1);
};

let filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
let onFinish = async () => {
  loading.value = true;
  let d: RecordItem = {};
  let {
    ios_tag_ids = [],
    android_tag_ids = [],
    recommend_work_id = 0,
    freeze_number = 0,
    is_freeze = 0,
    is_has_prop = 0,
    ranking_like_num_line = 0,
    ranking_number = 0,
    is_show_ranking_list = 0,
    is_show_choicness_list = 0,
    is_show_award_list = 0,
    is_has_award = 0,
    is_top = 0,
    works_limit = 0,
    state = 0,
    name = "",
    official_uid = 0,
    style_type = 0,
    desc = "",
    join_text = "",
    intervalTime = [],
    camera_tag_open_type = 0,
    camera_tag_preview_mode = 0,
    award_img_url_skip_type = 0,
    award_img_skip_url = "",
    camera_tag_tab_id = 0,
    camera_tag_tab_child_tab_type = 0,
    camera_tag_tab_child_tab_id = 0,
    use_speedy_comment_limit = 0,
    background_color = "",
    award_imgs = [],
    speedy_comment_button_imgs = [],
    speedy_comment_show_imgs = [],
    speedy_comment_frame_imgs = [],
    speedy_comment_content = "",
    share_title = "",
    share_desc = "",
    bg_detail_imgs = [],
    share_background_imgs = [],
    share_frame_imgs = [],
    share_top_imgs = [],
    share_banner_imgs = [],
    share_outline_color = "",
    share_fill_color = "",
    share_projection_color = "",
    weibo_topics = "",
    sync_weibo = 0,
    ranking_award_gold_config = [],
    rule = "",
  } = form.value;
  d.state = state;
  d.rule = rule;
  d.name = name;
  d.official_uid = official_uid;
  d.style_type = style_type;
  d.desc = desc;
  d.join_text = join_text;
  d.works_limit = works_limit;
  d.is_top = is_top;
  d.is_has_award = is_has_award;
  d.is_show_award_list = is_show_award_list;
  d.is_show_choicness_list = is_show_choicness_list;
  d.is_show_ranking_list = is_show_ranking_list;
  d.ranking_number = ranking_number;
  d.ranking_like_num_line = ranking_like_num_line;
  d.is_has_prop = is_has_prop;
  d.is_freeze = is_freeze;
  d.freeze_number = freeze_number;
  d.recommend_work_id = recommend_work_id;
  d.android_tag_ids = android_tag_ids;
  d.ios_tag_ids = ios_tag_ids;
  d.camera_tag_open_type = camera_tag_open_type;
  d.camera_tag_preview_mode = camera_tag_preview_mode;
  d.award_img_url_skip_type = award_img_url_skip_type;
  d.award_img_skip_url = award_img_skip_url;
  d.camera_tag_tab_id = camera_tag_tab_id;
  d.camera_tag_tab_child_tab_type = camera_tag_tab_child_tab_type;
  d.camera_tag_tab_child_tab_id = camera_tag_tab_child_tab_id;
  d.use_speedy_comment_limit = use_speedy_comment_limit;
  d.background_color = background_color;
  d.speedy_comment_content = speedy_comment_content;
  d.share_title = share_title;
  d.share_desc = share_desc;
  d.share_outline_color = share_outline_color;
  d.share_fill_color = share_fill_color;
  d.share_projection_color = share_projection_color;
  d.weibo_topics = weibo_topics;
  d.sync_weibo = sync_weibo;
  d.ranking_award_gold_config = ranking_award_gold_config;
  // intervalTime
  if (intervalTime.length) {
    d.start_time = day(intervalTime[0]).format("YYYY-MM-DD HH:mm:ss");
    d.end_time = day(intervalTime[1]).format("YYYY-MM-DD HH:mm:ss");
  } else {
    d.start_time = "";
    d.end_time = "";
  }
  // bg_detail_imgs
  bg_detail_imgs = await uploadFiles(bg_detail_imgs);
  d.bg_detail_img = bg_detail_imgs.length ? bg_detail_imgs[0].filename : "";
  // award_imgs
  award_imgs = await uploadFiles(award_imgs);
  d.award_img = award_imgs.length ? award_imgs[0].filename : "";
  // speedy_comment_button_imgs
  speedy_comment_button_imgs = await uploadFiles(speedy_comment_button_imgs);
  d.speedy_comment_button_img = speedy_comment_button_imgs.length ? speedy_comment_button_imgs[0].filename : "";
  // speedy_comment_show_imgs
  speedy_comment_show_imgs = await uploadFiles(speedy_comment_show_imgs);
  d.speedy_comment_show_img = speedy_comment_show_imgs.length ? speedy_comment_show_imgs[0].filename : "";
  // speedy_comment_frame_imgs
  speedy_comment_frame_imgs = await uploadFiles(speedy_comment_frame_imgs);
  d.speedy_comment_frame_img = speedy_comment_frame_imgs.length ? speedy_comment_frame_imgs[0].filename : "";
  // share_background_imgs
  share_background_imgs = await uploadFiles(share_background_imgs);
  d.share_background_img = share_background_imgs.length ? share_background_imgs[0].filename : "";
  // share_frame_imgs
  share_frame_imgs = await uploadFiles(share_frame_imgs);
  d.share_frame_img = share_frame_imgs.length ? share_frame_imgs[0].filename : "";
  // share_top_imgs
  share_top_imgs = await uploadFiles(share_top_imgs);
  d.share_top_img = share_top_imgs.length ? share_top_imgs[0].filename : "";
  // share_banner_imgs
  share_banner_imgs = await uploadFiles(share_banner_imgs);
  d.share_banner_img = share_banner_imgs.length ? share_banner_imgs[0].filename : "";
  d.id = id.value;
  await Api.edit(d).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  message.success("保存成功");
  loading.value = false;
};

fetchData();
fetchTypes();
fetchCate();
fetchOfficial();

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
  .gold-item {
    margin-bottom: 10px;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
  .rank-input {
    margin-right: 10px;
    min-width: 100px;
  }
}
</style>
