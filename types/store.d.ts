import { RouteRecordRaw } from "vue-router";

export interface UserInfo {
  token: string;
  name: string;
}
export interface UserState {
  user: UserInfo;
}
export interface SettingState {
  collapsed: boolean;
  theme: "light" | "dark";
  cacheTabs: RouteRecordRaw[];
  openKeys: Array<string>;
  mode: "pc" | "mobile";
  refreshPath: string;
  defaultTabs: RouteRecordRaw[];
}
