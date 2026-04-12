import { withInstall } from "../../utils/index.js";
import SubmitBar from "./src/submit-bar.js";
const YhSubmitBar = withInstall(SubmitBar);
var stdin_default = YhSubmitBar;
export * from "./src/submit-bar-meta.js";
export {
  YhSubmitBar,
  stdin_default as default
};
