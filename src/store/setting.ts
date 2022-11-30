import { defineStore } from "pinia";
import { SettingState } from "#/store";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { getRawRoute } from "~/utils/router";

export const useSettingStore = defineStore("setting", () => {
  let state = reactive<SettingState>({
    mode: "pc",
    collapsed: false,
    cacheTabs: [], // cacheTabs
    defaultTabs: [],
    openKeys: [],
    refreshName: "",
  });
  let getCacheTabs = computed(() => state.cacheTabs);
  let menuW = computed(() => (state.mode === "pc" ? (!state.collapsed ? 210 : 80) : 210));
  let layoutW = computed(() => (state.mode === "pc" ? (!state.collapsed ? 210 : 80) : 0));
  let inlineCollapsed = computed(() => (state.mode === "pc" ? state.collapsed : false));
  function addTab(route: RouteLocationNormalizedLoaded) {
    route = getRawRoute(route);
    let isWhite = state.defaultTabs.some(it => it.name == route.name);
    let current = state.cacheTabs.findIndex(item => item.fullPath == route.fullPath);
    if (!isWhite && current == -1) state.cacheTabs.push(route);
  }
  function closeTab(route: RouteLocationNormalizedLoaded) {
    let current = state.cacheTabs.findIndex(item => item.fullPath == route.fullPath);
    if (current > -1) state.cacheTabs.splice(current, 1);
  }
  function changeTab(tabs: RouteLocationNormalizedLoaded[]) {
    state.cacheTabs = tabs;
  }
  function clearTab() {
    state.cacheTabs = [];
  }
  function closeTabByKey(fullPath: string) {
    let current = state.cacheTabs.findIndex(item => item.fullPath == fullPath);
    if (current > -1) state.cacheTabs.splice(current, 1);
  }
  function onlistenBodyResize(options: ResizeObserverEntry["contentRect"]) {
    let { width = 0 } = options;
    if (width >= 1000) {
      state.mode = "pc";
      state.collapsed = false;
    } else {
      state.mode = "mobile";
      state.collapsed = true;
    }
  }
  return {
    ...toRefs(state),
    getCacheTabs,
    menuW,
    layoutW,
    inlineCollapsed,
    addTab,
    closeTab,
    changeTab,
    clearTab,
    closeTabByKey,
    onlistenBodyResize,
  };
});
