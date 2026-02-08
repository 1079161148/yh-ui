import { unref } from 'vue'
import { useEventListener } from './use-event-listener'
import type { MaybeRef } from 'vue'

export function useClickOutside(
  target: MaybeRef<HTMLElement | null | undefined>,
  handler: (evt: MouseEvent | TouchEvent) => void
) {
  if (typeof window === 'undefined') return

  const listener = (event: MouseEvent | TouchEvent) => {
    const el = unref(target)
    if (!el) return

    // 检查点击路径中是否包含目标元素
    // 使用 composedPath 以支持 Shadow DOM
    const path = event.composedPath()
    if (path.includes(el)) return

    handler(event)
  }

  // 监听 mousedown 和 touchstart 以更早地处理，并使用 capture 确保能捕获到即使子元素停止了冒泡的事件
  useEventListener(window, 'mousedown', listener, true)
  useEventListener(window, 'touchstart', listener, true)
}
