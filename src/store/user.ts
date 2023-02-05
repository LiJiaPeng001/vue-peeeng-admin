import { defineStore } from "pinia";
import { UserInfo, LoginPayload } from "#/api/user";

const authority = useAuth();

export const useUserStore = defineStore("user", () => {
  let user = ref<UserInfo>(authority.value);
  let isLogin = computed(() => user.value?.name);
  /**
   *
   * @param payload LoginPayload
   * @returns UserInfo
   */
  async function login(payload: LoginPayload): Promise<UserInfo> {
    const auth = useAuth();
    let { token } = auth.value;
    let d = {
      name: payload.username,
      token
    }
    user.value = d;
    auth.value = d;
    return d;
  }
  /**
   * logout
   */
  async function logout() {
    let d = {
      name: "",
      token: "",
    };
    user.value = d;
    authority.value = d;
    window.location.reload();
  }
  return {
    user,
    isLogin,
    login,
    logout,
  };
});
