import { withInstall } from "../../utils/index.js";
import Col from "./src/col.js";
const YhCol = withInstall(Col);
var stdin_default = YhCol;
export * from "./src/col-meta.js";
export {
  YhCol,
  stdin_default as default
};
