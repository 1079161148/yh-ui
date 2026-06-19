import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * useScrollLock - 极致稳定的滚动锁定管理
 * @description 深度对标 市面组件库 / Naive UI，解决复杂环境（包括 VitePress 等文档站点）下的内容移位问题
 */

// 全局状态共享，支持嵌套弹窗/组件滚动锁定防冲突
let lockCount = 0
let initialHtmlStyle = { overflow: '', paddingRight: '' }
let initialBodyStyle = { overflow: '', paddingRight: '' }

export const useScrollLock = (trigger: Ref<boolean>) => {
  const localLocked = ref(false)

  const getScrollbarWidth = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return 0
    return window.innerWidth - document.documentElement.clientWidth
  }

  const lock = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    if (localLocked.value) return

    const html = document.documentElement
    if (!html.classList.contains('yh-popup-parent--hidden')) {
      lockCount = 0
    }

    lockCount++
    localLocked.value = true

    if (lockCount === 1) {
      const width = getScrollbarWidth()
      const html = document.documentElement
      const body = document.body

      // 备份最原始的无锁状态
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
    }
  }

  const unlock = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    if (!localLocked.value) return

    localLocked.value = false
    lockCount = Math.max(0, lockCount - 1)

    if (lockCount === 0) {
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
        if (
          typeof html !== 'undefined' &&
          html &&
          !html.classList.contains('yh-popup-parent--hidden')
        ) {
          html.style.removeProperty('--yh-scrollbar-width')
        }
      }, 400)
    }
  }

  watch(
    trigger,
    (val) => {
      if (val) {
        lock()
      } else {
        unlock()
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (localLocked.value) {
      unlock()
    }
  })

  return {
    isLocked: localLocked
  }
}
