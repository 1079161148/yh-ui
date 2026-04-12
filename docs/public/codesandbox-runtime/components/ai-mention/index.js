import { withInstall } from "../../utils/index.js";
import AiMention from "./src/ai-mention.js";
const YhAiMention = withInstall(AiMention);
var stdin_default = YhAiMention;
export * from "./src/ai-mention-meta.js";
export {
  YhAiMention,
  stdin_default as default
};
