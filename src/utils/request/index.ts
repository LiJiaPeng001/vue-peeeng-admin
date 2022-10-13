import { AxiosRequestConfig } from "axios";
import { OptionsConfig } from "./types";
import createApi from "./createApi";

/**
 * @desc 项目中单独配置
 */

export default (options: AxiosRequestConfig, condition?: OptionsConfig) =>
  createApi({
    createOptions: {
      timeout: 20000,
    },
    setHeaders() {
      const auth = useAuth();
      let { token } = auth.value;
      const headers = {
        "Content-Type": "application/json",
        authorization: token,
        ...options.headers,
      };
      return headers;
    },
  })(options, condition);
