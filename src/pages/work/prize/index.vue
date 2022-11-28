<template>
  <div>
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-button type="primary" style="margin-bottom: 12px" @click="toEdit({ id: 0, name: '', state: 0 })">添加</a-button>
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 1000 }"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span primary @click="toEdit(record)">编辑</span>
          </div>
        </template>
      </template>
    </a-table>
    <prize-detail v-model:visible="visible" :record="record" @ok="fetchList"></prize-detail>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/work/prize";
import { RecordItem, SearchPayload } from "#/api/work/prize";
import PrizeDetail from "./detail/index.vue";

let route = useRoute();

let { page = 1, state = -1, limit = 12, name = "" } = route.query;
let visible = ref<boolean>(false);

let payload = ref<SearchPayload>({
  page: Number(page),
  limit: Number(limit),
  state: Number(state),
  name: String(name),
});

let record = ref<RecordItem>({});
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
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
  },
  {
    title: "状态",
    dataIndex: "state_text",
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    width: 100,
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

let toEdit = (d: RecordItem) => {
  record.value = { ...d };
  visible.value = true;
};
</script>

<script lang="ts">
export default defineComponent({
  name: "WorkPrize",
});
</script>
