/*
 * @File name:
 * @Author: 1079161148@qq.com
 * @Version: V1.0
 * @Date: 2026-01-21 11:55:19
 * @Description:
 * Copyright (C) 2024-{year} Tsing Micro Technology Inc All rights reserved.
 */
import { withInstall } from '@yh-ui/utils'
import ConfigProvider from './src/config-provider'

export const YhConfigProvider = withInstall(ConfigProvider)
export default YhConfigProvider

export * from './src/config-provider'
export * from './src/locale'

// Re-export configProviderContextKey and ConfigProviderContext from hooks
export { configProviderContextKey } from '@yh-ui/hooks'
export type { ConfigProviderContext } from '@yh-ui/hooks'

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>
