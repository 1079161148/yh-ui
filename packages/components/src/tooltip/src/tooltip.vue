<script setup lang="ts">
/**
 * YhTooltip - 极致性能的文字提示组件
 * @description 基于 Floating UI 引擎，融合 Glassmorphism 设计风格
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick, useSlots, Teleport } from 'vue'
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom'
import { useNamespace, useId, useEventListener } from '@yh-ui/hooks'
import { tooltipProps, tooltipEmits } from './tooltip'
import type { TooltipTrigger } from './tooltip'

defineOptions({
  name: 'YhTooltip'
})

const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)
const ns = useNamespace('tooltip')
const tooltipId = useId()
const slots = useSlots()

// 元素引用
const triggerRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// 内部状态
const visible = ref(false)
const popperStyle = ref<any>({})
const arrowStyle = ref<any>({})

const computedPopperStyle = computed(() => {
  const styles: any = { ...popperStyle.value }
  if (typeof props.popperStyle === 'object') {
    Object.assign(styles, props.popperStyle)
  }
  return styles
})

const computedContentStyle = computed(() => {
  const styles: any = {
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
      ].filter(Boolean) as any
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
      [staticSide]: '-4px'
    }
  }
}

// 自动跟随鼠标逻辑
const handleMouseMove = async (e: MouseEvent) => {
  if (!props.followCursor || !visible.value || typeof window === 'undefined') return

  // 虚拟元素定位
  const virtualElement = {
    getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      x: e.clientX,
      y: e.clientY,
      top: e.clientY,
      left: e.clientX,
      right: e.clientX,
      bottom: e.clientY
    })
  }

  const { x, y } = await computePosition(virtualElement as any, popperRef.value!, {
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

  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)

  if (value) {
    showTimer = setTimeout(() => {
      visible.value = true
      emit('update:visible', true)
      emit('show')
      nextTick(startAutoUpdate)
    }, props.showAfter)
  } else {
    hideTimer = setTimeout(() => {
      visible.value = false
      emit('update:visible', false)
      emit('hide')
      stopAutoUpdate()
    }, props.hideAfter)
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
    toggleVisible(!visible.value)
  } else if (type === 'contextmenu') {
    e.preventDefault()
    toggleVisible(true)
  } else if (type === 'focus') {
    toggleVisible(true)
  }
}

// 全局点击关闭
useEventListener(() => window, 'click', (e: MouseEvent) => {
  if (!visible.value || !triggers.value.has('click')) return
  const target = e.target as HTMLElement
  if (!triggerRef.value?.contains(target) && !popperRef.value?.contains(target)) {
    toggleVisible(false)
  }
})

// 鼠标跟随监听
watch(() => props.followCursor, (val) => {
  if (typeof window === 'undefined') return
  if (val) {
    window.addEventListener('mousemove', handleMouseMove)
  } else {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})

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
  visible
})
</script>

<template>
  <div :class="ns.b()" ref="triggerRef" @mouseenter="handleTrigger($event, 'hover')"
    @mouseleave="triggers.has('hover') && toggleVisible(false)" @click="handleTrigger($event, 'click')"
    @contextmenu="handleTrigger($event, 'contextmenu')" @focusin="handleTrigger($event, 'focus')"
    @focusout="triggers.has('focus') && toggleVisible(false)">
    <slot />

    <Teleport to="body" :disabled="!teleported">
      <Transition :name="transition">
        <div v-if="shouldRender" v-show="showPopper" :id="tooltipId" ref="popperRef" :class="popperClasses"
          :style="computedPopperStyle" :data-placement="actualPlacement"
          @mouseenter="interactive && toggleVisible(true)"
          @mouseleave="interactive && triggers.has('hover') && toggleVisible(false)">
          <div :class="[ns.e('content'), props.contentClass]" :style="computedContentStyle">
            <slot name="content">
              <span v-if="rawContent" v-html="content" />
              <span v-else>{{ content }}</span>
            </slot>
          </div>
          <div v-if="showArrow" ref="arrowRef" :class="[ns.e('arrow-wrapper'), props.arrowWrapperClass]"
            :style="[arrowStyle, props.arrowWrapperStyle]">
            <div :class="[ns.e('arrow'), props.arrowClass]" :style="props.arrowStyle" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './tooltip.scss';
</style>
