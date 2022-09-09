<template>
  <div class="search-form">
    <a-form :model="form" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish">
      <a-form-item label="Id" name="id">
        <a-input v-model:value="form.id" placeholder="请输入作品id"> </a-input>
      </a-form-item>
      <a-form-item label="贴纸名" name="camera_tag_name">
        <a-input v-model:value="form.camera_tag_name" placeholder="请输入贴纸名"> </a-input>
      </a-form-item>
      <a-form-item label="热门分类">
        <a-cascader
          v-model:value="tabMaps"
          :field-names="{ label: 'name', value: 'id', children: 'camera_tag_child_tabs' }"
          :options="props.cates"
          placeholder="请选择分类"
          change-on-select
        />
      </a-form-item>
      <a-form-item label="贴纸状态" name="camera_tag_state">
        <a-select ref="select" v-model:value="form.camera_tag_state">
          <a-select-option v-for="(it, i) in stateMaps" :key="Number(i)">{{ it }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="作品状态" name="state">
        <a-select ref="select" v-model:value="form.state">
          <a-select-option v-for="(it, i) in stateMaps" :key="Number(i)">{{ it }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { SearchPayload, CateResult } from "#/api/ptk";
import { stateMaps } from "~/utils/utils";

const props = defineProps<{ payload: SearchPayload; cates: CateResult[] }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<SearchPayload>({
  ...props.payload,
});

let tabMaps = ref<number[]>([]);

let filterTabs = () => {
  if (props.payload.camera_tag_tab_id) {
    tabMaps.value = [props.payload.camera_tag_tab_id, props.payload.camera_tag_child_tab_id].filter(item => item);
  }
};

watchEffect(() => {
  form.value = { ...props.payload };
  filterTabs();
});

filterTabs();

const onFinish = (values: any) => {
  let query = { ...props.payload, ...values, page: 1 };
  if (tabMaps.value.length) {
    query.camera_tag_tab_id = tabMaps.value[0];
    query.camera_tag_child_tab_id = tabMaps.value[1];
  }
  emits("update:payload", query);
  emits("ok");
};

const clear = () => {
  tabMaps.value = [];
  onFinish({
    page: 1,
    camera_tag_name: "",
    camera_tag_state: -1,
    camera_tag_tab_id: 0,
    camera_tag_child_tab_id: 0,
    id: "",
    state: -1,
    limit: 12,
  });
};
</script>

<style lang="less" scoped>
.search-form {
  padding: 10px 10px 20px;
}
</style>
