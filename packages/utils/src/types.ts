/**
 * Type utilities
 * @description 基础类型工具库，彻底移除 any，支持更严谨的类型推断
 */
import type { App, Plugin } from 'vue'

/**
 * 可空类型
 */
export type Nullable<T> = T | null

/**
 * 可异步类型
 */
export type Awaitable<T> = T | Promise<T>

/**
 * 数组或单值类型
 */
export type Arrayable<T> = T | T[]

/**
 * 通用对象类型
 */
export type Recordable<T = unknown> = Record<string, T>

/**
 * 组件尺寸标准
 */
export type ComponentSize = 'large' | 'default' | 'small'

/**
 * Vue 插件类型（带安装器）
 */
export type SFCWithInstall<T> = T &
  Plugin & {
    install: (app: App, options?: Record<string, unknown>) => void
  }

/**
 * 类型判断工具函数
 */

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'

export const isFunction = (val: unknown): val is (...args: unknown[]) => unknown =>
  typeof val === 'function'

export const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = unknown>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch)

export const isArray = Array.isArray

export const isUndefined = (val: unknown): val is undefined => val === undefined

export const isNil = (val: unknown): val is null | undefined => val == null

/**
 * 判断是否为空值（null, undefined, '', [], {}）
 */
export const isEmpty = (val: unknown): boolean => {
  if (isNil(val)) return true
  if (isArray(val)) return val.length === 0
  if (isString(val)) return val.trim().length === 0
  if (isObject(val)) return Object.keys(val).length === 0
  return false
}

/**
 * 判断是否为有效的数字字符串
 */
export const isNumeric = (val: unknown): val is string | number =>
  !isNil(val) && !isNaN(parseFloat(String(val))) && isFinite(Number(val))
