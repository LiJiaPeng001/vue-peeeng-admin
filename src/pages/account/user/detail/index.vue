<template>
  <div class="container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="基本信息">
        <basic-info :record="data"></basic-info>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="禁言">
        <no-say :record="data" @ok="fetchData"></no-say>
      </a-tab-pane>
      <a-tab-pane :key="3" tab="背景图">
        <bg-action></bg-action>
      </a-tab-pane>
      <!-- <a-tab-pane :key="5" tab="拍同款">
        <camera-tag :record="data"></camera-tag>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="颁奖">
        <give-prize :record="data"></give-prize>
      </a-tab-pane>
      <a-tab-pane :key="3" tab="马甲号相关">
        <user-action :record="data"></user-action>
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { RecordItem } from "#/api/account/user";
import { detail } from "~/api/account/user";
import BasicInfo from "./components/basic-info.vue";
import NoSay from "./components/no-say.vue";
import BgAction from "./components/bg-action.vue";

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
