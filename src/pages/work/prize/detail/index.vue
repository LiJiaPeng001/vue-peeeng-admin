<template>
  <a-modal :visible="visible" :footer="null" :title="`${form.id ? '编辑' : '新增'}`" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" :rules="rules" :model="form" @finish="onFinish">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入名称"></a-input>
      </a-form-item>
      <a-form-item label="状态" name="state">
        <a-radio-group v-model:value="form.state">
          <a-radio :value="0">无效</a-radio>
          <a-radio :value="1">有效</a-radio>
        </a-radio-group>
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
  (e: "ok"): void;
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
  let { name, state, id } = form.value;
  let d: RecordItem = {};
  d.name = name;
  d.state = state;
  d.id = id || 0;
  await Api.edit(d).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  message.success("保存成功");
  loading.value = false;
  close();
  emits("ok");
};

let close = () => {
  emits("update:visible", false);
};
</script>

<style lang="less" scoped></style>
