<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="layout-tabs middle-flex">
    <!-- tabs -->
    <div class="tabs-box">
      <a-tabs :active-key="activeKey" size="small" :hide-add="true" :tab-bar-gutter="3" type="editable-card" @tab-click="go" @edit="edit">
        <a-tab-pane v-for="(pane, i) in settingStore.cacheTabs" :key="pane.path" :tab="pane.meta?.title" :closable="i ? true : false"> </a-tab-pane>
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
import { RedoOutlined, DownOutlined, CloseOutlined, VerticalLeftOutlined, VerticalRightOutlined, MinusOutlined } from "@ant-design/icons-vue";
import permission from "~/store/permission";
import setting from "~/store/setting";
import { getRouteItem } from "~/utils/router";

let settingStore = setting();
let permissionStore = permission();
let route = useRoute();
let go = useGo();
let { ctx } = useInstance();

let currentRoute = route.path === "/dashboard/work" ? [] : [getRouteItem(permissionStore.currentRoutes, route.path)];
let dashborad = getRouteItem(permissionStore.currentRoutes, "/dashboard/work");
settingStore.cacheTabs = [dashborad, ...currentRoute];

let activeKey = computed(() => {
  let path = route.fullPath;
  return path.split("?")[0];
});
let edit = function (path: string) {
  settingStore.cacheTabs = settingStore.cacheTabs.filter(item => item.path !== path);
};
let refreshPage = async function () {
  settingStore.refreshPage(route.path);
  await ctx.$nextTick();
  settingStore.refreshPage("");
};
let removeTab = function (state: number) {
  console.log(state);
  // if(state === 1) settingStore.cacheTabs.
};
</script>

<style lang="less" scoped>
.layout-tabs {
  .tabs-box {
    flex: 1;
    min-width: 0;
    overflow-x: auto;
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
