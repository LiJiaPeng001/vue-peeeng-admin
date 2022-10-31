import type { RouteQueryAndHash, LocationAsPath, RouteLocationOptions } from "vue-router";
interface ActionOptions {
  action: "replace" | "push";
}
type RouteLocationRaw = string | (RouteQueryAndHash & LocationAsPath & RouteLocationOptions);

/**
 * @descripe 最内层router-view跳转使用方法，仅限内部
 */

export function useGo() {
  let router = useRouter();
  return function (location: RouteLocationRaw, options?: ActionOptions) {
    let { action = "push" } = options || {};
    router[action](location);
  };
}
