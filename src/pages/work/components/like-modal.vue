<template>
  <a-modal title="点赞点赞" :visible="visible" @ok="ok" @cancel="close">
    <a-form ref="formRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" :rules="rules" :model="form">
      <a-form-item :wrapper-col="{ xs: { offset: 0, span: 22 }, sm: { offset: 0, span: 22 } }">
        <a-form-item-rest>
          <a-badge color="yellow" text=" 请填写点赞上限，默认0 为无上限 如需设定关注个数 格式 “点赞上限|||关注上限”" />
        </a-form-item-rest>
      </a-form-item>
      <a-form-item label="点赞上限" name="like_limit_number">
        <a-input-number v-model:value="form.like_limit_number" style="width: 100%" placeholder="请输入名称"></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { autolike } from "~/api/work/index";
import { AutoLikeParams } from "#/api/work/index";
import { message } from "ant-design-vue";

const props = defineProps<{
  visible: boolean;
  ids: number[];
}>();

const emits = defineEmits<{
  (e: "update:visible", v: boolean): void;
  (e: "ok", v: void): void;
}>();

let form = ref<AutoLikeParams>({
  like_limit_number: 0,
});
let formRef = ref();
let rules = {
  like_limit_number: [{ required: true }],
};
let ok = async () => {
  let { ids } = props;
  await formRef.value.validate();
  await autolike({ ids, like_limit_number: form.value.like_limit_number });
  message.success("操作成功");
  emits("ok");
  close();
};
let close = () => {
  emits("update:visible", false);
};
</script>

<style lang="less" scoped>
.ant-input-number {
  width: 100%;
}
</style>
