import { withInstall, withNoopInstall } from "@yh-ui/utils";
import Steps from "./src/steps.vue";
import Step from "./src/step.vue";
export const YhSteps = withInstall(Steps, { Step });
export const YhStep = withNoopInstall(Step);
export default YhSteps;
export * from "./src/steps.mjs";
export * from "./src/step.mjs";
