import { withInstall } from "@yh-ui/utils";
import Radio from "./src/radio.vue";
import RadioGroup from "./src/radio-group.vue";
import RadioButton from "./src/radio-button.vue";
export const YhRadio = withInstall(Radio);
export const YhRadioGroup = withInstall(RadioGroup);
export const YhRadioButton = withInstall(RadioButton);
export default YhRadio;
export * from "./src/radio.mjs";
