import { withInstall } from '../../utils/index.js'
import InputTag from './src/input-tag.js'
const YhInputTag = withInstall(InputTag)
var stdin_default = YhInputTag
export * from './src/input-tag.js'
export { YhInputTag, stdin_default as default }
