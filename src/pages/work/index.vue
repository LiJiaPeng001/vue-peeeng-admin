<template>
  <div class="container">
    <Search v-model:payload="payload" @ok="fetchList" />
    <div class="btns">
      <a-button size="small" style="margin: 0 8px 10px 0" :type="selectedRowKeys.length ? 'primary' : 'default'" @click="edit(1)">批量1分</a-button>
      <a-button size="small" style="margin: 0 8px 10px 0" :type="selectedRowKeys.length ? 'primary' : 'default'" @click="edit(2)">批量2分</a-button>
      <a-button size="small" style="margin: 0 8px 10px 0" :type="selectedRowKeys.length ? 'primary' : 'default'" @click="edit(3)">批量自赞</a-button>
    </div>
    <a-table
      row-key="id"
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 1200 }"
      :row-selection="rowSelection"
      :row-class-name="rowClassName"
      @change="onChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'real_img_list'">
          <my-image v-if="record.tag_type == 0" :width="50" :height="50" :images="text.map((item:any) => item.file_name)"></my-image>
          <my-video v-if="record.tag_type == 2" :width="50" :height="50" :poster="record.cover_url" :url="text[0].file_name"></my-video>
        </template>
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span class="primary" @click="toEdit(text.id)">编辑</span>
            <span class="primary" @click="toEdit(text.id)">通过</span>
          </div>
        </template>
      </template>
    </a-table>
    <like-modal v-model:visible="visible" :ids="selectedRowKeys"></like-modal>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/work/index";
import { RecordItem, SearchPayload } from "#/api/work/index";
import { message, Modal } from "ant-design-vue";
import LikeModal from "./components/like-modal.vue";

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

let selectedRowKeys = ref<number[]>([]);
let count = ref(0);
let visible = ref<boolean>(false);
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
    title: "相册",
    dataIndex: "real_img_list",
    key: "real_img_list",
  },
  {
    title: "作品来源",
    dataIndex: "work_affiliation",
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
const onSelectChange = (keys: number[]) => {
  selectedRowKeys.value = keys;
};
let rowSelection = { fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange };

fetchList();

let toEdit = (id: number) => {
  go({
    path: "/work/detail",
    query: { id },
  });
};
let rowClassName = (record: RecordItem) => {
  let { is_illegal, delete_time } = record;
  return is_illegal ? "is_illegal" : delete_time ? "delete_time" : null;
};
let edit = async (v: number) => {
  if (!selectedRowKeys.value.length) return message.error("请选择作品");
  if (v == 1 || v == 2) {
    Modal.confirm({
      content: `您选中的作品将标记为${v}分，未通过作品将会通过`,
      async onOk() {
        await Api.check({ score: v, ids: selectedRowKeys.value });
        message.success("设置分数成功");
        fetchList();
        selectedRowKeys.value = [];
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  }
  if (v == 3) visible.value = true;
};
</script>

<script lang="ts">
export default defineComponent({
  name: "WorkList",
});
</script>

<style scoped>
.ant-table-striped :deep(.is_illegal) td {
  background-color: #ffe8eb;
}
.ant-table-striped :deep(.delete_time) td {
  background-color: #e2e2e2;
}
</style>
