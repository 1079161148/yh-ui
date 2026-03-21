<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import type { Edge, Position, EdgeStyle } from '../../types'

// ============================================================
// DataFlowEdge - 数据流动光效边
// EdgeRenderer 通过 v-bind="ed" 将以下字段注入为 props：
//   edge, path, sourceX, sourceY, targetX, targetY,
//   labelX, labelY, stroke, strokeWidth, style, selected...
// 扩展字段（flowStatus/flowEffect 等）从 edge.data 中读取
// ============================================================

export type DataFlowStatus = 'idle' | 'processing' | 'success' | 'error' | 'warning'
export type DataFlowEffect = 'particles' | 'glow' | 'pulse' | 'wave' | 'none'

interface DataFlowEdgeData {
  flowStatus?: DataFlowStatus
  flowEffect?: DataFlowEffect
  glowIntensity?: number
  particleCount?: number
  animationDuration?: number
  [key: string]: unknown
}

interface Props {
  /** EdgeRenderer 注入：完整边对象 */
  edge: Edge
  /** EdgeRenderer 注入：预计算 SVG 路径 */
  path: string
  /** EdgeRenderer 注入：源点 X */
  sourceX: number
  /** EdgeRenderer 注入：源点 Y */
  sourceY: number
  /** EdgeRenderer 注入：目标点 X */
  targetX: number
  /** EdgeRenderer 注入：目标点 Y */
  targetY: number
  /** EdgeRenderer 注入：中心 X（用于标签） */
  labelX?: number
  /** EdgeRenderer 注入：中心 Y（用于标签） */
  labelY?: number
  /** EdgeRenderer 注入：边样式 */
  style?: EdgeStyle
  /** EdgeRenderer 注入：线条颜色 */
  stroke?: string
  /** EdgeRenderer 注入：线条宽度 */
  strokeWidth?: number
  /** 源点方向（EdgeRenderer 从 sourceHandle 推导） */
  sourcePosition?: Position
  /** 目标点方向 */
  targetPosition?: Position
}

const props = withDefaults(defineProps<Props>(), {
  sourcePosition: 'right',
  targetPosition: 'left',
  style: () => ({}),
  stroke: '#b1b1b7',
  strokeWidth: 2,
  labelX: undefined,
  labelY: undefined
})

// ─ 从 edge.data 读取 DataFlow 扩展字段 ─
const edgeData = computed<DataFlowEdgeData>(() => (props.edge?.data as DataFlowEdgeData) ?? {})

const flowStatus = computed<DataFlowStatus>(() => edgeData.value.flowStatus ?? 'idle')
const flowEffect = computed<DataFlowEffect>(() => edgeData.value.flowEffect ?? 'particles')
const glowIntensity = computed(() => edgeData.value.glowIntensity ?? 8)
const particleCount = computed(() => edgeData.value.particleCount ?? 3)
const animationDuration = computed(() => edgeData.value.animationDuration ?? 2)

// ─ 从 edge 顶层字段读取标准属性 ─
const isSelected = computed(() => props.edge?.selected ?? false)
const isAnimated = computed(() => props.edge?.animated ?? false)
const label = computed(() => props.edge?.label ?? '')
const edgeId = computed(() => props.edge?.id ?? '')
const edgeStrokeWidth = computed(() => props.strokeWidth ?? 2)

// 状态颜色映射
const STATUS_COLORS: Record<DataFlowStatus, { primary: string; glow: string; particle: string }> = {
  idle: { primary: '#b1b1b7', glow: '#b1b1b7', particle: '#d1d1d7' },
  processing: { primary: '#6366f1', glow: '#4f46e5', particle: '#818cf8' },
  success: { primary: '#10b981', glow: '#059669', particle: '#34d399' },
  error: { primary: '#ef4444', glow: '#dc2626', particle: '#f87171' },
  warning: { primary: '#f59e0b', glow: '#d97706', particle: '#fcd34d' }
}

const colors = computed(() => STATUS_COLORS[flowStatus.value])

