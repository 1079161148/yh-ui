import { withInstall } from "../../utils/index.js";
import AiFileCard from "./src/ai-file-card.js";
const YhAiFileCard = withInstall(AiFileCard);
var stdin_default = YhAiFileCard;
export * from "./src/ai-file-card-meta.js";
export {
  YhAiFileCard,
  stdin_default as default
};
