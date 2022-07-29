import createApi from "./createApi";

/**
 * @desc 项目中单独配置
 */
let { VITE_BASE_URL } = import.meta.env;

export default createApi({
  setHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "wt-response-encrypt": 0,
      "device-token": "",
      "browser-token": "",
      "storage-token": "",
    };
    return headers;
  },
  createOptions: {
    baseURL: VITE_BASE_URL,
  },
});
