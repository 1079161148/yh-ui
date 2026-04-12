import { withInstall } from '../../utils/index.js'
import Result from './src/result.js'
const YhResult = withInstall(Result)
var stdin_default = YhResult
export * from './src/result-meta.js'
export { YhResult, stdin_default as default }
