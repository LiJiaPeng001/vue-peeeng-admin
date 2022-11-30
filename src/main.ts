import { createApp } from "vue";
import dayjs from "dayjs";
import { createPinia } from "pinia";

import "uno.css";
import "@unocss/reset/normalize.css";

import App from "./App.vue";
import router from "./router/index";
import components from "./common/index";
import antd from "./utils/antd";

import "./style/index.less";

const Vue = createApp(App);
const pinia = createPinia();

dayjs.locale("zh-cn");
Vue.use(pinia);
Vue.use(router);

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

antd(Vue);

Vue.mount("#app");
