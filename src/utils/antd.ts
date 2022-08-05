import { App } from "vue";
import "ant-design-vue/lib/notification/style/index.less";
import "ant-design-vue/lib/message/style/index.less";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons-vue";

export default (app: App) => {
  app.config.globalProperties.$icons = {
    HomeOutlined,
    SettingOutlined,
  };
};
