import { type Directive, type DirectiveBinding } from 'vue'
import { Loading, type LoadingInstance } from './service'
import type { LoadingSpinnerType } from '../../spin'

const INSTANCE_KEY = Symbol('LoadingInstance')

/**
 * 优化后的 v-yh-loading 指令
 * 状态管理由 Service 内部闭环，指令仅负责生命周期触发
 */
export const vLoading: Directive = {
  mounted(el: HTMLElement & { [INSTANCE_KEY]?: LoadingInstance }, binding: DirectiveBinding) {
    const parseOptions = () => ({
      target: el,
      fullscreen: binding.modifiers.fullscreen ?? false,
      lock: binding.modifiers.lock ?? false,
      text: el.getAttribute('yh-loading-text') || undefined,
      background: el.getAttribute('yh-loading-background') || undefined,
      customClass: el.getAttribute('yh-loading-custom-class') || undefined,
      glass:
        el.hasAttribute('yh-loading-glass') ||
        (el.getAttribute('yh-loading-glass') !== 'false' &&
          el.getAttribute('yh-loading-glass') !== null) ||
        binding.modifiers.glass,
      dot:
        el.hasAttribute('yh-loading-dot') ||
        (el.getAttribute('yh-loading-dot') !== 'false' &&
          el.getAttribute('yh-loading-dot') !== null),
      color: el.getAttribute('yh-loading-color') || undefined,
      spinnerType: (el.getAttribute('yh-loading-type') as LoadingSpinnerType) || undefined
    })

    if (binding.value) {
      el[INSTANCE_KEY] = Loading.service(parseOptions())
    }
  },

  updated(el: HTMLElement & { [INSTANCE_KEY]?: LoadingInstance }, binding: DirectiveBinding) {
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        if (el[INSTANCE_KEY]) el[INSTANCE_KEY]?.close()

        const options = {
          target: el,
          fullscreen: binding.modifiers.fullscreen ?? false,
          lock: binding.modifiers.lock ?? false,
          text: el.getAttribute('yh-loading-text') || undefined,
          background: el.getAttribute('yh-loading-background') || undefined,
          customClass: el.getAttribute('yh-loading-custom-class') || undefined,
          glass:
            el.hasAttribute('yh-loading-glass') ||
            (el.getAttribute('yh-loading-glass') !== 'false' &&
              el.getAttribute('yh-loading-glass') !== null) ||
            binding.modifiers.glass,
          dot:
            el.hasAttribute('yh-loading-dot') ||
            (el.getAttribute('yh-loading-dot') !== 'false' &&
              el.getAttribute('yh-loading-dot') !== null),
          color: el.getAttribute('yh-loading-color') || undefined,
          spinnerType: (el.getAttribute('yh-loading-type') as LoadingSpinnerType) || undefined
        }
        el[INSTANCE_KEY] = Loading.service(options)
      } else {
        // 指令触发关闭，具体的类名清理交由 service 内部的 setTimeout 处理，防止闪烁
        el[INSTANCE_KEY]?.close()
        el[INSTANCE_KEY] = undefined
      }
    }
  },

  unmounted(el: HTMLElement & { [INSTANCE_KEY]?: LoadingInstance }) {
    el[INSTANCE_KEY]?.close()
    el[INSTANCE_KEY] = undefined
  }
}
