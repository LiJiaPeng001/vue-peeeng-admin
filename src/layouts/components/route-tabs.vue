<!-- eslint-disable vue/no-parsing-error -->
<template>
  <a-affix :offset-top="64">
    <div class="layout-tabs middle-flex" middle-flex px-12 py-10>
      <!-- tabs -->
      <div class="tabs-box" grow-1 overflow-x-auto w-0>
        <a-tabs :active-key="activeKey" size="small" :hide-add="true" :tab-bar-gutter="3" type="editable-card" @tab-click="go" @edit="edit">
          <a-tab-pane v-for="pane in settingStore.defaultTabs" :key="pane.path" :tab="pane.meta?.title" :closable="false"> </a-tab-pane>
          <a-tab-pane v-for="pane in settingStore.getCacheTabs" :key="pane.fullPath" :tab="`${pane.meta?.title}${Number(pane.query.id) ? ':' + pane.query.id : ''}`" closable>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- action-btn -->
      <div middle-flex mr-6 shrink-0>
        <span mr-4 w-30 h-30 cursor-pointer color-hex-aaa transition-200 font-14 center-flex hover:color-hex-000 @click="refreshPage"><RedoOutlined /></span>
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
              <!-- <a-menu-item @click="removeTab(2)">
                <VerticalRightOutlined />
                <span style="margin-left: 6px">关闭左侧标签</span>
              </a-menu-item>
              <a-menu-item @click="removeTab(3)">
                <VerticalLeftOutlined />
                <span style="margin-left: 6px">关闭右侧标签</span>
              </a-menu-item> -->
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
  </a-affix>
</template>
<script lang="ts" setup>
import { RedoOutlined, DownOutlined, CloseOutlined, MinusOutlined, PicCenterOutlined } from "@ant-design/icons-vue";
import permission from "~/store/permission";
import setting from "~/store/setting";
import { getRouteItem, getOpenKeys } from "~/utils/router";

let settingStore = setting();
let permissionStore = permission();
let route = useRoute();
let router = useRouter();
let go = useGo();

let onChangePageAddRoute = () => {
  settingStore.defaultTabs = [getRouteItem(permissionStore.currentRoutes, "/dashboard")];
  settingStore.addTab(unref(route));
};
onChangePageAddRoute();
router.afterEach(() => {
  onChangePageAddRoute();
  getOpenKeys(route.path);
});

let activeKey = computed(() => {
  return route.fullPath || route.path;
});

let edit = async function (fullPath: string) {
  settingStore.closeTabByKey(fullPath);
  let len = settingStore.getCacheTabs.length;
  if (len > 0) return go(settingStore.getCacheTabs[len - 1].fullPath);
  go("/dashboard");
};
let refreshPage = async function () {
  settingStore.refreshName = route.name as string;
  await nextTick();
  settingStore.refreshName = "";
};
let removeTab = function (state: number) {
  if (!settingStore.getCacheTabs.length) return;
  let current = settingStore.getCacheTabs.findIndex(item => item.fullPath === route.fullPath);
  if (state === 1) {
    settingStore.closeTab(unref(route));
    go("/dashboard");
  }
  if (state === 5) {
    settingStore.changeTab([settingStore.getCacheTabs[current]]);
  }
  if (state === 4) {
    settingStore.clearTab();
    go("/dashboard");
  }
};
</script>

<style lang="less" scoped>
.layout-tabs {
  background-color: var(--bgColor);
}
</style>

<style lang="less">
.layout-tabs {
  .ant-tabs-nav {
    margin: 0;
  }
}
</style>
