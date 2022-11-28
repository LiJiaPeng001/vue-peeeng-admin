<template>
  <div>
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-button type="primary" style="margin-bottom: 12px" @click="toEdit">添加</a-button>
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 800 }"
      @change="onChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'name'">
          {{ text ? text : "-" }}
        </template>
        <template v-if="column.key === 'show_type'">
          {{ text == 0 ? "文字" : "图标" }}
        </template>
        <template v-if="column.key === 'action'">
          <span primary @click="toEdit(record)">编辑</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
// import { message } from "ant-design-vue";
import Search from "./search.vue";
import * as Api from "~/api/ptk/type";
import { TypePayload, TypeRecord } from "#/api/ptkType";

let route = useRoute();

let { page = 1, state = -1 } = route.query;

let payload = ref<TypePayload>({
  page: Number(page),
  state: Number(state),
});

let count = ref(0);
let list = ref<TypeRecord[]>([]);
let go = useGo();
let loading = ref(false);

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    fixed: "left",
    width: 100,
  },
  {
    title: "类型",
    key: "show_type",
    dataIndex: "show_type",
  },
  {
    title: "列表展示类型",
    dataIndex: "list_show_type_text",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "状态",
    dataIndex: "state_text",
  },
  {
    title: "权重",
    dataIndex: "sort",
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

let toEdit = (record: TypeRecord) => {
  go({
    path: "/ptk/type/detail",
    query: {
      id: record.id || 0,
    },
  });
};
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkType",
});
</script>
