import request from "../utils/request/index";
import { Login } from "#/api/user";

export function login(data: Login) {
  return request({
    url: "/api/login",
    method: "post",
    data,
  });
}
export function logout() {
  return request({
    url: "/api/logout",
    method: "post",
  });
}
export function test() {
  return request({
    url: "/api/init",
    method: "post",
  });
}
