<template>
  <a-modal title="编辑" :visible="visible" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form">
      <a-form-item label="作品id" name="works_id">
        <a-input-number v-model:value="form.works_id" style="min-width: 200px" placeholder="请输入作品id"></a-input-number>
      </a-form-item>
      <a-form-item label="开始时间" name="start_time">
        <a-date-picker v-model:value="form.start_time" show-time />
      </a-form-item>
      <a-form-item label="结束时间" name="end_time">
        <a-date-picker v-model:value="form.end_time" show-time />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="close">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="ok">保存</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import * as Api from "~/api/activity/work";
import { RecordItem, SearchParams } from "#/api/activity/work";
import dayjs from "dayjs";
import { message } from "ant-design-vue";

const props = defineProps<{
  type: SearchParams["type"];
  visible: boolean;
  record?: RecordItem;
}>();

const emits = defineEmits<{
  (k: "update:visible", v: boolean): void;
  (k: "ok"): void;
}>();
let loading = ref<boolean>(false);
let form = ref<RecordItem>({
  ...props.record,
});
watchEffect(() => {
  if (props.record) {
    form.value = { ...props.record };
  }
});

let formRef = ref();
let rules = {
  works_id: [{ required: true }],
  start_time: [{ required: true }],
  end_time: [{ required: true }],
};
let ok = async () => {
  await formRef.value.validate();
  loading.value = true;
  let { start_time, end_time, works_id = 0 } = form.value;
  let { id = 0 } = props.record || {};
  await Api.edit({
    type: props.type,
    id,
    works_id,
    start_line: start_time ? dayjs(start_time).format("YYYY-MM-DD HH:mm:ss") : "",
    end_line: end_time ? dayjs(end_time).format("YYYY-MM-DD HH:mm:ss") : "",
  }).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  loading.value = false;
  message.success("操作成功");
  close();
  emits("ok");
};
let close = async () => {
  emits("update:visible", false);
};
</script>

<style lang="less" scoped></style>
