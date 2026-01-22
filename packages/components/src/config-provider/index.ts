import { withInstall } from '@yh-ui/utils'
import ConfigProvider from './src/config-provider'

export const YhConfigProvider = withInstall(ConfigProvider)
export default YhConfigProvider

export * from './src/config-provider'
export * from './src/locale'
