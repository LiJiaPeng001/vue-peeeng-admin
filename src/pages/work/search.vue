<template>
  <div class="search-form">
    <a-form :model="form" layout="inline" @finish="onFinish">
      <a-form-item label="作品id" name="id">
        <a-input-number v-model:value="form.id" style="min-width: 140px" placeholder="请输入作品id"> </a-input-number>
      </a-form-item>
      <a-form-item label="活动id" name="activity_id">
        <a-input-number v-model:value="form.activity_id" style="min-width: 140px" placeholder="请输入活动id"> </a-input-number>
      </a-form-item>
      <a-form-item label="话题id" name="topic_id">
        <a-input-number v-model:value="form.topic_id" style="min-width: 140px" placeholder="请输入话题id"> </a-input-number>
      </a-form-item>
      <a-form-item label="用户id" name="uid">
        <a-input-number v-model:value="form.uid" style="min-width: 140px" placeholder="请输入用户id"> </a-input-number>
      </a-form-item>
      <a-form-item label="用户昵称" name="nick">
        <a-input v-model:value="form.nick" placeholder="请输入用户昵称"> </a-input>
      </a-form-item>
      <a-form-item label="手机号" name="phone_number">
        <a-input v-model:value="form.phone_number" placeholder="请输入手机号"> </a-input>
      </a-form-item>
      <a-form-item label="排序" name="order">
        <a-select v-model:value="form.order" style="min-width: 140px" placeholder="请选择排序">
          <a-select-option :key="1">最新</a-select-option>
          <a-select-option :key="2">最热</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="分数" name="score">
        <a-select v-model:value="form.score" style="min-width: 140px" placeholder="请选择分数">
          <a-select-option :key="0">全部</a-select-option>
          <a-select-option :key="1">1分</a-select-option>
          <a-select-option :key="2">2分</a-select-option>
          <a-select-option :key="3">3分</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" name="review_state">
        <a-select v-model:value="form.review_state" style="min-width: 140px" placeholder="请选择状态">
          <a-select-option :key="-1">全部</a-select-option>
          <a-select-option :key="0">未审核</a-select-option>
          <a-select-option :key="1">审核成功</a-select-option>
          <a-select-option :key="2">审核失败</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="时间" name="time">
        <a-range-picker v-model:value="time" show-time />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { SearchPayload } from "#/api/work/index";
import { Dayjs } from "dayjs";

const props = defineProps<{ payload: SearchPayload }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<SearchPayload>({
  ...props.payload,
});

let time = ref<Dayjs[]>([]);

watchEffect(() => {
  form.value = { ...props.payload };
});

const onFinish = (values: SearchPayload) => {
  let query = { ...props.payload, ...values, page: 1 };
  if (time.value.length) {
    query.start_time = time.value[0].format("YYYY-MM-DD HH:mm:ss");
    query.end_time = time.value[1].format("YYYY-MM-DD HH:mm:ss");
  }
  emits("update:payload", query);
  emits("ok");
};

const clear = () => {
  time.value = [];
  onFinish({
    page: 1,
    id: undefined,
    activity_id: undefined,
    topic_id: undefined,
    uid: undefined,
    nick: "",
    phone_number: "",
    score: 0,
    order: 1,
    review_state: 0,
    limit: 12,
    start_time: "",
    end_time: "",
  });
};
</script>
