/**
 * Common utilities
 */

/**
 * 生成唯一ID
 */
let idCounter = 0
export const generateId = (prefix = 'yh'): string => {
  return `${prefix}-${Date.now()}-${++idCounter}`
}

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debounced
}

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = delay - (now - lastTime)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn(...args)
      lastTime = now
    } else if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        lastTime = Date.now()
        timer = null
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    lastTime = 0
  }

  return throttled
}

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }
  if (obj instanceof Object) {
    const copy = {} as Record<string, any>
    Object.keys(obj).forEach((key) => {
      copy[key] = deepClone((obj as Record<string, any>)[key])
    })
    return copy as T
  }
  return obj
}

/**
 * 深度合并对象
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target

  const source = sources.shift()
  if (source === undefined) return target

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key]
      const sourceValue = source[key]

      if (
        typeof targetValue === 'object' &&
        targetValue !== null &&
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(targetValue) &&
        !Array.isArray(sourceValue)
      ) {
        target[key] = deepMerge({ ...targetValue }, sourceValue)
      } else {
        target[key] = sourceValue as T[Extract<keyof T, string>]
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * 将值转换为数组
 */
export const toArray = <T>(val: T | T[]): T[] => {
  return Array.isArray(val) ? val : [val]
}

/**
 * 首字母大写
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 转换为 kebab-case
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

/**
 * 转换为 camelCase
 */
export const camelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 休眠函数
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 访问对象嵌套路径的值
 */
export const get = (obj: any, path: string, defaultValue?: any) => {
  const result = path
    .split('.')
    .reduce((res, key) => (res !== null && res !== undefined ? res[key] : undefined), obj)
  return result === undefined ? defaultValue : result
}

/**
 * 设置对象嵌套路径的值
 */
export const set = (obj: any, path: string, value: any) => {
  if (Object(obj) !== obj) return obj
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const node = keys.reduce((res, key) => {
    if (res[key] === undefined) res[key] = {}
    return res[key]
  }, obj)
  node[lastKey] = value
  return obj
}

/**
 * 异步函数重试
 */
export const retry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await sleep(delay)
      return retry(fn, retries - 1, delay)
    }
    throw error
  }
}
