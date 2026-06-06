# CSS 变量主题系统

Flow 的视觉风格完全依赖于 CSS 自定义属性（`--flow-*`），`FlowTheme` 接口集中罗列所有变量，并通过 `applyFlowTheme` 统一注入 DOM，轻松实现亮/暗/定制主题。

## 主题概览

- 所有节点、连线、辅助线、小地图、面板、工具栏都会从主题变量中获取颜色与阴影
- 提供 `flowTheme`、`flowThemeDark` 两套默认方案，以及 `flowThemePresets` 的蓝、绿、紫等配色
- 可通过 `createCustomTheme` 叠加修改，`applyFlowTheme` 支持实时切换

## 主题 API

| API                              | 说明                                                             |
| -------------------------------- | ---------------------------------------------------------------- |
| `flowTheme` / `flowThemeDark`    | 明亮 / 暗色默认主题                                              |
| `flowThemePresets`               | 预设主题集合（default、dark、blue、green、purple）               |
| `FlowThemeName`                  | 主题名字类型，便于限制可选值                                     |
| `createCustomTheme(overrides)`   | 在默认主题基础上合并覆盖，返回新主题对象                         |
| `applyFlowTheme(theme, target?)` | 将主题对象应用到指定 DOM 元素（默认为 document.documentElement） |

## 示例

下例通过 `applyFlowTheme` 为 Flow 配置不同风格，并展示当前主题与预览画布。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
import {
  applyFlowTheme,
  flowThemePresets,
  createCustomTheme,
  type FlowThemeName
} from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: 'start', type: 'input', position: { x: 80, y: 100 }, data: { label: '开始' } },
  { id: 'task', type: 'default', position: { x: 260, y: 100 }, data: { label: '审核节点' } },
  { id: 'end', type: 'output', position: { x: 440, y: 100 }, data: { label: '结束' } }
])

const edges = ref<Edge[]>([
  { id: 'e1', source: 'start', target: 'task', animated: true },
  { id: 'e2', source: 'task', target: 'end' }
])

const flowRef = ref<FlowInstance>()
const themeName = ref<FlowThemeName>('default')

const customTheme = createCustomTheme({
  'flow-background-color': '#0f172a',
  'flow-node-background': '#111827',
  'flow-node-border': '#1f2937',
  'flow-node-selected-border': '#fb923c',
  'flow-edge-stroke': '#a5b4fc',
  'flow-toolbar-background': '#111827',
  'flow-toolbar-border': '#1f2937'
})

const applyTheme = (name: FlowThemeName) => {
  const el = document.getElementById('theme-demo-container')
  if (el) {
    applyFlowTheme(flowThemePresets[name], el)
  }
  themeName.value = name
}

const applyCustom = () => {
  const el = document.getElementById('theme-demo-container')
  if (el) {
    applyFlowTheme(customTheme, el)
  }
  themeName.value = 'custom'
}

onMounted(() => {
  setTimeout(() => {
    const el = document.getElementById('theme-demo-container')
    if (el) {
      applyFlowTheme(flowThemePresets.default, el)
    }
  }, 100)
})

const tsCode = `<${_T}>
  <div class="theme-demo" id="theme-demo-container">
    <div class="toolbar">
      <button @click="applyTheme('default')">默认</button>
      <button @click="applyTheme('dark')">暗色</button>
      <button @click="applyTheme('blue')">蓝</button>
      <button @click="applyTheme('green')">绿</button>
      <button @click="applyTheme('purple')">紫</button>
      <button @click="applyCustom">自定义</button>
    </div>
    <div class="flow-wrapper">
      <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
    </div>
    <p class="status">当前主题：{{ themeName }}</p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Node, Edge, FlowInstance } from '@yh-ui/flow';
import {
  applyFlowTheme,
  flowThemePresets,
  createCustomTheme,
  type FlowThemeName
} from '@yh-ui/flow';

const nodes = ref<Node[]>([
  { id: 'start', type: 'input', position: { x: 80, y: 100 }, data: { label: '开始' } },
  { id: 'task', type: 'default', position: { x: 260, y: 100 }, data: { label: '审核节点' } },
  { id: 'end', type: 'output', position: { x: 440, y: 100 }, data: { label: '结束' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1', source: 'start', target: 'task', animated: true },
  { id: 'e2', source: 'task', target: 'end' }
]);

const flowRef = ref<FlowInstance>();
const themeName = ref<FlowThemeName>('default');

const customTheme = createCustomTheme({
  'flow-background-color': '#0f172a',
  'flow-node-background': '#111827',
  'flow-node-border': '#1f2937',
  'flow-node-selected-border': '#fb923c',
  'flow-edge-stroke': '#a5b4fc',
  'flow-toolbar-background': '#111827',
  'flow-toolbar-border': '#1f2937'
});

const applyTheme = (name: FlowThemeName) => {
  const el = document.getElementById('theme-demo-container');
  if (el) {
    applyFlowTheme(flowThemePresets[name], el);
  }
  themeName.value = name;
};

const applyCustom = () => {
  const el = document.getElementById('theme-demo-container');
  if (el) {
    applyFlowTheme(customTheme, el);
  }
  themeName.value = 'custom';
};

onMounted(() => {
  setTimeout(() => {
    const el = document.getElementById('theme-demo-container');
    if (el) {
      applyFlowTheme(flowThemePresets.default, el);
    }
  }, 100);
});
</${_S}>

<${_St}>
.theme-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.toolbar button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: var(--flow-node-background, #fff);
  color: var(--flow-node-label-color, #333);
  border-color: var(--flow-node-border, #cbd5e1);
  cursor: pointer;
  transition: all 0.2s;
}
.flow-wrapper {
  flex: 1;
  border: 1px solid var(--flow-node-border, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;
}
.status {
  font-size: 13px;
  color: var(--flow-node-description-color, #606266);
}
</${_St}>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="主题切换示例" :ts-code="tsCode" :js-code="jsCode">
  <div id="theme-demo-container" class="theme-demo" style="display:flex;flex-direction:column;gap:10px;height:500px;">
    <div class="toolbar" style="display:flex;flex-wrap:wrap;gap:8px;">
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('default')">
        默认
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('dark')">
        暗色
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('blue')">
        蓝
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('green')">
        绿
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('purple')">
        紫
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyCustom">
        自定义
      </button>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;"></yh-flow>
    </div>
    <p style="margin:0;font-size:13px;color:#606266;">当前主题：{{ themeName }}</p>
  </div>
</DemoBlock>

## 定制指南

1. **按场景选择变量**：节点、连线、小地图、面板等各类变量已在 `FlowTheme` 中列出，可针对不同区域调整颜色或大小。
2. **在应用入口调用 `applyFlowTheme`**：可在页面加载时或用户切换主题时调用，确保样式立即生效。
3. **复用预设 + 自定义覆盖**：通过 `createCustomTheme` 在 `flowTheme` 基础上覆盖个别变量，保持统一性。
