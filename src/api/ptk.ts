import { SearchPayload } from "#/api/ptk";
import request from "../utils/request/index";

enum Api {
  list = "/api/camera_tag_tab_content/list",
  detail = "/api/camera_tag_tab_content/detail",
  cates = "/api/get_all_camera_tag_tabs",
  edit = "/api/camera_tag_tab_content/save",
  remove = "/api/camera_tag_tab_content/destroy",
}

export function list(data: SearchPayload) {
  return request({
    url: Api.list,
    method: "post",
    data,
  });
}
export function detail(data: { id: number }) {
  return request({
    url: Api.detail,
    method: "post",
    data,
  });
}
export function cates() {
  return request({
    url: Api.cates,
    method: "post",
  });
}
export function edit(data: any) {
  return request({
    url: Api.edit,
    method: "post",
    data,
  });
}
export function remove(data: { ids: number[] }) {
  return request({
    url: Api.remove,
    method: "post",
    data,
  });
}
