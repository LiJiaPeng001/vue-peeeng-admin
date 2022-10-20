<template>
  <a-form :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
    <a-form-item label="评论功能" name="disable_comment">
      <a-radio-group v-model:value="form.disable_comment">
        <a-radio :value="0">开启</a-radio>
        <a-radio :value="1">禁止</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
      <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
      <a-button @click="router.back()">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { edit } from "~/api/work/index";
import { RecordItem } from "#/api/work/index";
import { message } from "ant-design-vue";

const props = defineProps<{
  record: RecordItem;
}>();

let router = useRouter();
let form = ref<RecordItem>({
  ...props.record,
});
let loading = ref<boolean>(false);
let rules = {
  disable_comment: [{ required: true }],
};

watchEffect(() => {
  form.value = { ...props.record };
});

let onFinish = async () => {
  await edit(form.value);
  message.success("保存成功");
};
</script>

<style lang="less" scoped></style>
