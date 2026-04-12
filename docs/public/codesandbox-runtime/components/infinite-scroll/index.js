import { withInstall, withInstallDirective } from "../../utils/index.js";
import InfiniteScroll from "./src/infinite-scroll.js";
import { vInfiniteScroll } from "./src/directive.js";
const YhInfiniteScroll = withInstall(InfiniteScroll, {
  directive: vInfiniteScroll
});
const vYhInfiniteScroll = withInstallDirective(vInfiniteScroll, "infinite-scroll");
var stdin_default = YhInfiniteScroll;
export * from "./src/infinite-scroll-meta.js";
export * from "./src/directive.js";
export {
  YhInfiniteScroll,
  stdin_default as default,
  vYhInfiniteScroll
};
