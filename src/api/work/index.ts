import { SearchPayload, RecordItem, CheckParams, AutoLikeParams } from "#/api/work/index";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/works/list",
  detail = "/api/works/detail",
  edit = "/api/works/save",
  check = "/api/works/list_check",
  autolike = "/api/works/auto_like",
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
export function edit(data: RecordItem): Promise<void> {
  return request({
    url: Api.edit,
    method: "post",
    data,
  });
}
export function check(data: CheckParams): Promise<void> {
  return request({
    url: Api.check,
    method: "post",
    data,
  });
}
export function autolike(data: AutoLikeParams): Promise<void> {
  return request({
    url: Api.autolike,
    method: "post",
    data,
  });
}
