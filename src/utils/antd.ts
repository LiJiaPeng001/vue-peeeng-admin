import { App } from "vue";
import "ant-design-vue/lib/notification/style/index.less";
import "ant-design-vue/lib/message/style/index.less";
import "ant-design-vue/lib/modal/style/index.less";
import {
  HomeOutlined,
  SettingOutlined,
  CameraOutlined,
  BugOutlined,
  EditOutlined,
  DeleteOutlined,
  CreditCardOutlined,
  FileImageOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

export default (app: App) => {
  app.component("HomeOutlined", HomeOutlined);
  app.component("SettingOutlined", SettingOutlined);
  app.component("CameraOutlined", CameraOutlined);
  app.component("BugOutlined", BugOutlined);
  app.component("EditOutlined", EditOutlined);
  app.component("DeleteOutlined", DeleteOutlined);
  app.component("CreditCardOutlined", CreditCardOutlined);
  app.component("FileImageOutlined", FileImageOutlined);
  app.component("UserOutlined", UserOutlined);
};
