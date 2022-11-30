import { defineStore } from "pinia";
import { UserInfo, LoginPayload } from "#/api/user";
import { login as loginApi, logout as quit } from "~/api/user";

const authority = useAuth();

export const useUserStore = defineStore("user", () => {
  let user = ref<UserInfo>({
    ...authority.value,
  });
  let isLogin = computed(() => user.value?.name);
  async function login(payload: LoginPayload): Promise<UserInfo> {
    let d = await loginApi(payload);
    const auth = useAuth();
    let { token } = auth.value;
    d = { ...d, token };
    user.value = d;
    auth.value = d;
    return d;
  }
  async function logout() {
    await quit();
    let d = {
      name: "",
      token: "",
    };
    user.value = d;
    authority.value = d;
  }
  async function reloadPage() {
    await logout();
    window.location.reload();
  }
  return {
    user,
    isLogin,
    login,
    logout,
    reloadPage,
  };
});
