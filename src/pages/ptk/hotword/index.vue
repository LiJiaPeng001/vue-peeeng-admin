<template>
  <div class="container">
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 800 }"
      @change="onChange"
    >
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/ptk/hotword";
import { TypePayload, TypeRecord } from "#/api/ptkHotword";

let route = useRoute();

let { page = 1, number = 10 } = route.query;

let payload = ref<TypePayload>({
  page: Number(page),
  number: Number(number),
});

let count = ref(0);
let list = ref<TypeRecord[]>([]);
let loading = ref(false);

let columns = ref([
  {
    title: "搜索内容",
    dataIndex: "content",
  },
  {
    title: "搜索次数",
    dataIndex: "number",
  },
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
  name: "PtkHotWord",
});
</script>
