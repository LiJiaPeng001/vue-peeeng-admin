import { SearchPayload, RecordItem } from "#/api/activity/index";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/works/list",
  detail = "/api/works/detail",
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
