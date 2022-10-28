import { SearchParams, RecordItem } from "#/api/activity/work";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  hotList = "/api/work_hottest/list",
  newList = "/api/work_newest/list",
  hotRemove = "/api/work_hottest/destroy",
  newRemove = "/api/work_newest/destroy",
  hotEdit = "/api/work_hottest/save",
  newEdit = "/api/work_newest/save",
}

export function list(data: SearchParams): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api[`${data.type}List`],
    method: "post",
    data,
  });
}
export function remove(data: { ids: number[]; type: SearchParams["type"] }): Promise<void> {
  return request({
    url: Api[`${data.type}Remove`],
    method: "post",
    data,
  });
}
export function edit(data: RecordItem & { type: SearchParams["type"] }): Promise<void> {
  return request({
    url: Api[`${data.type}Edit`],
    method: "post",
    data,
  });
}
