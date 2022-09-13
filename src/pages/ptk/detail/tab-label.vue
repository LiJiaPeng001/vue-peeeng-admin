<template>
  <a-form layout="inline" :model="formState" style="margin-bottom: 12px" @finish="handleFinish">
    <a-form-item>
      <a-input v-model:value="formState.name" placeholder="请输入标签名"></a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.url" placeholder="请输入跳转地址"></a-input>
    </a-form-item>
    <a-form-item>
      <a-select ref="select" v-model:value="formState.open_type" placeholder="请选择链接跳转方式">
        <a-select-option v-for="(it, i) in linkMaps" :key="Number(i)">{{ it }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button :disabled="formState.name === '' || formState.url === ''" type="primary" html-type="submit">添加</a-button>
    </a-form-item>
  </a-form>
  <a-table :data-source="value" :columns="columns">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'open_type'">
        {{ linkMaps[record.open_type as MapKey] }}
      </template>
      <template v-if="column.dataIndex === 'action'">
        <div class="btn-action">
          <span class="danger" @click="remove(index)">删除</span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { linkMaps, MapKey } from "~/utils/utils";

interface LabelRecord {
  name: string;
  open_type: number;
  url: string;
}
const props = defineProps<{
  value: LabelRecord[];
}>();

const emits = defineEmits<{
  (e: "update:value", value: LabelRecord[]): void;
}>();

let formState = ref<LabelRecord>({
  name: "",
  open_type: 0,
  url: "",
});

const columns = [
  {
    title: "标签名",
    dataIndex: "name",
  },
  {
    title: "跳转地址",
    dataIndex: "url",
    width: 300,
  },
  {
    title: "跳转方式",
    dataIndex: "open_type",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
];

let handleFinish = () => {
  let p = { ...formState.value };
  emits("update:value", [p, ...props.value]);
  formState.value.name = "";
  formState.value.url = "";
  formState.value.open_type = 0;
};
let remove = (index: number) => {
  emits(
    "update:value",
    props.value.filter((item, i: number) => index != i)
  );
};
</script>

<style lang="less" scoped></style>
