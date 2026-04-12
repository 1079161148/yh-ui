import { withInstall } from '../../utils/index.js'
import Button from './src/button.js'
const YhButton = withInstall(Button)
var stdin_default = YhButton
export * from './src/button-meta.js'
export { YhButton, stdin_default as default }
