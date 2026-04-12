import { withInstall } from '../../utils/index.js'
import Mention from './src/mention.js'
const YhMention = withInstall(Mention)
var stdin_default = YhMention
export * from './src/mention-meta.js'
export { YhMention, stdin_default as default }
