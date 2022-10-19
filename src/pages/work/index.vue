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
        <template v-if="column.key === 'real_img_list'">
          <my-image v-if="record.tag_type == 0" :width="50" :height="50" :images="text.map((item:any) => item.file_name)"></my-image>
          <my-video v-if="record.tag_type == 2" :width="50" :height="50" :url="text[0].file_name"></my-video>
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
import * as Api from "~/api/work/index";
import { RecordItem, SearchPayload } from "#/api/work/index";

let payload = ref<SearchPayload>({
  page: 1,
  limit: 12,
  id: undefined,
  activity_id: undefined,
  topic_id: undefined,
  uid: undefined,
  nick: "",
  phone_number: "",
  score: 0,
  order: 1,
  review_state: 0,
  start_time: "",
  end_time: "",
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
    title: "作品来源",
    dataIndex: "work_affiliation",
  },
  {
    title: "相册",
    dataIndex: "real_img_list",
    key: "real_img_list",
  },
  {
    title: "用户ID",
    dataIndex: "uid",
  },
  {
    title: "审核状态",
    dataIndex: "review_state",
  },
  {
    title: "点赞数",
    dataIndex: "like_num_text",
  },
  {
    title: "舔狗数",
    dataIndex: "hidden_follow_num",
  },
  {
    title: "奖励金币数",
    dataIndex: "award_gold_number",
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
