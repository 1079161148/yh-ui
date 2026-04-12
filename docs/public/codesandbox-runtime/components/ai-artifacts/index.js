import { withInstall } from "../../utils/index.js";
import AiArtifacts from "./src/ai-artifacts.js";
const YhAiArtifacts = withInstall(AiArtifacts);
var stdin_default = YhAiArtifacts;
export * from "./src/ai-artifacts-meta.js";
export {
  YhAiArtifacts,
  stdin_default as default
};
