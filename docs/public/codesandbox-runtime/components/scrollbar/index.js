import { withInstall } from "../../utils/index.js";
import Scrollbar from "./src/scrollbar.js";
const YhScrollbar = withInstall(Scrollbar);
var stdin_default = YhScrollbar;
export * from "./src/scrollbar-meta.js";
export {
  YhScrollbar,
  stdin_default as default
};
