import { TypePayload, TypeRecord } from "#/api/ptkChildType";
import { RequestRecord } from "#/api/index";
import request from "../utils/request/index";

enum Api {
  list = "/api/camera_tag_child_tabs/list",
  detail = "/api/camera_tag_child_tabs/detail",
  edit = "/api/camera_tag_child_tabs/save",
}
export function list(data: TypePayload): Promise<RequestRecord<TypeRecord>> {
  return request({
    url: Api.list,
    method: "post",
    data,
  });
}
export function detail(data: { id: TypeRecord["id"] }): Promise<TypeRecord> {
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
