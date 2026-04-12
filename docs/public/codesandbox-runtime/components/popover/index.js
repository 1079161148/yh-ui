import { withInstall } from "../../utils/index.js";
import Popover from "./src/popover.js";
const YhPopover = withInstall(Popover);
var stdin_default = YhPopover;
export * from "./src/popover-meta.js";
export {
  YhPopover,
  stdin_default as default
};
