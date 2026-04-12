import { withInstall } from "../../utils/index.js";
import AiVoiceTrigger from "./src/ai-voice-trigger.js";
const YhAiVoiceTrigger = withInstall(AiVoiceTrigger);
var stdin_default = YhAiVoiceTrigger;
export * from "./src/ai-voice-trigger-meta.js";
export {
  YhAiVoiceTrigger,
  stdin_default as default
};
