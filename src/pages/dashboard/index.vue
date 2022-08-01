<template>
  <div>
    <a-button @click="toDetail">去编辑</a-button>
    <a-table :data-source="data" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
import * as Api from "~/api/user";
import type { StcikersRecord } from "#/api/user";

let data = ref<StcikersRecord[]>([]);
let go = useGo();

let columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
  },
];

async function fetchList() {
  let { list = [] } = await Api.list();
  data.value = list;
}

onMounted(() => {
  fetchList();
});

let toDetail = function () {
  go({
    path: "/dashboard/work/detail",
    query: {
      id: Math.random() * (10 - 1) + 1,
    },
  });
};
</script>

<script lang="ts">
export default defineComponent({
  name: "DashboardWork",
});
</script>
