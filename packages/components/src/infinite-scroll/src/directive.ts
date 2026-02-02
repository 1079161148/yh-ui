import { nextTick, type Directive, type DirectiveBinding } from 'vue'

const SCOPE_KEY = Symbol('InfiniteScroll')

interface InfiniteScrollScope {
  observer: IntersectionObserver | null
  cb: () => void
  disabled: boolean
  distance: number
  immediate: boolean
  sentinel: HTMLElement
}

export const vInfiniteScroll: Directive = {
  mounted(el: HTMLElement & { [SCOPE_KEY]?: InfiniteScrollScope }, binding: DirectiveBinding) {
    const { value } = binding
    if (typeof value !== 'function') {
      throw new Error('v-infinite-scroll value must be a function')
    }

    const distance = Number(el.getAttribute('infinite-scroll-distance')) || 0
    const disabledAttr = el.getAttribute('infinite-scroll-disabled')
    const immediateAttr = el.getAttribute('infinite-scroll-immediate')

    // Create sentinel
    const sentinel = document.createElement('div')
    sentinel.className = 'yh-infinite-scroll-sentinel'
    sentinel.style.height = '1px'
    sentinel.style.width = '100%'
    sentinel.style.marginTop = '-1px'
    sentinel.style.pointerEvents = 'none'
    el.appendChild(sentinel)

    const scope: InfiniteScrollScope = {
      cb: value,
      observer: null,
      disabled: disabledAttr === 'true' || disabledAttr === '',
      distance: distance,
      immediate: immediateAttr !== 'false',
      sentinel
    }

    el[SCOPE_KEY] = scope

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !scope.disabled) {
          scope.cb()
        }
      },
      {
        root:
          el.style.overflow === 'auto' ||
          el.style.overflow === 'scroll' ||
          el === document.documentElement
            ? null
            : el,
        rootMargin: `0px 0px ${scope.distance}px 0px`
      }
    )

    observer.observe(sentinel)
    scope.observer = observer

    if (scope.immediate) {
      nextTick(() => {
        // IntersectionObserver will trigger anyway if intersecting
      })
    }
  },

  updated(el: HTMLElement & { [SCOPE_KEY]?: InfiniteScrollScope }, binding: DirectiveBinding) {
    const scope = el[SCOPE_KEY]
    if (!scope) return

    const disabledAttr = el.getAttribute('infinite-scroll-disabled')
    scope.disabled = disabledAttr === 'true' || disabledAttr === ''
    scope.cb = binding.value

    const distance = Number(el.getAttribute('infinite-scroll-distance')) || 0
    if (distance !== scope.distance) {
      scope.distance = distance
      // Re-create observer if distance changed
      if (scope.observer) {
        scope.observer.disconnect()
        scope.observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            if (entry.isIntersecting && !scope.disabled) {
              scope.cb()
            }
          },
          {
            rootMargin: `0px 0px ${scope.distance}px 0px`
          }
        )
        scope.observer.observe(scope.sentinel)
      }
    }
  },

  unmounted(el: HTMLElement & { [SCOPE_KEY]?: InfiniteScrollScope }) {
    const scope = el[SCOPE_KEY]
    if (scope) {
      if (scope.observer) {
        scope.observer.disconnect()
      }
      if (scope.sentinel && scope.sentinel.parentNode === el) {
        el.removeChild(scope.sentinel)
      }
    }
  }
}
