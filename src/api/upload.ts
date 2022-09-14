import request from "../utils/request/index";
import { UploadPayload, UploadResult } from "#/api/upload";

enum Api {
  upload = "/api/upload",
}

export function upload(data: UploadPayload): Promise<UploadResult> {
  return request({
    url: Api.upload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    data,
  });
}
