import { withInstall } from "../../utils/index.js";
import AiCodeRunner from "./src/ai-code-runner.js";
const YhAiCodeRunner = withInstall(AiCodeRunner);
var stdin_default = YhAiCodeRunner;
export * from "./src/ai-code-runner-meta.js";
export {
  YhAiCodeRunner,
  stdin_default as default
};
