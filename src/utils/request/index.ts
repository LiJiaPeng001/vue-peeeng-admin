import createApi from "./createApi";

/**
 * @desc 项目中单独配置
 */
let { VITE_BASE_URL } = import.meta.env;

export default createApi({
  setHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };
    return headers;
  },
  createOptions: {
    baseURL: VITE_BASE_URL,
  },
});
