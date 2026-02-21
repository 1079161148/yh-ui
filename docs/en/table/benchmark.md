# Table - Performance Benchmark

Performance benchmark for YH-UI Table virtual scrolling under large data scenarios. Use the interactive panel below to measure FPS, initial render time, scroll latency, and visible DOM node count in real time.

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const benchRowCount = ref(10000)
const benchRowHeight = ref(48)
const benchBuffer = ref(5)
const isRunning = ref(false)
const benchResult = ref<BenchmarkResult | null>(null)
const tableRef = ref()

interface BenchmarkResult {
  rowCount: number
  initMs: number
  avgScrollMs: number
  minScrollMs: number
  maxScrollMs: number
  fps: number
  domNodeCount: number
  timestamp: string
}

const benchColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Dept', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'city', label: 'City', width: 100 },
  { prop: 'email', label: 'Email' },
  { prop: 'status', label: 'Status', width: 100 }
]

const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing']
const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou']
const statuses = ['Active', 'Inactive', 'Intern']

const benchData = ref<Record<string, unknown>[]>([])

function generateBenchData(count: number): Record<string, unknown>[] {
  const arr = new Array(count)
  for (let i = 0; i < count; i++) {
    arr[i] = {
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + (i % 40),
      dept: departments[i % departments.length],
      salary: `$${(8000 + (i % 20) * 500).toLocaleString()}`,
      city: cities[i % cities.length],
      email: `user${i + 1}@company.com`,
      status: statuses[i % statuses.length]
    }
  }
  return arr
}

