<template>
  <a-form :scroll-to-first-error="{ block: 'center' }" :rules="rules" :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" @finish="onFinish">
    <!-- <a-form-item label="发布官号" name="official_uid">
      <a-select ref="select" v-model:value="form.official_uid" placeholder="请选择发布官号">
        <a-select-option v-for="it in users" :key="it.id">{{ it.nick }}</a-select-option>
      </a-select>
    </a-form-item> -->
    <a-form-item label="奖项清单" name="award_config_id">
      <a-select ref="select" v-model:value="form.award_config_id" placeholder="请选择奖项清单">
        <a-select-option v-for="it in pList" :key="it.id">{{ it.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ xs: { offset: 0 }, sm: { offset: 4 } }">
      <a-button :loading="loading" type="primary" html-type="submit" style="margin-right: 6px">保存</a-button>
      <a-button @click="router.back()">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { award } from "~/api/work/index";
import { list as officialList } from "~/api/account/official";
import { list as prizeList } from "~/api/work/prize";
import { RecordItem } from "#/api/work/index";
import { RecordItem as PrizeRecord } from "#/api/work/prize";
import { RecordItem as OfficialRecord } from "#/api/account/official";
import { message } from "ant-design-vue";

const props = defineProps<{
  record: RecordItem;
}>();

let router = useRouter();
let form = ref<RecordItem>({
  award_config_id: props.record.award_config_id || undefined,
});
let loading = ref<boolean>(false);
let rules = {
  award_config_id: [{ required: true }],
};
let pList = ref<PrizeRecord[]>([]);
let users = ref<OfficialRecord[]>([]);

watchEffect(() => {
  form.value.award_config_id = props.record.award_config_id || undefined;
});

let onFinish = async () => {
  let { id = 0 } = props.record;
  await award({
    id,
    ...form.value,
  });
  message.success("保存成功");
};

let fetchPrize = async () => {
  let { list } = await prizeList({ limit: 100, state: 1 });
  pList.value = list;
};
let fetchOfficial = async () => {
  let { official_users } = await officialList();
  users.value = official_users;
};

fetchPrize();
fetchOfficial();
</script>

<style lang="less" scoped></style>
