<template>
  <div>
    <a-button animate-fade-in text="text-sm dark:red" @click="toggleDark()">222</a-button>
    <a-select style="min-width: 120px">
      <a-select-option :key="0">活动</a-select-option>
      <a-select-option :key="1">话题类型</a-select-option>
      <a-select-option :key="2">话题</a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts" setup></script>
<script lang="ts">
export default defineComponent({
  name: "Test",
});
</script>
