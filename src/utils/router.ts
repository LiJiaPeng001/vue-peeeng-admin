import type { RouteRecordRaw } from 'vue-router'

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