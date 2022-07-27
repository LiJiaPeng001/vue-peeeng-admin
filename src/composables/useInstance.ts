export default function () {
  const instance: any = getCurrentInstance()
  let { appContext, ctx } = instance
  const proxy = appContext.config.globalProperties
  return {
    proxy,
    ctx,
  }
}