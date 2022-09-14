<template>
  <div class="container">
    <Search v-model:payload="payload" :cates="cates" @ok="fetchList" />
    <a-button type="primary" style="margin-bottom: 12px" @click="toEdit({ id: 0 })">添加</a-button>
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span class="primary" @click="toEdit(record)">编辑</span>
            <span class="danger" @click="remove(record)">删除</span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { Modal, message } from "ant-design-vue";
import Search from "./search.vue";
import * as Api from "~/api/ptk";
import { RecordItem } from "#/api/ptk";

let route = useRoute();

let { page = 1, state = -1, limit = 12, camera_tag_name = "", camera_tag_tab_id = 0, camera_tag_child_tab_id = 0, id = "", camera_tag_state = -1 } = route.query;

let payload = ref({
  page: Number(page),
  limit: Number(limit),
  id: String(id),
  state: Number(state),
  camera_tag_tab_id: Number(camera_tag_tab_id),
  camera_tag_child_tab_id: Number(camera_tag_child_tab_id),
  camera_tag_name: String(camera_tag_name),
  camera_tag_state: Number(camera_tag_state),
});

let count = ref(0);
let list = ref<RecordItem[]>([]);
let cates = ref([]);
let go = useGo();
let loading = ref(false);

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
  },
  {
    title: "归属分类",
    dataIndex: "camera_tag_tab_name",
  },
  {
    title: "归属子分类",
    dataIndex: "camera_tag_child_tab_name",
  },
  {
    title: "类型",
    dataIndex: "type_text",
  },
  {
    title: "功能类型",
    dataIndex: "func_type_text",
  },
  {
    title: "贴纸展示名",
    dataIndex: "camera_tag_name",
  },
  {
    title: "内容类型",
    dataIndex: "content_type_text",
  },
  {
    title: "权重",
    dataIndex: "sort",
  },
  {
    title: "热门权重",
    dataIndex: "hot_sort",
  },
  {
    title: "状态",
    dataIndex: "state_text",
  },
  {
    title: "操作",
    key: "action",
  },
]);

let fetchList = async () => {
  loading.value = true;
  let d = await Api.list(payload.value);
  loading.value = false;
  count.value = d.count;
  list.value = d.list;
};
let fetchCate = async () => {
  let { list } = await Api.cates();
  cates.value = list;
};

let onChange = (values: { current: number; pageSize: number }) => {
  payload.value.page = values.current;
  payload.value.limit = values.pageSize;
  fetchList();
};

fetchList();
fetchCate();

let toEdit = (record: RecordItem) => {
  go({
    path: "/ptk/detail",
    query: {
      id: record.id,
    },
  });
};
let remove = (record: RecordItem) => {
  let { id = 0 } = record;
  Modal.confirm({
    title: "删除",
    content: "您确定要删除嘛?",
    async onOk() {
      await Api.remove({ ids: [id] });
      message.success("删除成功");
      fetchList();
    },
  });
};
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkList",
});
</script>
