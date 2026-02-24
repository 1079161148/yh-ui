<script setup lang="ts">
/**
 * YhDialog - 对话框
 * @description 旗舰级弹窗组件，深度对标 市面组件库 / Naive UI。支持亚克力玻璃态、智能拖拽、锁定滚动、焦点捕获等顶级能力。
 */
import { ref, watch, computed, nextTick, type CSSProperties } from 'vue'
import { useNamespace, useEventListener, useId, useScrollLock, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { YhIcon } from '../../icon'
import { YhSpin } from '../../spin'
import { YhButton } from '../../button'
import { dialogProps, dialogEmits } from './dialog'

let lastClickPos: { x: number; y: number } | null = null
if (typeof window !== 'undefined') {
  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      lastClickPos = { x: e.clientX, y: e.clientY }
    },
    true
  )
}

defineOptions({
  name: 'YhDialog',
  inheritAttrs: false
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)
const ns = useNamespace('dialog')
const { t } = useLocale()
const dialogId = useId()

// 组件级 themeOverrides
const { themeStyle: themeVars } = useComponentTheme(
  'dialog',
  computed(() => props.themeOverrides)
)

const visible = ref(false)
const closed = ref(true)
const dialogRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const rendered = ref(false)

// 锁屏逻辑
useScrollLock(computed(() => props.modelValue && props.lockScroll))

// 拖拽逻辑增强
const offset = ref({ x: 0, y: 0 })
const isDragging = ref(false)

const handleMouseDown = (e: MouseEvent) => {
  if (!props.draggable || props.fullscreen) return

  // 只有鼠标左键能触发拖拽
  if (e.button !== 0) return

  // 必须点击在 header 上
  if (headerRef.value && !headerRef.value.contains(e.target as Node)) return

  isDragging.value = true
  emit('dragStart', e)

  const { clientX: startX, clientY: startY } = e
  const { x: initialX, y: initialY } = offset.value

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (!isDragging.value || !dialogRef.value) return

    let nextX = initialX + (moveEvent.clientX - startX)
    let nextY = initialY + (moveEvent.clientY - startY)

    // 边界检测逻辑
    if (!props.overflow) {
      const rect = dialogRef.value.getBoundingClientRect()
      const { clientWidth, clientHeight } = document.documentElement

      // 计算相对于原始位置的偏移界限
      // 这里的 x, y 是基于 transform: translate 的偏移量
      // 我们需要确保渲染出的 rect 不超出视口

      // 当前 dialog 在页面上的实际位置（不包含本次 mousemove 的增量）
      // rect.left / rect.top 包含了之前的 offset.value.x/y

      const minX = -rect.left + offset.value.x
      const maxX = clientWidth - rect.right + offset.value.x
      const minY = -rect.top + offset.value.y
      const maxY = clientHeight - rect.bottom + offset.value.y

      nextX = Math.min(Math.max(nextX, minX), maxX)
      nextY = Math.min(Math.max(nextY, minY), maxY)
    }

    offset.value = {
      x: nextX,
      y: nextY
    }
    emit('dragMove', moveEvent)
  }

  const onMouseUp = (upEvent: MouseEvent) => {
    isDragging.value = false
    emit('dragEnd', upEvent)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// 焦点管理
let prevFocusedElement: HTMLElement | null = null
const trapFocus = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !dialogRef.value) return
  const focusableEls = dialogRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusableEl = focusableEls[0] as HTMLElement
  const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus()
      e.preventDefault()
    }
  }
}

// 样式计算
const style = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    zIndex: props.zIndex
  }
  if (!props.fullscreen) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    if (!props.alignCenter) {
      styles.marginTop = props.top
    }

    // 处理动画起源
    if (props.transformOrigin === 'mouse' && lastClickPos && dialogRef.value) {
      const rect = dialogRef.value.getBoundingClientRect()
      const originX = lastClickPos.x - rect.left
      const originY = lastClickPos.y - rect.top
      styles.transformOrigin = `${originX}px ${originY}px`
    } else if (props.transformOrigin === 'center') {
      styles.transformOrigin = 'center'
    }

    if (offset.value.x !== 0 || offset.value.y !== 0) {
      styles.transform = `translate(${offset.value.x}px, ${offset.value.y}px)`
    }
  }

  // 合并 themeOverrides
  return {
    ...themeVars.value,
    ...styles,
    ...(typeof props.style === 'string' ? parseStyle(props.style) : props.style)
  }
})

const parseStyle = (str: string): CSSProperties => {
  const obj: Record<string, string> = {}
  str.split(';').forEach((item) => {
    if (!item) return
    const [key, val] = item.split(':')
    obj[key.trim()] = val.trim()
  })
  return obj
}

const typeIconMap: Record<string, string> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info'
}

const typeIcon = computed(() => typeIconMap[props.type] || '')

const dialogClasses = computed(() => [
  ns.b(),
  props.customClass,
  {
    [ns.m(props.type)]: props.type && props.type !== 'default',
    [ns.m('fullscreen')]: props.fullscreen,
    [ns.m('align-center')]: props.alignCenter,
    [ns.m('center')]: props.center,
    [ns.m('glass')]: props.glass,
    [ns.is('draggable')]: props.draggable
  }
])

const headerClasses = computed(() => [
  ns.e('header'),
  {
    [ns.em('header', 'center')]: props.headerAlignCenter || props.center
  }
])

const headerStyle = computed(() => {
  const align = props.center || props.headerAlignCenter ? 'center' : props.headerAlign
  if (align === 'center') return { justifyContent: 'center' }
  if (align === 'right') return { justifyContent: 'flex-end', paddingRight: '72px' } // 避开关闭按钮并预留间距
  return { justifyContent: 'flex-start' }
})