function measureFPS(duration: number = 1000): Promise<number> {
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

function getVisibleDomCount(): number {
  const table = document.querySelector('.yh-table__body-wrapper')
  if (!table) return 0
  return table.querySelectorAll('tr').length
}

async function runBenchmark() {
  if (isRunning.value) return
  isRunning.value = true
  benchResult.value = null

  const count = benchRowCount.value
  const t0 = performance.now()
  benchData.value = generateBenchData(count)

  await nextTick()
  await new Promise((r) => setTimeout(r, 200))
  const initMs = Math.round(performance.now() - t0)

  const tableEl = document.querySelector('.yh-table__body-wrapper') as HTMLElement
  const scrollTimes: number[] = []
  const totalHeight = (tableEl?.scrollHeight ?? 0) - (tableEl?.clientHeight ?? 0)

  for (let step = 0; step < 30; step++) {
    const scrollTop = Math.round((step / 29) * totalHeight)
    const ts = performance.now()
    if (tableEl) tableEl.scrollTop = scrollTop
    await new Promise((r) => requestAnimationFrame(r))
    await nextTick()
    scrollTimes.push(Math.round(performance.now() - ts))
  }

  if (tableEl) tableEl.scrollTop = 0
  await new Promise((r) => setTimeout(r, 100))

  const fps = await measureFPS(800)
  const domNodeCount = getVisibleDomCount()

  const avg = Math.round(scrollTimes.reduce((a, b) => a + b, 0) / scrollTimes.length)
  benchResult.value = {
    rowCount: count,
    initMs,
    avgScrollMs: avg,
    minScrollMs: Math.min(...scrollTimes),
    maxScrollMs: Math.max(...scrollTimes),
    fps,
    domNodeCount,
    timestamp: new Date().toLocaleTimeString('en-US')
  }
  isRunning.value = false
}

const fpsLevel = computed(() => {
  if (!benchResult.value) return null
  const fps = benchResult.value.fps
  if (fps >= 55) return { label: 'Excellent', color: '#67c23a', grade: 'A+' }
  if (fps >= 45) return { label: 'Good', color: '#67c23a', grade: 'A' }
  if (fps >= 30) return { label: 'Fair', color: '#e6a23c', grade: 'B' }
  if (fps >= 20) return { label: 'Poor', color: '#e6a23c', grade: 'C' }
  return { label: 'Bad', color: '#f56c6c', grade: 'D' }
})

const scrollLevel = computed(() => {
  if (!benchResult.value) return null
  const avg = benchResult.value.avgScrollMs
  if (avg <= 5) return { label: 'Excellent', color: '#67c23a', grade: 'A+' }
  if (avg <= 10) return { label: 'Good', color: '#67c23a', grade: 'A' }
  if (avg <= 20) return { label: 'Fair', color: '#e6a23c', grade: 'B' }
  if (avg <= 50) return { label: 'Okay', color: '#e6a23c', grade: 'C' }
  return { label: 'Slow', color: '#f56c6c', grade: 'D' }
})

const tsBenchCode = `<${_T}>
  <yh-table
    :data="data"
    :columns="columns"
    :virtual-config="{ enabled: true, rowHeight: 48, buffer: 5 }"
    height="500px"
    border
    row-key="id"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: 'Age', width: 80 },
  { prop: 'dept', label: 'Dept', width: 120 },
  { prop: 'salary', label: 'Salary', width: 120 },
  { prop: 'email', label: 'Email' },
  { prop: 'status', label: 'Status', width: 100 }
]

const data = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    age: 20 + (i % 40),
    dept: ['Engineering', 'Product', 'Design', 'Operations'][i % 4],
    salary: \`$\${(8000 + (i % 20) * 500).toLocaleString()}\`,
    email: \`user\${i + 1}@company.com\`,
    status: ['Active', 'Inactive', 'Intern'][i % 3]
  }))
)
</${_S}>`

const jsBenchCode = toJs(tsBenchCode)
</script>

## Interactive Benchmark Panel

Adjust parameters and click **Run Benchmark** to measure rendering performance metrics in real time.

<DemoBlock title="10K-Row Virtual Scroll Performance Benchmark" :ts-code="tsBenchCode" :js-code="jsBenchCode">

<div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-end; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 10px; margin-bottom: 16px;">
  <div>
    <label style="display: block; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">Row Count</label>
    <div style="display: flex; align-items: center; gap: 8px;">
      <input v-model.number="benchRowCount" type="range" min="1000" max="100000" step="1000"
        style="width: 140px; accent-color: var(--vp-c-brand-1, #409eff);" />
      <span style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1, #409eff); min-width: 80px;">
        {{ benchRowCount.toLocaleString() }} rows
      </span>
    </div>
  </div>
  <div>
    <label style="display: block; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">Row Height (px)</label>
    <div style="display: flex; align-items: center; gap: 8px;">
      <input v-model.number="benchRowHeight" type="range" min="28" max="80" step="4"
        style="width: 100px; accent-color: var(--vp-c-brand-1, #409eff);" />
      <span style="font-size: 13px; font-weight: 600; min-width: 40px;">{{ benchRowHeight }}px</span>
    </div>
  </div>
  <div>
    <label style="display: block; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">Buffer Rows</label>
    <div style="display: flex; align-items: center; gap: 8px;">
      <input v-model.number="benchBuffer" type="range" min="2" max="20" step="1"
        style="width: 80px; accent-color: var(--vp-c-brand-1, #409eff);" />
      <span style="font-size: 13px; font-weight: 600; min-width: 30px;">{{ benchBuffer }}</span>
    </div>
  </div>
  <button
    @click="runBenchmark"
    :disabled="isRunning"
    style="padding: 8px 24px; background: var(--vp-c-brand-1, #409eff); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; min-width: 140px; transition: opacity .2s;"
    :style="{ opacity: isRunning ? 0.6 : 1 }"
  >
    {{ isRunning ? '⏳ Running...' : '▶ Run Benchmark' }}
  </button>
</div>

<template v-if="benchResult">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 16px;">
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">Total Rows</div>
      <div style="font-size: 22px; font-weight: 700; color: var(--vp-c-text-1);">{{ benchResult.rowCount.toLocaleString() }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">rows</div>
    </div>
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">Initial Render</div>
      <div style="font-size: 22px; font-weight: 700; color: #409eff;">{{ benchResult.initMs }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">ms</div>
    </div>
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">Scroll Avg</div>
      <div style="font-size: 22px; font-weight: 700;" :style="{ color: scrollLevel?.color }">{{ benchResult.avgScrollMs }}</div>
      <div style="font-size: 11px; display: flex; align-items: center; gap: 4px;">
        <span style="color: var(--vp-c-text-2);">ms · {{ scrollLevel?.label }}</span>
        <span style="font-weight: 700; padding: 1px 5px; border-radius: 3px; font-size: 10px;"
          :style="{ background: scrollLevel?.color + '20', color: scrollLevel?.color }">{{ scrollLevel?.grade }}</span>
      </div>
    </div>
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">Scroll Min/Max</div>
      <div style="font-size: 16px; font-weight: 700; color: var(--vp-c-text-1);">{{ benchResult.minScrollMs }} / {{ benchResult.maxScrollMs }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">ms</div>
    </div>
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">FPS</div>
      <div style="font-size: 22px; font-weight: 700;" :style="{ color: fpsLevel?.color }">{{ benchResult.fps }}</div>
      <div style="font-size: 11px; display: flex; align-items: center; gap: 4px;">
        <span style="color: var(--vp-c-text-2);">fps · {{ fpsLevel?.label }}</span>
        <span style="font-weight: 700; padding: 1px 5px; border-radius: 3px; font-size: 10px;"
          :style="{ background: fpsLevel?.color + '20', color: fpsLevel?.color }">{{ fpsLevel?.grade }}</span>
      </div>
    </div>
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">Visible DOM Rows</div>
      <div style="font-size: 22px; font-weight: 700; color: #8b5cf6;">{{ benchResult.domNodeCount }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">only visible rows rendered</div>
    </div>
  </div>
  <div style="font-size: 12px; color: var(--vp-c-text-3); margin-bottom: 12px;">
    📊 Benchmark completed at {{ benchResult.timestamp }} · 30 scroll samples collected
  </div>
</template>

<template v-else-if="!isRunning">
  <div style="padding: 20px; text-align: center; background: var(--vp-c-bg-soft); border-radius: 10px; margin-bottom: 16px; border: 1px dashed var(--vp-c-divider);">
    <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
    <div style="font-size: 14px; color: var(--vp-c-text-2);">Click "Run Benchmark" to simulate 30 scroll events and collect FPS, latency, and DOM metrics.</div>
  </div>
</template>

<yh-table
  :data="benchData"
  :columns="benchColumns"
  :virtual-config="{ enabled: true, rowHeight: benchRowHeight, buffer: benchBuffer }"
  height="460px"
  border
  stripe
  row-key="id"
  ref="tableRef"
>
  <template #empty>
    <div style="padding: 40px; text-align: center; color: var(--vp-c-text-3);">
      Click "Run Benchmark" to load data
    </div>
  </template>
</yh-table>

</DemoBlock>

## Metric Reference

| Metric | Description | Target |
|--------|-------------|--------|
| **Initial Render** | Time from data load to first paint | ≤ 200ms is Excellent |
| **Scroll Avg** | Average time per scroll event to next frame | ≤ 10ms is Excellent |
| **FPS** | Frames per second during benchmark | ≥ 55fps is Excellent |
| **Visible DOM Rows** | Number of `<tr>` elements actually in DOM (proves virtual rendering) | ~viewport rows |

## Optimization Tips

1. **Set an accurate `rowHeight`** — virtual scroll calculates positions based on it; incorrect values cause scroll jumping.
2. **Keep `buffer` at 5** — larger values add smoothness but increase render cost.
3. **Always set `row-key`** — unique keys let Vue's diff algorithm reuse DOM nodes efficiently.
4. **Avoid creating new objects in `render`** — use stable references to prevent needless re-renders.
5. **Combine with pagination for 500K+ rows** — server-side paging + virtual scroll is the optimal pattern for extreme datasets.
