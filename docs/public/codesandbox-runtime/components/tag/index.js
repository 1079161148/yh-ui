import { withInstall } from "../../utils/index.js";
import Tag from "./src/tag.js";
const YhTag = withInstall(Tag);
var stdin_default = YhTag;
export * from "./src/tag-meta.js";
export {
  YhTag,
  stdin_default as default
};
