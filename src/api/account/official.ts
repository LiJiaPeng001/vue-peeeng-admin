import { RecordItem } from "#/api/account/official";
import request from "~/utils/request/index";

enum Api {
  list = "/api/get_official_users",
}

export function list(): Promise<{ official_users: RecordItem[] }> {
  return request({
    url: Api.list,
    method: "post",
  });
}
