import { withInstall } from "../../utils/index.js";
import Icon from "./src/icon.js";
import "./src/icon.css";
export * from "./src/icons/index.js";
export * from "./src/icon-meta.js";
const YhIcon = withInstall(Icon);
var stdin_default = YhIcon;
export {
  YhIcon,
  stdin_default as default
};
