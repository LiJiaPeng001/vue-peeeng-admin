import { RouteRecordRaw } from "vue-router";
import permission from "~/store/permission";
import setting from "~/store/setting";

function filterChildrens(list: RouteRecordRaw[], path: string): RouteRecordRaw[] {
  return list.filter((item) => {
    if (item.children?.length) {
      item.children = filterChildrens(item.children, path)
      return !!item.children.length
    }
    return item.path === path
  });
}

export function getPermissionRoutes(routes: RouteRecordRaw[], path: string): RouteRecordRaw[] {
  routes = JSON.parse(JSON.stringify(routes))
  let findData = routes.find((item) => item.path == path);
  if (findData) return [findData];
  else return filterChildrens(routes, path)
}

export function getOpenKeys(path: string = "") {
  if (!path) {
    let route = useRoute()
    path = route.path
  }
  let settingStore = setting()
  let { currentRoutes: routes } = permission()
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
  settingStore.setOpenKeys(keys);
}