import createApi from "./createApi";

/**
 * @desc 项目中单独配置
 */
let { VITE_BASE_URL } = import.meta.env;

export default createApi({
  setHeaders() {
    const auth = useAuth();
    let { token } = auth.value;
    const headers = {
      "content-type": "application/json",
      "x-cros-token": token,
    };
    return headers;
  },
  createOptions: {
    baseURL: VITE_BASE_URL,
  },
});
