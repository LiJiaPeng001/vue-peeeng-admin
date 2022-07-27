import { defineStore } from 'pinia'
import { SettingState } from '#/store'

export default defineStore('setting', {
  state(): SettingState {
    return {
      mode: "pc",
      collapsed: false,
      theme: 'light',
      cacheTabs: [],
      openKeys: [],
      refreshPath: "",
    }
  },
  getters: {
    // 菜单宽度
    menuW: state => state.mode === "pc" ? (!state.collapsed ? 210 : 80) : 210,
    // layout-width
    layoutW: state => state.mode === "pc" ? (!state.collapsed ? 210 : 80) : 0,
    inlineCollapsed: state => state.mode === "pc" ? state.collapsed : false  // menu - inlineCollapsed
  },
  actions: {
    onlistenBodyResize(options: ResizeObserverEntry['contentRect']) {
      let { width = 0 } = options
      if (width >= 1000) {
        this.mode = "pc"
        this.collapsed = false
      }
      else {
        this.mode = "mobile"
        this.collapsed = false
      }
    },
    refreshPage(path: string) {
      this.refreshPath = path
    }
  }
})