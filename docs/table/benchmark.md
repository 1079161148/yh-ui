# Table - 性能基准压测

在大数据场景下，YH-UI Table 的虚拟滚动性能表现。下方为交互式基准压测面板，可实时测量渲染帧率（FPS）、初始渲染时长、滚动平均耗时等关键指标。

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 压测控制状态 ====================

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

// 数据列定义
const benchColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 100 },
  { prop: 'email', label: '邮箱' },
  { prop: 'status', label: '状态', width: 100 }
]

const departments = ['工程', '产品', '设计', '运营', '市场', '财务', '人事', 'HR']
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']
const statuses = ['在职', '离职', '实习', '暂停']

const benchData = ref<Record<string, unknown>[]>([])

function generateBenchData(count: number): Record<string, unknown>[] {
  const arr = new Array(count)
  for (let i = 0; i < count; i++) {
    arr[i] = {
      id: i + 1,
      name: `用户 ${i + 1}`,
      age: 20 + (i % 40),
      dept: departments[i % departments.length],
      salary: `¥${(8000 + (i % 20) * 500).toLocaleString()}`,
      city: cities[i % cities.length],
      email: `user${i + 1}@company.com`,
      status: statuses[i % statuses.length]
    }
  }
  return arr
}

// ==================== 原始性能测量工具 ====================

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

// ==================== 核心压测逻辑 ====================

async function runBenchmark() {
  if (isRunning.value) return
  isRunning.value = true
  benchResult.value = null

  // 1. 生成数据
  const count = benchRowCount.value
  const t0 = performance.now()
  benchData.value = generateBenchData(count)

  // 2. 等待渲染完成
  await nextTick()
  await new Promise((r) => setTimeout(r, 200))
  const initMs = Math.round(performance.now() - t0)

  // 3. 测量滚动性能（模拟 30 次滚动）
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

  // 4. 回到顶部
  if (tableEl) tableEl.scrollTop = 0
  await new Promise((r) => setTimeout(r, 100))

  // 5. 测量 FPS
  const fps = await measureFPS(800)

  // 6. 统计 DOM 节点数
  const domNodeCount = getVisibleDomCount()

  const avg = Math.round(scrollTimes.reduce((a, b) => a + b, 0) / scrollTimes.length)
  const min = Math.min(...scrollTimes)
  const max = Math.max(...scrollTimes)

  benchResult.value = {
    rowCount: count,
    initMs,
    avgScrollMs: avg,
    minScrollMs: min,
    maxScrollMs: max,
    fps,
    domNodeCount,
    timestamp: new Date().toLocaleTimeString('zh-CN')
  }
  isRunning.value = false
}

// ==================== 性能等级计算 ====================

const fpsLevel = computed(() => {
  if (!benchResult.value) return null
  const fps = benchResult.value.fps
  if (fps >= 55) return { label: '极佳', color: '#67c23a', grade: 'A+' }
  if (fps >= 45) return { label: '优秀', color: '#67c23a', grade: 'A' }
  if (fps >= 30) return { label: '良好', color: '#e6a23c', grade: 'B' }
  if (fps >= 20) return { label: '一般', color: '#e6a23c', grade: 'C' }
  return { label: '较差', color: '#f56c6c', grade: 'D' }
})

const scrollLevel = computed(() => {
  if (!benchResult.value) return null
  const avg = benchResult.value.avgScrollMs
  if (avg <= 5) return { label: '极佳', color: '#67c23a', grade: 'A+' }
  if (avg <= 10) return { label: '优秀', color: '#67c23a', grade: 'A' }
  if (avg <= 20) return { label: '良好', color: '#e6a23c', grade: 'B' }
  if (avg <= 50) return { label: '一般', color: '#e6a23c', grade: 'C' }
  return { label: '较慢', color: '#f56c6c', grade: 'D' }
})

// ==================== 代码示例 ====================

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
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 120 },
  { prop: 'salary', label: '薪资', width: 120 },
  { prop: 'city', label: '城市', width: 100 },
  { prop: 'email', label: '邮箱' },
  { prop: 'status', label: '状态', width: 100 }
]

