import { withInstall } from '../../utils/index.js'
import ConfigProvider from './src/config-provider.js'
const YhConfigProvider = withInstall(ConfigProvider)
var stdin_default = YhConfigProvider
export * from './src/config-provider.js'
export * from './src/locale.js'
import { configProviderContextKey } from '../../hooks/index.js'
export { YhConfigProvider, configProviderContextKey, stdin_default as default }
