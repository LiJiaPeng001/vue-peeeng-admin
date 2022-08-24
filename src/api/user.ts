import request from "../utils/request/index";
import { Login } from "#/api/user";

export function list() {
  return request({
    url: "/camera_tag_tab_content_list",
    params: {
      size: 100,
      camera_tag_tab_id: 0,
      camera_tag_child_tab_id: 0,
    },
  });
}
export function login(data: Login) {
  return request({
    url: "/community/login",
    method: "post",
    data,
  });
}
export function test() {
  return request({
    url: "/community/init",
  });
}
