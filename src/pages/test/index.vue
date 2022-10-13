<template>
  <handy-editor v-model:value="myValue"></handy-editor>
</template>
<script lang="ts" setup>
import HandyEditor from "~/components/handy-editor/index.vue";
let myValue = ref("想把你携程说以后个");
</script>
<script lang="ts">
export default defineComponent({
  name: "Test",
});
</script>
