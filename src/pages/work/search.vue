<template>
  <div class="search-form">
    <a-form :model="form" layout="inline" @finish="onFinish">
      <a-form-item label="Id" name="id">
        <a-input-number v-model:value="form.id" style="min-width: 140px" placeholder="请输入活动id"> </a-input-number>
      </a-form-item>
      <a-form-item label="活动名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入活动名称"> </a-input>
      </a-form-item>
      <a-form-item label="作品状态" name="state">
        <a-select ref="select" v-model:value="form.state">
          <a-select-option v-for="(it, i) in stateMaps" :key="Number(i)">{{ it }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { SearchPayload } from "#/api/activity/index";
import { stateMaps } from "~/utils/utils";

const props = defineProps<{ payload: SearchPayload }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<SearchPayload>({
  ...props.payload,
});

watchEffect(() => {
  form.value = { ...props.payload };
});

const onFinish = (values: any) => {
  let query = { ...props.payload, ...values, page: 1 };
  emits("update:payload", query);
  emits("ok");
};

const clear = () => {
  onFinish({
    page: 1,
    name: "",
    id: "",
    state: -1,
    limit: 12,
  });
};
</script>

<style lang="less" scoped>
.search-form {
  padding: 10px 10px 20px;
}
</style>
