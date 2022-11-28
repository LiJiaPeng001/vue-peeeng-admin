<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="基本信息">
        <basic-info :record="data"></basic-info>
      </a-tab-pane>
      <a-tab-pane :key="5" tab="拍同款">
        <camera-tag :record="data"></camera-tag>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="颁奖">
        <give-prize :record="data"></give-prize>
      </a-tab-pane>
      <a-tab-pane :key="3" tab="马甲号相关">
        <user-action :record="data"></user-action>
      </a-tab-pane>
      <a-tab-pane v-if="data.real_img_list && data.review_state == 1" :key="4" tab="恢复内容">
        <find-file :record="data"></find-file>
      </a-tab-pane>
      <a-tab-pane v-if="!data.activity_id && data.review_state == 1" :key="6" tab="迁移话题">
        <move-topic :record="data"></move-topic>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { RecordItem } from "#/api/work";
import { detail } from "~/api/work/index";
import BasicInfo from "./components/basic-info.vue";
import GivePrize from "./components/give-prize.vue";
import UserAction from "./components/user-action.vue";
import FindFile from "./components/find-file.vue";
import CameraTag from "./components/camera-tag.vue";
import MoveTopic from "./components/move-topic.vue";

let route = useRoute();
// let router = useRouter();
let id = Number(route.query.id || 0);
let data = ref<RecordItem>({});
let activeKey = ref<number>(1);

let fetchData = async () => {
  let d = await detail({ id });
  data.value = d;
};

fetchData();
onActivated(() => {
  if (Number(route.query.id) != id) {
    fetchData();
    activeKey.value = 1;
  }
});
</script>

<script lang="ts">
export default defineComponent({
  name: "WorkDetail",
});
</script>
<style lang="less" scoped>
.containe {
  padding: 0 6px;
}
</style>
