import { withInstall } from "../../utils/index.js";
import Input from "./src/input.js";
const YhInput = withInstall(Input);
var stdin_default = YhInput;
export * from "./src/input-meta.js";
export {
  YhInput,
  stdin_default as default
};
