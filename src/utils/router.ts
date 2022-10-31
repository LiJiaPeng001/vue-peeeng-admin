import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import permission from "~/store/permission";
import setting from "~/store/setting";

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
}

function filterChildrens(list: RouteRecordRaw[], path: string): RouteRecordRaw[] {
  return list.filter(item => {
    if (item.children?.length) {
      item.children = filterChildrens(item.children, path);
      return !!item.children.length;
    }
    return item.path === path;
  });
}

export function getPermissionRoutes(routes: RouteRecordRaw[], path: string): RouteRecordRaw[] {
  routes = JSON.parse(JSON.stringify(routes));
  let findData = routes.find(item => item.path == path);
  if (findData) return [findData];
  else return filterChildrens(routes, path);
}

export function getOpenKeys(path = "") {
  if (!path) {
    let route = useRoute();
    path = route.path;
  }
  let settingStore = setting();
  let { currentRoutes: routes } = permission();
  let keys: string[] = [];
  let filterKeys = getPermissionRoutes(routes, path);
  function deepKeys(openKeys: RouteRecordRaw[]): void {
    openKeys.map((item: RouteRecordRaw) => {
      if (item.children?.length) {
        keys.push(item.path);
        deepKeys(item.children);
      }
    });
  }
  // openKeys.value
  deepKeys(filterKeys);
  settingStore.openKeys = keys;
}
/**
 * @desc 获取当前路由的父级
 * @param name string
 */
export function getRawOptionRoutes(path?: string): RouteRecordRaw[] {
  if (!path) {
    let route = useRoute();
    path = route.path as string;
  }
  let permissionStore = permission();
  const flat = (list: RouteRecordRaw[]): RouteRecordRaw[] => {
    return list.reduce((all, item: RouteRecordRaw) => {
      all.push(item);
      if (item.children && item.children.length) all.push(...flat(item.children));
      return all;
    }, [] as RouteRecordRaw[]);
  };
  return flat(getPermissionRoutes(permissionStore.currentRoutes, path));
}

/**
 * @desc 序列化route
 * @param route RouteLocationNormalized
 * @returns RouteLocationNormalized
 */

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { ...opt } = route;
  return {
    ...opt,
  };
}
