const isClient = typeof window !== 'undefined'
const isServer = !isClient
const getStyle = (element, styleName) => {
  var _a
  if (!isClient || !element || !styleName) return ''
  try {
    const style = element.style[styleName]
    if (style) return style
    const computed = (_a = document.defaultView) == null ? void 0 : _a.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}
const setStyle = (element, styleName, value) => {
  if (!element || !styleName) return
  if (typeof styleName === 'object') {
    Object.entries(styleName).forEach(([key, val]) => {
      setStyle(element, key, val)
    })
  } else {
    element.style[styleName] = value != null ? value : ''
  }
}
const hasClass = (el, cls) => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}
const addClass = (el, cls) => {
  if (!el || !cls.trim()) return
  el.classList.add(...cls.split(' ').filter(Boolean))
}
const removeClass = (el, cls) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...cls.split(' ').filter(Boolean))
}
const toggleClass = (el, cls, force) => {
  if (!el || !cls.trim()) return
  el.classList.toggle(cls, force)
}
const getScrollContainer = (el, isVertical) => {
  if (!isClient) return void 0
  let parent = el
  while (parent) {
    if ([document.documentElement, document.body].includes(parent)) {
      return window
    }
    const overflow = isVertical ? getStyle(parent, 'overflowY') : getStyle(parent, 'overflow')
    if (/(scroll|auto)/.test(overflow)) {
      return parent
    }
    parent = parent.parentNode
  }
  return void 0
}
const isInViewport = (el) => {
  if (!isClient || !el) return false
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
let scrollBarWidth
const getScrollbarWidth = () => {
  var _a
  if (!isClient) return 0
  if (scrollBarWidth !== void 0) return scrollBarWidth
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  ;(_a = outer.parentNode) == null ? void 0 : _a.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll
  return scrollBarWidth
}
export {
  addClass,
  getScrollContainer,
  getScrollbarWidth,
  getStyle,
  hasClass,
  isClient,
  isInViewport,
  isServer,
  removeClass,
  setStyle,
  toggleClass
}
