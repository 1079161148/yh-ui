import { withInstall } from "../../utils/index.js";
import AiBubble from "./src/ai-bubble.js";
const YhAiBubble = withInstall(AiBubble);
var stdin_default = YhAiBubble;
export * from "./src/ai-bubble-meta.js";
export {
  YhAiBubble,
  stdin_default as default
};
