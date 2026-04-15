import { withInstall } from '../../utils/index.js'
import Avatar from './src/avatar.js'
const YhAvatar = withInstall(Avatar)
var stdin_default = YhAvatar
export * from './src/avatar-meta.js'
export { YhAvatar, stdin_default as default }
