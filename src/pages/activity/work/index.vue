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
            <a-popconfirm title="您确定要删除嘛?" ok-text="是" cancel-text="否" @confirm="remove(record)">
              <span class="danger">删除</span>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <detail-modal v-model:visible="visible" :type="payload.type" :record="record" @ok="fetchList"></detail-modal>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/activity/work";
import { RecordItem, SearchParams } from "#/api/activity/work";
import { message } from "ant-design-vue";
import DetailModal from "./detail.vue";
import dayjs from "dayjs";

let payload = ref<SearchParams>({
  page: 1,
  limit: 12,
  type: "new",
  activity_id: undefined,
});

let count = ref(0);
let visible = ref(false);
let list = ref<RecordItem[]>([]);
let loading = ref(false);
let record = ref<RecordItem>();

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    fixed: "left",
    width: 100,
  },
  {
    title: "活动id",
    dataIndex: "activity_id",
  },
  {
    title: "作品id",
    dataIndex: "works_id",
  },
  {
    title: "作品发布人id",
    dataIndex: "works_uid",
  },
  {
    title: "开始时间",
    dataIndex: "start_line",
  },
  {
    title: "结束时间",
    dataIndex: "end_line",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
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
  let { start_line = "", end_line = "" } = d;
  record.value = { ...d };
  record.value.start_time = start_line ? dayjs(start_line) : undefined;
  record.value.end_time = end_line ? dayjs(end_line) : undefined;
  visible.value = true;
};
let remove = async (record: RecordItem) => {
  let { id = 0 } = record;
  await Api.remove({ ids: [id], type: payload.value.type });
  message.success("删除成功");
  fetchList();
};
</script>

<script lang="ts">
export default defineComponent({
  name: "ActivityWork",
});
</script>
