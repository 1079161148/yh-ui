import { withInstall } from "../../utils/index.js";
import Watermark from "./src/watermark.js";
const YhWatermark = withInstall(Watermark);
var stdin_default = YhWatermark;
export * from "./src/watermark-meta.js";
export {
  YhWatermark,
  stdin_default as default
};
