/**
 * DOM utilities
 */

/**
 * 判断是否在浏览器环境
 */
export const isClient = typeof window !== 'undefined'

/**
 * 判断是否在服务端环境
 */
export const isServer = !isClient

/**
 * 获取元素的样式
 */
export const getStyle = (element: HTMLElement, styleName: string): string => {
  if (!isClient || !element || !styleName) return ''
  try {
    const style = (element.style as unknown as Record<string, string>)[styleName]
    if (style) return style
    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? (computed as unknown as Record<string, string>)[styleName] : ''
  } catch {
    return (element.style as unknown as Record<string, string>)[styleName]
  }
}

/**
 * 设置元素的样式
 */
export const setStyle = (
  element: HTMLElement,
  styleName: string | Record<string, string>,
  value?: string
): void => {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    Object.entries(styleName).forEach(([key, val]) => {
      setStyle(element, key, val)
    })
  } else {
    ;(element.style as unknown as Record<string, string>)[styleName] = value ?? ''
  }
}

/**
 * 检查元素是否包含某个类名
 */
export const hasClass = (el: HTMLElement, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

/**
 * 添加类名
 */
export const addClass = (el: HTMLElement, cls: string): void => {
  if (!el || !cls.trim()) return
  el.classList.add(...cls.split(' ').filter(Boolean))
}

/**
 * 移除类名
 */
export const removeClass = (el: HTMLElement, cls: string): void => {
  if (!el || !cls.trim()) return
  el.classList.remove(...cls.split(' ').filter(Boolean))
}

/**
 * 切换类名
 */
export const toggleClass = (el: HTMLElement, cls: string, force?: boolean): void => {
  if (!el || !cls.trim()) return
  el.classList.toggle(cls, force)
}

/**
 * 获取滚动容器
 */
export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): HTMLElement | Window | undefined => {
  if (!isClient) return undefined

  let parent: HTMLElement = el
  while (parent) {
    if ([document.documentElement, document.body].includes(parent)) {
      return window
    }
    const overflow = isVertical ? getStyle(parent, 'overflowY') : getStyle(parent, 'overflow')
    if (/(scroll|auto)/.test(overflow)) {
      return parent
    }
    parent = parent.parentNode as HTMLElement
  }

  return undefined
}

/**
 * 检查元素是否在视口中
 */
export const isInViewport = (el: HTMLElement): boolean => {
  if (!isClient || !el) return false
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
