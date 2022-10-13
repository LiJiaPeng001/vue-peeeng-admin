<template>
  <a-modal :visible="visible" :footer="null" :title="`${form.id ? '编辑' : '新增'}`" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" :rules="rules" :model="form" @finish="onFinish">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入名称"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 3 } }">
        <a-button :loading="loading" type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import * as Api from "~/api/work/prize";
import type { Rule } from "ant-design-vue/es/form";
import { RecordItem } from "#/api/work/prize";

let loading = ref(false);

const props = defineProps<{
  visible?: boolean;
  record?: RecordItem;
}>();

const emits = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

let form = ref<RecordItem>({
  name: "",
  state: 0,
  ...props.record,
});

watchEffect(() => {
  form.value = { ...props.record };
});

let rules: Record<string, Rule[]> = {
  name: [{ required: true }],
  state: [{ required: true }],
};
let onFinish = async () => {
  loading.value = true;
  await Api.edit(form.value).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  message.success("保存成功");
  loading.value = false;
  close();
};

let close = () => {
  emits("update:visible", false);
};
</script>

<style lang="less" scoped></style>
