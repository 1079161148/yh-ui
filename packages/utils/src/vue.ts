/**
 * Vue 相关的工具函数
 * @description 获取组件名、添加安装方法等
 */
import type { App, Component, Plugin, Directive } from 'vue'
import type { SFCWithInstall } from './types'

/**
 * 为组件添加 install 方法，使其可以作为 Vue 插件使用
 */
export const withInstall = <T extends Component, E extends Record<string, any>>(
  main: T,
  extra?: E
): SFCWithInstall<T> & E => {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      const name = (comp as { name?: string }).name || (comp as { __name?: string }).__name
      if (name) {
        app.component(name, comp)
      }
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

/**
 * 空安装方法，用于不需要独立安装的子组件
 */
export const withNoopInstall = <T extends Component>(component: T): SFCWithInstall<T> => {
  ;(component as SFCWithInstall<T>).install = () => {
    // Noop
  }
  return component as SFCWithInstall<T>
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
 * 为指令添加 install 方法
 */
export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
): SFCWithInstall<T> => {
  const dir = directive as SFCWithInstall<T>
  dir.install = (app: App): void => {
    app.directive(name, dir)
  }
  return dir
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
