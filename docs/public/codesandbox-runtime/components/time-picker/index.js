import { withInstall } from "../../utils/index.js";
import TimePicker from "./src/time-picker.js";
const YhTimePicker = withInstall(TimePicker);
var stdin_default = YhTimePicker;
export * from "./src/time-picker-meta.js";
export {
  YhTimePicker,
  stdin_default as default
};
