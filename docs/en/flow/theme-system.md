# CSS Variable Theme System

Flow is fully driven by CSS custom properties (`--flow-*`). The `FlowTheme` interface lists every variable, and `applyFlowTheme` injects them into the document so you can switch light, dark, or custom palettes without touching component styles.

## Theme Overview

- Nodes, edges, handles, backgrounds, panels, toolbars, and minimaps all read from the shared theme tokens
- Two default themes (`flowTheme`, `flowThemeDark`) plus presets for blue, green, purple, etc.
- Use `createCustomTheme` to tweak a preset and `applyFlowTheme` to swap palettes at runtime

## Theme API

| API                              | Description                                                                |
| -------------------------------- | -------------------------------------------------------------------------- |
| `flowTheme`, `flowThemeDark`     | Default light and dark palettes                                            |
| `flowThemePresets`               | Presets collection (`default`, `dark`, `blue`, `green`, `purple`)          |
| `FlowThemeName`                  | Theme name union type                                                      |
| `createCustomTheme(overrides)`   | Merge overrides onto the default theme                                     |
| `applyFlowTheme(theme, target?)` | Apply the theme to a target element (defaults to document.documentElement) |

## Example

This demo switches between presets and a custom palette via `applyFlowTheme`.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
import {
  applyFlowTheme,
  flowThemePresets,
  createCustomTheme,
  type FlowThemeName
} from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: 'start', type: 'input', position: { x: 80, y: 100 }, data: { label: 'Start' } },
  { id: 'task', type: 'default', position: { x: 260, y: 100 }, data: { label: 'Review' } },
  { id: 'end', type: 'output', position: { x: 440, y: 100 }, data: { label: 'Finish' } }
])

const edges = ref<Edge[]>([
  { id: 'e1', source: 'start', target: 'task', animated: true },
  { id: 'e2', source: 'task', target: 'end' }
])

const themeName = ref<FlowThemeName>('default')
const flowRef = ref<FlowInstance>()

const customTheme = createCustomTheme({
  'flow-background-color': '#0f172a',
  'flow-node-background': '#0f172a',
  'flow-node-border': '#1f2937',
  'flow-node-selected-border': '#fb923c',
  'flow-edge-stroke': '#a5b4fc',
  'flow-toolbar-background': '#111827',
  'flow-toolbar-border': '#1f2937'
})

const applyTheme = (name: FlowThemeName) => {
  const el = document.getElementById('theme-demo-container-en')
  if (el) {
    applyFlowTheme(flowThemePresets[name], el)
  }
  themeName.value = name
}

const applyCustom = () => {
  const el = document.getElementById('theme-demo-container-en')
  if (el) {
    applyFlowTheme(customTheme, el)
  }
  themeName.value = 'custom'
}

onMounted(() => {
  setTimeout(() => {
    const el = document.getElementById('theme-demo-container-en')
    if (el) {
      applyFlowTheme(flowThemePresets.default, el)
    }
  }, 100)
})

const tsCode = `<${_T}>
  <div class="theme-demo" id="theme-demo-container-en">
    <div class="toolbar">
      <button @click="applyTheme('default')">Default</button>
      <button @click="applyTheme('dark')">Dark</button>
      <button @click="applyTheme('blue')">Blue</button>
      <button @click="applyTheme('green')">Green</button>
      <button @click="applyTheme('purple')">Purple</button>
      <button @click="applyCustom">Custom</button>
    </div>
    <div class="flow-wrapper">
      <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
    </div>
    <p class="status">Current theme: {{ themeName }}</p>
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
  { id: 'start', type: 'input', position: { x: 80, y: 100 }, data: { label: 'Start' } },
  { id: 'task', type: 'default', position: { x: 260, y: 100 }, data: { label: 'Review' } },
  { id: 'end', type: 'output', position: { x: 440, y: 100 }, data: { label: 'Finish' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1', source: 'start', target: 'task', animated: true },
  { id: 'e2', source: 'task', target: 'end' }
]);

const flowRef = ref<FlowInstance>();
const themeName = ref<FlowThemeName>('default');

const customTheme = createCustomTheme({
  'flow-background-color': '#0f172a',
  'flow-node-background': '#0f172a',
  'flow-node-border': '#1f2937',
  'flow-node-selected-border': '#fb923c',
  'flow-edge-stroke': '#a5b4fc',
  'flow-toolbar-background': '#111827',
  'flow-toolbar-border': '#1f2937'
});

const applyTheme = (name: FlowThemeName) => {
  const el = document.getElementById('theme-demo-container-en');
  if (el) {
    applyFlowTheme(flowThemePresets[name], el);
  }
  themeName.value = name;
};

const applyCustom = () => {
  const el = document.getElementById('theme-demo-container-en');
  if (el) {
    applyFlowTheme(customTheme, el);
  }
  themeName.value = 'custom';
};

onMounted(() => {
  setTimeout(() => {
    const el = document.getElementById('theme-demo-container-en');
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

<DemoBlock title="Theme Switcher" :ts-code="tsCode" :js-code="jsCode">
  <div id="theme-demo-container-en" class="theme-demo" style="display:flex;flex-direction:column;gap:10px;height:500px;">
    <div class="toolbar" style="display:flex;flex-wrap:wrap;gap:8px;">
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('default')">
        Default
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('dark')">
        Dark
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('blue')">
        Blue
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('green')">
        Green
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyTheme('purple')">
        Purple
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="applyCustom">
        Custom
      </button>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;"></yh-flow>
    </div>
    <p style="margin:0;font-size:13px;color:#606266;">Current theme: {{ themeName }}</p>
  </div>
</DemoBlock>

## Best Practices

1. **Target specific areas**: Node, edge, minimap, and toolbar variables can be customized independently inside `FlowTheme`.
2. **Call `applyFlowTheme` on mount or theme switch**: This ensures the CSS custom properties are updated globally.
3. **Compose overrides**: `createCustomTheme` merges overrides with a preset, keeping the palette cohesive.
