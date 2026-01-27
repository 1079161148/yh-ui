import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * useScrollLock - 极致稳定的滚动锁定管理
 * @description 深度对标 Element Plus / Naive UI，解决复杂环境（包括 VitePress 等文档站点）下的内容移位问题
 */
export const useScrollLock = (trigger: Ref<boolean>) => {
  const isLocked = ref(false)
  let initialHtmlStyle = { overflow: '', paddingRight: '' }
  let initialBodyStyle = { overflow: '', paddingRight: '' }

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth
  }

  const lock = () => {
    if (isLocked.value) return
    const width = getScrollbarWidth()

    const html = document.documentElement
    const body = document.body

    // 备份所有可能被改动的初始状态
    initialHtmlStyle = {
      overflow: html.style.overflow,
      paddingRight: html.style.paddingRight
    }
    initialBodyStyle = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight
    }

    if (width > 0) {
      const scrollbarWidth = `${width}px`
      // 1. 设置根变量，供全局 CSS 以及固定定位元素使用
      html.style.setProperty('--yh-scrollbar-width', scrollbarWidth)

      // 2. 补偿 Body Padding
      const computedBodyPadding = window.getComputedStyle(body).paddingRight
      body.style.paddingRight = `calc(${computedBodyPadding} + ${scrollbarWidth})`
    }

    // 3. 锁定滚动
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.classList.add('yh-popup-parent--hidden')

    isLocked.value = true
  }

  const unlock = () => {
    if (!isLocked.value) return

    const html = document.documentElement
    const body = document.body

    // 1. 还原状态
    html.style.overflow = initialHtmlStyle.overflow
    html.style.paddingRight = initialHtmlStyle.paddingRight
    body.style.overflow = initialBodyStyle.overflow
    body.style.paddingRight = initialBodyStyle.paddingRight

    html.classList.remove('yh-popup-parent--hidden')

    // 2. 延迟移除变量，确保弹窗完全消失动画期间布局对齐
    setTimeout(() => {
      if (!html.classList.contains('yh-popup-parent--hidden')) {
        html.style.removeProperty('--yh-scrollbar-width')
      }
    }, 400)

    isLocked.value = false
  }

  watch(trigger, (val) => {
    if (val) {
      lock()
    } else {
      unlock()
    }
  })

  onUnmounted(unlock)

  return {
    isLocked
  }
}
