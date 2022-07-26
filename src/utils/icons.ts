import { App } from "vue";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons-vue";

export default {
  install(app: App) {
    app.config.globalProperties.$icons = {
      HomeOutlined,
      SettingOutlined
    }
  }
}