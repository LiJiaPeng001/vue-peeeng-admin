import { defineStore } from "pinia";
import { UserState } from "#/store";

const auth = useAuth<UserState["user"]>();

export default defineStore("user", {
  state(): UserState {
    return {
      user: { ...auth.value },
    };
  },
  getters: {
    isLogin: state => state.user.name,
  },
  actions: {
    login(payload: UserState["user"]) {
      console.log(payload, "payload");
      const user = {
        name: "李家朋",
        phone: 13673717028,
      };
      this.user = user;
      auth.value = user;
    },
    logout() {
      let user = {
        name: "",
        phone: 0
      }
      this.user = user
      auth.value = user
    },
  },
});
