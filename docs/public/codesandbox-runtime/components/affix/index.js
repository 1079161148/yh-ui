import { withInstall } from '../../utils/index.js'
import Affix from './src/affix.js'
const YhAffix = withInstall(Affix)
var stdin_default = YhAffix
export * from './src/affix.js'
export { YhAffix, stdin_default as default }
