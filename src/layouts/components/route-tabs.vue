<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="layout-tabs middle-flex">
    <!-- tabs -->
    <div class="tabs-box">
      <a-tabs :active-key="activeKey" size="small" :hide-add="true" :tab-bar-gutter="3" type="editable-card" @tab-click="go" @edit="edit">
        <a-tab-pane v-for="pane in settingStore.defaultTabs" :key="pane.path" :tab="pane.meta?.title" :closable="false"> </a-tab-pane>
        <a-tab-pane v-for="pane in settingStore.cacheTabs" :key="pane.path.split('?')[0]" :tab="pane.meta?.title" closable> </a-tab-pane>
      </a-tabs>
    </div>
    <!-- action-btn -->
    <div class="extra-btns middle-flex">
      <span style="margin-right: 4px" @click="refreshPage"><RedoOutlined /></span>
      <a-dropdown trigger="click">
        <span><DownOutlined /></span>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="refreshPage">
              <RedoOutlined />
              <span style="margin-left: 6px">重新加载</span>
            </a-menu-item>
            <a-menu-item @click="removeTab(1)">
              <CloseOutlined />
              <span style="margin-left: 6px">关闭标签页</span>
            </a-menu-item>
            <a-menu-item @click="removeTab(2)">
              <VerticalRightOutlined />
              <span style="margin-left: 6px">关闭左侧标签</span>
            </a-menu-item>
            <a-menu-item @click="removeTab(3)">
              <VerticalLeftOutlined />
              <span style="margin-left: 6px">关闭右侧标签</span>
            </a-menu-item>
            <a-menu-item @click="removeTab(5)">
              <PicCenterOutlined />
              <span style="margin-left: 6px">关闭其他标签</span>
            </a-menu-item>
            <a-menu-item @click="removeTab(4)">
              <MinusOutlined />
              <span style="margin-left: 6px">关闭所有标签</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RedoOutlined, DownOutlined, CloseOutlined, VerticalLeftOutlined, VerticalRightOutlined, MinusOutlined, PicCenterOutlined } from "@ant-design/icons-vue";
import permission from "~/store/permission";
import setting from "~/store/setting";
import { getRouteItem } from "~/utils/router";

let settingStore = setting();
let permissionStore = permission();
let route = useRoute();
let go = useGo();

let currentRoute = route.path === "/dashboard" ? [] : [{ ...getRouteItem(permissionStore.currentRoutes, route.path), path: route.fullPath }];
settingStore.defaultTabs = [getRouteItem(permissionStore.currentRoutes, "/dashboard")];
if (!settingStore.cacheTabs.length) settingStore.cacheTabs = currentRoute;

let activeKey = computed(() => {
  return route.path;
});

let edit = function (path: string) {
  settingStore.cacheTabs = settingStore.cacheTabs.filter(item => item.path !== path);
  go("/dashboard");
};
let refreshPage = async function () {
  settingStore.refreshPage(route.path);
  await nextTick();
  settingStore.refreshPage("");
};
let removeTab = function (state: number) {
  let { cacheTabs = [] } = settingStore;
  if (!cacheTabs.length) return;
  let current = cacheTabs.findIndex(item => item.path === route.path);
  if (state === 1) {
    settingStore.cacheTabs = cacheTabs.filter(item => item.path !== route.path);
    go("/dashboard");
  }
  if (state === 2) settingStore.cacheTabs = cacheTabs.slice(current, cacheTabs.length);
  if (state === 3) settingStore.cacheTabs = cacheTabs.slice(0, current + 1);
  if (state === 5) {
    if (cacheTabs.length === 1) return;
    settingStore.cacheTabs = [cacheTabs[current]];
  }
  if (state === 4) {
    settingStore.cacheTabs = [];
    go("/dashboard");
  }
};
</script>

<style lang="less" scoped>
.layout-tabs {
  .tabs-box {
    flex-grow: 1;
    overflow-x: auto;
    width: 0;
  }
  .extra-btns {
    margin-left: 6px;
    flex-shrink: 0;
    span {
      width: 30px;
      height: 30px;
      background-color: #fff;
      cursor: pointer;
      color: #aaa;
      transition: 0.2s;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>

<style lang="less">
.layout-tabs {
  margin-bottom: 12px;
  .ant-tabs-nav {
    margin: 0;
  }
}
</style>
