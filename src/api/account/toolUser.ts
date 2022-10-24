import { RecordItem, PayloadParams } from "#/api/account/toolUser";
// import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  workList = "/api/select_tool_user",
  checkToolUser = "/api/works/check_tool_user_deal",
  like = "/api/works/compile_choiceness",
  nolike = "/api/works/send_gold_by_work",
  comment = "/api/work_comments/save",
}

export function workList(data: PayloadParams): Promise<RecordItem[]> {
  return request({
    url: Api.workList,
    data,
    method: "post",
  });
}
export function checkToolUser(data: PayloadParams): Promise<{ content: string }> {
  return request(
    {
      url: Api.checkToolUser,
      data,
      method: "post",
    },
    {
      shouldLoading: true,
    }
  );
}
export function like(data: { id?: number; uid?: number }): Promise<void> {
  return request(
    {
      url: Api.like,
      data,
      method: "post",
    },
    {
      shouldLoading: true,
    }
  );
}
export function nolike(data: { id?: number; uid?: number }): Promise<void> {
  return request(
    {
      url: Api.nolike,
      data,
      method: "post",
    },
    {
      shouldLoading: true,
    }
  );
}
export function comment(data: PayloadParams): Promise<void> {
  return request(
    {
      url: Api.comment,
      data,
      method: "post",
    },
    {
      shouldLoading: true,
    }
  );
}
