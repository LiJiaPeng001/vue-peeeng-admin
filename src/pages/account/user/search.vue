<template>
  <div class="search-form">
    <a-form :model="form" layout="inline" @finish="onFinish">
      <a-form-item label="id" name="id">
        <a-input-number v-model:value="form.id" style="min-width: 140px" placeholder="请输入用户id"> </a-input-number>
      </a-form-item>
      <a-form-item label="昵称" name="nick">
        <a-input v-model:value="form.nick" style="min-width: 140px" placeholder="请输入昵称"> </a-input>
      </a-form-item>
      <a-form-item label="手机号" name="phone_number">
        <a-input v-model:value="form.phone_number" style="min-width: 140px" placeholder="请输入手机号"> </a-input>
      </a-form-item>
      <a-form-item label="背景图审核" name="background_img_review_state">
        <a-select v-model:value="form.background_img_review_state" placeholder="请选择背景图审核" style="min-width: 120px">
          <a-select-option :key="-1">全部</a-select-option>
          <a-select-option :key="0">审核中</a-select-option>
          <a-select-option :key="1">审核成功</a-select-option>
          <a-select-option :key="2">审核失败</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" name="state">
        <a-select v-model:value="form.state" placeholder="请选择用户状态" style="min-width: 120px">
          <a-select-option :key="-1">全部</a-select-option>
          <a-select-option :key="0">正常</a-select-option>
          <a-select-option :key="1">临时封禁</a-select-option>
          <a-select-option :key="2">永久封禁</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="金币数降序" name="state">
        <a-switch v-model:checked="form.gold_number_sort"></a-switch>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { SearchParams } from "#/api/account/user";

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
  });
};
</script>

<style lang="less" scoped>
.search-form {
  padding: 10px 10px 8px;
  .ant-form-item {
    margin-bottom: 12px;
  }
}
</style>
