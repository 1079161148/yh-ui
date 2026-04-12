import { withInstallFunction } from '../../utils/index.js'
import MessageBox from './src/method.js'
import './src/message-box.css'
const YhMessageBox = withInstallFunction(MessageBox, '$msgbox')
const installExtra = (app) => {
  app.config.globalProperties.$alert = MessageBox.alert
  app.config.globalProperties.$confirm = MessageBox.confirm
  app.config.globalProperties.$prompt = MessageBox.prompt
}
YhMessageBox.install = (app) => {
  app.config.globalProperties.$msgbox = YhMessageBox
  installExtra(app)
}
var stdin_default = YhMessageBox
export * from './src/message-box-meta.js'
export { YhMessageBox, stdin_default as default }
