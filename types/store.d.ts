import { RouteLocationNormalizedLoaded } from "vue-router";
export interface SettingState {
  collapsed: boolean;
  cacheTabs: RouteLocationNormalizedLoaded[];
  openKeys: Array<string>;
  mode: "pc" | "mobile";
  refreshName: string;
  defaultTabs: RouteLocationNormalizedLoaded[];
}
