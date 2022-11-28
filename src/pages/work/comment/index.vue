<template>
  <div>
    <Search v-model:payload="payload" @ok="fetchList" />
    <a-button size="small" style="margin: 0 8px 10px 0" :type="selectedRowKeys.length ? 'primary' : 'default'" @click="remove()">批量删除</a-button>
    <a-table
      row-key="id"
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 1000 }"
      :row-selection="rowSelection"
      @change="onChange"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span danger @click="remove(text)">删除</span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/work/comment";
import { RecordItem, SearchPayload } from "#/api/work/comment";
import { message, Modal } from "ant-design-vue";

let payload = ref<SearchPayload>({
  page: 1,
  limit: 12,
  comment_id: undefined,
  works_id: undefined,
  source_uid: undefined,
  select_type: 0,
  nick: "",
  comment: "",
});

let count = ref(0);
let list = ref<RecordItem[]>([]);
let loading = ref(false);
let selectedRowKeys = ref<number[]>([]);

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    fixed: "left",
    width: 100,
  },
  {
    title: "作品ID",
    dataIndex: "work_id",
  },
  {
    title: "评论人ID",
    dataIndex: "source_uid",
  },
  {
    title: "评论人名",
    dataIndex: "user_nick",
  },
  {
    title: "评论内容",
    dataIndex: "content",
  },
  {
    title: "举报次数",
    dataIndex: "inform_num",
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

const onSelectChange = (keys: number[]) => {
  selectedRowKeys.value = keys;
};
let rowSelection = { fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange };

let fetchList = async () => {
  selectedRowKeys.value = [];
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

let remove = (record?: RecordItem) => {
  let ids: number[] = [];
  ids = record && record.id ? [record.id] : selectedRowKeys.value;
  Modal.confirm({
    content: `确定删除？`,
    async onOk() {
      await Api.remove({ ids });
      message.success("删除成功");
      fetchList();
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
};
</script>

<script lang="ts">
export default defineComponent({
  name: "WorkComment",
});
</script>
