import { withInstall } from "../../utils/index.js";
import AiCodeEditor from "./src/ai-code-editor.js";
const YhAiCodeEditor = withInstall(AiCodeEditor);
var stdin_default = YhAiCodeEditor;
export * from "./src/ai-code-editor-meta.js";
export {
  YhAiCodeEditor,
  stdin_default as default
};
