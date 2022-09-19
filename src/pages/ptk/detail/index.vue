<template>
  <div class="edit-container">
    <a-form :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
      <a-form-item label="是否限定" name="is_qualify">
        <a-switch v-model:checked="form.is_qualify" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="状态" name="state">
        <a-switch v-model:checked="form.state" checked-children="上架" un-checked-children="下架" />
      </a-form-item>
      <a-form-item label="热门分类" name="tabMaps">
        <a-cascader
          v-model:value="form.tabMaps"
          :field-names="{ label: 'name', value: 'id', children: 'camera_tag_child_tabs' }"
          :options="cates"
          placeholder="请选择热门分类"
          change-on-select
        />
      </a-form-item>
      <!-- 自助配置：用户昵称 + 用户头像 -->
      <template v-if="form.config_type == 1">
        <a-form-item label="用户昵称" name="user_nick">
          <a-input v-model:value="form.user_nick" placeholder="请输入用户昵称"> </a-input>
        </a-form-item>
        <a-form-item label="用户头像" name="userAvatar">
          <upload-image v-model:value="form.userAvatar"></upload-image>
        </a-form-item>
      </template>
      <!-- 社区作品：社区作品ID -->
      <a-form-item v-else-if="form.config_type == 2" label="社区作品ID" name="work_id">
        <a-input v-model:value="form.work_id" placeholder="请输入社区作品ID"> </a-input>
      </a-form-item>
      <!-- 社区用户：社区用户ID -->
      <a-form-item v-else-if="form.config_type == 3" label="社区用户ID" name="uid">
        <a-input v-model:value="form.uid" placeholder="请输入用户ID"> </a-input>
      </a-form-item>
      <a-form-item label="内容类型" name="content_type">
        <a-radio-group v-model:value="form.content_type">
          <a-radio :value="0">图片</a-radio>
          <a-radio :value="1">视频</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 图片 -->
      <template v-if="form.content_type == 0">
        <a-form-item label="图片列表" name="images">
          <upload-image v-model:value="form.images" v-model:current="form.current" :limit="9" show-cover></upload-image>
        </a-form-item>
      </template>
      <!-- 视频 -->
      <template v-else>
        <a-form-item label="视频" name="videos">
          <upload-image v-model:value="form.videos" :size="40" accept="video/*"></upload-image>
        </a-form-item>
        <a-form-item label="视频封面" name="videoCover">
          <upload-image v-model:value="form.videoCover"></upload-image>
        </a-form-item>
      </template>
      <a-form-item label="功能类型" name="func_type">
        <a-radio-group v-model:value="form.func_type">
          <a-radio :value="0">贴纸</a-radio>
          <a-radio :value="1">拼图</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 贴纸 -->
      <template v-if="form.func_type == 0">
        <a-form-item label="贴纸类型" name="tag_type">
          <a-select
            ref="select"
            v-model:value="form.tag_type"
            show-search
            allow-clear
            :filter-option="filterOption"
            :options="typeList"
            :field-names="{ label: 'name', value: 'id' }"
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
        <a-form-item label="作者配置类型" name="config_type">
          <a-radio-group v-model:value="form.config_type">
            <a-radio :value="0">贴纸回填</a-radio>
            <a-radio :value="1">自助配置</a-radio>
            <a-radio :value="2">社区作品</a-radio>
            <a-radio :value="3">社区用户</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="作者标签" name="type">
          <a-select ref="select" v-model:value="form.type" placeholder="请选择作者标签">
            <a-select-option v-for="(it, i) in typeMaps" :key="Number(i)">{{ it }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="跳转方式" name="open_type">
          <a-select ref="select" v-model:value="form.open_type" placeholder="跳转方式">
            <a-select-option v-for="(it, i) in linkMaps" :key="Number(i)">{{ it }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="跳转链接" name="url">
          <a-input v-model:value="form.url" placeholder="请输入跳转链接"> </a-input>
        </a-form-item>
        <a-form-item label="瀑布流简介" name="desc">
          <a-textarea v-model:value="form.desc" show-count :maxlength="200" :rows="4" placeholder="请输入瀑布流简介"> </a-textarea>
        </a-form-item>
        <a-form-item label="沉浸标题" name="camera_tag_name">
          <a-input v-model:value="form.camera_tag_name" placeholder="请输入沉浸标题"> </a-input>
        </a-form-item>
        <a-form-item label="沉浸简介" name="camera_tag_desc">
          <a-textarea v-model:value="form.camera_tag_desc" show-count :maxlength="200" :rows="4" placeholder="请输入沉浸简介"> </a-textarea>
        </a-form-item>
        <a-form-item label="沉浸标签数据" name="content_labels">
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
          <input v-model="form.puzzle_background_color" style="width: 30px; height: 30px" type="color" />
        </a-form-item>
        <a-form-item label="模板底图" name="puzzle_img">
          <upload-image v-model:value="form.puzzle_img"></upload-image>
        </a-form-item>
        <a-form-item label="模板特效图" name="puzzle_special_effects_img">
          <upload-image v-model:value="form.puzzle_special_effects_img"></upload-image>
        </a-form-item>
        <a-form-item label="模板数据" name="puzzle_params" :wrapper-col="{ span: 14 }">
          <image-table v-model:value="form.puzzle_params"></image-table>
        </a-form-item>
      </template>
      <!-- <a-form-item label="按钮图片" name="button_img">
        <upload-image v-model:value="form.button_img"></upload-image>
      </a-form-item> -->
      <a-form-item label="权重" name="sort">
        <a-input-number v-model:value="form.sort" placeholder="请输入权重"> </a-input-number>
      </a-form-item>
      <a-form-item label="热门权重" name="hot_sort">
        <a-input-number v-model:value="form.hot_sort" placeholder="请输入热门权重"> </a-input-number>
      </a-form-item>

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
import { linkMaps } from "~/utils/utils";
import { detail, cates as cateList, types, typeTags, edit } from "~/api/ptk";
import { RecordItem, TagTypeRecord, CateResult } from "#/api/ptk";
import { upload } from "~/api/upload";
import getSize from "~/utils/getImage";
import TagTable from "./tag-table.vue";
import TagLabel from "./tab-label.vue";
import ImageTable from "./image-table.vue";

let route = useRoute();
let router = useRouter();
let id = ref(Number(route.query.id || 0));
let initFormData = (): RecordItem => ({
  is_qualify: 0,
  state: 0,
  config_type: 0,
  user_nick: "",
  userAvatar: [],
  work_id: undefined,
  tabMaps: [],
  uid: 0,
  type: 0,
  open_type: 0,
  url: "",
  desc: "",
  content_type: 0,
  images: [],
  videos: [],
  videoCover: [],
  current: 0,
  button_img: [],
  sort: 0,
  hot_sort: 0,
  func_type: 0,
  tag_type: undefined,
  android_camera_tag_id: 0,
  ios_camera_tag_id: 0,
  camera_tag_open_type: 0,
  camera_tag_preview_mode: "",
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
let form = ref<RecordItem>(initFormData());
let loading = ref<boolean>(false);
let cates = ref<CateResult[]>([]);
let typeList = ref<TagTypeRecord[]>([]);
let androidTags = ref([]);
let iosTags = ref([]);

let rules = computed(() => {
  let r: Record<string, Rule[]> = {
    tabMaps: [{ required: true }],
  };
  if (form.value.config_type == 1) {
    r.user_nick = [{ required: true }];
    r.userAvatar = [{ required: true }];
  }
  if (form.value.config_type == 2) {
    r.work_id = [{ required: true }];
  }
  // if (form.value.config_type == 3) {
  //   r.uid = [{ required: true }];
  // }
  if (form.value.content_type == 0) {
    r.images = [{ required: true }];
  }
  if (form.value.content_type == 1) {
    r.videos = [{ required: true }];
    r.videoCover = [{ required: true }];
  }
  if (form.value.func_type == 1) {
    r.puzzle_name = [{ required: true }];
    r.puzzle_use_number = [{ required: true }];
    r.puzzle_background_color = [{ required: true, trigger: "change" }];
    r.puzzle_img = [{ required: true, trigger: "change" }];
    // r.puzzle_special_effects_img = [{ required: true }];
    r.puzzle_params = [{ required: true, trigger: "change" }];
  }
  return r;
});
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
  let d = await detail({ id: id.value });
  form.value = { ...form.value, ...d };
  let {
    button_img_url,
    button_img,
    img_list_data = [],
    camera_tag_tab_id,
    camera_tag_child_tab_id,
    puzzle_info = {},
    cover_url,
    cover,
    user_avatar,
    user_avatar_url = "",
  } = form.value;
  let { puzzle_special_effects_img, puzzle_special_effects_img_url, puzzle_img, puzzle_img_url, puzzle_background_color, puzzle_name, puzzle_params, puzzle_use_number } =
    puzzle_info;
  form.value.button_img = button_img_url ? [{ url: button_img_url, src: button_img }] : [];
  if (form.value.content_type == 0) form.value.images = img_list_data;
  else {
    form.value.videos = img_list_data;
    form.value.videoCover = cover ? [{ url: cover_url, filename: cover }] : [];
  }
  form.value.userAvatar = user_avatar ? [{ url: user_avatar_url, filename: user_avatar }] : [];
  form.value.current = img_list_data.findIndex(item => item.url == cover_url);
  form.value.puzzle_img = puzzle_img_url ? [{ url: puzzle_img_url, filename: puzzle_img }] : [];
  form.value.puzzle_special_effects_img = puzzle_special_effects_img_url ? [{ url: puzzle_special_effects_img_url, filename: puzzle_special_effects_img }] : [];
  form.value.puzzle_params = puzzle_params;
  form.value.puzzle_background_color = puzzle_background_color;
  form.value.puzzle_use_number = puzzle_use_number;
  form.value.puzzle_name = puzzle_name;
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
  typeList.value = list.map((item: TagTypeRecord) => ({ ...item, name: item.name + "=>" + item.type_text }));
};
let fetchTags = async (camera_tag_type_id: number) => {
  let { android_tags, ios_tags } = await typeTags({ camera_tag_type_id });
  androidTags.value = android_tags;
  iosTags.value = ios_tags;
};

let filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

let onSelectTag = (value: number) => {
  fetchTags(value);
};

let onFinish = async () => {
  loading.value = true;
  try {
    let p: RecordItem = {};
    let {
      state,
      type,
      is_qualify,
      user_nick,
      config_type,
      userAvatar = [],
      work_id,
      tabMaps = [],
      uid,
      open_type,
      url,
      desc,
      hot_sort,
      sort,
      content_type,
      content_labels,
      puzzle_background_color,
      images = [],
      videos = [],
      videoCover = [],
      puzzle_name,
      puzzle_use_number,
      current = 0,
      cover = "",
      cover_size = "",
      puzzle_img = [],
      button_img = [],
      puzzle_special_effects_img = [],
      puzzle_params,
      android_camera_tag_id,
      ios_camera_tag_id,
      camera_tag_name,
      camera_tag_desc,
      func_type,
    } = form.value;
    p.id = id.value || 0;
    p.state = state;
    p.android_camera_tag_id = android_camera_tag_id;
    p.ios_camera_tag_id = ios_camera_tag_id;
    p.camera_tag_name = camera_tag_name;
    p.camera_tag_desc = camera_tag_desc;
    p.type = type;
    p.is_qualify = is_qualify;
    p.user_nick = user_nick;
    p.config_type = config_type;
    p.work_id = work_id;
    p.uid = uid;
    p.camera_tag_tab_id = 0;
    p.camera_tag_child_tab_id = 0;
    p.open_type = open_type;
    p.url = url;
    p.desc = desc;
    p.hot_sort = hot_sort;
    p.sort = sort;
    p.func_type = func_type;
    p.content_labels = content_labels;
    p.puzzle_background_color = puzzle_background_color;
    p.puzzle_name = puzzle_name;
    p.puzzle_use_number = puzzle_use_number;
    p.puzzle_params = puzzle_params;
    p.content_type = content_type;
    if (tabMaps.length) {
      if (tabMaps.length == 1) {
        p.camera_tag_tab_id = tabMaps[0];
      }
      if (tabMaps.length == 2) {
        p.camera_tag_tab_id = tabMaps[0];
        p.camera_tag_child_tab_id = tabMaps[1];
      }
    }
    // 上传图片  userAvatar images videos,videoCover,puzzle_img,puzzle_special_effects_img
    let avatars = userAvatar.filter(item => item.file);
    if (avatars.length) {
      let { file_name } = await upload({ file: avatars[0].file as File, type: 0 });
      p.user_avatar = file_name;
    } else {
      p.user_avatar = userAvatar.length ? userAvatar[0].filename : "";
    }
    // 图片列表 + 视频 + 封面
    if (content_type == 0) {
      for (let i = 0; i < images.length; i++) {
        let item = images[i];
        if (item.file) {
          let { file_name } = await upload({ file: item.file, type: 0 });
          item.filename = file_name;
        }
        if (current == i) {
          let [imgData] = await getSize(item.url);
          p.cover = item.filename;
          p.cover_size = `${imgData.w}*${imgData.h}`;
        }
        p.img_list = images.map(item => item.filename as string);
      }
    } else if (content_type == 1) {
      if (videos.length && videos[0].file) {
        let { file_name } = await upload({ file: videos[0].file, type: 0 });
        p.img_list = [file_name];
      } else {
        p.img_list = [videos[0].filename];
      }
      if (videoCover.length && videoCover[0].file) {
        let { file_name, size } = await upload({ file: videoCover[0].file, type: 0 });
        p.cover = file_name;
        p.size = size;
      }
    }
    p.cover = p.cover || cover;
    p.cover_size = p.cover_size || cover_size;
    // 拼图底图 + 拼图模板图
    if (puzzle_img.length) {
      let { file, filename } = puzzle_img[0];
      if (puzzle_img[0].file) {
        let { file_name } = await upload({ file, type: 0 });
        p.puzzle_img = file_name;
      } else if (filename) {
        p.puzzle_img = filename;
      }
    }
    if (puzzle_special_effects_img.length) {
      let { file, filename } = puzzle_special_effects_img[0];
      if (file) {
        let { file_name } = await upload({ file, type: 0 });
        p.puzzle_special_effects_img = file_name;
      } else if (filename) {
        p.puzzle_special_effects_img = filename;
      }
    }
    // 按钮图片
    if (button_img.length && button_img[0].file) {
      let { file, filename } = button_img[0];
      if (file) {
        let { file_name } = await upload({ file, type: 0 });
        p.button_img = file_name;
      } else if (filename) {
        p.button_img = filename;
      }
    }
    await edit(p);
    loading.value = false;
    message.success("保存成功");
  } catch (error) {
    loading.value = false;
  }
};

fetchData();
fetchCate();
fetchTypes();
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
  name: "PtkDetail",
});
</script>

<style lang="less" scoped>
.edit-container {
  padding: 40px 6px;
}
</style>
