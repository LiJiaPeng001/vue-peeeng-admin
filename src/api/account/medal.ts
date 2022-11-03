import { RecordItem } from "#/api/account/medal";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/get_medals",
}

export function list(): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.list,
    method: "post",
  });
}
