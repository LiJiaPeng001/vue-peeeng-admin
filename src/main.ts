import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import pinia from "./store";
import components from "./common/index"
import icons from "./utils/icons"
import PageLayout from './layouts/page-layout.vue'

import 'uno.css'
import "./style/index.less"

const Vue = createApp(App);
Vue.use(pinia);
Vue.use(router);
Vue.use(icons)
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
Vue.component('page-layout', PageLayout)


Vue.mount("#app");
