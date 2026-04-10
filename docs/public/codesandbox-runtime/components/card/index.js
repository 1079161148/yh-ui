import { withInstall } from '../../utils/index.js'
import Card from './src/card.js'
const YhCard = withInstall(Card)
var stdin_default = YhCard
export * from './src/card.js'
export { YhCard, stdin_default as default }
