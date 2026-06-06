# Flow 插件系统

Flow 提供标准化插件接口（`FlowPlugin` / `PluginManager`），用于扩展：Minimap、Controls、Grid、Snap、Export 等能力。

<script setup lang="ts">
import { ref, onMounted, h, markRaw } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'
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
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '插件系统演示' }, width: 150, height: 50 },
  { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: '内置插件' }, width: 150, height: 50 }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' }
])

onMounted(() => {
  const flow = flowRef.value
  if (!flow) return

  // 注册内置插件
  flow.usePlugin(createMiniMapPlugin({
    position: 'bottom-right'
  }))
  
  // 注册控制栏
  flow.usePlugin(createControlsPlugin())
  
  // 注册网格背景
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
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '自定义插件演示' }, width: 150, height: 50 }
])

const edges = ref<Edge[]>([])

// 定义一个简单的 UI 组件插件
const MyUIPlugin: FlowPlugin = {
  id: 'my-ui-plugin',
  name: 'MyUIPlugin',
  version: '1.0.0',
  // 插件可以提供在画布上渲染的组件
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
      alert('点击了节点: ' + node.data.label)
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

// 为实时演示注册插件
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
      install(flow) {
        flow.on('node:click', ({ node }) => {
          console.log('Clicked node in demo:', node.id)
        })
      }
    }
    flowCustomRef.value.usePlugin(MyUIPluginReal)
  }
})
</script>

## 使用插件

插件可以通过 `usePlugin` 方法进行注册。大部分内置功能目前已迁移为插件。

<DemoBlock title="基础插件用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      ref="flowBasicRef"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '插件系统演示' }, width: 150, height: 50 },
        { id: '2', type: 'default', position: { x: 400, y: 100 }, data: { label: '内置插件' }, width: 150, height: 50 }
      ]"
      :edges="[{ id: 'e1-2', source: '1', target: '2' }]"
    />
  </div>
</DemoBlock>

## 内置插件

| 插件名称 | 创建函数                        | 描述                                   |
| -------- | ------------------------------- | -------------------------------------- |
| Minimap  | `createMiniMapPlugin(options)`  | 显示流程图小地图，支持点击平移         |
| Controls | `createControlsPlugin(options)` | 提供缩放、自适应视图等交互控制栏       |
| Grid     | `createGridPlugin(options)`     | 提供点阵 (`dots`) 或网格 (`grid`) 背景 |
| Snap     | `createSnapPlugin(options)`     | 启用节点吸附与对齐辅助线               |
| Export   | `createExportPlugin(options)`   | 提供导出为 JSON 或图片的能力           |

## 自定义插件

你可以通过实现 `FlowPlugin` 接口来开发自定义插件。插件可以监听事件、修改状态，甚至提供自己的 UI 组件。

<DemoBlock title="自定义插件" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="width: 100%; height: 500px;">
    <yh-flow
      ref="flowCustomRef"
      :nodes="[
        { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '自定义插件演示 (点击我)' }, width: 200, height: 50 }
      ]"
      :edges="[]"
    />
  </div>
</DemoBlock>

## 下一个

- [API 参考](./api)
