import { withInstall, withInstallFunction } from '@yh-ui/utils'
import Dialog from './src/dialog.vue'
import DialogMethod from './src/method'

// 对外导出的核心组件
export const YhDialog = withInstall(Dialog)

// 对外导出的函数式调用方法 (例如 YhDialogMethod.show)
export const YhDialogMethod = withInstallFunction(DialogMethod, '$dialog')

export default YhDialog

// 导出所有类型、Hook 和核心实现
export * from './src/dialog'
export * from './src/use-dialog'
export type { DialogMethod } from './src/method'

export type DialogInstance = InstanceType<typeof Dialog>
