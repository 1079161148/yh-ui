/**
 * useNamespace - BEM 命名空间 Hook
 * @description 生成符合 BEM 规范的 CSS 类名
 */
import { computed, inject, ref, unref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// 默认命名空间配置
export const defaultNamespace = 'yh'
const statePrefix = 'is-'

// 命名空间注入 Key
export const namespaceContextKey: InjectionKey<Ref<string>> = Symbol('namespaceContextKey')

/**
 * 获取全局命名空间
 */
export const useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}

/**
 * useNamespace - 生成 BEM 类名
 * @param block - 块名称
 * @returns BEM 类名生成器
 *
 * @example
 * const ns = useNamespace('button')
 * ns.b() // 'yh-button'
 * ns.e('icon') // 'yh-button__icon'
 * ns.m('primary') // 'yh-button--primary'
 * ns.is('disabled') // 'is-disabled'
 * ns.bem('box', 'item', 'active') // 'yh-button-box__item--active'
 */
export const useNamespace = (block: string) => {
  const namespace = useGlobalNamespace()

  // 生成块类名: yh-button
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }

  // 生成元素类名: yh-button__icon
  const e = (element?: string) => {
    return element ? `${b()}__${element}` : ''
  }

  // 生成修饰符类名: yh-button--primary
  const m = (modifier?: string) => {
    return modifier ? `${b()}--${modifier}` : ''
  }

  // 生成 BEM 类名: yh-button-box__item--active
  const bem = (blockSuffix?: string, element?: string, modifier?: string) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }

  // 生成元素修饰符类名: yh-button__icon--loading
  const em = (element?: string, modifier?: string) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }

  // 生成状态类名: is-disabled
  const is = (state: string, value?: boolean) => {
    return value !== undefined
      ? value
        ? `${statePrefix}${state}`
        : ''
      : `${statePrefix}${state}`
  }

  // CSS 变量命名空间: --yh-button-color
  const cssVar = (name: string) => {
    return `--${unref(namespace)}-${block}-${name}`
  }

  // CSS 变量命名空间对象
  const cssVarObj = (vars: Record<string, string>) => {
    const obj: Record<string, string> = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }

  // CSS 变量块: --yh-color
  const cssVarBlock = (name: string) => {
    return `--${unref(namespace)}-${name}`
  }

  // CSS 变量块对象
  const cssVarBlockObj = (vars: Record<string, string>) => {
    const obj: Record<string, string> = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }

  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
