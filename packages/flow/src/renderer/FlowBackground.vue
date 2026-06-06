<template>
  <!--
    ★ 性能优化背景：
    - 不依赖 Vue 响应式，改由父组件手动调用 update(viewport) 驱动
    - SVG pattern：只改 x/y/width/height 属性，浏览器不需要重绘
  -->
  <svg ref="svgRef" class="yh-flow-background" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        ref="patternRef"
        :id="patternId"
        x="0"
        y="0"
        :width="patternSize"
        :height="patternSize"
        patternUnits="userSpaceOnUse"
      >
        <template v-if="type === 'dots'">
          <circle
            ref="dotRef"
            :cx="patternSize / 2"
            :cy="patternSize / 2"
            r="1"
            :fill="color || '#b1b1b7'"
          />
        </template>
        <template v-else-if="type === 'grid'">
          <path
            ref="gridPathRef"
            :d="`M ${patternSize} 0 L 0 0 0 ${patternSize}`"
            fill="none"
            :stroke="color || '#e5e7eb'"
            stroke-width="0.5"
          />
        </template>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import type { ViewportTransform } from '../types'

const props = defineProps<{
  type?: 'dots' | 'grid'
  color?: string
  gap?: number
}>()

// 唯一 id 防止多实例冲突
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)
const patternId = `yh-bg-pattern-${uid}`

const svgRef = ref<SVGSVGElement>()
const patternRef = ref<SVGPatternElement>()
const dotRef = ref<SVGCircleElement>()
const gridPathRef = ref<SVGPathElement>()

const INITIAL_GAP = props.gap || 20
const patternSize = INITIAL_GAP // 静态初始值，由 updateViewport 动态修改

// ★ 直接 DOM 操作，不走 Vue 响应式
function updateViewport(t: ViewportTransform) {
  const pattern = patternRef.value
  if (!pattern) return

  const gap = props.gap || 20
  const scaledGap = gap * t.zoom
  const ox = t.x % scaledGap
  const oy = t.y % scaledGap

  // 更新 pattern 位置和大小（直接操作 SVG 属性）
  pattern.setAttribute('x', String(ox))
  pattern.setAttribute('y', String(oy))
  pattern.setAttribute('width', String(scaledGap))
  pattern.setAttribute('height', String(scaledGap))

  if (props.type === 'dots' && dotRef.value) {
    const half = scaledGap / 2
    dotRef.value.setAttribute('cx', String(half))
    dotRef.value.setAttribute('cy', String(half))
    dotRef.value.setAttribute('r', String(Math.max(0.8, 1.5 * t.zoom)))
  } else if (props.type === 'grid' && gridPathRef.value) {
    gridPathRef.value.setAttribute('d', `M ${scaledGap} 0 L 0 0 0 ${scaledGap}`)
  }
}

// 暴露给父组件调用
defineExpose({ updateViewport })
</script>

<style scoped>
.yh-flow-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
