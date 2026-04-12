import { withInstall } from "../../utils/index.js";
import InputNumber from "./src/input-number.js";
const YhInputNumber = withInstall(InputNumber);
var stdin_default = YhInputNumber;
export * from "./src/input-number-meta.js";
export {
  YhInputNumber,
  stdin_default as default
};
