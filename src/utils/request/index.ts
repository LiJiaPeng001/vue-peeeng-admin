import createApi from "./createApi";

/**
 * @desc 项目中单独配置
 */

export default createApi({
  setHeaders() {
    const auth = useAuth();
    let { token } = auth.value;
    const headers = {
      "content-type": "application/json",
      authorization: token,
    };
    return headers;
  },
});
