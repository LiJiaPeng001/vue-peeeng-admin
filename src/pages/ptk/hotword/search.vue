<template>
  <div class="search-form">
    <a-form :model="form" layout="inline" @finish="onFinish">
      <a-form-item label="次数" name="number">
        <a-input-number v-model:value="form.number" style="min-width: 160px" placeholder="请输入次数下限"></a-input-number>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { TypePayload } from "#/api/ptkHotword";

const props = defineProps<{ payload: TypePayload }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<TypePayload>({
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
    number: 10,
    limit: 12,
  });
};
</script>

<style lang="less" scoped>
.search-form {
  padding: 10px 10px 20px;
}
</style>