// 中心坐标（用于标签/状态点）
const centX = computed(() => props.labelX ?? (props.sourceX + props.targetX) / 2)
const centY = computed(() => props.labelY ?? (props.sourceY + props.targetY) / 2)

// SVG filter/gradient ID（用 edgeId 保证全局唯一性）
const filterId = computed(() => `data-flow-glow-${edgeId.value}`)
const particleGradId = computed(() => `data-flow-grad-${edgeId.value}`)
const namedPathId = computed(() => `data-flow-path-${edgeId.value}`)

// 粒子延迟配置
const particles = computed(() =>
  Array.from({ length: particleCount.value }, (_, i) => ({
    key: i,
    delay: (i / particleCount.value) * animationDuration.value
  }))
)

// 是否处于活跃状态（非 idle）
const isActive = computed(
  () =>
    flowStatus.value === 'processing' ||
    flowStatus.value === 'success' ||
    flowStatus.value === 'error' ||
    flowStatus.value === 'warning'
)

// 是否显示发光效果
const showGlow = computed(
  () => isActive.value && (flowEffect.value === 'glow' || flowEffect.value === 'particles')
)

// 主线条样式，颜色从状态映射获取，忽略 EdgeRenderer 默认灰色
const strokeStyle = computed(() => ({
  stroke: colors.value.primary,
  strokeWidth: edgeStrokeWidth.value,
  strokeDasharray: isAnimated.value && !isActive.value ? '5,5' : undefined,
  ...(props.style ?? {})
}))

// 点击热区（增大可点击面积，不影响视觉）
const hitAreaStyle = computed(() => ({
  stroke: 'transparent',
  strokeWidth: Math.max(edgeStrokeWidth.value * 5, 20),
  fill: 'none'
}))

// ─ pulse 模式心跳定时器 ─
const pulseOpacity = ref(0.8)
let pulseTimer: ReturnType<typeof setInterval> | null = null

function startPulse() {
  if (pulseTimer) clearInterval(pulseTimer)
  pulseTimer = setInterval(
    () => {
      pulseOpacity.value = pulseOpacity.value === 0.8 ? 0.2 : 0.8
    },
    (animationDuration.value * 1000) / 2
  )
}

function stopPulse() {
  if (pulseTimer) {
    clearInterval(pulseTimer)
    pulseTimer = null
  }
}

onMounted(() => {
  if (flowEffect.value === 'pulse' && isActive.value) startPulse()
})

onUnmounted(() => stopPulse())

watch([flowEffect, isActive], ([effect, active]) => {
  stopPulse()
  if (effect === 'pulse' && active) startPulse()
})
</script>

