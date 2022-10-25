import { SearchPayload, RecordItem, ReplyCommentRecord } from "#/api/work/comment";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/work_comments/list",
  remove = "/api/work_comments/destroy",
  save = "/api/work_comments/save",
}

export function list(data: SearchPayload): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.list,
    method: "post",
    data,
  });
}
export function remove(data: { ids: number[] }): Promise<void> {
  return request({
    url: Api.remove,
    method: "post",
    data,
  });
}
export function save(data: ReplyCommentRecord): Promise<void> {
  return request({
    url: Api.remove,
    method: "post",
    data,
  });
}
