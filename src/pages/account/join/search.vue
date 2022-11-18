<template>
  <div class="search-form">
    <a-form :model="form" layout="inline" @finish="onFinish">
      <a-form-item label="列表类型" name="type">
        <a-select v-model:value="form.type" style="min-width: 120px">
          <a-select-option :key="0">活动</a-select-option>
          <a-select-option :key="1">话题类型</a-select-option>
          <a-select-option :key="2">话题</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="用户id" name="uid">
        <a-input-number v-model:value="form.uid" style="min-width: 140px" placeholder="请输入用户id"> </a-input-number>
      </a-form-item>
      <a-form-item label="目标id" name="source_id">
        <a-input-number v-model:value="form.source_id" style="min-width: 140px" placeholder="请输入目标id"> </a-input-number>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { SearchParams } from "#/api/account/join";

const props = defineProps<{ payload: SearchParams }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<SearchParams>({
  ...props.payload,
});

watchEffect(() => {
  form.value = { ...props.payload };
});

const onFinish = (values: SearchParams) => {
  let query = { ...props.payload, ...values, page: 1 };
  emits("update:payload", query);
  emits("ok");
};

const clear = () => {
  onFinish({
    page: 1,
    limit: 12,
    uid: undefined,
    source_id: undefined,
    type: 0,
  });
};
</script>
