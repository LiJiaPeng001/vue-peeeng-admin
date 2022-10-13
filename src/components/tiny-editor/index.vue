<template>
  <div class="tiny-editor">
    <tiny-editor :id="tinymceId" v-model="myValue" :init="init" @change="onchangeInput"></tiny-editor>
  </div>
</template>

<script lang="ts" setup>
import TinyEditor from "@tinymce/tinymce-vue";

const props = defineProps<{
  value: string;
}>();

let tinymceId = "";
let myValue = ref<string>();

watchEffect(() => {
  myValue.value = props.value;
});

let init = {
  language: "zh_CN",
  images_upload_handler() {
    console.log("eee");
  },
};
let onchangeInput = function (e: any) {
  console.log(e, "eee");
};
</script>

<style lang="less" scoped>
.tiny-editor {
  width: 100%;
}
</style>
