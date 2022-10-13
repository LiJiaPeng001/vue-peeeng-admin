<template>
  <div class="container">
    <Search v-model:payload="payload" @ok="fetchList" />
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
        <template v-if="column.key === 'bg_detail_img_url'">
          <my-image :width="50" :height="50" :url="text"></my-image>
        </template>
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span class="primary" @click="toEdit(record)">编辑</span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/activity/index";
import { RecordItem, SearchPayload } from "#/api/activity/index";

let route = useRoute();

let { page = 1, state = -1, limit = 12, name = "", id = "" } = route.query;

let payload = ref<SearchPayload>({
  page: Number(page),
  limit: Number(limit),
  id: id ? Number(id) : String(id),
  state: Number(state),
  name: String(name),
});

let count = ref(0);
let list = ref<RecordItem[]>([]);
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
    title: "活动标题",
    dataIndex: "name",
    // width: 150,
  },
  {
    title: "封面",
    key: "bg_detail_img_url",
    dataIndex: "bg_detail_img_url",
    // width: 150,
  },
  {
    title: "开始时间",
    dataIndex: "start_time",
    // width: 80,
  },
  {
    title: "结束时间",
    dataIndex: "end_time",
  },
  {
    title: "作品数",
    dataIndex: "works_num",
  },
  {
    title: "点赞数",
    dataIndex: "like_num",
  },
  {
    title: "评论数",
    dataIndex: "comment_num",
  },
  {
    title: "参与人数",
    dataIndex: "people_num",
  },
  {
    title: "图片数",
    dataIndex: "photo_num",
  },
  {
    title: "单人发布作品数",
    dataIndex: "works_limit",
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

let toEdit = (record: RecordItem) => {
  go({
    path: "/activity/detail",
    query: {
      id: record.id,
    },
  });
};
</script>

<script lang="ts">
export default defineComponent({
  name: "ActivityList",
});
</script>
