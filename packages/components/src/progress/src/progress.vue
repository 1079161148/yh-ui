<script setup lang="ts">
import { computed, useId } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { progressProps } from './progress'

defineOptions({
  name: 'YhProgress'
})

const props = defineProps(progressProps)
const ns = useNamespace('progress')
const componentId = useId()

// 归一化百分比数据，支持单数值或数组（多环）
const percentages = computed(() => {
  return Array.isArray(props.percentage) ? props.percentage : [props.percentage]
})

// 判定是否应当启用渐变渲染（仅针对单进度条或明确的渐变配置）
const isGradient = computed(() => {
  if (typeof props.color === 'object' && props.color !== null) {
    // 如果是数组且目前是多环模式，则不视为线性渐变，而是按索引取色
    if (Array.isArray(props.color) && Array.isArray(props.percentage)) {
      return false
    }
    return true
  }
  return false
})

// 获取渐变停靠点数据 ({ offset, color }[])
const getGradientStops = computed(() => {
  if (!isGradient.value) return []
  if (Array.isArray(props.color)) {
    const len = props.color.length
    return props.color.map((c, i) => ({
      offset: `${len > 1 ? (i / (len - 1)) * 100 : 0}%`,
      color: c as string
    }))
  }
  return Object.entries(props.color as Record<string, string>).map(([offset, color]) => ({
    offset,
    color
  }))
})

// 为进度条计算背景样式
const barStyle = computed(() => {
  const style: any = {
    width: props.indeterminate ? undefined : `${percentages.value[0]}%`,
    '--yh-progress-duration': `${props.duration}s`
  }

  if (isGradient.value) {
    const stops = getGradientStops.value.map(s => `${s.color} ${s.offset}`).join(', ')
    style.backgroundImage = `linear-gradient(to right, ${stops})`
  } else {
    style.backgroundColor = getColor(percentages.value[0], 0)
  }
  return style
})

// 获取颜色逻辑：支持单色、函数、数组分配（多环）、SVG 引用
const getColor = (percentage: number, index?: number) => {
  if (typeof props.color === 'function') return props.color(percentage)
  if (typeof props.color === 'string' && props.color !== '') return props.color

  // 核心修复：如果是多环模式且提供了颜色数组，则执行 1:1 映射
  if (Array.isArray(props.percentage) && Array.isArray(props.color) && typeof index === 'number') {
    return props.color[index] || props.color[props.color.length - 1]
  }

  if (isGradient.value) return `url(#${componentId}-gradient)`
  return ''
}

// 计算各个环的路径参数
const getCircleParams = (index: number) => {
  const layerGap = 4 // 多环之间的间距
  const layerStrokeWidth = props.strokeWidth
  const r = (props.width / 2) - (props.strokeWidth / 2) - (index * (layerStrokeWidth + layerGap))
  const p = 2 * Math.PI * r
  const isDashboard = props.type === 'dashboard'
  const rate = isDashboard ? 0.75 : 1

  const path = `
    M ${props.width / 2} ${props.width / 2}
    m 0 ${isDashboard ? '' : '-'}${r}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
  `

  const offset = (-1 * p * (1 - rate)) / 2

  const pathStyle = {
    strokeDasharray: `${p * rate * (percentages.value[index] / 100)}px, ${p}px`,
    strokeDashoffset: `${offset}px`,
    transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
  }

  const trackStyle = {
    strokeDasharray: `${p * rate}px, ${p}px`,
    strokeDashoffset: `${offset}px`
  }

  return { path, pathStyle, trackStyle, r, p }
}

const secondaryBarStyle = computed(() => ({
  width: `${props.secondaryPercentage}%`
}))

const content = computed(() => {
  if (props.format) return props.format(percentages.value[0])
  return `${percentages.value[0]}%`
})

// 状态图标映射
// 状态图标映射 (使用内联 SVG 确保 100% 兼容性)
const statusIconSvg = computed(() => {
  if (props.status === 'success') {
    return `<path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />`
  }
  if (props.status === 'exception') {
    return `<path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm165.4 533.4a32 32 0 0 0 0-45.2L557.3 532l120.1-120.1a32 32 0 0 0-45.2-45.2L512 486.8 391.9 366.7a32 32 0 0 0-45.2 45.2L466.8 532l-120.1 120.1a32 32 0 1 0 45.2 45.2L512 577.2l120.1 120.1a32 32 0 0 0 45.2 0z" />`
  }
  if (props.status === 'warning' || props.status === 'info') {
    return `<path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm0 160a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0V448a32 32 0 0 0-32-32z" />`
  }
  return ''
})

