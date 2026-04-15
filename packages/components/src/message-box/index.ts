import type { App } from 'vue'
import { withInstallFunction } from '@yh-ui/utils'
import MessageBox from './src/method'
import './src/message-box.scss'

export const YhMessageBox = withInstallFunction(MessageBox, '$msgbox')

const installExtra = (app: App) => {
  app.config.globalProperties.$alert = MessageBox.alert
  app.config.globalProperties.$confirm = MessageBox.confirm
  app.config.globalProperties.$prompt = MessageBox.prompt
}

YhMessageBox.install = (app: App) => {
  app.config.globalProperties.$msgbox = YhMessageBox
  installExtra(app)
}

export default YhMessageBox

export * from './src/message-box'

export type YhMessageBoxType = import('./src/message-box').MessageBoxType
export type YhMessageBoxData = import('./src/message-box').MessageBoxData
export type YhMessageBoxAction = import('./src/message-box').MessageBoxAction
export type YhMessageBoxState = import('./src/message-box').MessageBoxState
export type YhMessageBoxInstance = import('./src/message-box').MessageBoxInstance
export type YhMessageBoxOptions = import('./src/message-box').MessageBoxOptions
export type YhMessageBoxHandler = import('./src/message-box').MessageBoxHandler
