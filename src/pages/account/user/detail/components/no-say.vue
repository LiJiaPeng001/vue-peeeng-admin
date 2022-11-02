<template>
  <a-form ref="formRef" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form" @finish="onFinish">
    <a-form-item label="禁言时长" name="end_time">
      <a-input-number v-model:value="form.hour" style="min-width: 120px" placeholder="请输入禁言时间（小时）">
        <template #addonAfter>小时</template>
      </a-input-number>
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 5 } }">
      <a-form-item-rest> 当前禁言时间：{{ record.banned_to_post_deadline || "无" }} </a-form-item-rest>
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 5 } }">
      <a-button :loading="loading" type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import * as Api from "~/api/account/user";
import type { Rule } from "ant-design-vue/es/form";
import { RecordItem, NoSayParams } from "#/api/account/user";

let loading = ref(false);

const props = defineProps<{
  record: RecordItem;
}>();

const emits = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "ok"): void;
}>();
let form = ref<NoSayParams>({
  hour: 1,
});

let rules: Record<string, Rule[]> = {
  name: [{ required: true }],
};
let onFinish = async () => {
  loading.value = true;
  await Api.nosay({
    ...form.value,
    id: props.record.id,
  }).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  message.success("编辑成功");
  loading.value = false;
  close();
  emits("ok");
};

let close = () => {
  emits("update:visible", false);
};
</script>

<style lang="less" scoped></style>
