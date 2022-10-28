<template>
  <div class="container">
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 1000 }"
      @change="onChange"
    >
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/account/join";
import { RecordItem, SearchParams } from "#/api/account/join";

let payload = ref<SearchParams>({
  page: 1,
  limit: 12,
  uid: undefined,
  source_id: undefined,
  type: 0,
});

let count = ref(0);
let list = ref<RecordItem[]>([]);
let loading = ref(false);

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    fixed: "left",
    width: 100,
  },
  {
    title: "目标id",
    dataIndex: "source_id",
  },
  {
    title: "用户id",
    dataIndex: "uid",
  },
  {
    title: "作品数",
    dataIndex: "works_num",
  },
  {
    title: "照片数",
    dataIndex: "photo_num",
  },
  {
    title: "最后参与时间",
    dataIndex: "last_join_time",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
  },
  // {
  //   title: "操作",
  //   key: "action",
  //   fixed: "right",
  //   width: 100,
  // },
]);

let fetchList = async () => {
  loading.value = true;
  let d = await Api.list(payload.value).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  loading.value = false;
  count.value = d.count;
  list.value = d.list;
};

let onChange = (values: { current: number; pageSize: number }) => {
  payload.value.page = values.current;
  payload.value.limit = values.pageSize;
  fetchList();
};

fetchList();
</script>

<script lang="ts">
export default defineComponent({
  name: "AccountJoin",
});
</script>
