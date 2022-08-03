import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import pinia from "./store";
import components from "./common/index";
import antd from "./utils/antd";

import "./style/index.less";

const Vue = createApp(App);
Vue.use(pinia);
Vue.use(router);

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

antd(Vue);

Vue.mount("#app");
