<script setup lang="ts">
/**
 * YhMessageBox - 极尽完善的消息弹框
 * @description 集成拖拽、亚克力、校验、滚动锁定等市面最全功能
 */
import { ref, reactive, computed, watch, h, onMounted, onUnmounted, markRaw, nextTick, shallowRef, shallowReactive, type ComponentPublicInstance } from 'vue'
import { useNamespace, useScrollLock, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { YhButton } from '../../button'
import { YhInput } from '../../input'
import { YhIcon, IconClose, IconSuccess, IconWarning, IconError, IconInfo } from '../../icon'
import type { MessageBoxOptions, MessageBoxAction, MessageBoxInstance } from './message-box'
import type { InputInstance } from '../../input'
import type { ButtonInstance } from '../../button'

defineOptions({
  name: 'YhMessageBox',
  inheritAttrs: false
})

const ns = useNamespace('message-box')
const { t } = useLocale()

const DEFAULT_OPTIONS: Partial<MessageBoxOptions> = {
  confirmButtonLoading: false,
  cancelButtonLoading: false,
  showClose: true,
  lockScroll: true,
  draggableBoundary: true,
  autofocus: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  width: 420,
}

const props = defineProps<MessageBoxOptions>()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('message-box', computed(() => state.options.themeOverrides))

// 如果在服务端渲染或传入了 props (测试环境下)，则初始化可见性为 true
const visible = ref(typeof window === 'undefined' || !!props.title || !!props.message || !!props.type || !!props.glass)
const boxRef = ref<HTMLElement | null>(null)
const inputRef = ref<InputInstance | null>(null)
const confirmRef = ref<ButtonInstance | null>(null)
const state = shallowReactive({
  options: Object.assign({}, DEFAULT_OPTIONS, props) as MessageBoxOptions,
  confirmLoading: false,
  cancelLoading: false,
  inputValue: props.inputValue || '',
  validateError: ''
})

// 监听 props 变化以支持组件化用法
watch(props, (val: Record<string, unknown>) => {
  state.options = { ...state.options, ...val }
}, { deep: true })

// 自动聚焦逻辑
watch(() => visible.value, async (val) => {
  if (val && state.options.autofocus !== false) {
    await nextTick()
    if (state.options.type === 'prompt') {
      inputRef.value?.focus?.()
    } else {
      // 尝试对组件或其内部按钮元素获取焦点
      const el = (confirmRef.value as unknown as ComponentPublicInstance)?.$el || confirmRef.value as unknown as HTMLElement
      el?.focus?.()
    }
  }
})

// 滚动锁定管理
const shouldLockScroll = computed(() => !!(visible.value && state.options.lockScroll))
useScrollLock(shouldLockScroll)

// 拖拽逻辑
const isDragging = ref(false)
const transform = reactive({ x: 0, y: 0 })
const onMousedown = (e: MouseEvent) => {
  if (!state.options.draggable || !boxRef.value) return
  // 排除点击关闭按钮的情况
  if ((e.target as HTMLElement).closest(`.${ns.e('close')}`)) return

  isDragging.value = true
  e.preventDefault() // 防止拖动时选择文字
  const startX = e.clientX
  const startY = e.clientY
  const { x: initialX, y: initialY } = transform

  const onMousemove = (moveE: MouseEvent) => {
    if (!isDragging.value) return
    const deltaX = moveE.clientX - startX
    const deltaY = moveE.clientY - startY

    let nextX = initialX + deltaX
    let nextY = initialY + deltaY

    if (state.options.draggableBoundary && boxRef.value) {
      const rect = boxRef.value.getBoundingClientRect()
      const viewportW = window.innerWidth
      const viewportH = window.innerHeight

      const maxX = Math.max(0, (viewportW - rect.width) / 2)
      const maxY = Math.max(0, (viewportH - rect.height) / 2)

      nextX = Math.max(-maxX, Math.min(maxX, nextX))
      nextY = Math.max(-maxY, Math.min(maxY, nextY))
    }

    transform.x = nextX
    transform.y = nextY
  }
  const onMouseup = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

// 遮罩层点击逻辑优化：防止拖动后抬起落点在遮罩上导致关闭
let isMousedownOnWrapper = false
const handleWrapperMousedown = (e: MouseEvent) => {
  isMousedownOnWrapper = e.target === e.currentTarget
}
const handleWrapperClick = (e: MouseEvent) => {
  if (isMousedownOnWrapper && e.target === e.currentTarget) {
    if (state.options.closeOnClickModal) {
      handleAction('close')
    }
  }
  isMousedownOnWrapper = false
}

// 校验逻辑
const validate = () => {
  if (state.options.type !== 'prompt') return true
  const { inputPattern, inputValidator, inputErrorMessage } = state.options
  const value = state.inputValue

  if (inputPattern && !inputPattern.test(value)) {
    state.validateError = inputErrorMessage || t('messagebox.error')
    return false
  }
  if (inputValidator) {
    const result = inputValidator(value)
    if (typeof result === 'string') {
      state.validateError = result
      return false
    } else if (result === false) {
      state.validateError = inputErrorMessage || t('messagebox.error')
      return false
    }
  }
  state.validateError = ''
  return true
}

// 实时校验：当用户输入时，如果已经存在错误，则实时重新校验
watch(() => state.inputValue, () => {
  if (state.options.type === 'prompt' && state.validateError) {
    validate()
  }
})

const open = (options: MessageBoxOptions) => {
  const { appContext, ...rest } = options
  state.options = {
    ...DEFAULT_OPTIONS,
    ...rest,
    appContext: appContext ? markRaw(appContext) : null
  }
  state.inputValue = options.inputValue || ''
  state.validateError = ''
  state.confirmLoading = false
  state.cancelLoading = false
  transform.x = 0
  transform.y = 0
  visible.value = true
}

const close = () => {
  visible.value = false
}

const handleAction = (action: MessageBoxAction) => {
  if (action === 'confirm' && !validate()) {
    return
  }

  if (state.options.beforeClose) {
    state.options.beforeClose(action, exposed, () => {
      state.confirmLoading = false
      state.cancelLoading = false
      doClose(action)
    })
  } else {
    doClose(action)
  }
}

let _callback: ((res: { action: MessageBoxAction; value?: string }) => void) | undefined
const setCallback = (cb: (res: { action: MessageBoxAction; value?: string }) => void) => {
  _callback = cb
}

const doClose = (action: MessageBoxAction) => {
  close()
  if (_callback) {
    _callback({
      action,
      value: state.inputValue
    })
  }
}

// 监听键盘 ESC
const onKeydown = (e: KeyboardEvent) => {
  if (visible.value && state.options.closeOnPressEscape && e.code === 'Escape') {
    handleAction('close')
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

const MessageContent = () => {
  const { message, dangerouslyUseHTMLString } = state.options
  if (!message) return null
  if (typeof message === 'function') return message()
  if (typeof message === 'object') return message
  if (dangerouslyUseHTMLString) {
    return h('div', { class: ns.e('html'), innerHTML: message })
  }
  return h('span', message)
}

const boxStyle = computed(() => ({
  width: typeof state.options.width === 'number' ? `${state.options.width}px` : state.options.width,
  transform: `translate(${transform.x}px, ${transform.y}px)`
}))

const exposed = reactive<MessageBoxInstance>({
  open,
  close,
  setCallback,
  get confirmLoading() { return state.confirmLoading },
  set confirmLoading(val) { state.confirmLoading = val },
  get cancelLoading() { return state.cancelLoading },
  set cancelLoading(val) { state.cancelLoading = val }
})

defineExpose(exposed)

const getStatusIcon = (type: string) => {
  switch (type) {
    case 'success': return IconSuccess
    case 'warning': return IconWarning
    case 'error': return IconError
    default: return IconInfo
  }
}
</script>

<template>
  <Transition :name="ns.b('fade')">
    <div v-if="visible" :class="ns.b('wrapper')" @mousedown="handleWrapperMousedown" @click="handleWrapperClick"
      role="dialog" aria-modal="true">
      <div ref="boxRef" :class="[
        ns.b(),
        state.options.customClass,
        { [ns.m('glass')]: state.options.glass },
        { [ns.m('center')]: state.options.center },
        { 'is-dragging': isDragging }
      ]" :style="[boxStyle, themeStyle]">
        <div v-if="state.options.glass" :class="ns.e('bg')" />

        <div :class="[ns.e('header'), { 'is-draggable': state.options.draggable }]" @mousedown="onMousedown">
          <div :class="ns.e('title')">{{ state.options.title || t('messagebox.title') }}</div>
          <button v-if="state.options.showClose !== false" :class="ns.e('close')" @click="handleAction('close')"
            :aria-label="t('messagebox.close')">
            <YhIcon :svg="IconClose.svg" :view-box="IconClose.viewBox" />
          </button>
        </div>

        <div :class="ns.e('content')">
          <div v-if="state.options.iconType || state.options.icon"
            :class="[ns.e('status'), ns.is(state.options.iconType || '')]">
            <template v-if="state.options.icon">
              <component :is="typeof state.options.icon === 'string' ? YhIcon : state.options.icon"
                v-bind="typeof state.options.icon === 'string' ? { name: state.options.icon } : {}" />
            </template>
            <YhIcon v-else-if="state.options.iconType" :svg="getStatusIcon(state.options.iconType).svg"
              :view-box="getStatusIcon(state.options.iconType).viewBox" />
          </div>
          <div :class="ns.e('message')">
            <MessageContent />
          </div>
        </div>

        <div v-if="state.options.type === 'prompt'" :class="ns.e('input')">
          <YhInput ref="inputRef" v-model="state.inputValue" :placeholder="state.options.inputPlaceholder"
            :class="{ 'is-error': !!state.validateError }" @keyup.enter="handleAction('confirm')" @blur="validate"
            @input="state.validateError && validate()" />
          <Transition name="yh-zoom-in-top">
            <div v-show="state.validateError" :class="ns.e('err-msg')">
              {{ state.validateError }}
            </div>
          </Transition>
        </div>

        <div :class="ns.e('footer')">
          <YhButton v-if="state.options.showCancelButton !== false" size="small" :round="state.options.roundButton"
            :loading="state.cancelLoading || state.options.cancelButtonLoading"
            :disabled="state.confirmLoading || state.cancelLoading" @click="handleAction('cancel')">
            {{ state.options.cancelButtonText || t('messagebox.cancel') }}
          </YhButton>
          <YhButton v-if="state.options.showConfirmButton !== false" ref="confirmRef" type="primary" size="small"
            :loading="state.confirmLoading || state.options.confirmButtonLoading"
            :disabled="state.confirmLoading || state.cancelLoading" :round="state.options.roundButton"
            @click="handleAction('confirm')">
            {{ state.options.confirmButtonText || t('messagebox.confirm') }}
          </YhButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@use './message-box.scss';
</style>
