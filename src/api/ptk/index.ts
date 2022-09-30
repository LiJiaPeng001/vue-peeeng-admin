import { SearchPayload, RecordItem, TagTypeRecord, CateResult } from "#/api/ptk";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/camera_tag_tab_content/list",
  detail = "/api/camera_tag_tab_content/detail",
  cates = "/api/get_all_camera_tag_tabs",
  edit = "/api/camera_tag_tab_content/save",
  remove = "/api/camera_tag_tab_content/destroy",
  types = "/api/get_camera_tag_types",
  typeTags = "/api/get_camera_tags",
  typeList = "/api/camera_tag_tabs/list",
}

export function list(data: SearchPayload): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.list,
    method: "post",
    data,
  });
}
export function detail(data: { id: number }): Promise<RecordItem> {
  return request({
    url: Api.detail,
    method: "post",
    data,
  });
}
export function cates(): Promise<{ list: CateResult[] }> {
  return request({
    url: Api.cates,
    method: "post",
  });
}
export function edit(data: RecordItem) {
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
export function types(): Promise<{ list: TagTypeRecord[] }> {
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
