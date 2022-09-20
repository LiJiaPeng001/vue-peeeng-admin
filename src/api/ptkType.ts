import { TypePayload, TypeRecord, TagRecord } from "#/api/ptkType";
import { RequestRecord } from "#/api/index";
import request from "../utils/request/index";

enum Api {
  list = "/api/camera_tag_tabs/list",
  detail = "/api/camera_tag_tabs/detail",
  edit = "/api/camera_tag_tabs/save",
  communityTags = "/api/get_camera_tag_community_types",
  typeTags = "/api/get_camera_tag_type_labels",
}
export function list(data: TypePayload): Promise<RequestRecord<TypeRecord>> {
  return request({
    url: Api.list,
    method: "post",
    data,
  });
}
export function detail(data: { id: number }): Promise<TypeRecord> {
  return request({
    url: Api.detail,
    method: "post",
    data,
  });
}
export function edit(data: TypeRecord): Promise<void> {
  return request({
    url: Api.edit,
    method: "post",
    data,
  });
}
export function communityTags(): Promise<RequestRecord<TagRecord>> {
  return request({
    url: Api.communityTags,
    method: "post",
  });
}
export function typeTags(): Promise<RequestRecord<TagRecord>> {
  return request({
    url: Api.typeTags,
    method: "post",
  });
}
