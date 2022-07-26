import type { RouteRecordRaw, Router, LocationAsPath, RouteQueryAndHash } from 'vue-router'
import settingStore from '~/store/setting'
import permissionStore from '~/store/permission'
import { getOpenKeys } from '../utils/index'

type RouteLocationRaw = string | (LocationAsPath & RouteQueryAndHash)

export function getRouteItem(routes: RouteRecordRaw[], path: string): any {
  let route = {};
  function deepRoutes(routes: RouteRecordRaw[]) {
    routes.find((item: RouteRecordRaw) => {
      if (item.children) deepRoutes(item.children);
      if (item.path == path) {
        route = item;
        return item;
      }
    });
  }
  deepRoutes(routes);
  return route;
};

export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push } = _router || router as Router;
  return function (options: RouteLocationRaw) {
    let setting = settingStore()
    let permission = permissionStore()
    let { cacheTabs } = setting
    let { currentRoutes } = permission
    let path: string = ""
    if (typeof options === "string") path = options
    if (typeof options === "object") path = options.path
    // keep-alive + Tabs
    let isCache = cacheTabs.some((item: RouteRecordRaw) => {
      let p = item.path.split("?")[0]
      return p == path
    })
    if (!isCache) cacheTabs.push(getRouteItem(currentRoutes, path))
    // menu keys
    getOpenKeys(path)
    push(options)
  }
}