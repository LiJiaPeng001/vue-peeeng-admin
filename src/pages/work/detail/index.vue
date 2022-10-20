<template>
  <div class="container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="基本信息">
        <basic-info :record="data"></basic-info>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { RecordItem } from "#/api/work";
import { detail } from "~/api/work/index";
import BasicInfo from "./components/basic-info.vue";

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
