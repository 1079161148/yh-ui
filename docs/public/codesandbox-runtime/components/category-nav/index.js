import { withInstall } from "../../utils/index.js";
import CategoryNav from "./src/category-nav.js";
const YhCategoryNav = withInstall(CategoryNav);
var stdin_default = YhCategoryNav;
export * from "./src/category-nav-meta.js";
export {
  YhCategoryNav,
  stdin_default as default
};
