import { withInstall } from "../../utils/index.js";
import Marquee from "./src/marquee.js";
const YhMarquee = withInstall(Marquee);
var stdin_default = YhMarquee;
export * from "./src/marquee-meta.js";
export {
  YhMarquee,
  stdin_default as default
};
