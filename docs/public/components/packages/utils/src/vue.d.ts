/**
 * Vue 相关的工具函数
 * @description 获取组件名、添加安装方法等
 */
import type { Component, Plugin, Directive } from 'vue'
import type { SFCWithInstall } from './types'
/**
 * 为组件添加 install 方法，使其可以作为 Vue 插件使用
 */
export declare const withInstall: <T extends Component, E extends Record<string, unknown>>(
  main: T,
  extra?: E
) => SFCWithInstall<T> & E
/**
 * 空安装方法，用于不需要独立安装的子组件
 */
export declare const withNoopInstall: <T extends Component>(component: T) => SFCWithInstall<T>
/**
 * 为函数式组件或工具添加 install 方法
 */
export declare const withInstallFunction: <T>(fn: T, name: string) => SFCWithInstall<T>
/**
 * 为指令添加 install 方法
 */
export declare const withInstallDirective: <T extends Directive>(
  directive: T,
  name: string
) => SFCWithInstall<T>
/**
 * 批量注册组件和指令
 */
export declare const withInstallAll: (
  components: Component[],
  directives?: Record<string, Directive>
) => Plugin
/**
 * 用于 defineOptions 的类型辅助
 */
export interface ComponentOptions {
  name: string
  inheritAttrs?: boolean
}
