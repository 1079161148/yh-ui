import { withInstall } from "../../utils/index.js";
import SkuSelector from "./src/sku-selector.js";
const YhSkuSelector = withInstall(SkuSelector);
var stdin_default = YhSkuSelector;
export * from "./src/sku-selector-meta.js";
export {
  YhSkuSelector,
  stdin_default as default
};
