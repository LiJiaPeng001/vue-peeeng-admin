import { defineStore } from "pinia";
import { UserState, UserInfo } from "#/store";
import { Login } from "#/api/user";
import { login } from "~/api/user";

const auth = useAuth();

export default defineStore("user", {
  state(): UserState {
    return {
      user: auth.value,
    };
  },
  getters: {
    isLogin: state => state.user.name,
  },
  actions: {
    async login(payload: Login): Promise<UserInfo> {
      let user = await login(payload);
      this.user = user;
      auth.value = user;
      return user;
    },
    logout() {
      let user = {
        name: "",
        token: "",
      };
      this.user = user;
      auth.value = user;
    },
  },
});
