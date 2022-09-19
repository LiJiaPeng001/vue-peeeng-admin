<template>
  <div class="container">
    <Search v-model:payload="payload" :cates="cates" @ok="fetchList" />
    <a-button type="primary" style="margin-bottom: 12px" @click="toEdit({ id: 0 })">添加</a-button>
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 1000 }"
      @change="onChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'cameraTagIcon'">
          <my-image :width="50" :height="50" :url="record.camera_tag_data.icon_url"></my-image>
        </template>
        <template v-if="column.key === 'cameraTagName'">
          {{ record.camera_tag_data.name ? record.camera_tag_data.name : "-" }}
        </template>
        <template v-if="column.key === 'camera_tag_tab_name'"> {{ text }} {{ record.camera_tag_child_tab_name ? `- ${record.camera_tag_child_tab_name}` : "" }} </template>
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span class="primary" @click="toEdit(record)">编辑</span>
            <a-popconfirm title="您确定要删除嘛?" ok-text="是" cancel-text="否" @confirm="remove(record)">
              <span class="danger">删除</span>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import Search from "./search.vue";
import * as Api from "~/api/ptk";
import { RecordItem, CateResult, SearchPayload } from "#/api/ptk";

let route = useRoute();

let { page = 1, state = -1, limit = 12, camera_tag_name = "", camera_tag_tab_id = 0, camera_tag_child_tab_id = 0, id = "", camera_tag_state = -1 } = route.query;

let payload = ref<SearchPayload>({
  page: Number(page),
  limit: Number(limit),
  id: id ? Number(id) : String(id),
  state: Number(state),
  camera_tag_tab_id: Number(camera_tag_tab_id),
  camera_tag_child_tab_id: Number(camera_tag_child_tab_id),
  camera_tag_name: String(camera_tag_name),
  camera_tag_state: Number(camera_tag_state),
});

let count = ref(0);
let list = ref<RecordItem[]>([]);
let cates = ref<CateResult[]>([]);
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
    title: "热门分类",
    key: "camera_tag_tab_name",
    dataIndex: "camera_tag_tab_name",
    // width: 150,
  },
  {
    title: "类型",
    dataIndex: "type_text",
    // width: 80,
  },
  {
    title: "贴纸icon",
    key: "cameraTagIcon",
  },
  {
    title: "贴纸名",
    key: "cameraTagName",
  },
  {
    title: "沉浸标题",
    dataIndex: "camera_tag_name",
    // width: 80,
  },
  {
    title: "功能类型",
    dataIndex: "func_type_text",
    // width: 140,
  },
  // {
  //   title: "内容类型",
  //   dataIndex: "content_type_text",
  //   // width: 140,
  // },
  {
    title: "权重",
    dataIndex: "sort",
    // width: 80,
  },
  {
    title: "热门权重",
    dataIndex: "hot_sort",
    // width: 140,
  },
  {
    title: "状态",
    dataIndex: "state_text",
    // width: 80,
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
let remove = async (record: RecordItem) => {
  let { id = 0 } = record;
  await Api.remove({ ids: [id] });
  message.success("删除成功");
  fetchList();
};
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkList",
});
</script>
