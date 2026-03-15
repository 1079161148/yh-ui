# 屏幕截图导出 (Screenshot)

有些时候，我们画完一幅精美的业务流程，希望让后端或者测试老师能够马上审阅，或者是业务要求能点击按钮生成高保真的高清图片。

借助强大的开源库 [html-to-image](https://github.com/bubkoo/html-to-image) 等插件，我们能够很完美地从 `yh-flow` 的可视区 DOM 架构中剥离出一张毫无瑕疵的 PNG 图片。

> [!NOTE]
>
> 请注意，该用例依赖我们在您的工程内引入了独立的截图依赖：`npm install html-to-image` 或者 `html2canvas`。组件库本身坚持轻量纯净化的路线，不会内置这些臃肿的截图依赖。

## 导出示例

点击下方的“下载 PNG”按钮。代码将捕获当前视口内的 DOM 结构并触发浏览器下载。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="ss-container">
    <div class="ss-toolbar">
      <button class="ss-btn" @click="downloadImage" :disabled="isDownloading">
        {{ isDownloading ? '正在截图中...' : '下载高清 PNG ->' }}
      <\/button>
    <\/div>
    
    <div class="ss-flowbox" ref="wrapperRef">
      <!-- 1. 将 flow 组件包装在具有 ref 的容器中 -->
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow'
import { toPng } from 'html-to-image'

const flowRef = ref<FlowInstance>()
const wrapperRef = ref<HTMLElement>()
const isDownloading = ref(false)
const viewport = ref<ViewportTransform>({ x: 100, y: 100, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 2' }, style: { backgroundColor: '#f0f9ff', borderColor: '#3b82f6' } },
  { id: '3', type: 'output', position: { x: 350, y: 350 }, data: { label: '节点 3' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'bezier', style: { stroke: '#10b981' }, markerEnd: 'url(#yh-arrow-default)' }
])

const downloadImage = async () => {
  if (!wrapperRef.value) return
  isDownloading.value = true
  
  try {
    // 2. 选择内部的 .yh-flow 容器以进行最纯净的捕获
    const flowElement = wrapperRef.value.querySelector('.yh-flow') as HTMLElement
    if (!flowElement) return
    
    // 3. 注入背景颜色以防止暗黑模式查看器中的透明度问题
    const dataUrl = await toPng(flowElement, {
      backgroundColor: '#ffffff',
      quality: 1,
      pixelRatio: 2 // 以 2 倍分辨率导出以获得高清效果
    })
    
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = \`flow-export-\${Date.now()}.png\`
    link.click()
  } catch (error) {
    console.error('截图失败:', error)
  } finally {
    isDownloading.value = false
  }
}
<\/script>

<style scoped>
.ss-container { display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.ss-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; }
.ss-btn { padding: 8px 16px; background: #3b82f6; color: white; border-radius: 4px; border: none; font-weight: bold; cursor: pointer; }
.ss-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
.ss-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const wrapperRef = ref<HTMLElement>()
const isDownloading = ref(false)
const viewport = ref<ViewportTransform>({ x: 100, y: 100, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 2' }, style: { backgroundColor: '#f0f9ff', borderColor: '#3b82f6' } },
  { id: '3', type: 'output', position: { x: 350, y: 350 }, data: { label: '节点 3' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'bezier', style: { stroke: '#10b981' }, markerEnd: 'url(#yh-arrow-default)' }
])

const downloadImage = async () => {
  if (!wrapperRef.value) return
  isDownloading.value = true
  try {
    const { toPng } = await import('html-to-image')
    const flowElement = wrapperRef.value.querySelector('.yh-flow') as HTMLElement
    if (!flowElement) return
    const dataUrl = await toPng(flowElement, { backgroundColor: '#ffffff', pixelRatio: 2 })
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'flow-export-' + Date.now() + '.png'
    link.click()
  } catch (err) {
    console.error(err)
  } finally {
    isDownloading.value = false
  }
}
</script>

<DemoBlock title="高保真导出" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; z-index: 2;">
      <button @click="downloadImage" :disabled="isDownloading" style="padding: 8px 16px; background: #3b82f6; color: white; border-radius: 4px; border: none; font-weight: bold; cursor: pointer;">
        {{ isDownloading ? '正在截图中...' : '下载 PNG ->' }}
      </button>
    </div>
    <div style="flex: 1; height: 100%;" ref="wrapperRef">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## 实现最佳实践

为确保截图清晰且没有样式破损或文本溢出，请遵循以下准则：

1.  **强制背景颜色**：大多数图片查看器在显示透明 PNG 时默认使用黑色背景。如果您不希望黑色文本变得不可见，请明确将 `backgroundColor: '#ffffff'` 传递给 `toPng()` 选项。
2.  **定位特定容器**：捕获内部的 `.yh-flow` 元素，而不是整个应用容器。这可以防止周围的工具栏或侧边栏污染生成的图像。
3.  **高分辨率渲染**：使用 `pixelRatio: 2` 生成“Retina”质量的图像，这些图像在放大或打印时仍能保持清晰。
4.  **截图前自动居中**：对于大型图表，最好在执行捕获之前通过编程方式调用 `fitView()`，以确保没有任何元素在当前视口之外被剪裁。
