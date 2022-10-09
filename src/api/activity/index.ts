import { SearchPayload, RecordItem } from "#/api/activity/index";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/activities/list",
  detail = "/api/activities/detail",
  edit = "/api/activities/save",
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
export function edit(data: RecordItem) {
  return request({
    url: Api.edit,
    method: "post",
    data,
  });
}
