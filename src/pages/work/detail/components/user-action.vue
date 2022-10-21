<template>
  <a-form ref="formRef" :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="用户类型" name="sex">
      <a-select v-model:value="form.sex" placeholder="请选择用户类型" @select="fetchUser">
        <a-select-option v-for="(it, i) in sexMaps" :key="Number(i)">{{ it }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="马甲号" name="uid">
      <a-select v-model:value="form.uid" placeholder="请选择马甲号" @select="fetchUserAction">
        <a-select-option v-for="it in users" :key="it.id">{{ it.nick }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item v-if="content" :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
      <a-form-item-rest>
        <a-badge style="margin: 6px 0" color="yellow" :text="content" />
      </a-form-item-rest>
    </a-form-item>
    <a-form-item label="点赞操作">
      <a-form-item-rest>
        <a-button type="primary" @click="onLike(1)">点赞</a-button>
        <a-button type="danger" @click="onLike(0)">取消点赞</a-button>
      </a-form-item-rest>
    </a-form-item>
    <a-form-item label="评论内容" name="content">
      <a-input v-model:value="form.content" placeholder="请输入评论内容"> </a-input>
    </a-form-item>
    <a-form-item label="评论操作">
      <a-form-item-rest>
        <a-button type="primary" @click="onComment">发送</a-button>
      </a-form-item-rest>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { workList, checkToolUser, like, nolike, comment } from "~/api/account/toolUser";
import { RecordItem, PayloadParams } from "#/api/account/toolUser";
import { message } from "ant-design-vue";

const props = defineProps<{
  record: RecordItem;
}>();

let form = ref<PayloadParams>({
  sex: -1,
  uid: undefined,
});

let rules = {
  sex: [{ required: true }],
  uid: [{ required: true }],
  content: [{ required: true }],
};
let formRef = ref();
let users = ref<RecordItem[]>([]);
let content = ref<string>("");
let sexMaps = {
  "-2": "舔狗",
  "-1": "全部",
  "0": "未知",
  "1": "男",
  "2": "女",
};

let onComment = async () => {
  await formRef.value.validate();
  await comment({
    work_id: props.record.id,
    uid: form.value.uid,
    content: form.value.content,
  });
  message.success("保存成功");
};

let onLike = async (state: number) => {
  let payload = { id: props.record.id, uid: form.value.uid };
  if (state == 1) await like(payload);
  else await nolike(payload);
  message.success(state == 0 ? "已取消点赞" : "成功点赞");
};

let fetchUser = async () => {
  let list = await workList({ work_id: props.record.id, sex: form.value.sex });
  users.value = list;
};
let fetchUserAction = async () => {
  let { uid } = form.value;
  let d = await checkToolUser({ work_id: props.record.id, uid });
  content.value = d.content;
};
fetchUser();
</script>

<style lang="less" scoped></style>
