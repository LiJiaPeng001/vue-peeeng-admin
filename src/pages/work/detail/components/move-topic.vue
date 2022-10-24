<template>
  <a-form :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
    <a-form-item label="话题列表" name="topics">
      <a-cascader v-model:value="form.topics" :field-names="{ label: 'name', value: 'id', children: 'list' }" :options="topics" placeholder="请选择话题" />
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
      <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
      <a-button @click="router.back()">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { moveTopic } from "~/api/work/index";
import { allTopics } from "~/api/topic/index";
import { RecordItem } from "#/api/work/index";
import { message } from "ant-design-vue";

const props = defineProps<{
  record: RecordItem;
}>();

let router = useRouter();
let form = ref({
  topics: [],
});
let loading = ref<boolean>(false);
let rules = {
  topics: [{ required: true, message: "请选择话题" }],
};
let topics = ref<RecordItem[]>([]);

let fetchTopics = async () => {
  let { list } = await allTopics();
  topics.value = list;
};

let onFinish = async () => {
  let { topics = [] } = form.value;
  let channel_id = 0;
  let topic_id = 0;
  if (topics.length == 3) {
    channel_id = topics[0];
    topic_id = topics[2];
  }
  if (!topic_id) return message.error("请选择三级话题");
  loading.value = true;
  await moveTopic({
    id: props.record.id,
    channel_id,
    topic_id,
  }).catch(() => {
    loading.value = false;
    return Promise.reject();
  });
  loading.value = false;
  message.success("保存成功");
};

fetchTopics();
</script>

<style lang="less" scoped></style>
