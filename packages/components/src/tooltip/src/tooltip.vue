<script setup lang="ts">
/**
 * YhTooltip - 极致性能的文字提示组件
 * @description 基于 Floating UI 引擎，融合 Glassmorphism 设计风格
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { CSSProperties } from 'vue'

// 自定义虚拟元素类型，用于跟随鼠标
interface VirtualElement {
  getBoundingClientRect(): DOMRect
}
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom'
import { useNamespace, useId, useEventListener } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { tooltipProps, tooltipEmits } from './tooltip'
import type { TooltipTrigger } from './tooltip'

defineOptions({
  name: 'YhTooltip'
})

const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)
const ns = useNamespace('tooltip')
const tooltipId = useId()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'tooltip',
  computed(() => props.themeOverrides)
)

// 元素引用
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// 内部状态
const visible = ref(false)
const popperStyle = ref<CSSProperties>({})
const arrowStyle = ref<CSSProperties>({})

const computedPopperStyle = computed(() => {
  const styles: CSSProperties = {
    ...(themeStyle.value as CSSProperties),
    ...popperStyle.value
  }
  if (typeof props.popperStyle === 'object') {
    Object.assign(styles, props.popperStyle)
  }
  return styles
})

const computedContentStyle = computed(() => {
  const styles: CSSProperties = {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
    overflowY: props.scrollable ? 'auto' : 'visible'
  }
  if (typeof props.contentStyle === 'object') {
    Object.assign(styles, props.contentStyle)
  }
  return styles
})
const actualPlacement = ref(props.placement)

let cleanup: (() => void) | null = null
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

// 计算属性
const showPopper = computed(() => {
  if (props.disabled) return false
  return props.visible !== null ? props.visible : visible.value
})

const shouldRender = computed(() => props.persistent || showPopper.value)

const popperClasses = computed(() => [
  ns.e('popper'),
  ns.is(props.effect, true), // 使用 is-dark / is-light 更加稳定
  ns.em('popper', props.effect),
  ns.is('interactive', props.interactive),
  props.popperClass
])

// 核心定位逻辑
const updatePosition = async () => {
  if (!triggerRef.value || !popperRef.value || typeof window === 'undefined') return

  const { x, y, placement, middlewareData } = await computePosition(
    triggerRef.value,
    popperRef.value,
    {
      placement: props.placement,
      middleware: [
        offset(props.offset[1]),
        flip(),
        shift({ padding: 5 }),
        props.showArrow ? arrow({ element: arrowRef.value! }) : null
      ].filter((item): item is NonNullable<typeof item> => item !== null)
    }
  )

  popperStyle.value = {
    left: `${x}px`,
    top: `${y}px`,
    zIndex: String(props.zIndex)
  }
  actualPlacement.value = placement

  if (middlewareData.arrow && arrowRef.value) {
    const { x: ax, y: ay } = middlewareData.arrow
    const side = placement.split('-')[0]
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[side] as string

    arrowStyle.value = {
      left: ax != null ? `${ax}px` : '',
      top: ay != null ? `${ay}px` : '',
      [staticSide]: '-12px'
    }
  }
}

// 自动跟随鼠标逻辑
const handleMouseMove = async (e: MouseEvent) => {
  if (!props.followCursor || !visible.value || typeof window === 'undefined') return

  // 虚拟元素定位
  const virtualElement: VirtualElement = {
    getBoundingClientRect: () => {
      const rect = {
        width: 0,
        height: 0,
        x: e.clientX,
        y: e.clientY,
        top: e.clientY,
        left: e.clientX,
        right: e.clientX,
        bottom: e.clientY,
        toJSON: () => ({})
      }
      return rect as unknown as DOMRect
    }
  }

  const { x, y } = await computePosition(virtualElement, popperRef.value!, {
    placement: props.placement,
    middleware: [offset(10), flip(), shift()]
  })

  popperStyle.value = {
    left: `${x}px`,
    top: `${y}px`,
    zIndex: String(props.zIndex)
  }
}

// 显示控制
const toggleVisible = (value: boolean) => {
  if (props.disabled) return

  // 立即清除所有待执行的计时器
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }

  // 受控模式下（props.visible !== null），我们优先依赖外部状态
  // 但为了响应灵敏度，我们依然需要立即同步内部 visible.value 并通过 nextTick 触发定位
  if (value) {
    const delay = props.showAfter
    if (delay <= 0) {
      visible.value = true
      emit('update:visible', true)
      emit('show')
      nextTick(startAutoUpdate)
    } else {
      showTimer = setTimeout(() => {
        visible.value = true
        emit('update:visible', true)
        emit('show')
        nextTick(startAutoUpdate)
      }, delay)
    }
  } else {
    const delay = props.hideAfter
    if (delay <= 0) {
      visible.value = false
      emit('update:visible', false)
      emit('hide')
      stopAutoUpdate()
    } else {
      hideTimer = setTimeout(() => {
        visible.value = false
        emit('update:visible', false)
        emit('hide')
        stopAutoUpdate()
      }, delay)
    }
  }
}

const startAutoUpdate = async () => {
  if (cleanup) cleanup()
  if (triggerRef.value && popperRef.value && !props.followCursor && typeof window !== 'undefined') {
    cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition)
  }
}

const stopAutoUpdate = () => {
  if (cleanup) {
    cleanup()
    cleanup = null
  }
}

// 事件处理
const triggers = computed(() => {
  const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger]
  return new Set(t)
})

const handleTrigger = (e: Event, type: TooltipTrigger) => {
  if (!triggers.value.has(type)) return

  if (type === 'hover') {
    toggleVisible(true)
  } else if (type === 'click') {
    const isShowing = (visible.value && !hideTimer) || showTimer
    toggleVisible(!isShowing)
  } else if (type === 'contextmenu') {
    e.preventDefault()
    toggleVisible(true)
  } else if (type === 'focus') {
    toggleVisible(true)
  }
}

// 全局点击/右键以外区域关闭
useEventListener(
  () => window,
  'click',
  (e: MouseEvent) => {
    if (!visible.value) return
    // 只有 click 和 contextmenu 模式需要全局外部点击关闭
    const needsClose = triggers.value.has('click') || triggers.value.has('contextmenu')
    if (!needsClose) return

    const target = e.target as HTMLElement
    if (!triggerRef.value?.contains(target) && !popperRef.value?.contains(target)) {
      toggleVisible(false)
    }
  }
)

// 监听外部可见性变化 (受控模式)
watch(
  () => props.visible,
  (val: boolean | null) => {
    if (val !== null && val !== visible.value) {
      visible.value = val
      if (val) nextTick(startAutoUpdate)
      else stopAutoUpdate()
    }
  },
  { immediate: true }
)

// 鼠标跟随监听
watch(
  () => props.followCursor,
  (val: boolean) => {
    if (typeof window === 'undefined') return
    if (val) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }
)

onMounted(() => {
  if (props.followCursor && typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  stopAutoUpdate()
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})

defineExpose({
  updatePosition,
  visible,
  triggerRef,
  popperRef
})
</script>

<template>
  <div
    :class="ns.b()"
    ref="triggerRef"
    @mouseenter="handleTrigger($event, 'hover')"
    @mouseleave="triggers.has('hover') && toggleVisible(false)"
    @click="handleTrigger($event, 'click')"
    @contextmenu="handleTrigger($event, 'contextmenu')"
    @focusin="handleTrigger($event, 'focus')"
    @focusout="triggers.has('focus') && toggleVisible(false)"
  >
    <slot />

    <Teleport to="body" :disabled="!teleported">
      <Transition :name="transition">
        <div
          v-if="shouldRender"
          v-show="showPopper"
          :id="tooltipId"
          ref="popperRef"
          :class="popperClasses"
          :style="computedPopperStyle"
          :data-placement="actualPlacement"
          @mouseenter="interactive && toggleVisible(true)"
          @mouseleave="interactive && triggers.has('hover') && toggleVisible(false)"
        >
          <div :class="[ns.e('content'), props.contentClass]" :style="computedContentStyle">
            <slot name="content">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-if="rawContent" v-html="content" />
              <span v-else>{{ content }}</span>
            </slot>
          </div>
          <!-- 小三角 - 使用 Floating UI 官方推荐的 SVG 路径方案 -->
          <div v-if="showArrow" ref="arrowRef" :class="ns.e('arrow-wrapper')" :style="arrowStyle">
            <svg
              :class="ns.e('arrow')"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,0 L6,6 L12,0" />
            </svg>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './tooltip.scss';
</style>
