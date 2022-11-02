<template>
  <a-modal :visible="visible" :footer="null" :title="`${form.id ? '编辑' : '新增'}`" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form" @finish="onFinish">
      <a-form-item label="状态" name="state">
        <a-select v-model:value="form.state" placeholder="请选择用户状态" style="min-width: 120px">
          <a-select-option :key="0">正常</a-select-option>
          <a-select-option :key="1">临时封禁</a-select-option>
          <a-select-option :key="2">永久封禁</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="违规信息" name="banned_text">
        <a-textarea v-model:value="form.banned_text" show-count :maxlength="200" :rows="4" placeholder="请输入违规信息"></a-textarea>
      </a-form-item>
      <a-form-item label="封禁结束时间" name="end_time">
        <a-date-picker v-model:value="form.end_time" show-time />
      </a-form-item>
      <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 3 } }">
        <a-button :loading="loading" type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import * as Api from "~/api/account/user";
import type { Rule } from "ant-design-vue/es/form";
import { RecordItem, BanParams } from "#/api/account/user";
import dayjs from "dayjs";

let loading = ref(false);

const props = defineProps<{
  visible?: boolean;
  record: RecordItem;
}>();

const emits = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "ok"): void;
}>();

let initForm = (): BanParams => {
  let { state = 0, bang_deadline = "", id = 0 } = props.record;
  return {
    bang_deadline,
    state,
    id,
    end_time: bang_deadline ? dayjs(bang_deadline) : undefined,
  };
};
let form = ref<BanParams>(initForm());

watchEffect(() => {
  form.value = initForm();
});

let rules: Record<string, Rule[]> = {
  name: [{ required: true }],
  state: [{ required: true }],
};
let onFinish = async () => {
  loading.value = true;
  let { end_time, bang_deadline } = form.value;
  form.value.bang_deadline = end_time ? dayjs(end_time).format("YYYY-MM-DD HH:mm:ss") : bang_deadline;
  await Api.ban(form.value).catch(() => {
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
