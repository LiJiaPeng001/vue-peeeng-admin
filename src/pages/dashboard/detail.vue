<template>
  <div>
    <a-calendar />
    <a-button @click="changeQuery">芜湖</a-button>
  </div>
</template>

<script lang="ts" setup>
let go = useGo();

function changeQuery() {
  go({
    path: "/dashboard/detail",
    query: {
      id: Math.random() * (10 - 1) + 1,
    },
  });
}

onMounted(() => {
  console.log("wuhu mounted");
});
</script>
