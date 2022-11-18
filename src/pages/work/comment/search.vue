<template>
  <div class="search-form">
    <a-form :model="form" layout="inline" @finish="onFinish">
      <a-form-item label="评论id" name="comment_id">
        <a-input-number v-model:value="form.comment_id" style="min-width: 140px" placeholder="请输入评论id"> </a-input-number>
      </a-form-item>
      <a-form-item label="作品id" name="works_id">
        <a-input-number v-model:value="form.works_id" style="min-width: 140px" placeholder="请输入作品id"> </a-input-number>
      </a-form-item>
      <a-form-item label="评论人id" name="source_uid">
        <a-input-number v-model:value="form.source_uid" style="min-width: 140px" placeholder="请输入评论人id"> </a-input-number>
      </a-form-item>
      <a-form-item label="回复类型" name="select_type">
        <a-select ref="select" v-model:value="form.select_type" style="min-width: 180px">
          <a-select-option v-for="(it, i) in typeMaps" :key="Number(i)">{{ it }}</a-select-option>
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
import { SearchPayload } from "#/api/work/comment";

const props = defineProps<{ payload: SearchPayload }>();
const emits = defineEmits(["update:payload", "ok"]);

let form = ref<SearchPayload>({
  ...props.payload,
});

watchEffect(() => {
  form.value = { ...props.payload };
});

let typeMaps = {
  0: "全部",
  1: "用户回复马甲号评论",
  2: "用户评论马甲号作品",
};

const onFinish = (values: SearchPayload) => {
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