const progressClass = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.is(props.status as string, !!props.status),
  ns.is('without-text', !props.showText || props.indeterminate),
  ns.is('text-inside', props.textInside),
  ns.is('animated', props.animated)
])
</script>

<template>
  <div :class="progressClass" role="progressbar" :aria-valuenow="percentages[0]" aria-valuemin="0" aria-valuemax="100">
    <!-- 线型进度条 -->
    <div v-if="type === 'line'" :class="ns.e('bar')">
      <div :class="ns.e('outer')" :style="{ height: `${strokeWidth}px`, backgroundColor: defineBackgroundColor }">
        <div v-if="secondaryPercentage > 0" :class="ns.e('secondary-inner')" :style="secondaryBarStyle"></div>
        <div :class="[
          ns.e('inner'),
          ns.is('indeterminate', indeterminate),
          ns.is('striped', striped),
          ns.is('striped-flow', stripedFlow)
        ]" :style="barStyle">
          <div v-if="showText && textInside && !indeterminate" :class="ns.e('innerText')">
            <slot name="default" :percentage="percentages[0]">
              <i v-if="icon" :class="icon"></i>
              <svg v-else-if="statusIconSvg" viewBox="0 0 1024 1024" width="16" height="16"
                style="vertical-align: middle;" v-html="statusIconSvg"></svg>
              <span v-else>{{ content }}</span>
            </slot>
          </div>
        </div>
        <div v-if="steps > 0" :class="ns.e('steps')">
          <div v-for="step in steps" :key="step" :class="ns.e('step-item')"
            :style="{ left: `${(100 / steps) * step}%` }"></div>
        </div>
      </div>
    </div>

    <!-- 环形/仪表盘进度条 -->
    <div v-else :class="ns.e('circle')" :style="{ height: `${width}px`, width: `${width}px` }">
      <svg :viewBox="`0 0 ${width} ${width}`" :class="ns.e('svg')">
        <!-- 定义渐变 -->
        <defs v-if="isGradient">
          <linearGradient :id="`${componentId}-gradient`" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop v-for="(stop, i) in getGradientStops" :key="i" :offset="stop.offset" :stop-color="stop.color" />
          </linearGradient>
        </defs>

        <!-- 循环渲染多环 -->
        <g v-for="(p, index) in percentages" :key="index">
          <path :class="ns.e('circle-track')" :d="getCircleParams(index).path"
            :stroke="defineBackgroundColor || '#e5e9f2'" :stroke-width="strokeWidth" fill="none"
            :stroke-linecap="strokeLinecap" :style="getCircleParams(index).trackStyle" />
          <path :class="ns.e('circle-path')" :d="getCircleParams(index).path" :stroke="getColor(p, index)" fill="none"
            :stroke-linecap="strokeLinecap" :stroke-width="p > 0 ? strokeWidth : 0"
            :style="getCircleParams(index).pathStyle" />
        </g>
      </svg>

      <!-- 环型中心内容区 -->
      <div v-if="showText && !indeterminate" :class="ns.e('text')" :style="{ fontSize: `${width * 0.16}px` }">
        <slot name="default" :percentage="percentages[0]">
          <i v-if="icon" :class="[icon, ns.e('icon')]" :style="{ color: getColor(percentages[0], 0) }"></i>
          <svg v-else-if="statusIconSvg" viewBox="0 0 1024 1024" :width="width * 0.22" :height="width * 0.22"
            :style="{ color: getColor(percentages[0], 0), verticalAlign: 'middle' }" v-html="statusIconSvg"></svg>
          <span v-else>{{ content }}</span>
        </slot>
      </div>
    </div>

    <!-- 外部文字区 -->
    <div v-if="type === 'line' && showText && !textInside && !indeterminate" :class="ns.e('text')"
      :style="{ fontSize: `${Math.max(12, strokeWidth * 0.8)}px` }">
      <slot name="default" :percentage="percentages[0]">
        <i v-if="icon" :class="[icon, ns.e('icon')]" :style="{ color: getColor(percentages[0], 0) }"></i>
        <svg v-else-if="statusIconSvg" viewBox="0 0 1024 1024" width="16" height="16"
          :style="{ color: getColor(percentages[0], 0), verticalAlign: 'middle' }" v-html="statusIconSvg"></svg>
        <span v-else>{{ content }}</span>
      </slot>
    </div>
  </div>
</template>



<style lang="scss">
@use './progress.scss';
</style>