const data = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: \`用户 \${i + 1}\`,
    age: 20 + (i % 40),
    dept: ['工程', '产品', '设计', '运营'][i % 4],
    salary: \`¥\${(8000 + (i % 20) * 500).toLocaleString()}\`,
    city: ['北京', '上海', '广州', '深圳'][i % 4],
    email: \`user\${i + 1}@company.com\`,
    status: ['在职', '离职', '实习'][i % 3]
  }))
)
</${_S}>`

const jsBenchCode = toJs(tsBenchCode)
</script>

## 交互式压测面板

通过调整参数，实时测量不同数据量下的渲染性能指标（FPS、初始渲染时间、滚动平均耗时、可见 DOM 节点数）。

<DemoBlock title="10K 行虚拟滚动性能基准压测" :ts-code="tsBenchCode" :js-code="jsBenchCode">

<!-- 压测控制面板 -->
<div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-end; padding: 16px; background: var(--vp-c-bg-soft); border-radius: 10px; margin-bottom: 16px;">
  <div>
    <label style="display: block; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">数据量（行数）</label>
    <div style="display: flex; align-items: center; gap: 8px;">
      <input v-model.number="benchRowCount" type="range" min="1000" max="100000" step="1000"
        style="width: 140px; accent-color: var(--vp-c-brand-1, #409eff);" />
      <span style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1, #409eff); min-width: 70px;">
        {{ benchRowCount.toLocaleString() }} 行
      </span>
    </div>
  </div>
  <div>
    <label style="display: block; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">行高（px）</label>
    <div style="display: flex; align-items: center; gap: 8px;">
      <input v-model.number="benchRowHeight" type="range" min="28" max="80" step="4"
        style="width: 100px; accent-color: var(--vp-c-brand-1, #409eff);" />
      <span style="font-size: 13px; font-weight: 600; min-width: 40px;">{{ benchRowHeight }}px</span>
    </div>
  </div>
  <div>
    <label style="display: block; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 6px;">缓冲行数</label>
    <div style="display: flex; align-items: center; gap: 8px;">
      <input v-model.number="benchBuffer" type="range" min="2" max="20" step="1"
        style="width: 80px; accent-color: var(--vp-c-brand-1, #409eff);" />
      <span style="font-size: 13px; font-weight: 600; min-width: 30px;">{{ benchBuffer }}</span>
    </div>
  </div>
  <button
    @click="runBenchmark"
    :disabled="isRunning"
    style="padding: 8px 24px; background: var(--vp-c-brand-1, #409eff); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; min-width: 120px; transition: opacity .2s;"
    :style="{ opacity: isRunning ? 0.6 : 1 }"
  >
    {{ isRunning ? '⏳ 压测中...' : '▶ 开始压测' }}
  </button>
</div>

