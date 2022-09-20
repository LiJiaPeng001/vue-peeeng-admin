<template>
  <a-select
    :value="value"
    :filter-option="filterOption"
    mode="multiple"
    :options="tags"
    :field-names="{ label: 'name', value: 'id', options: 'list' }"
    placeholder="请选择标签"
    @change="handleChange"
  >
  </a-select>
</template>
<script lang="ts" setup>
import { TypeRecord, TagRecord } from "#/api/ptkType";

defineProps<{
  value: TypeRecord["label_ids"];
  tags: TagRecord[];
}>();
const emits = defineEmits<{
  (e: "update:value", value: TypeRecord["label_ids"]): void;
}>();

const handleChange = (ids: number[]) => {
  emits("update:value", ids);
};
const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
