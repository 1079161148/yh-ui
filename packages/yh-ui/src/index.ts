/**
 * YH-UI - Vue 3 Component Library
 * @description 集众家之长的高性能 Vue 3 组件库
 */

import type { App, Plugin } from 'vue'

// 导出所有组件
export * from '@yh-ui/components'

// 导出所有 Hooks
export * from '@yh-ui/hooks'

// 导出所有工具函数
export * from '@yh-ui/utils'

// 导出设计令牌
export * from '@yh-ui/theme'

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
export const version = '0.0.1'