<!-- 结果面板 -->
<template v-if="benchResult">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 16px;">
    <!-- 数据量 -->
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">数据总量</div>
      <div style="font-size: 22px; font-weight: 700; color: var(--vp-c-text-1);">{{ benchResult.rowCount.toLocaleString() }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">行</div>
    </div>
    <!-- 初始渲染 -->
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">初始渲染</div>
      <div style="font-size: 22px; font-weight: 700; color: #409eff;">{{ benchResult.initMs }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">ms</div>
    </div>
    <!-- 滚动平均 -->
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">滚动均值</div>
      <div style="font-size: 22px; font-weight: 700;" :style="{ color: scrollLevel?.color }">{{ benchResult.avgScrollMs }}</div>
      <div style="font-size: 11px; display: flex; align-items: center; gap: 4px;">
        <span style="color: var(--vp-c-text-2);">ms｜{{ scrollLevel?.label }}</span>
        <span style="font-weight: 700; padding: 1px 5px; border-radius: 3px; font-size: 10px;"
          :style="{ background: scrollLevel?.color + '20', color: scrollLevel?.color }">{{ scrollLevel?.grade }}</span>
      </div>
    </div>
    <!-- 滚动最小/最大 -->
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">滚动 Min/Max</div>
      <div style="font-size: 16px; font-weight: 700; color: var(--vp-c-text-1);">{{ benchResult.minScrollMs }} / {{ benchResult.maxScrollMs }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">ms</div>
    </div>
    <!-- FPS -->
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">渲染帧率</div>
      <div style="font-size: 22px; font-weight: 700;" :style="{ color: fpsLevel?.color }">{{ benchResult.fps }}</div>
      <div style="font-size: 11px; display: flex; align-items: center; gap: 4px;">
        <span style="color: var(--vp-c-text-2);">FPS｜{{ fpsLevel?.label }}</span>
        <span style="font-weight: 700; padding: 1px 5px; border-radius: 3px; font-size: 10px;"
          :style="{ background: fpsLevel?.color + '20', color: fpsLevel?.color }">{{ fpsLevel?.grade }}</span>
      </div>
    </div>
    <!-- DOM 节点数 -->
    <div style="padding: 14px 16px; background: var(--vp-c-bg-soft); border-radius: 10px; border: 1px solid var(--vp-c-divider);">
      <div style="font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px;">可见 DOM 行</div>
      <div style="font-size: 22px; font-weight: 700; color: #8b5cf6;">{{ benchResult.domNodeCount }}</div>
      <div style="font-size: 11px; color: var(--vp-c-text-2);">仅渲染可见区域</div>
    </div>
  </div>
  <div style="font-size: 12px; color: var(--vp-c-text-3); margin-bottom: 12px;">
    📊 压测完成于 {{ benchResult.timestamp }} · 共模拟 30 次随机滚动
  </div>
</template>

<!-- 压测说明（首次进入时显示） -->
<template v-else-if="!isRunning">
  <div style="padding: 20px; text-align: center; background: var(--vp-c-bg-soft); border-radius: 10px; margin-bottom: 16px; border: 1px dashed var(--vp-c-divider);">
    <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
    <div style="font-size: 14px; color: var(--vp-c-text-2);">点击「开始压测」按钮，自动执行 30 次模拟滚动并采集帧率、耗时等指标</div>
  </div>
</template>

<!-- 表格数据区 -->
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
      点击「开始压测」加载数据
    </div>
  </template>
</yh-table>

</DemoBlock>

## 参数说明

| 参数 | 说明 | 建议值 |
|------|------|--------|
| `数据量` | 总行数，滑块范围 1K ~ 100K | 10,000 |
| `行高` | 每行像素高度，决定虚拟视口计算精度 | 48px |
| `缓冲行数` | 可见区域外额外渲染行数，越大越平滑但内存消耗更多 | 5 |

## 性能指标解释

| 指标 | 说明 | 参考标准 |
|------|------|---------|
| **初始渲染** | 数据加载到首屏绘制完成耗时 | ≤ 200ms 为优秀 |
| **滚动均值** | 每次滚动触发到下一帧绘制的平均耗时 | ≤ 10ms 为优秀 |
| **FPS** | 压测期间渲染帧率（越高越流畅） | ≥ 55fps 为极佳 |
| **可见 DOM 行** | 实际渲染在 DOM 中的表格行数（体现虚拟滚动效果） | 与视口行数相当 |

## 优化建议

1. **固定 `rowHeight`**：设置准确的行高值，避免虚拟滚动计算偏差导致滚动条跳动。
2. **合理设置 `buffer`**：默认 5 行已满足绝大多数场景，过大会增加不必要的渲染负担。
3. **必须设置 `row-key`**：唯一标识符帮助 Vue 的 diff 算法高效复用 DOM 节点。
4. **避免在 `render` 函数中创建新对象**：使用稳定引用，防止无效重渲染。
5. **大数据集推荐分页 + 虚拟滚动结合**：超过 50 万行时建议使用服务端分页。
