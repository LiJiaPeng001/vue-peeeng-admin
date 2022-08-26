<template>
  <div class="search-form">
    <a-form :model="form" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish">
      <a-form-item label="贴纸名" name="camera_tag_name">
        <a-input v-model:value="form.camera_tag_name" placeholder="请输入贴纸名"> </a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right: 8px">查询</a-button>
        <a-button type="default" @click="clear">清空</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { SearchPayload } from "#/api/ptk";

const props = defineProps<{ payload: SearchPayload }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<SearchPayload>({
  ...props.payload,
});

watchEffect(() => {
  form.value = { ...props.payload };
});

let go = useGo();
let route = useRoute();

const onFinish = (values: any) => {
  let query = { ...props.payload, ...values, page: 1 };
  emits("update:payload", query);
  emits("ok");
  go(
    {
      path: route.path,
      query,
    },
    {
      action: "replace",
    }
  );
};

const clear = () => {
  onFinish({
    camera_tag_name: "",
  });
};
</script>

<style lang="less" scoped>
.search-form {
  padding: 10px 10px 20px;
}
</style>
