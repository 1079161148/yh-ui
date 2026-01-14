/**
 * Type utilities
 */
import type { AppContext, Plugin } from 'vue'

/**
 * 可空类型
 */
export type Nullable<T> = T | null

/**
 * 可选类型
 */
export type Awaitable<T> = T | Promise<T>

/**
 * 可数组类型
 */
export type Arrayable<T> = T | T[]

/**
 * 对象类型
 */
export type Recordable<T = any> = Record<string, T>

/**
 * 提取组件Props类型
 */
export type ComponentSize = 'large' | 'default' | 'small'

/**
 * Vue插件类型（带安装器）
 */
export type SFCWithInstall<T> = T & Plugin & {
  install: (app: import('vue').App, options?: any) => void
}

/**
 * 判断是否为字符串
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * 判断是否为数字
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number'

/**
 * 判断是否为布尔值
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'

/**
 * 判断是否为函数
 */
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * 判断是否为对象
 */
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

/**
 * 判断是否为 Promise
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch)

/**
 * 判断是否为数组
 */
export const isArray = Array.isArray

/**
 * 判断是否为 undefined
 */
export const isUndefined = (val: unknown): val is undefined => val === undefined

/**
 * 判断是否为 null 或 undefined
 */
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
