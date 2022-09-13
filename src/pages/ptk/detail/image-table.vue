<template>
  <a-form layout="inline" :model="formState" :label-col="{ span: 0 }" :wrapper-col="{ span: 20 }" style="margin-bottom: 12px" @finish="handleFinish">
    <a-form-item>
      <a-input-number v-model:value="formState.x" placeholder="请输入X轴"></a-input-number>
    </a-form-item>
    <a-form-item>
      <a-input-number v-model:value="formState.y" placeholder="请输入y轴"></a-input-number>
    </a-form-item>
    <a-form-item>
      <a-input-number v-model:value="formState.w" placeholder="请输入宽"></a-input-number>
    </a-form-item>
    <a-form-item>
      <a-input-number v-model:value="formState.h" placeholder="请输入高"></a-input-number>
    </a-form-item>
    <a-form-item>
      <a-input-number v-model:value="formState.angle" placeholder="请输入角度"></a-input-number>
    </a-form-item>
    <a-form-item>
      <a-input-number v-model:value="formState.fillet_angle" placeholder="请输入圆角"></a-input-number>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">添加</a-button>
    </a-form-item>
  </a-form>
  <a-table :data-source="value" :columns="columns">
    <template #bodyCell="{ column, index }">
      <!-- <template v-if="['x', 'y', 'w', 'h', 'angle', 'fillet_angle'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editData.id == record.id" v-model:value="editData[column.dataIndex as AngleKey]" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template> -->
      <template v-if="column.dataIndex === 'action'">
        <!-- <div v-if="editData.id == record.id" class="btn-action">
          <span class="primary" @click="save">保存</span>
          <span class="danger" @click="cancel">取消</span>
        </div> -->
        <div class="btn-action">
          <!-- <span class="primary" @click="edit(record)">编辑</span> -->
          <span class="danger" @click="remove(index)">删除</span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { AngleRecord } from "../ptk";

const props = defineProps<{
  value: AngleRecord[];
}>();

const emits = defineEmits<{
  (e: "update:value", value: AngleRecord[]): void;
}>();

let formState = ref<AngleRecord>({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  angle: 0,
  fillet_angle: 0,
});
// let editData = ref<AngleRecord>({});

const columns = [
  {
    title: "x",
    dataIndex: "x",
  },
  {
    title: "y",
    dataIndex: "y",
  },
  {
    title: "宽",
    dataIndex: "w",
  },
  {
    title: "高",
    dataIndex: "h",
  },
  {
    title: "角度",
    dataIndex: "angle",
  },
  {
    title: "圆角",
    dataIndex: "fillet_angle",
  },
  {
    title: "操作",
    dataIndex: "action",
    width: 120,
  },
];

// const edit = (record: AngleRecord) => {
//   editData.value = { ...record };
// };
// const save = () => {
//   let p = [...props.value];
//   let current = p.findIndex(item => item.id == editData.value.id) as number;
//   p[current] = editData.value;
//   emits("update:value", p);
//   cancel();
// };
// const cancel = () => {
//   editData.value = {};
// };

const remove = (index: number) => {
  emits(
    "update:value",
    props.value.filter((item, i: number) => i != index)
  );
};

let handleFinish = () => {
  let p = { ...formState.value };
  emits("update:value", [p, ...props.value]);
  formState.value.x = 0;
  formState.value.y = 0;
  formState.value.w = 0;
  formState.value.h = 0;
  formState.value.angle = 0;
  formState.value.fillet_angle = 0;
};
</script>

<style lang="less" scoped></style>
