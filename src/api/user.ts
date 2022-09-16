import request from "../utils/request/index";
import { LoginPayload } from "#/api/user";
import { UserInfo } from "#/api/user";

enum Api {
  login = "/api/login",
  logout = "/api/logout",
}

export function login(data: LoginPayload): Promise<UserInfo> {
  return request({
    url: Api.login,
    method: "post",
    data,
  });
}
export function logout() {
  return request({
    url: Api.logout,
    method: "post",
  });
}
