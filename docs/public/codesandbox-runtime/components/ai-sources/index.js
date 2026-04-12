import { withInstall } from "../../utils/index.js";
import AiSources from "./src/ai-sources.js";
const YhAiSources = withInstall(AiSources);
var stdin_default = YhAiSources;
export * from "./src/ai-sources-meta.js";
export {
  YhAiSources,
  stdin_default as default
};
