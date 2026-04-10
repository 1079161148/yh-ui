import { withInstall, withInstallFunction } from '../../utils/index.js'
import Dialog from './src/dialog.js'
import DialogMethod from './src/method.js'
const YhDialog = withInstall(Dialog)
const YhDialogMethod = withInstallFunction(DialogMethod, '$dialog')
var stdin_default = YhDialog
export * from './src/dialog.js'
export * from './src/use-dialog.js'
export { YhDialog, YhDialogMethod, stdin_default as default }
