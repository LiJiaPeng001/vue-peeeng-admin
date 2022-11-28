<template>
  <div>
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 1000 }"
      @change="onChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'background_img_url' || column.key === 'avatar_url'">
          <my-image :width="50" :height="50" :url="text"></my-image>
        </template>
        <template v-if="column.key === 'recommend_time'">
          <a-switch :checked="!!text" @change="onTuijian($event, record)"></a-switch>
        </template>
        <template v-if="column.key === 'is_white_user'">
          <a-switch :checked="text" @change="onWhite($event, record)"></a-switch>
        </template>
        <template v-if="column.key === 'action'">
          <span primary @click="toEdit(record)">编辑</span>
          <span danger @click="openModal(record)">封禁</span>
        </template>
      </template>
    </a-table>
    <ban-modal v-model:visible="banVisible" :record="record" @ok="fetchList"></ban-modal>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/account/user";
import { RecordItem, SearchParams } from "#/api/account/user";
import BanModal from "./components/ban-modal.vue";

let payload = ref<SearchParams>({
  page: 1,
  limit: 12,
  background_img_review_state: -1,
  id: undefined,
  nick: "",
  state: -1,
  phone_number: "",
  gold_number_sort: false,
});

let count = ref(0);
let banVisible = ref<boolean>(false);
let list = ref<RecordItem[]>([]);
let record = ref<RecordItem>({});
let loading = ref(false);
let go = useGo();

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "昵称",
    dataIndex: "nick",
  },
  {
    title: "头像",
    dataIndex: "avatar_url",
    key: "avatar_url",
  },
  // {
  //   title: "背景图",
  //   dataIndex: "background_img_url	",
  //   key: "background_img_url",
  // },
  {
    title: "手机号",
    dataIndex: "phone_number",
  },
  {
    title: "金币数",
    dataIndex: "gold_number",
  },
  {
    title: "等级",
    dataIndex: "level",
  },
  {
    title: "生日",
    dataIndex: "birthday",
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
    title: "是否推荐",
    dataIndex: "recommend_time",
    key: "recommend_time",
  },
  {
    title: "是否白名单",
    dataIndex: "is_white_user",
    key: "is_white_user",
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
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
let openModal = (d: RecordItem) => {
  record.value = { ...d };
  banVisible.value = true;
};
let onTuijian = async (type: boolean, d: RecordItem) => {
  await Api.tuijian({ id: d.id, type: type ? 1 : 0 });
  fetchList();
};
let onWhite = async (type: boolean, d: RecordItem) => {
  await Api.white({ id: d.id });
  fetchList();
};

let toEdit = (record: RecordItem) => {
  go({
    path: "/account/user/detail",
    query: {
      id: record.id,
    },
  });
};

fetchList();
</script>

<script lang="ts">
export default defineComponent({
  name: "AccountUser",
});
</script>
