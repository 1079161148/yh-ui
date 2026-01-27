import { withInstallFunction } from '@yh-ui/utils'
import MessageBox from './src/method'
import './src/message-box.scss'

export const YhMessageBox = withInstallFunction(MessageBox, '$msgbox')

const installExtra = (app: any) => {
  app.config.globalProperties.$alert = MessageBox.alert
  app.config.globalProperties.$confirm = MessageBox.confirm
  app.config.globalProperties.$prompt = MessageBox.prompt
}

YhMessageBox.install = (app: any) => {
  app.config.globalProperties.$msgbox = MessageBox
  installExtra(app)
}

export default YhMessageBox

export * from './src/message-box'
