# Flow - 性能基准压测

用于验证 Flow 在大数据场景下的虚拟渲染与交互性能（例如 10,000 节点）。

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

interface FlowBenchmarkResult {
  nodeCount: number
  edgeCount: number
  initMs: number
  fps: number
  visibleNodeDomCount: number
  timestamp: string
}

const nodeCount = ref(10000)
const edgeRatio = ref(0.6) // edgeCount = floor(nodeCount * edgeRatio)
const isRunning = ref(false)
const benchResult = ref<FlowBenchmarkResult | null>(null)

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateGraph(n: number, edgeCount: number) {
  const rand = mulberry32(n ^ edgeCount)
  const nextNodes: Node[] = new Array(n)
  const nextEdges: Edge[] = []

  // 把节点分布到一个很大的画布区域，验证虚拟裁剪是否生效
  const cols = Math.max(20, Math.floor(Math.sqrt(n)))
  const gapX = 220
  const gapY = 90

  for (let i = 0; i < n; i++) {
    const x = (i % cols) * gapX + Math.floor(rand() * 30)
    const y = Math.floor(i / cols) * gapY + Math.floor(rand() * 30)
    nextNodes[i] = {
      id: String(i + 1),
      type: 'default',
      position: { x, y },
      data: { label: `Node ${i + 1}` },
      width: 160,
      height: 46
    }
  }

  // 生成部分连线：优先链式连线 + 少量跨列连线
  const baseEdges = Math.min(edgeCount, Math.max(0, n - 1))
  for (let i = 0; i < baseEdges; i++) {
    nextEdges.push({
      id: `e-${i + 1}-${i + 2}`,
      source: String(i + 1),
      target: String(i + 2),
      type: 'bezier'
    })
  }
  for (let i = baseEdges; i < edgeCount; i++) {
    const s = 1 + Math.floor(rand() * n)
    let t = 1 + Math.floor(rand() * n)
    if (t === s) t = ((t % n) + 1)
    nextEdges.push({
      id: `e-${s}-${t}-${i}`,
      source: String(s),
      target: String(t),
      type: 'bezier'
    })
  }

  return { nextNodes, nextEdges }
}

function measureFPS(duration: number = 900): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0
    const start = performance.now()
    function frame() {
      frames++
      if (performance.now() - start < duration) {
        requestAnimationFrame(frame)
      } else {
        resolve(Math.round((frames / duration) * 1000))
      }
    }
    requestAnimationFrame(frame)
  })
}

function getVisibleNodeDomCount(): number {
  const root = document.querySelector('.yh-flow')
  if (!root) return 0
  return root.querySelectorAll('.yh-flow-node').length
}

async function runBenchmark() {
  if (isRunning.value) return
  isRunning.value = true
  benchResult.value = null

  const n = Math.max(0, Math.floor(nodeCount.value))
  const e = Math.max(0, Math.floor(n * edgeRatio.value))

  const t0 = performance.now()
  const { nextNodes, nextEdges } = generateGraph(n, e)
  nodes.value = nextNodes
  edges.value = nextEdges

  // 等待首屏渲染稳定
  await nextTick()
  await new Promise((r) => setTimeout(r, 200))
  const initMs = Math.round(performance.now() - t0)

  const fps = await measureFPS(800)
  const visibleNodeDomCount = getVisibleNodeDomCount()

  benchResult.value = {
    nodeCount: n,
    edgeCount: e,
    initMs,
    fps,
    visibleNodeDomCount,
    timestamp: new Date().toLocaleTimeString('zh-CN')
  }
  isRunning.value = false
}

const fpsLevel = computed(() => {
  const fps = benchResult.value?.fps
  if (fps == null) return null
  if (fps >= 55) return { label: '极佳', color: '#67c23a', grade: 'A+' }
  if (fps >= 45) return { label: '优秀', color: '#67c23a', grade: 'A' }
  if (fps >= 30) return { label: '良好', color: '#e6a23c', grade: 'B' }
  if (fps >= 20) return { label: '一般', color: '#e6a23c', grade: 'C' }
  return { label: '较差', color: '#f56c6c', grade: 'D' }
})
</script>

## 交互式压测面板

<div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-end; padding: 14px; background: var(--vp-c-bg-soft); border-radius: 10px; margin-bottom: 14px;">
  <div>
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">节点数</div>
    <input v-model.number="nodeCount" type="number" min="0" step="1000" style="width: 160px; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
  </div>
  <div>
    <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">连线比例</div>
    <input v-model.number="edgeRatio" type="number" min="0" max="3" step="0.1" style="width: 160px; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
  </div>
  <button :disabled="isRunning" @click="runBenchmark" style="padding: 8px 14px; border-radius: 10px; border: 1px solid var(--vp-c-divider); background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); cursor: pointer;">
    {{ isRunning ? 'Running…' : 'Run Benchmark' }}
  </button>
</div>

<div v-if="benchResult" style="padding: 14px; background: var(--vp-c-bg-soft); border-radius: 10px; margin-bottom: 14px;">
  <div style="display:flex; gap:18px; flex-wrap:wrap;">
    <div><b>节点</b>：{{ benchResult.nodeCount.toLocaleString() }}</div>
    <div><b>连线</b>：{{ benchResult.edgeCount.toLocaleString() }}</div>
    <div><b>首屏初始化</b>：{{ benchResult.initMs }}ms</div>
    <div>
      <b>FPS</b>：{{ benchResult.fps }}
      <span v-if="fpsLevel" :style="{ marginLeft: '8px', color: fpsLevel.color, fontWeight: 700 }">
        {{ fpsLevel.grade }} · {{ fpsLevel.label }}
      </span>
    </div>
    <div><b>可见节点 DOM</b>：{{ benchResult.visibleNodeDomCount }}</div>
    <div style="color: var(--vp-c-text-2);">({{ benchResult.timestamp }})</div>
  </div>
</div>

## Flow 画布

<div style="width: 100%; height: 520px; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden;">
  <yh-flow
    v-model="viewport"
    :nodes="nodes"
    :edges="edges"
    show-controls
    show-minimap
    background="grid"
    :grid-size="20"
    :keyboard-shortcuts="true"
  />
</div>

## 提示

- 节点会分布在一个很大的画布上，正常情况下首屏只会渲染 **视口附近** 的节点（用于验证虚拟裁剪）。
- 若需要更严格的指标（滚动耗时、连线重算耗时等），后续会在此页继续补充细分测量项。
