import { Spin } from "ant-design-vue";
import { DefineComponent, createApp, ComponentOptions } from "vue";

let app: ComponentOptions;

export default function useLoading() {
  const LoadingCtrl: DefineComponent = defineComponent({
    setup() {
      let visible = ref(false);
      return {
        visible,
      };
    },
    render() {
      return this.visible && h("div", { class: "loading-ctrl" }, [h(Spin, { tip: "wuhu" })]);
    },
  });
  if (!app) {
    let instence = document.createElement("div");
    document.body.append(instence);
    app = createApp(LoadingCtrl).mount(instence);
  }
  return {
    num: 0,
    show() {
      this.num += 1;
      if (this.num === 1) {
        app.visible = true;
      }
    },
    hide(force = false) {
      if (force) {
        this.num = 0;
        app.visible = false;
        return;
      }
      // 等待发出去的请求返回结果后结束loading
      if (this.num > 0) this.num -= 1;
      if (this.num === 0) {
        app.visible = false;
      }
    },
  };
}
