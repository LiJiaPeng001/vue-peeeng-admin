import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { OptionsConfig, CreateApiOptions } from "./types";
import { getErrStatus, getErrMsg } from "./tools/index";
import { message } from "ant-design-vue";
import useLoading from "./tools/loading";

function noop() { }
function login() { }

let loading = useLoading();

export default ({
  toast = message, // 提示方法
  setHeaders = noop, // 动态设置headers
  handleError = noop, // 自定义错误处理
  loginForce = noop, // 返回401登录后再次尝试
  createOptions = {}, // axios默认设置
  maxCount = 1,
}: CreateApiOptions) => {
  const instence = axios.create(createOptions);
  instence.interceptors.request.use((config: AxiosRequestConfig) => {
    const headers = setHeaders(config);
    Object.assign(config.headers || {}, headers);
    return config;
  });
  return async (requestOptions: AxiosRequestConfig, { shouldToast = true, shouldLogin = false, shouldLoading = false }: OptionsConfig = {}) => {
    if (shouldLogin) await login();
    // 是否loadding
    for (let i = 0; i < maxCount; i++) {
      try {
        if (shouldLoading) loading.show();
        let user = useUserStore();
        // 更新本地token
        const { data } = await instence(requestOptions);
        if (shouldLoading) loading.hide();
        // success code
        if (data.code === 200) return data.data;
        // 重新登录
        if (data.code === 401 || data.code === 419) await user.logout();
        // 报错提醒
        if (shouldToast) toast.error(data.msg);
        return Promise.reject(data.msg);
      } catch (e: any) {
        if (shouldLoading) loading.hide();
        const status = getErrStatus(e);
        if (i < maxCount && maxCount > 1) {
          // 401重新登录
          if (status === 401 && loginForce) {
            await loginForce();
            continue;
          }
          if (e.message.indexOf("timeout of") > -1) {
            toast.error("网络异常");
            continue;
          }
        }
        // 自定义错误处理
        if (status) toast.error(status + " " + getErrMsg(e));
        handleError(e);
        return Promise.reject(e);
      }
    }
  };
};
