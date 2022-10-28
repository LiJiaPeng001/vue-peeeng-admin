<template>
  <a-modal v-model:visible="visible" @ok="ok">
    <a-form ref="formRef" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" :rules="rules" :model="form">
      <!-- <a-form-item label="名称" name="name">
        <a-input v-model:value="form.name" placeholder="请输入名称"></a-input>
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
let visible = ref<boolean>(false);
let form = ref({});
let formRef = ref();
let rules = {
  name: [{ required: true }],
};
let ok = async () => {
  await formRef.value.validate();
};
</script>

<style lang="less" scoped></style>
