import type { RouteRecordRaw, Router, LocationAsPath, RouteQueryAndHash } from "vue-router";
import setting from "~/store/setting";
import permission from "~/store/permission";
import { getRouteItem, getOpenKeys } from "../utils/router";

type RouteLocationRaw = string | (LocationAsPath & RouteQueryAndHash);

interface ActionOptions {
  action: "replace" | "push";
}

export function useGo(_router?: Router) {
  let router: Router;
  if (!_router) {
    router = useRouter();
  }
  return function (route: RouteLocationRaw, options?: ActionOptions) {
    let settingStore = setting();
    let permissionStore = permission();
    let { cacheTabs } = settingStore;
    let { currentRoutes } = permissionStore;
    let { action = "push" } = options || {};
    let path = "";
    if (typeof route === "string") path = route;
    if (typeof route === "object") path = route.path;
    // keep-alive + Tabs  白名单
    let whiteList = ["/dashboard/work"];
    let isCache = cacheTabs.some((item: RouteRecordRaw) => {
      let p = item.path.split("?")[0];
      return p == path;
    });
    isCache = whiteList.includes(path) ? true : isCache;
    if (!isCache) settingStore.cacheTabs = [...cacheTabs, getRouteItem(currentRoutes, path)];
    // menu keys
    getOpenKeys(path);
    router[action](route);
  };
}