<template>
  <g
    :class="[
      'flow-data-flow-edge',
      `status-${flowStatus}`,
      `effect-${flowEffect}`,
      { selected: isSelected, animated: isAnimated }
    ]"
  >
    <!-- SVG 滤镜/渐变定义 -->
    <defs>
      <!-- 发光模糊滤镜 -->
      <filter :id="filterId" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur :stdDeviation="glowIntensity / 3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- 粒子径向渐变（中心亮、边缘透明） -->
      <radialGradient :id="particleGradId" cx="50%" cy="50%" r="50%">
        <stop offset="0%" :stop-color="colors.particle" stop-opacity="1" />
        <stop offset="100%" :stop-color="colors.primary" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- ① 发光底层（glow / particles 模式下激活） -->
    <path
      v-if="showGlow"
      :d="path"
      class="flow-edge-glow"
      :style="{
        stroke: colors.glow,
        strokeWidth: edgeStrokeWidth * 4,
        opacity: 0.35,
        filter: `url(#${filterId})`
      }"
      fill="none"
    />

    <!-- ② 主线条 -->
    <path
      :d="path"
      class="flow-edge-main"
      :style="strokeStyle"
      fill="none"
      :filter="showGlow ? `url(#${filterId})` : undefined"
    />

    <!-- ③ pulse 模式：叠加闪烁层 -->
    <path
      v-if="flowEffect === 'pulse' && isActive"
      :d="path"
      class="flow-edge-pulse"
      :style="{
        stroke: colors.primary,
        strokeWidth: edgeStrokeWidth + 2,
        opacity: pulseOpacity,
        transition: `opacity ${animationDuration / 2}s ease-in-out`,
        filter: `url(#${filterId})`
      }"
      fill="none"
    />

    <!-- ④ wave 模式：流动虚线 -->
    <path
      v-if="flowEffect === 'wave' && isActive"
      :d="path"
      class="flow-edge-wave"
      :style="{
        stroke: colors.particle,
        strokeWidth: edgeStrokeWidth,
        strokeDasharray: '8 4',
        fill: 'none'
      }"
    />

    <!-- ⑤ particles 模式：粒子沿路径流动 -->
    <template v-if="flowEffect === 'particles' && isActive">
      <!-- 供 animateMotion 引用的命名路径（不可见） -->
      <path :id="namedPathId" :d="path" fill="none" stroke="none" />
      <circle
        v-for="p in particles"
        :key="p.key"
        r="4"
        :fill="`url(#${particleGradId})`"
        class="flow-particle"
      >
        <animateMotion
          :dur="`${animationDuration}s`"
          :begin="`${p.delay}s`"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1"
          keyTimes="0;1"
          rotate="auto"
        >
          <mpath :href="`#${namedPathId}`" />
        </animateMotion>
      </circle>
    </template>

    <!-- ⑥ 点击热区（扩大交互面积，不可见） -->
    <path :d="path" :style="hitAreaStyle" class="flow-edge-hitarea" />

    <!-- ⑦ 连线标签 -->
    <foreignObject v-if="label" :x="centX - 38" :y="centY - 14" width="76" height="28">
      <div class="flow-data-flow-label">{{ label }}</div>
    </foreignObject>

    <!-- ⑧ 状态指示点（无标签时显示） -->
    <g v-if="flowStatus !== 'idle' && !label" :transform="`translate(${centX}, ${centY})`">
      <circle r="9" :fill="colors.primary" opacity="0.12" />
      <circle r="4" :fill="colors.primary" />
    </g>
  </g>
</template>

<style scoped>
.flow-data-flow-edge {
  cursor: pointer;
  pointer-events: all;
}

/* 主线条过渡 */
.flow-edge-main {
  transition:
    stroke 0.3s ease,
    stroke-width 0.2s ease;
}

/* 发光底层 */
.flow-edge-glow {
  pointer-events: none;
}

/* wave 流动动画 */
.flow-edge-wave {
  animation: wave-flow v-bind('`${animationDuration}s`') linear infinite;
  pointer-events: none;
}

@keyframes wave-flow {
  from {
    stroke-dashoffset: 24;
  }

  to {
    stroke-dashoffset: 0;
  }
}

/* 粒子 */
.flow-particle {
  pointer-events: none;
}

/* 点击热区 */
.flow-edge-hitarea {
  cursor: pointer;
  pointer-events: stroke;
}

/* 选中高亮 */
.flow-data-flow-edge.selected .flow-edge-main {
  stroke-width: 3;
  filter: brightness(1.2);
}

.flow-data-flow-edge.selected .flow-edge-glow {
  opacity: 0.6 !important;
}

/* 标签 */
.flow-data-flow-label {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 11px;
  font-weight: 500;
  color: #374151;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 4px;
  padding: 2px 6px;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  user-select: none;
}

/* ── 状态特定动画 ── */

/* 处理中：线条呼吸感 */
.flow-data-flow-edge.status-processing .flow-edge-main {
  animation: processing-pulse 1.5s ease-in-out infinite;
}

@keyframes processing-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.65;
  }
}

/* 错误：快速闪烁 */
.flow-data-flow-edge.status-error .flow-edge-main {
  animation: error-flash 0.8s ease-in-out infinite;
}

@keyframes error-flash {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

/* 警告：慢速脉冲 */
.flow-data-flow-edge.status-warning .flow-edge-main {
  animation: warning-pulse 2s ease-in-out infinite;
}

@keyframes warning-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.55;
  }
}
</style>
