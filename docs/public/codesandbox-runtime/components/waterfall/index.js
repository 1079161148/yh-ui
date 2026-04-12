import { withInstall } from "../../utils/index.js";
import Waterfall from "./src/waterfall.js";
const YhWaterfall = withInstall(Waterfall);
var stdin_default = YhWaterfall;
export * from "./src/waterfall-meta.js";
export {
  YhWaterfall,
  stdin_default as default
};
