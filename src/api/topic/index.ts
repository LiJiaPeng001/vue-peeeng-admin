import { RecordItem } from "#/api/topic/index";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  allTopics = "/api/get_channel_topic_data_v2",
}

export function allTopics(): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.allTopics,
    method: "post",
  });
}
