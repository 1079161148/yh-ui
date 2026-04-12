import { withInstall } from "../../utils/index.js";
import Alert from "./src/alert.js";
const YhAlert = withInstall(Alert);
var stdin_default = YhAlert;
export * from "./src/alert-meta.js";
export {
  YhAlert,
  stdin_default as default
};
