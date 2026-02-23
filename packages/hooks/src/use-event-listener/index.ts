import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { MaybeRef } from 'vue'

export function useEventListener(
  target: MaybeRef<EventTarget | null | undefined> | (() => EventTarget | null | undefined),
  event: string,
  handler: (e: any) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (typeof window === 'undefined') return

  const getTarget = () => {
    if (typeof target === 'function') {
      return target()
    }
    return unref(target)
  }

  const add = () => {
    const el = getTarget()
    if (el) {
      el.addEventListener(event, handler, options)
    }
  }

  const remove = () => {
    const el = getTarget()
    if (el) {
      el.removeEventListener(event, handler, options)
    }
  }

  onMounted(add)
  onBeforeUnmount(remove)

  if (isRef(target)) {
    watch(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options)
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options)
      }
    })
  }
}
