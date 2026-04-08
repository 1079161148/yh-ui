import { withInstall } from "@yh-ui/utils";
import Checkbox from "./src/checkbox.vue";
import CheckboxGroup from "./src/checkbox-group.vue";
export const YhCheckbox = withInstall(Checkbox);
export const YhCheckboxGroup = withInstall(CheckboxGroup);
export default YhCheckbox;
export * from "./src/checkbox.mjs";
