import { RecordItem, SearchParams, BanParams, NoSayParams } from "#/api/account/user";
import { RequestRecord } from "#/api/index";
import request from "~/utils/request/index";

enum Api {
  list = "/api/users/list",
  detail = "/api/users/detail",
  ban = "/api/users/banned",
  tuijian = "/api/users/deal_recommend",
  white = "/api/users/deal_white_user",
  nosay = "/api/users/deal_banned_to_post",
}

export function list(data: SearchParams): Promise<RequestRecord<RecordItem>> {
  return request({
    url: Api.list,
    data,
    method: "post",
  });
}
export function detail(data: { id: number }): Promise<RecordItem> {
  return request({
    url: Api.detail,
    data,
    method: "post",
  });
}
export function ban(data: BanParams): Promise<void> {
  return request({
    url: Api.ban,
    data,
    method: "post",
  });
}
export function tuijian(data: { id?: number; type?: number }): Promise<void> {
  return request(
    {
      url: Api.tuijian,
      data,
      method: "post",
    },
    {
      shouldLoading: true,
    }
  );
}
export function white(data: { id?: number }): Promise<void> {
  return request(
    {
      url: Api.white,
      data,
      method: "post",
    },
    {
      shouldLoading: true,
    }
  );
}
export function nosay(data: NoSayParams): Promise<void> {
  return request({
    url: Api.nosay,
    data,
    method: "post",
  });
}
