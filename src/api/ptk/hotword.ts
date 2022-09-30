import { TypePayload, TypeRecord } from "#/api/ptkHotword";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/camera_tag_tab_content/user_search_list",
}
export function list(data: TypePayload): Promise<RequestRecord<TypeRecord>> {
  return request({
    url: Api.list,
    method: "post",
    data,
  });
}