const contentBodyStyle = computed(() => {
  const styles: CSSProperties = {}
  const align = props.center ? 'center' : props.contentAlign
  if (align === 'center') styles.textAlign = 'center'
  else if (align === 'right') styles.textAlign = 'right'
  else styles.textAlign = 'left'
  return styles
})

const footerClasses = computed(() => [
  ns.e('footer'),
  {
    [ns.em('footer', 'center')]: props.footerAlignCenter || props.center
  }
])

const footerStyle = computed(() => {
  const styles: CSSProperties = {}

  // 综合对齐策略
  const align = props.center || props.footerAlignCenter ? 'center' : props.footerAlign

  if (props.swapFooterButtons) {
    styles.flexDirection = 'row-reverse'
    // row-reverse 模式下的对齐逻辑
    if (align === 'right') styles.justifyContent = 'flex-start'
    else if (align === 'left') styles.justifyContent = 'flex-end'
    else styles.justifyContent = 'center'
  } else {
    // 标准模式下的对齐逻辑
    if (align === 'right') styles.justifyContent = 'flex-end'
    else if (align === 'left') styles.justifyContent = 'flex-start'
    else styles.justifyContent = 'center'
  }

  return styles
})

// 显示/隐藏逻辑
const doClose = () => {
  emit('update:modelValue', false)
}

const handleClose = () => {
  emit('close')
  if (props.beforeClose) {
    props.beforeClose(doClose)
  } else {
    doClose()
  }
}

const handleCancel = () => {
  emit('cancel')
  handleClose()
}

const handleConfirm = () => {
  emit('confirm')
  handleClose()
}

// 优化：防止在此对话框外部按下鼠标但在对话框内松开触发关闭
let mouseDownTargetAtWrapper = false
const handleWrapperMouseDown = (e: MouseEvent) => {
  mouseDownTargetAtWrapper = e.target === e.currentTarget
}

const handleWrapperClick = (e: MouseEvent) => {
  if (props.closeOnClickModal && mouseDownTargetAtWrapper && e.target === e.currentTarget) {
    handleClose()
  }
}

watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      rendered.value = true
      closed.value = false
      visible.value = true
      emit('open')
      offset.value = { x: 0, y: 0 }

      if (typeof window === 'undefined') return

      // 聚焦管理
      prevFocusedElement = document.activeElement as HTMLElement
      await nextTick()

      if (props.autoFocus && dialogRef.value) {
        const focusableEls = dialogRef.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableEls.length > 0) {
          ;(focusableEls[0] as HTMLElement).focus()
        } else {
          dialogRef.value.focus()
        }
      } else {
        dialogRef.value?.focus()
      }

      emit('opened')
    } else {
      visible.value = false
      if (typeof window !== 'undefined' && prevFocusedElement) {
        prevFocusedElement.focus()
      }
    }
  },
  { immediate: true }
)

const afterLeave = () => {
  closed.value = true
  emit('closed')
}

// ESC 与 焦点捕获
useEventListener(
  () => window,
  'keydown',
  (e: KeyboardEvent) => {
    if (!props.modelValue) return
    if (props.closeOnPressEscape && e.key === 'Escape') {
      handleClose()
    }
    trapFocus(e)
  }
)

defineExpose({
  visible,
  dialogRef,
  handleClose,
  handleCancel,
  handleConfirm
})
</script>

<template>
  <Teleport :to="teleportTo">
    <Transition :name="ns.b('fade')" @after-leave="afterLeave">
      <div
        v-if="rendered"
        v-show="modelValue"
        :class="ns.e('wrapper')"
        :style="{ zIndex }"
        @mousedown="handleWrapperMouseDown"
        @click.self="handleWrapperClick"
      >
        <div
          ref="dialogRef"
          :role="'dialog'"
          :aria-modal="true"
          :aria-labelledby="dialogId"
          :class="dialogClasses"
          :style="style"
          tabindex="-1"
        >
          <!-- 头部 -->
          <div
            ref="headerRef"
            :class="headerClasses"
            :style="headerStyle"
            @mousedown="handleMouseDown"
          >
            <slot name="header">
              <div :id="dialogId" :class="[ns.e('title'), titleClass]" :style="titleStyle">
                <YhIcon
                  v-if="showIcon && typeIcon"
                  :name="typeIcon"
                  :class="[ns.e('type-icon'), ns.em('type-icon', type)]"
                />
                <template v-if="typeof title === 'string'">{{ title }}</template>
                <component v-else-if="title" :is="title" />
              </div>
            </slot>
            <button v-if="showClose" :class="ns.e('headerbtn')" type="button" @click="handleClose">
              <YhIcon :name="closeIcon" />
            </button>
          </div>

          <!-- 主体 -->
          <div :class="[ns.e('body'), contentClass]" :style="[contentStyle, contentBodyStyle]">
            <div v-if="loading" :class="ns.e('loading')">
              <YhSpin :show="true" size="small" />
            </div>
            <slot v-if="!destroyOnClose || !closed">
              <template v-if="content">
                <template v-if="typeof content === 'string'">{{ content }}</template>
                <component v-else :is="content" />
              </template>
            </slot>
          </div>

          <!-- 底部 -->
          <div
            v-if="$slots.footer || action || showFooter"
            :class="[footerClasses, actionClass]"
            :style="[actionStyle, footerStyle]"
          >
            <slot name="footer">
              <template v-if="action">
                <component :is="action" />
              </template>
              <template v-else-if="showFooter">
                <YhButton @click="handleCancel">{{ cancelText || t('dialog.cancel') }}</YhButton>
                <YhButton type="primary" @click="handleConfirm">{{
                  confirmText || t('dialog.confirm')
                }}</YhButton>
              </template>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use './dialog.scss';
</style>
