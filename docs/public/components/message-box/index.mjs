import { withInstallFunction } from "@yh-ui/utils";
import MessageBox from "./src/method.mjs";
import "./src/message-box.css";
export const YhMessageBox = withInstallFunction(MessageBox, "$msgbox");
const installExtra = (app) => {
  app.config.globalProperties.$alert = MessageBox.alert;
  app.config.globalProperties.$confirm = MessageBox.confirm;
  app.config.globalProperties.$prompt = MessageBox.prompt;
};
YhMessageBox.install = (app) => {
  app.config.globalProperties.$msgbox = YhMessageBox;
  installExtra(app);
};
export default YhMessageBox;
export * from "./src/message-box.mjs";
