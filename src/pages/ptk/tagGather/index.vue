<template>
  <div class="page-content">
    <!-- <Search v-model:payload="payload" @ok="fetchList" /> -->
    <a-button type="primary" style="margin-bottom: 12px" @click="toEdit">添加</a-button>
    <a-table :loading="loading" :data-source="list" :columns="columns" :scroll="{ x: 200 }" @change="fetchList">
      <template #bodyCell="{ column, record }">
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
    <a-modal v-model:visible="visible" :footer="null" :title="`${form.id ? '编辑' : '新增'}`">
      <a-form ref="formRef" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" :rules="rules" :model="form" @finish="onFinish">
        <a-form-item label="名称" name="name">
          <a-input v-model:value="form.name" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="标签" name="label_ids">
          <tag-type v-model:value="form.label_ids" :tags="typeTags"></tag-type>
        </a-form-item>
        <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 3 } }">
          <a-button :loading="editLoading" type="primary" html-type="submit">保存</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { typeTags as typeTagList } from "~/api/ptk/type";
import * as Api from "~/api/ptk/tagGather";
import { TagRecord } from "#/api/ptkType";
import TagType from "../type/detail/tag-type.vue";

let list = ref<TagRecord[]>([]);
let form = ref<TagRecord>({
  id: 0,
  name: "",
  label_ids: [],
});
let typeTags = ref<TagRecord[]>([]);
let loading = ref(false);
let editLoading = ref(false);
let visible = ref(false);
let formRef = ref();
let columns = ref([
  {
    title: "编号",
    dataIndex: "id",
    fixed: "left",
    width: 100,
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    width: 100,
  },
]);
let rules = {
  name: [{ required: true }],
  label_ids: [{ required: true, message: "请选择标签" }],
};

let fetchList = async () => {
  loading.value = true;
  let d = await Api.list().catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  loading.value = false;
  list.value = d.list;
};
let fetchTypeTags = async () => {
  let { list } = await typeTagList();
  typeTags.value = list;
};

fetchList();
fetchTypeTags();
let toEdit = async (record: TagRecord) => {
  form.value = {
    id: 0,
    name: "",
    label_ids: [],
  };
  visible.value = true;
  if (record.id) {
    form.value = await Api.detail({ id: record.id });
  }
};

let onFinish = async () => {
  editLoading.value = true;
  await Api.edit(form.value).catch(() => {
    editLoading.value = false;
    return Promise.reject();
  });
  message.success("保存成功");
  editLoading.value = false;
  visible.value = false;
  fetchList();
};
let remove = async (record: TagRecord) => {
  await Api.remove({ id: record.id });
  message.success("已删除");
  fetchList();
};
</script>

<script lang="ts">
export default defineComponent({
  name: "PtkTagGather",
});
</script>
