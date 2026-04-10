import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
function useEventListener(target, event, handler, options) {
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
export { useEventListener }
