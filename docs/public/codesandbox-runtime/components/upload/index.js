import { withInstall } from "../../utils/index.js";
import Upload from "./src/upload.js";
const YhUpload = withInstall(Upload);
var stdin_default = YhUpload;
export * from "./src/upload-meta.js";
export {
  YhUpload,
  stdin_default as default
};
