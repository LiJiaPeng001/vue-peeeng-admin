import type { Router } from "vue-router";
import setting from "~/store/setting";
import permission from "~/store/permission";
import { getRouteItem, getOpenKeys } from "../utils/router";

interface ActionOptions {
  action: "replace" | "push";
}

export function useGo(_router?: Router) {
  let router: Router;
  if (!_router) {
    router = useRouter();
  }
  return function (path: string, options?: ActionOptions) {
    let settingStore = setting();
    let permissionStore = permission();
    let { cacheTabs, defaultTabs } = settingStore;
    let { currentRoutes } = permissionStore;
    let { action = "push" } = options || {};
    let newPath = path.split("?")[0];

    // keep-alive + Tabs
    let routeRecord = getRouteItem(currentRoutes, newPath);
    let isWhite = defaultTabs.some(route => route.name == routeRecord.name);
    if (!isWhite) {
      let current = cacheTabs.findIndex(route => route.name == routeRecord.name);
      if (current >= 0) settingStore.cacheTabs = [...cacheTabs.slice(0, current), { ...routeRecord, path }, ...cacheTabs.slice(current + 1, cacheTabs.length)];
      else settingStore.cacheTabs = [...cacheTabs, { ...routeRecord, path }];
    }
    // menu keys
    getOpenKeys(newPath);
    router[action](path);
  };
}
