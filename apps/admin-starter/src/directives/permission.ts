import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores/user'

function checkPermission(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
  const userStore = useUserStore()
  const { value, arg } = binding

  if (!value) {
    el.remove()
    return
  }

  if (typeof value === 'string') {
    if (!userStore.hasPermission(value)) {
      if (arg === 'disabled') {
        el.classList.add('is-disabled')
        el.setAttribute('disabled', 'true')
      } else {
        el.remove()
      }
    }
    return
  }

  if (Array.isArray(value)) {
    const mode = arg || 'some'
    const hasAccess =
      mode === 'every'
        ? value.every((perm) => userStore.hasPermission(perm))
        : value.some((perm) => userStore.hasPermission(perm))

    if (!hasAccess) {
      el.remove()
    }
  }
}

export const vPermission: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
}

export default vPermission
