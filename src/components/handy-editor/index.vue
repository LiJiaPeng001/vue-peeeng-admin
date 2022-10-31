<template>
  <div id="mytextarea">
    <input id="textarea-edit" type="text" />
  </div>
</template>
<script lang="ts" setup>
import { uploadFiles } from "~/utils/upload/index";

const props = defineProps<{
  value?: string;
}>();
const emits = defineEmits<{
  (e: "update:value", v: string): void;
}>();

watchEffect(() => {
  if (props.value) HE.set(props.value);
});

let HE: any = null;
let uploadPhotoCallback = async (file: File) => {
  let images = await uploadFiles([{ file }], { type: 1 });
  return { url: images.length ? images[0].url : "" };
};
let onEditorChange = useDebounceFn((e: InputEvent) => {
  let input = e.target as HTMLElement;
  emits("update:value", input.innerHTML);
}, 1000);

let initConfig = () => {
  let heId = "textarea-edit";
  HE = window.HE.getEditor(heId, {
    autoHeight: true,
    autoFloat: false,
    topOffset: 0,
    uploadPhoto: true,
    uploadPhotoSize: 400,
    uploadCallback: uploadPhotoCallback,
    change: onEditorChange,
    uploadPhotoType: "gif,png,jpg,jpeg",
    uploadPhotoSizeError: "不能上传大于400K的图片",
    uploadPhotoTypeError: "只能上传gif,png,jpg,jpeg格式的图片",
    lang: "zh-jian",
    skin: "HandyEditor",
    externalSkin: "",
    item: [
      "bold",
      "italic",
      "strike",
      "underline",
      "fontSize",
      "fontName",
      "paragraph",
      "color",
      "backColor",
      "|",
      "center",
      "left",
      "right",
      "full",
      "indent",
      "outdent",
      "|",
      "link",
      "unlink",
      "textBlock",
      "code",
      "selectAll",
      "removeFormat",
      "trash",
      "|",
      "image",
      "expression",
      "subscript",
      "superscript",
      "horizontal",
      "orderedList",
      "unorderedList",
      "|",
      "undo",
      "redo",
      "|",
      "html",
      "|",
      "about",
    ],
  });
  HE.set(props.value);
};

onMounted(() => {
  initConfig();
});
</script>

<style lang="less">
.HandyEditor_editor {
  img {
    max-height: 200px;
  }
}
</style>
