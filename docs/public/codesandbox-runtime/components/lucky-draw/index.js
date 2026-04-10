import { withInstall } from '../../utils/index.js'
import LuckyDraw from './src/lucky-draw.js'
const YhLuckyDraw = withInstall(LuckyDraw)
var stdin_default = YhLuckyDraw
export * from './src/lucky-draw.js'
export { YhLuckyDraw, stdin_default as default }
