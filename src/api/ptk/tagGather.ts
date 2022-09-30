import { TagRecord } from "#/api/ptkType";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/get_gathers",
  detail = "/api/gathers/detail",
  edit = "/api/gathers/save",
  remove = "/api/gathers/destroy",
}
export function list(): Promise<RequestRecord<TagRecord>> {
  return request({
    url: Api.list,
    method: "post",
  });
}
export function detail(data: { id: number }): Promise<TagRecord> {
  return request({
    url: Api.detail,
    method: "post",
    data,
  });
}
export function edit(data: TagRecord): Promise<{ id: number }> {
  return request({
    url: Api.edit,
    method: "post",
    data,
  });
}
export function remove(data: { id: number }): Promise<void> {
  return request({
    url: Api.remove,
    method: "post",
    data,
  });
}
