import { defineStore } from 'pinia'
import { UserState } from '#/store'

export default defineStore('user', {
  state(): UserState {
    return {
      user: {
        name: "",
        phone: 0
      },
    }
  },
  getters: {
    isLogin: state => state.user.name
  },
  actions: {
    login(payload: any) {
      this.user = {
        name: "李家朋",
        phone: 13673717028
      }
      return true
    },
    logout() {
      this.user = {
        name: "",
        phone: 0
      }
    }
  }
})