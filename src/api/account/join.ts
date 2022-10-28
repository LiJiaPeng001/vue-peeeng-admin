import { RecordItem, SearchParams } from "#/api/account/join";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/relation_user/list",
}

export function list(data: SearchParams): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.list,
    data,
    method: "post",
  });
}
