<template>
  <div class="layout-header">
    <div class="layout-fixed middle-flex" :style="{ width: `calc(100% - ${settingStore.layoutW}px)` }">
      <div class="l-menu middle-flex">
        <Logo v-if="settingStore.mode === 'mobile'" style="width: 36px; height: 36px; margin-right: 10px"></Logo>
        <a-button size="small" @click="handleClick">
          <MenuUnfoldOutlined v-if="settingStore.collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
        <a-breadcrumb v-if="settingStore.mode === 'pc'" style="margin-left: 10px">
          <a-breadcrumb-item v-for="it in routeMached" :key="it.path">{{ it.meta?.title }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <a-popover>
        <template #content>
          <p @click="logout">退出登录</p>
        </template>
        <a-avatar>
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        {{ userStore.user.name }}
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons-vue";
import setting from "~/store/setting";
import user from "~/store/user";
import Logo from "~/components/logo.vue";
import { getRawOptionRoutes } from "~/utils/router";

let settingStore = setting();
let userStore = user();
let router = useRouter();
let route = useRoute();
let routeMached = ref<RouteRecordRaw[]>(getRawOptionRoutes(route.path));

let handleClick = () => {
  settingStore.collapsed = !settingStore.collapsed;
};

let logout = async () => {
  await userStore.logout();
  window.location.reload();
};
router.afterEach(() => {
  routeMached.value = getRawOptionRoutes(route.path);
});
</script>

<style lang="less" scoped>
.layout-header {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  box-sizing: border-box;
  position: relative;
  height: 64px;
  cursor: pointer;
  .layout-fixed {
    justify-content: space-between;
    height: 64px;
    line-height: 64px;
    padding: 0 22px;
    position: fixed;
    top: 0;
    right: 0;
    transition: width 0.2s;
    background-color: #fff;
    z-index: 9;
  }
}
</style>
