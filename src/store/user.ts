import { defineStore } from "pinia";
import { UserInfo, LoginPayload } from "#/api/user";
import { login, logout } from "~/api/user";

const authority = useAuth();

export default defineStore("user", {
  state() {
    return {
      user: authority.value,
    };
  },
  getters: {
    isLogin: state => state.user.name,
  },
  actions: {
    async login(payload: LoginPayload): Promise<UserInfo> {
      let user = await login(payload);
      const auth = useAuth();
      let { token } = auth.value;
      user = { ...user, token };
      this.user = user;
      auth.value = user;
      return user;
    },
    async logout() {
      await logout();
      let user = {
        name: "",
        token: "",
      };
      this.user = user;
      authority.value = user;
    },
    async reloadPage() {
      await this.logout();
      window.location.reload();
    },
  },
});
