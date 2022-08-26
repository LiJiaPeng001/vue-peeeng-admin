import request from "../utils/request/index";

export function list(data: any) {
  return request({
    url: "/api/camera_tag_tab_content/list",
    method: "post",
    data,
  });
}
