import { RouteRecordRaw } from "vue-router";
export interface SettingState {
  collapsed: boolean;
  theme: "light" | "dark";
  cacheTabs: RouteRecordRaw[];
  openKeys: Array<string>;
  mode: "pc" | "mobile";
  refreshName: string;
  defaultTabs: RouteRecordRaw[];
}
