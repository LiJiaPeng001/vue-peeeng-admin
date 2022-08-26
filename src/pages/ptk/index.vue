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
    title: "用户昵称",
    dataIndex: "user_nick",
    key: "user_nick",
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
