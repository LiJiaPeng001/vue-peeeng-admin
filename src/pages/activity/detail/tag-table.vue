<template>
  <div class="tags-container">
    <div class="tags middle-flex">
      <div v-for="it in record" :key="it.id" class="tag cover fadeIn" :style="{ backgroundImage: `url(${it.icon_url})` }">
        <div class="active-mask center-flex">已选择</div>
        <div class="mask center-flex" @click="onChangeValue(it)">取消选择</div>
      </div>
    </div>
    <a-badge v-if="!value.length && !list.length" color="yellow" :text="!list.length ? '请选择贴纸类型👆' : ''" />
    <div class="tags middle-flex">
      <div v-for="it in list" :key="it.id" class="tag cover fadeIn" :style="{ backgroundImage: `url(${it.icon_url})` }">
        <div v-if="value.some(vid => vid == it.id)" class="active-mask center-flex">已选择</div>
        <div class="mask center-flex" @click="onChangeValue(it)">{{ value.some(vid => vid == it.id) ? "取消选择" : "选择" }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StickerTagType } from "#/api/activity/index";

const props = defineProps<{
  record: StickerTagType[];
  value: number[];
  list: StickerTagType[];
}>();

const emits = defineEmits<{
  (e: "update:value", ids?: number[]): void;
  (e: "update:record", record?: StickerTagType[]): void;
}>();

let onChangeValue = (record: StickerTagType) => {
  let current = props.record.findIndex(it => it.id == record.id);
  let v = [...props.value];
  let r = [...props.record];
  if (current > -1) {
    v.splice(current, 1);
    r.splice(current, 1);
  } else {
    v.push(record.id);
    r.push(record);
  }
  emits("update:value", v);
  emits("update:record", r);
};
</script>

<style lang="less" scoped>
.tags-container {
  .tags {
    flex-wrap: wrap;
    max-height: 320px;
    overflow-y: auto;
    position: relative;
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
      .active-mask {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 2px 4px;
        border-radius: 6px 0 6px 0;
        color: #fff;
        font-size: 12px;
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
