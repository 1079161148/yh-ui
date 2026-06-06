/*
 * @File name:
 * @Author: 1079161148@qq.com
 * @Version: V1.0
 * @Date: 2026-01-11 23:00:03
 * @Description:
 * Copyright (C) 2024-{year} Tsing Micro Technology Inc All rights reserved.
 */
/**
 * YH-UI - Vue 3 Component Library
 * @description 集众家之长的高性能 Vue 3 组件库
 */

import type { App, Plugin } from 'vue'
import type { Language } from '@yh-ui/locale'
import packageJson from '../package.json'

// 导出所有组件
export * from '@yh-ui/components'

// 导出所有 Hooks
export * from '@yh-ui/hooks'

// 解决组件与 Hooks 的同名类型歧义，组件侧保留原名，Hooks 侧通过别名继续暴露。
export type { AiChatMessage, SkuItem, SkuSpec, SkuSpecValue } from '@yh-ui/components'
export type {
  AiChatMessage as HookAiChatMessage,
  SkuItem as HookSkuItem,
  SkuSpec as HookSkuSpec,
  SkuSpecValue as HookSkuSpecValue
} from '@yh-ui/hooks'

// 导出所有工具函数
export * from '@yh-ui/utils'

// 导出设计令牌
export * from '@yh-ui/theme'

// 导出图标工具与元数据；避免直接整包透传导致与 @yh-ui/components 出现同名冲突。
export type {
  IconName,
  IconSize,
  IconColor,
  IconRotate,
  IconPreset,
  IconOptions,
  IconCollection,
  IconSearchResult,
  RecommendedCollection
} from '@yh-ui/icons'
export {
  AVAILABLE_COLLECTIONS,
  RECOMMENDED_COLLECTIONS,
  PRESETS,
  DEFAULT_ENABLED_PRESETS,
  PREFIX_ALIAS,
  COMMON_ICONS,
  ICON_COLLECTIONS,
  getPreset,
  getCollection,
  getAllPrefixes,
  createIconifyComponent,
  parseIconName,
  iconExists,
  getIconData
} from '@yh-ui/icons'

// 导出图标组件；保留 `import { Grid } from '@yh-ui/yh-ui'` 这类直出体验。
export * from '@yh-ui/icons/components'

// 解决图标层与组件层的公开 API 重名问题：主入口默认保留组件侧名称，图标侧改用别名继续暴露。
export { Loading, YhIcon, createIconComponent } from '@yh-ui/components'
export type { IconProps, YhIconProps } from '@yh-ui/components'
export {
  Loading as LoadingIcon,
  createIconComponent as createPresetIconComponent
} from '@yh-ui/icons/components'
export { Icon as IconifyIcon, YhIcon as IconifyYhIcon } from '@yh-ui/icons'
export type { IconProps as IconifyIconProps, YhIconProps as IconifyYhIconProps } from '@yh-ui/icons'

// 导出国际化
export * from '@yh-ui/locale'

// 解决重导出冲突 - 强制指定来源
export { zhCn, en } from '@yh-ui/locale'
export type { Language } from '@yh-ui/locale'
export { hexToRgb, rgbToHex } from '@yh-ui/utils'
export type { ComponentSize } from '@yh-ui/utils'

// 导入组件安装器
import components from '@yh-ui/components'

/**
 * 创建 YH-UI 实例
 */
export interface YhUIOptions {
  /**
   * 组件尺寸
   */
  size?: 'large' | 'default' | 'small'
  /**
   * 层级基数
   */
  zIndex?: number
  /**
   * 命名空间
   */
  namespace?: string
  /**
   * 国际化配置
   */
  locale?: Language
}

/**
 * 创建 YH-UI 插件
 */
export const createYhUI = (options: YhUIOptions = {}): Plugin => {
  return {
    install(app: App) {
      // 安装所有组件
      app.use(components)

      // 注入全局配置
      // 注意：这里可以根据需要注入到不同的 Key，或者统一使用 ConfigProvider 的注入逻辑
      app.provide('yh-ui-options', options)
    }
  }
}

/**
 * 默认安装函数
 */
export const install = (app: App, options?: YhUIOptions): void => {
  app.use(createYhUI(options))
}

/**
 * 默认导出
 */
export default {
  install,
  createYhUI
}

// 版本号
export const version = packageJson.version
