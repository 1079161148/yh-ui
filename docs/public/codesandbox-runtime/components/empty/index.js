import { withInstall } from "../../utils/index.js";
import Empty from "./src/empty.js";
const YhEmpty = withInstall(Empty);
var stdin_default = YhEmpty;
export * from "./src/empty-meta.js";
export {
  YhEmpty,
  stdin_default as default
};
