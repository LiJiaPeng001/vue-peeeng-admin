<template>
  <div class="tags-container">
    <div v-if="value" class="active-tag middle-flex">
      <div :style="{ backgroundImage: `url(${data?.icon_url})` }" class="cover icon">
        <span>已选择</span>
      </div>
      <span class="text">{{ data?.name }}</span>
      <span class="remove" @click="onChangeValue()"><DeleteOutlined></DeleteOutlined></span>
    </div>
    <a-badge v-if="!value && !list.length" color="yellow" :text="!list.length ? '请选择贴纸类型👆' : ''" />
    <div class="tags middle-flex">
      <div v-for="it in list" :key="it.id" class="tag cover fadeIn" :style="{ backgroundImage: `url(${it.icon_url})` }">
        <div class="mask center-flex" @click="onChangeValue(it)">选择</div>
        <div v-if="it.uid" class="is-author center-flex">无作者</div>
      </div>
    </div>
    <a-badge style="margin-top: 6px" color="yellow" text="选择贴纸将把作者回填至配置类型" />
  </div>
</template>

<script lang="ts" setup>
import { DeleteOutlined } from "@ant-design/icons-vue";

interface TagRecord {
  id: number;
  name: string;
  icon_url: string;
  uid?: number;
}

let props = defineProps<{
  record?: TagRecord;
  value?: number;
  list: TagRecord[];
}>();

let emits = defineEmits<{
  (e: "update:value", id?: number): void;
  (e: "update:record", record?: TagRecord): void;
}>();

let data = computed(() => {
  let d = props.list.find((item: TagRecord) => item.id == props.value) || { icon_url: "", name: "" };
  return d.icon_url ? d : props.record;
});

let onChangeValue = (record?: TagRecord) => {
  emits("update:value", record?.id || 0);
  emits("update:record", record || { name: "", id: 0, icon_url: "" });
};
</script>

<style lang="less" scoped>
.tags-container {
  .active-tag {
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;
    .icon {
      width: 66px;
      height: 66px;
      border-radius: 6px;
      margin-right: 12px;
      position: relative;
      overflow: hidden;
      span {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 2px 4px;
        border-radius: 6px 0 6px 0;
        color: #fff;
        font-size: 12px;
      }
    }
    .text {
      margin-right: 12px;
    }
    .remove {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .tags {
    flex-wrap: wrap;
    max-height: 320px;
    overflow-y: auto;
    .tag {
      width: 66px;
      height: 66px;
      margin: 0 12px 12px 0;
      cursor: pointer;
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      &:hover {
        .mask {
          opacity: 1;
        }
      }
      .mask {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: 0.2s linear;
        color: #fff;
        font-weight: bold;
        z-index: 2;
      }
      .is-author {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 12px;
        color: #fff;
        padding: 2px 3px;
        border-radius: 6px 0 6px 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
