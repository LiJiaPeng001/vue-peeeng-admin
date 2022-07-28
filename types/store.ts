import { RouteRecordRaw } from "vue-router";

export interface UserInfo {
  name: string;
  phone: number;
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
}
