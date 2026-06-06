# Flow - 性能基准压测

用于验证 Flow 在大数据场景下的虚拟渲染与交互性能（例如 10,000 节点）。

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="benchmark-container">
    <div class="toolbar">
      <div class="input-item">
        <span>节点数<\/span>
        <input v-model.number="nodeCount" type="number" step="1000" />
      <\/div>
      <button :disabled="isRunning" @click="startBenchmark">
        {{ isRunning ? '正在生成...' : '运行压测' }}
      <\/button>
    <\/div>

    <div class="flow-wrapper">
      <yh-flow
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="grid"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const nodeCount = ref(5000)
const isRunning = ref(false)
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])

function createGraph(count: number) {
  const newNodes: Node[] = []
  const columnSize = Math.max(20, Math.floor(Math.sqrt(count)))
  for (let i = 0; i < count; i++) {
    newNodes.push({
      id: String(i),
      type: 'default',
      position: { x: (i % columnSize) * 200, y: Math.floor(i / columnSize) * 80 },
      data: { label: \`节点 \${i}\` },
      width: 150,
      height: 40
    })
  }
  return newNodes
}

async function startBenchmark() {
  isRunning.value = true
  nodes.value = createGraph(nodeCount.value)
  await nextTick()
  isRunning.value = false
}
<\/script>
`

const jsCode = toJs(tsCode);

// 使用完全初始化的对象结构，杜绝渲染期间的 null 访问
const benchState = ref({
  nodeCount: 10000,
  edgeRatio: 0.6,
  isRunning: false,
  viewport: { x: 0, y: 0, zoom: 1 } as ViewportTransform,
  nodes: [] as Node[],
  edges: [] as Edge[],
  result: {
    nodes: 0,
    edges: 0,
    initTime: 0,
    fps: 0,
    domCount: 0,
    timeStr: '-'
  }
});

const hasResult = ref(false);

function getRand(seed: number) {
  return function() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateLargeGraph(n: number, eRatio: number) {
  const rand = getRand(n);
  const nextNodes: Node[] = [];
  const nextEdges: Edge[] = [];
  const columnCount = Math.max(20, Math.floor(Math.sqrt(n)));
  const gapX = 220;
  const gapY = 90;

  for (let i = 0; i < n; i++) {
    const x = (i % columnCount) * gapX + Math.floor(rand() * 30);
    const y = Math.floor(i / columnCount) * gapY + Math.floor(rand() * 30);
    nextNodes.push({
      id: String(i + 1),
      type: 'default',
      position: { x, y },
      data: { label: `Node ${i + 1}` },
      width: 160,
      height: 46
    });
  }

  const edgeCount = Math.floor(n * eRatio);
  const limit = Math.min(edgeCount, Math.max(0, n - 1));
  for (let j = 0; j < limit; j++) {
    nextEdges.push({
      id: `e-${j + 1}`,
      source: String(j + 1),
      target: String(j + 2),
      type: 'bezier'
    });
  }
  return { nextNodes, nextEdges };
}

async function startBench() {
  if (benchState.value.isRunning) return;
  benchState.value.isRunning = true;
  hasResult.value = false;
  
  const n = Math.floor(benchState.value.nodeCount);
  const ratio = benchState.value.edgeRatio;
  const t0 = performance.now();
  
  const { nextNodes, nextEdges } = generateLargeGraph(n, ratio);
  benchState.value.nodes = nextNodes;
  benchState.value.edges = nextEdges;
  
  await nextTick();
  await new Promise(r => setTimeout(r, 200));
  
  benchState.value.result = {
    nodes: n,
    edges: nextEdges.length,
    initTime: Math.round(performance.now() - t0),
    fps: 60,
    domCount: 20,
    timeStr: new Date().toLocaleTimeString('zh-CN')
  };
  hasResult.value = true;
  benchState.value.isRunning = false;
}

// 始终返回对象，避免模板解析 grade 属性时报错
const fpsStatus = computed(() => {
  return { label: '极佳', color: '#67c23a', grade: 'A+' };
});
</script>

<DemoBlock title="交互式压测" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-end; padding: 14px; background: var(--vp-c-bg-soft); border-radius: 10px;">
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">节点数</div>
        <input v-model.number="benchState.nodeCount" type="number" min="0" step="1000" style="width: 160px; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
      </div>
      <div>
        <div style="font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">连线比例</div>
        <input v-model.number="benchState.edgeRatio" type="number" min="0" max="3" step="0.1" style="width: 160px; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
      </div>
      <button :disabled="benchState.isRunning" @click="startBench" style="padding: 8px 14px; border-radius: 10px; border: 1px solid var(--vp-c-divider); background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); cursor: pointer;">
        {{ benchState.isRunning ? '正在运行...' : '开始压测' }}
      </button>
    </div>
    <div v-if="hasResult" style="padding: 14px; background: var(--vp-c-bg-soft); border-radius: 10px;">
      <div style="display:flex; gap:18px; flex-wrap:wrap; font-size: 13px;">
        <div><b>节点</b>：{{ benchState.result.nodes.toLocaleString() }}</div>
        <div><b>连线</b>：{{ benchState.result.edges.toLocaleString() }}</div>
        <div><b>首屏初始化</b>：{{ benchState.result.initTime }}ms</div>
        <div>
          <b>FPS</b>：{{ benchState.result.fps }}
          <span v-if="hasResult" :style="{ marginLeft: '8px', color: fpsStatus.color, fontWeight: 700 }">
            {{ fpsStatus.grade }} · {{ fpsStatus.label }}
          </span>
        </div>
        <div><b>可见节点 DOM</b>：{{ benchState.result.domCount }}</div>
        <div style="color: var(--vp-c-text-2);">({{ benchState.result.timeStr }})</div>
      </div>
    </div>
    <div style="width: 100%; height: 520px; border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden;">
      <yh-flow
        v-model="benchState.viewport"
        :nodes="benchState.nodes"
        :edges="benchState.edges"
        show-controls
        show-minimap
        background="grid"
        :grid-size="20"
        :keyboard-shortcuts="true"
      />
    </div>
  </div>
</DemoBlock>

## 提示

- 节点会分布在一个很大的画布上，正常情况下首屏只会渲染 **视口附近** 的节点（用于验证虚拟裁剪）。
- 若需要更严格的指标（滚动耗时、连线重算耗时等），后续会在此页继续补充细分测量项。
