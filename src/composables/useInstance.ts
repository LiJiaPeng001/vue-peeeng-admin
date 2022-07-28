import { ComponentInternalInstance } from "vue"

export default function () {
  const instance = getCurrentInstance() as ComponentInternalInstance
  let { appContext } = instance
  const proxy = appContext.config.globalProperties
  return {
    proxy,
  }
}