<template>
  <div class="container">
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/ptk";

let route = useRoute();

let { page = 1, limit = 12, camera_tag_name = "" } = route.query;

let payload = ref({
  page: Number(page),
  limit: Number(limit),
  id: 0,
  state: -1,
  camera_tag_tab_id: 0,
  camera_tag_child_tab_id: 0,
  camera_tag_name: camera_tag_name as string,
  camera_tag_state: -1,
});

let count = ref(0);
let list = ref([]);
let go = useGo();
let loading = ref(false);

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "归属分类",
    dataIndex: "camera_tag_tab_name",
    key: "camera_tag_tab_name",
  },
  {
    title: "归属子分类",
    dataIndex: "camera_tag_child_tab_name",
    key: "camera_tag_child_tab_name",
  },
  {
    title: "类型",
    dataIndex: "type_text",
    key: "type_text",
  },
  {
    title: "功能类型",
    dataIndex: "func_type_text",
    key: "func_type_text",
  },
  {
    title: "头像",
    dataIndex: "user_avatar",
    key: "user_avatar",
  },
  {
    title: "贴纸名",
    dataIndex: "camera_tag_name",
    key: "camera_tag_name",
  },
  {
    title: "内容类型",
    dataIndex: "content_type_text",
    key: "content_type_text",
  },
  {
    title: "权重",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "热门权重",
    dataIndex: "hot_sort",
    key: "hot_sort",
  },
  {
    title: "状态",
    dataIndex: "state_text",
    key: "state_text",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

let fetchList = async () => {
  loading.value = true;
  let d = await Api.list(payload.value);
  loading.value = false;
  count.value = d.count;
  list.value = d.list;
};

let onChange = (values: any) => {
  payload.value.page = values.current;
  payload.value.limit = values.pageSize;
  fetchList();
  go({
    path: route.path,
    query: { ...payload.value },
  });
};

fetchList();
</script>

<style lang="less" scoped></style>
