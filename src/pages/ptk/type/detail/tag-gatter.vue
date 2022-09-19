<template>
  <div class="tag-gatter">
    <a-button style="margin-bottom: 10px" type="primary" @click="edit">添加</a-button>
    <div class="tags middle-flex">
      <div v-for="it in tags" :key="it.id" class="tag middle-flex" :class="{ 'active-tag': value?.some(item => item == it.id) }" @click="select(it.id)">
        <span class="text">{{ it.name }}</span>
        <EditOutlined @click.stop="edit(it)"></EditOutlined>
        <a-popconfirm title="您确定要删除嘛?" ok-text="是" cancel-text="否" @click.stop @confirm="remove(it)">
          <DeleteOutlined></DeleteOutlined>
        </a-popconfirm>
      </div>
    </div>
    <a-modal></a-modal>
  </div>
</template>

<script lang="ts" setup>
import { TypeRecord, TagRecord } from "#/api/ptkType";

const props = defineProps<{
  value: TypeRecord["community_camera_tag_type_ids"];
  tags: TagRecord[];
}>();
const emits = defineEmits<{
  (e: "update:value", value: TypeRecord["community_camera_tag_type_ids"]): void;
}>();

let edit = (record: TagRecord) => {
  console.log(record);
};
let remove = (record: TagRecord) => {
  console.log(record);
};
let select = (id: number) => {
  let ids = [...props.value];
  let current = props.value.findIndex((item: number) => item == id) as number;
  if (current > -1) ids.splice(current, 1);
  else ids.push(id);
  emits("update:value", ids);
};
</script>

<style lang="less" scoped>
.tag-gatter {
  position: relative;
  .tags {
    flex-wrap: wrap;
  }
  .tag {
    position: relative;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: 0.2s linear;
    margin-right: 10px;
    &:hover {
      border-color: @primary-color;
      color: @primary-color;
    }
    .text {
      margin-right: 4px;
      padding: 6px 8px;
    }
    .anticon {
      margin-right: 8px;
    }
  }
  .active-tag {
    .text {
      background-color: @primary-color !important;
      color: #fff !important;
    }
  }
}
</style>
