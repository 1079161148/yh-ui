<script setup lang="ts">
/**
 * YhSpin - 加载中
 * @description 应用于页面局部或容器的加载反馈
 */
import { ref, watch, computed, useSlots, useId } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { spinProps } from './spin'

defineOptions({
  name: 'YhSpin',
  inheritAttrs: false
})

const props = defineProps(spinProps)
const ns = useNamespace('spin')
const { t } = useLocale()
const gradientId = useId()

const emit = defineEmits(['show', 'hide'])

const internalVisible = ref(false)
const visible = computed(() => (props.delay === 0 ? props.show : internalVisible.value))

let timer: ReturnType<typeof setTimeout> | null = null

const handleShow = () => {
  if (props.delay > 0) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      internalVisible.value = true
      emit('show')
    }, props.delay)
  } else {
    internalVisible.value = true
    emit('show')
  }
}

const handleHide = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  internalVisible.value = false
  emit('hide')
}

// 计算 SVG 尺寸
const sizePx = computed(() => {
  if (typeof props.size === 'number') return props.size
  const map: Record<string, number> = { small: 20, default: 32, large: 48 }
  return map[props.size as string] || 32
})

const isGradient = computed(() => {
  if (typeof props.color === 'string') {
    return props.color.includes('gradient')
  }
  return (typeof props.color === 'object' && props.color !== null) || Array.isArray(props.color)
})

const gradientStops = computed(() => {
  const { color } = props
  if (!isGradient.value || !color) return []

  if (typeof color === 'string') {
    const colorRegex = /(?:#[a-fA-F0-9]{3,8}|rgba?\s*\([^)]+\)|hsla?\s*\([^)]+\)|(?:\b[a-z]{3,}\b))/gi
    const matchedColors = color.match(colorRegex)?.filter(c => !/gradient|deg|to|top|bottom|left|right/i.test(c))
    if (matchedColors && matchedColors.length > 0) {
      const len = matchedColors.length
      return matchedColors.map((c, i) => ({
        color: c.trim(),
        offset: `${(i / (len - 1 || 1)) * 100}%`
      }))
    }
    return []
  }

  if (Array.isArray(color)) {
    const len = color.length
    return color.map((c, i) => ({
      color: c,
      offset: `${(i / (len - 1 || 1)) * 100}%`
    }))
  }

  return Object.entries(color as Record<string, string>).map(([offset, c]) => ({
    offset,
    color: c
  }))
})

const spinStyle = computed(() => {
  const style: Record<string, any> = {}
  if (!props.color) return style

  if (isGradient.value) {
    style['--yh-spin-color-is-gradient'] = 'true'
    if (typeof props.color === 'string') {
      style['--yh-spin-gradient'] = props.color
    } else {
      const stops = gradientStops.value.map((s) => `${s.color} ${s.offset}`).join(', ')
      style['--yh-spin-gradient'] = `linear-gradient(135deg, ${stops})`
    }
  } else {
    style.color = props.color
  }
  return style
})

watch(
  () => props.show,
  (val) => {
    if (val) handleShow()
    else handleHide()
  },
  { immediate: true }
)

const spinClasses = computed(() => [
  ns.b(),
  ns.m(typeof props.size === 'string' ? props.size : 'custom'),
  ns.is('vertical', props.vertical),
  ns.is('glass', props.glass || !!useSlots().default),
  ns.is('dot', props.dot),
  ns.is('gradient', isGradient.value)
])

defineExpose({
  /** 是否可见 */
  visible
})
</script>

<template>
  <svg v-if="visible && isGradient"
    style="width: 0; height: 0; position: absolute; visibility: hidden; pointer-events: none;">
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop v-for="(stop, i) in gradientStops" :key="i" :offset="stop.offset" :stop-color="stop.color" />
      </linearGradient>
    </defs>
  </svg>

  <div v-if="$slots.default" :class="ns.b('wrapper')" v-bind="$attrs">
    <slot />
    <Transition name="yh-spin-fade">
      <div v-if="visible" :class="spinClasses" :style="spinStyle">
        <div v-if="glass" :class="ns.e('mask')" />
        <div :class="ns.e('container')">
          <!-- Dot 模式 (兼容旧版) -->
          <div v-if="dot" :class="ns.e('dots')">
            <i v-for="i in 4" :key="i" />
          </div>

          <!-- Chaser 模式 (追逐点) -->
          <div v-else-if="type === 'chaser'" :class="ns.e('chaser')"
            :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
            <i v-for="i in 8" :key="i" />
          </div>

          <!-- Gear 模式 (齿轮线) -->
          <div v-else-if="type === 'gear'" :class="ns.e('gear')"
            :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
            <i v-for="i in 12" :key="i" />
          </div>

          <!-- Dual Ring 模式 -->
          <div v-else-if="type === 'dual-ring'" :class="ns.e('dual-ring')"
            :style="{ width: sizePx + 'px', height: sizePx + 'px' }" />

          <!-- Rect 模式 (矩阵块) -->
          <div v-else-if="type === 'rect'" :class="ns.e('rect')"
            :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
            <i v-for="i in 9" :key="i" />
          </div>

          <!-- 默认 Circle 模式 (SVG) -->
          <svg v-else :class="ns.e('svg')" viewBox="0 0 50 50" :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
            <circle :class="ns.e('circle')" cx="25" cy="25" r="20" fill="none" stroke-width="5"
              :style="{ stroke: isGradient ? `url(#${gradientId})` : 'currentColor' }"></circle>
          </svg>

          <div v-if="tip || $slots.tip" :class="ns.e('tip')">
            <slot name="tip">{{ tip || t('spin.text') }}</slot>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <Transition v-else name="yh-spin-fade">
    <div v-if="visible" v-bind="$attrs" :class="spinClasses" :style="spinStyle">
      <div v-if="glass" :class="ns.e('mask')" />
      <div :class="ns.e('container')">
        <!-- Dot 模式 (兼容旧版) -->
        <div v-if="dot" :class="ns.e('dots')">
          <i v-for="i in 4" :key="i" />
        </div>

        <!-- Chaser 模式 -->
        <div v-else-if="type === 'chaser'" :class="ns.e('chaser')"
          :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
          <i v-for="i in 8" :key="i" />
        </div>

        <!-- Gear 模式 -->
        <div v-else-if="type === 'gear'" :class="ns.e('gear')" :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
          <i v-for="i in 12" :key="i" />
        </div>

        <!-- Dual Ring 模式 -->
        <div v-else-if="type === 'dual-ring'" :class="ns.e('dual-ring')"
          :style="{ width: sizePx + 'px', height: sizePx + 'px' }" />

        <!-- Rect 模式 -->
        <div v-else-if="type === 'rect'" :class="ns.e('rect')" :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
          <i v-for="i in 9" :key="i" />
        </div>

        <!-- 默认 Circle 模式 -->
        <svg v-else :class="ns.e('svg')" viewBox="0 0 50 50" :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
          <circle :class="ns.e('circle')" cx="25" cy="25" r="20" fill="none" stroke-width="5"
            :style="{ stroke: isGradient ? `url(#${gradientId})` : 'currentColor' }"></circle>
        </svg>

        <div v-if="tip || $slots.default || $slots.tip" :class="ns.e('tip')">
          <slot name="tip">
            <slot>{{ tip || t('spin.text') }}</slot>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@use './spin.scss';
</style>
