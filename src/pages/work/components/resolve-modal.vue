vue
<template>
  <a-modal title="分数" :visible="visible" @ok="ok" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form">
      <a-form-item label="分数" name="score">
        <a-select v-model:value="form.score" style="min-width: 140px" placeholder="请选择分数" @select="onSelect">
          <a-select-option :key="1">1分</a-select-option>
          <a-select-option :key="2">2分</a-select-option>
          <a-select-option :key="3">3分</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="form.score == 3" label="首页分栏" name="subfield_ids">
        <a-select
          v-model:value="form.subfield_ids"
          show-search
          allow-clear
          mode="multiple"
          :filter-option="filterOption"
          :options="tabList"
          :field-names="{ label: 'name', value: 'id' }"
          placeholder="请选择首页分栏 "
        >
        </a-select>
      </a-form-item>
      <a-form-item label="金币数" name="gold_number">
        <a-input-number v-model:value="form.gold_number" placeholder="请输入金币数量"></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { homeTabs } from "~/api/index";
import { resolve } from "~/api/work/index";
import { RecordItem, ResolveRecord } from "#/api/work/index";
import { HomeTabsRecord } from "#/api/index";
import { message } from "ant-design-vue";

const props = defineProps<{
  visible: boolean;
  record: RecordItem;
}>();

const emits = defineEmits<{
  (e: "update:visible", v: boolean): void;
  (e: "ok", v: void): void;
}>();

let form = ref<ResolveRecord>({
  score: 2,
  gold_number: 0,
  subfield_ids: [],
});
let tabList = ref<HomeTabsRecord[]>([]);
let formRef = ref();
let rules = {
  score: [{ required: true }],
};
let filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
let onSelect = (e: number) => {
  if (e == 3) {
    let { subfield_ids = [] } = form.value;
    let hasAll = subfield_ids.some(it => it == 0);
    if (!hasAll) (form.value.subfield_ids as number[]).unshift(0);
  } else {
    form.value.subfield_ids = [];
  }
};
let ok = async () => {
  let { id = 0 } = props.record;
  await formRef.value.validate();
  await resolve({
    id,
    ...form.value,
  });
  message.success("操作成功");
  emits("ok");
  close();
};
let close = () => {
  emits("update:visible", false);
};

let fetchTabs = async () => {
  let { list } = await homeTabs();
  tabList.value = list;
};

fetchTabs();
</script>

<style lang="less" scoped>
.ant-input-number {
  width: 100%;
}
</style>
