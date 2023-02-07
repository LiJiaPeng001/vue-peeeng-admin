import { RecordItem, SearchParams } from "#/api/account/user";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/users/list",
  detail = "/api/users/detail",
}

export function list(data: SearchParams): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.list,
    data,
  });
}
export function detail(data: { id: number }): Promise<RecordItem> {
  return request({
    url: Api.detail,
    data,
    method: "post",
  });
}
