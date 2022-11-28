import { defineStore } from "pinia";
import { SettingState } from "#/store";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { getRawRoute } from "~/utils/router";

export default defineStore("setting", {
  state(): SettingState {
    return {
      mode: "pc",
      collapsed: false,
      cacheTabs: [], // cacheTabs
      defaultTabs: [],
      openKeys: [],
      refreshName: "",
    };
  },
  getters: {
    getCacheTabs: (state): SettingState["cacheTabs"] => state.cacheTabs,
    // 菜单宽度
    menuW: state => (state.mode === "pc" ? (!state.collapsed ? 210 : 80) : 210),
    // layout-width
    layoutW: state => (state.mode === "pc" ? (!state.collapsed ? 210 : 80) : 0),
    inlineCollapsed: state => (state.mode === "pc" ? state.collapsed : false), // menu - inlineCollapsed
  },
  actions: {
    addTab(route: RouteLocationNormalizedLoaded) {
      route = getRawRoute(route);
      let isWhite = this.defaultTabs.some(it => it.name == route.name);
      let current = this.cacheTabs.findIndex(item => item.fullPath == route.fullPath);
      if (!isWhite && current == -1) this.cacheTabs.push(route);
    },
    closeTab(route: RouteLocationNormalizedLoaded) {
      let current = this.cacheTabs.findIndex(item => item.fullPath == route.fullPath);
      if (current > -1) this.cacheTabs.splice(current, 1);
    },
    changeTab(tabs: RouteLocationNormalizedLoaded[]) {
      this.cacheTabs = tabs;
    },
    clearTab() {
      this.cacheTabs = [];
    },
    closeTabByKey(fullPath: string) {
      let current = this.cacheTabs.findIndex(item => item.fullPath == fullPath);
      if (current > -1) this.cacheTabs.splice(current, 1);
    },
    onlistenBodyResize(options: ResizeObserverEntry["contentRect"]) {
      let { width = 0 } = options;
      if (width >= 1000) {
        this.mode = "pc";
        this.collapsed = false;
      } else {
        this.mode = "mobile";
        this.collapsed = true;
      }
    },
  },
});
