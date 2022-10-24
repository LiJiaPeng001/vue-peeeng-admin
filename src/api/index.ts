import { RequestRecord, HomeTabsRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  homeTabs = "/api/get_subfields",
}

export function homeTabs(): Promise<RequestRecord<HomeTabsRecord>> {
  return request({
    url: Api.homeTabs,
    method: "post",
  });
}
