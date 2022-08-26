<template>
  <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
    <template #icon>
      <component :is="menuInfo.meta.icon as string" v-if="menuInfo.meta && menuInfo.meta.icon"></component>
    </template>
    <template #title>{{ menuInfo.meta ? menuInfo.meta.title : menuInfo.name }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item v-if="!item.meta.hidden" :key="item.path">
          <span>{{ item.meta ? item.meta.title : item.name }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
defineProps({
  menuInfo: {
    type: Object,
    default: () => {},
  },
});
</script>
