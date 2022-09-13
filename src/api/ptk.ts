import { SearchPayload } from "#/api/ptk";
import request from "../utils/request/index";

enum Api {
  list = "/api/camera_tag_tab_content/list",
  detail = "/api/camera_tag_tab_content/detail",
  cates = "/api/get_all_camera_tag_tabs",
  edit = "/api/camera_tag_tab_content/save",
  remove = "/api/camera_tag_tab_content/destroy",
  types = "/api/get_camera_tag_types",
  typeTags = "/api/get_camera_tags",
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
export function edit(data: { id: number }) {
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
export function types() {
  return request({
    url: Api.types,
    method: "post",
  });
}
export function typeTags(data: { camera_tag_type_id: number }) {
  return request({
    url: Api.typeTags,
    method: "post",
    data,
  });
}
