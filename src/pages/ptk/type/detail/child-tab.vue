<template>
  <div class="container">
    <a-button type="primary" style="margin-bottom: 12px" @click="toEdit">添加</a-button>
    <a-table
      :loading="loading"
      :data-source="list"
      :columns="columns"
      :pagination="{ current: payload.page, pageSize: payload.limit, total: count, pageSizeOptions: ['12', '15', '20'] }"
      :scroll="{ x: 800 }"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="btn-action">
            <span primary @click="toEdit(record)">编辑</span>
          </div>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" :footer="null" :title="`${form.id ? '编辑' : '新增'}`">
      <a-form ref="formRef" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" :rules="rules" :model="form" @finish="onFinish">
        <a-form-item label="状态" name="state">
          <a-switch v-model:checked="form.state" checked-children="上架" un-checked-children="下架" />
        </a-form-item>
        <a-form-item label="名称" name="name">
          <a-input v-model:value="form.name" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="权重" name="sort">
          <a-input-number v-model:value="form.sort" style="min-width: 140px" placeholder="请输入权重"></a-input-number>
        </a-form-item>
        <a-form-item label="简介" name="desc">
          <a-textarea v-model:value="form.desc" :maxlength="200" :rows="4" placeholder="请输入简介"></a-textarea>
        </a-form-item>
        <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 3 } }">
          <a-button :loading="editLoading" type="primary" html-type="submit" style="margin-right: 10px">保存</a-button>
          <a-button @click="visible = false">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import * as Api from "~/api/ptk/childTab";
import { TypePayload, TypeRecord } from "#/api/ptkChildType";

let route = useRoute();

let { page = 1, state = -1 } = route.query;
let id = ref(Number(route.query.id || 0));

let payload = ref<TypePayload>({
  camera_tag_tab_id: id.value,
  page: Number(page),
  state: Number(state),
});

let count = ref(0);
let list = ref<TypeRecord[]>([]);
let form = ref<TypeRecord>({
  sort: 0,
});
let loading = ref<boolean>(false);
let editLoading = ref<boolean>(false);
let visible = ref<boolean>(false);
let rules: Record<string, Rule[]> = {
  name: [{ required: true }],
};

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
    key: "name",
  },
  {
    title: "状态",
    dataIndex: "state_text",
  },
  {
    title: "权重",
    dataIndex: "sort",
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

let onFinish = async () => {
  editLoading.value = true;
  form.value.camera_tag_tab_id = id.value;
  await Api.edit(form.value).catch(() => {
    editLoading.value = false;
    return Promise.reject();
  });
  message.success("保存成功");
  editLoading.value = false;
  visible.value = false;
  fetchList();
};

fetchList();

let toEdit = async (d: TypeRecord) => {
  visible.value = true;
  if (d.id) {
    form.value = await Api.detail({ id: d.id });
    form.value.state = form.value.state ? true : false;
  } else {
    form.value = { sort: 0 };
  }
};
onActivated(() => {
  if (Number(route.query.id) != id.value) {
    id.value = Number(route.query.id);
    list.value = [];
  }
});
</script>
