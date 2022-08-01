import type { RouteQueryAndHash, LocationAsPath, RouteLocationOptions, LocationQueryRaw } from "vue-router";
import setting from "~/store/setting";
import permission from "~/store/permission";
import { getRouteItem, getOpenKeys } from "../utils/router";

interface ActionOptions {
  action: "replace" | "push";
}
type RouteLocationRaw = string | (RouteQueryAndHash & LocationAsPath & RouteLocationOptions);

function generateNewPath(path: string, query: LocationQueryRaw): string {
  path += "?";
  Object.keys(query).forEach(key => {
    path += `${key}=${query[key]}&`;
  });
  path = path.slice(0, -1);
  return path;
}

/**
 * @descripe 最内层router-view跳转使用方法，仅限内部
 */

export function useGo() {
  let router = useRouter();
  let settingStore = setting();
  let permissionStore = permission();
  return function (location: RouteLocationRaw, options?: ActionOptions) {
    let { cacheTabs, defaultTabs } = settingStore;
    let { currentRoutes } = permissionStore;
    let { action = "push" } = options || {};
    let path = "";
    let newPath = "";
    if (typeof location === "object") {
      path = generateNewPath(location.path, location.query as {});
      newPath = location.path;
    } else {
      path = location;
      newPath = path.split("?")[0];
    }

    // keep-alive + Tabs
    let routeRecord = getRouteItem(currentRoutes, newPath);
    let isWhite = defaultTabs.some(route => route.name == routeRecord.name);
    if (!isWhite) {
      let current = cacheTabs.findIndex(route => route.name == routeRecord.name);
      let newRoute = { ...routeRecord, path };
      if (current >= 0) settingStore.cacheTabs.splice(current, 1, newRoute);
      else settingStore.cacheTabs.push(newRoute);
    }
    // menu keys
    getOpenKeys(newPath);
    router[action](location);
  };
}
