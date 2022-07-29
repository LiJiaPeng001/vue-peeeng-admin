import request from "../utils/request/index";

export function list() {
  return request({
    url: "/camera_tag_tab_content_list",
    params: {
      size: 100,
      camera_tag_tab_id: 0,
      camera_tag_child_tab_id: 0,
    },
  });
}
