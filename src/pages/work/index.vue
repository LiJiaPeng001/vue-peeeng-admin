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
        <template v-if="column.key === 'id'">
          <a-button size="small" @click="toWorkUrl(record.id)">{{ text }}</a-button>
        </template>
        <template v-if="column.key === 'uid'">
          <a-button size="small" @click="changeUid(text)">{{ text }}</a-button>
        </template>
        <template v-if="column.key === 'real_img_list'">
          <my-image v-if="record.tag_type == 0" :width="50" :height="50" :images="text.map((item:any) => item.file_name)"></my-image>
          <my-video v-if="record.tag_type == 2" :width="50" :height="50" :poster="record.cover_url" :url="text[0].file_name"></my-video>
        </template>
        <template v-if="column.key === 'compile_choiceness_time'">
          <a-switch v-if="record.review_state == 1 && record.activity_id" :checked="text ? true : false" @change="changeMode(record)"></a-switch>
          <span v-else>-</span>
        </template>
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span class="primary" @click="toEdit(text.id)">编辑</span>
            <span v-if="text.review_state == 0 || text.review_state == 1" class="primary" @click="check(1, text)">{{ text.review_state == 1 ? "分数" : "通过" }}</span>
            <span v-if="text.review_state == 0" class="danger" @click="check(0, text)">拒绝</span>
            <span v-if="text.review_state == 1" :class="text.is_auto_like ? 'danger' : 'primary'" @click="openLike(text)">{{ text.is_auto_like ? "取消点赞" : "点赞" }}</span>
          </div>
        </template>
      </template>
    </a-table>
    <like-modal v-model:visible="visible" :ids="selectedRowKeys" @ok="fetchList"></like-modal>
    <resolve-modal v-model:visible="resolveVisible" :record="record" @ok="fetchList"></resolve-modal>
    <reject-modal v-model:visible="rejectVisible" :record="record" @ok="fetchList"></reject-modal>
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue";
import * as Api from "~/api/work/index";
import { RecordItem, SearchPayload } from "#/api/work/index";
import { message, Modal } from "ant-design-vue";
import LikeModal from "./components/like-modal.vue";
import ResolveModal from "./components/resolve-modal.vue";
import RejectModal from "./components/reject-modal.vue";

let communityUrl = import.meta.env.VITE_COMMUNITY_URL;

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
let record = ref<RecordItem>({});
let visible = ref<boolean>(false);
let resolveVisible = ref<boolean>(false);
let rejectVisible = ref<boolean>(false);
let list = ref<RecordItem[]>([]);
let go = useGo();
let loading = ref(false);

let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
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
    key: "uid",
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
    title: "活动精选",
    dataIndex: "compile_choiceness_time",
    key: "compile_choiceness_time",
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    width: 180,
  },
]);

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
let check = (state: number, data: RecordItem) => {
  record.value = data;
  if (state == 1) resolveVisible.value = true;
  else rejectVisible.value = true;
};
let rowClassName = (record: RecordItem) => {
  let { is_illegal, delete_time } = record;
  return is_illegal ? "is_illegal" : delete_time ? "delete_time" : null;
};
let toWorkUrl = (id: number) => {
  window.open(`${communityUrl}/works/${id}`);
};
let changeUid = (uid: number) => {
  payload.value.uid = uid;
  payload.value.page = 1;
  fetchList();
};
let openLike = async (v: RecordItem) => {
  let { id = 0, is_auto_like = false } = v;
  if (is_auto_like) {
    await Api.stopautolike({ id });
    message.success("已取消自动点赞");
    fetchList();
  } else {
    selectedRowKeys.value = [id];
    edit(3);
  }
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
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  }
  if (v == 3) visible.value = true;
};
let changeMode = async (record: RecordItem) => {
  record.compile_choiceness_time = record.compile_choiceness_time ? "" : "1";
  await Api.choiceness({ id: record.id });
};
</script>

<script lang="ts">
export default defineComponent({
  name: "WorkList",
});
</script>

<style lang="less">
.ant-table-tbody {
  .is_illegal {
    td {
      background-color: #ffe8eb;
    }
    // .ant-table-cell-row-hover {
    //   background-color: #ffe8eb !important;
    // }
  }
}
.ant-table-tbody {
  .delete_time {
    td {
      background-color: #e2e2e2;
    }
    // .ant-table-cell-row-hover {
    //   background-color: #e2e2e2 !important;
    // }
  }
}
</style>
