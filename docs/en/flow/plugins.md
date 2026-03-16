# Flow Plugin System

Flow provides a standardized plugin interface (`FlowPlugin` / `PluginManager`) for extending capabilities like Minimap, Controls, Grid, Snap, and Export.

<script setup lang="ts">
import { ref, onMounted, h, markRaw } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import { 
  createMiniMapPlugin, 
  createControlsPlugin, 
  createGridPlugin 
} from '@yh-ui/flow'

const flowBasicRef = ref(null)
const flowCustomRef = ref(null)

const tsBasic = `<template>
  <div style="width: 100%; height: 500px;">
    <yh-flow
      ref="flowRef"
      v-model:nodes="nodes"
      v-model:edges="edges"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  createMiniMapPlugin, 
  createControlsPlugin, 
  createGridPlugin,
  type Node,
  type Edge
} from '@yh-ui/flow'

const flowRef = ref(null)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Plugin System Demo' }, width: 150, height: 50 },
  { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Built-in Plugins' }, width: 150, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' }
])

onMounted(() => {
  const flow = flowRef.value
  if (!flow) return

  // Register built-in plugins
  flow.usePlugin(createMiniMapPlugin({
    position: 'bottom-right'
  }))
  
  // Register Controls
  flow.usePlugin(createControlsPlugin())
  
  // Register Grid Background
  flow.usePlugin(createGridPlugin({
    type: 'grid'
  }))
})
<\/script>`

const jsBasic = toJs(tsBasic)

const tsCustom = `<template>
  <div style="width: 100%; height: 500px;">
    <yh-flow
      ref="flowRef"
      :nodes="nodes"
      :edges="edges"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, markRaw } from 'vue'
import type { FlowPlugin, FlowInstance, Node, Edge } from '@yh-ui/flow'

const flowRef = ref(null)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Custom Plugin Demo' }, width: 150, height: 50 }
])

const edges = ref<Edge[]>([])

// Define a simple UI component plugin
const MyUIPlugin: FlowPlugin = {
  id: 'my-ui-plugin',
  name: 'MyUIPlugin',
  version: '1.0.0',
  // Plugins can provide components to render on the canvas
  component: markRaw({
    props: ['title'],
    render() {
      return h('div', {
        style: {
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          zIndex: 10
        }
      }, this.title)
    }
  }),
  componentProps: {
    title: 'Hello from Custom Plugin!'
  },
  install(flow: FlowInstance) {
    console.log('Plugin installed!')
    flow.on('node:click', ({ node }) => {
      alert('Clicked node: ' + node.data.label)
    })
  }
}

onMounted(() => {
  const flow = flowRef.value
  if (flow) {
    flow.usePlugin(MyUIPlugin)
  }
})
<\/script>`

const jsCustom = toJs(tsCustom)

// Register plugins for live demos
onMounted(() => {
  if (flowBasicRef.value) {
    flowBasicRef.value.usePlugin(createMiniMapPlugin({ position: 'bottom-right' }))
    flowBasicRef.value.usePlugin(createControlsPlugin())
    flowBasicRef.value.usePlugin(createGridPlugin({ type: 'grid' }))
  }

  if (flowCustomRef.value) {
    const MyUIPluginReal = {
      id: 'my-ui-plugin-real',
      name: 'MyUIPlugin',
      version: '1.0.0',
      component: markRaw({
        props: ['title'],
        render() {
          return h('div', {
            style: {
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              pointerEvents: 'none',
              fontSize: '14px',
              color: '#333'
            }
          }, this.title)
        }
      }),
      componentProps: {
        title: 'Hello from Custom Plugin!'
      },
      install(flow: FlowInstance) {
        flow.on('node:click', ({ node }) => {
          console.log('Clicked node in demo:', node.id)
        })
      }
    }
    flowCustomRef.value.usePlugin(MyUIPluginReal)
  }
})
</script>

## Using Plugins

Plugins can be registered using the `usePlugin` method. Most built-in features have been migrated to the plugin system.

<DemoBlock title="Basic Plugin Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      ref="flowBasicRef"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Plugin System Demo' }, width: 150, height: 50 },
        { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Built-in Plugins' }, width: 150, height: 50 }
      ]"
      :edges="[{ id: 'e1-2', source: '1', target: '2' }]"
    />
  </div>
</DemoBlock>

## Built-in Plugins

| Plugin Name | Factory Function                | Description                                               |
| ----------- | ------------------------------- | --------------------------------------------------------- |
| Minimap     | `createMiniMapPlugin(options)`  | Shows a minimap of the flow chart, supports click-to-pan  |
| Controls    | `createControlsPlugin(options)` | Provides a toolbar for zooming, fitting view, and locking |
| Grid        | `createGridPlugin(options)`     | Provides `dots` or `grid` background styles               |
| Snap        | `createSnapPlugin(options)`     | Enables node snapping and alignment guide lines           |
| Export      | `createExportPlugin(options)`   | Provides methods to export the flow as JSON or Image      |

## Custom Plugins

You can develop custom plugins by implementing the `FlowPlugin` interface. Plugins can listen to events, modify state, or even provide their own UI components.

<DemoBlock title="Custom Plugin" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      ref="flowCustomRef"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Custom Plugin (Click Me)' }, width: 200, height: 50 }
      ]"
      :edges="[]"
    />
  </div>
</DemoBlock>

## Next

- [API Reference](./api)
