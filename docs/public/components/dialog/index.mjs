import { withInstall, withInstallFunction } from "@yh-ui/utils";
import Dialog from "./src/dialog.vue";
import DialogMethod from "./src/method.mjs";
export const YhDialog = withInstall(Dialog);
export const YhDialogMethod = withInstallFunction(DialogMethod, "$dialog");
export default YhDialog;
export * from "./src/dialog.mjs";
export * from "./src/use-dialog.mjs";
