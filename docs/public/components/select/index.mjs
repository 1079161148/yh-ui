import { withInstall } from "@yh-ui/utils";
import Select from "./src/select.vue";
import Option from "./src/option.vue";
export const YhSelect = withInstall(Select);
export const YhOption = withInstall(Option);
export default YhSelect;
export * from "./src/select.mjs";
