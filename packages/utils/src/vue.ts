/**
 * Vue 相关的工具函数
 * @description 获取组件名、添加安装方法等
 */
import type { App, Component, Plugin, Directive } from 'vue'
import type { SFCWithInstall } from './types'

/**
 * 为组件添加 install 方法，使其可以作为 Vue 插件使用
 */
export const withInstall = <T extends Component>(
  component: T,
  alias?: string
): SFCWithInstall<T> => {
  const comp = component as SFCWithInstall<T>

  comp.install = (app: App): void => {
    // 优先从组件定义中获取名称
    const name = (component as { name?: string }).name || (component as { __name?: string }).__name

    if (name) {
      app.component(name, component)
      if (alias) {
        app.component(alias, component)
      }
    }
  }

  return comp
}

/**
 * 为函数式组件或工具添加 install 方法
 */
export const withInstallFunction = <T>(fn: T, name: string): SFCWithInstall<T> => {
  const func = fn as SFCWithInstall<T>

  func.install = (app: App): void => {
    app.config.globalProperties[name] = fn
  }

  return func
}

/**
 * 批量注册组件和指令
 */
export const withInstallAll = (
  components: Component[],
  directives?: Record<string, Directive>
): Plugin => {
  return {
    install(app: App): void {
      components.forEach((component) => {
        const name =
          (component as { name?: string }).name || (component as { __name?: string }).__name
        if (name) {
          app.component(name, component)
        }
      })

      if (directives) {
        Object.entries(directives).forEach(([name, directive]) => {
          app.directive(name, directive)
        })
      }
    }
  }
}

/**
 * 用于 defineOptions 的类型辅助
 */
export interface ComponentOptions {
  name: string
  inheritAttrs?: boolean
}
