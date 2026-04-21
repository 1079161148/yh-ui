/**
 * Common utilities
 * @description 通用工具函数库，严格类型化
 */
export declare const generateId: (prefix?: string) => string
/**
 * 函数类型定义
 */
type AnyFunction = (...args: unknown[]) => unknown
/**
 * 可取消函数类型
 */
interface CancelableFunction<T extends AnyFunction> {
  (...args: Parameters<T>): ReturnType<T>
  cancel: () => void
}
/**
 * 防抖函数
 */
export declare const debounce: <T extends AnyFunction>(
  fn: T,
  delay: number
) => CancelableFunction<T>
/**
 * 节流函数
 */
export declare const throttle: <T extends AnyFunction>(
  fn: T,
  delay: number
) => CancelableFunction<T>
/**
 * 深拷贝
 */
export declare const deepClone: <T>(obj: T) => T
/**
 * 深度合并对象
 */
export declare const deepMerge: <T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
) => T
/**
 * 将值转换为数组
 */
export declare const toArray: <T>(val: T | T[]) => T[]
/**
 * 首字母大写
 */
export declare const capitalize: (str: string) => string
/**
 * 转换为 kebab-case
 */
export declare const kebabCase: (str: string) => string
/**
 * 转换为 camelCase
 */
export declare const camelCase: (str: string) => string
/**
 * 休眠函数
 */
export declare const sleep: (ms: number) => Promise<void>
/**
 * 访问对象嵌套路径的值
 */
export declare const get: <T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
) => T
/**
 * 设置对象嵌套路径的值
 */
export declare const set: <T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
) => T
/**
 * 异步函数重试
 */
export declare const retry: <T>(
  fn: () => Promise<T>,
  retries?: number,
  delay?: number
) => Promise<T>
export {}
