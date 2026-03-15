# Screenshot

Often, after designing an elaborate workflow, you may need to export the canvas as a high-fidelity image for documentation, reporting, or peer review. By leveraging external libraries like [html-to-image](https://github.com/bubkoo/html-to-image), you can capture the current state of the `Flow` viewport as a professional-grade PNG without any UI artifacts.

> [!NOTE]
>
> This feature requires an external dependency such as `html-to-image` or `html2canvas`. To maintain a lightweight footprint, `yh-flow` does not bundle these weight-heavy libraries by default.

## Export Demo

Click the "Download PNG" button below. The code will capture the current viewport's DOM structure and trigger a browser download.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="ss-container">
    <div class="ss-toolbar">
      <button class="ss-btn" @click="downloadImage" :disabled="isDownloading">
        {{ isDownloading ? 'Capturing...' : 'Download High-Res PNG ➔' }}
      </button>
    </div>
    
    <div class="ss-flowbox" ref="wrapperRef">
      <!-- Wrap the flow component in a ref-tagged container -->
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    </div>
  </div>
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
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 2' }, style: { backgroundColor: '#f0f9ff', borderColor: '#3b82f6' } },
  { id: '3', type: 'output', position: { x: 350, y: 350 }, data: { label: 'Node 3' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'bezier', style: { stroke: '#10b981' }, markerEnd: 'url(#yh-arrow-default)' }
])

const downloadImage = async () => {
  if (!wrapperRef.value) return
  isDownloading.value = true
  
  try {
    // Select the internal flow container for the cleanest capture
    const flowElement = wrapperRef.value.querySelector('.yh-flow') as HTMLElement
    if (!flowElement) return
    
    // Inject a background color to prevent transparency issues in dark mode viewers
    const dataUrl = await toPng(flowElement, {
      backgroundColor: '#ffffff',
      quality: 1,
      pixelRatio: 2 // Export at 2x resolution for retina-clear results
    })
    
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = \flow-export-\{Date.now()}.png\
    link.click()
  } catch (error) {
    console.error('Capture failed:', error)
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
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Node 2' }, style: { backgroundColor: '#f0f9ff', borderColor: '#3b82f6' } },
  { id: '3', type: 'output', position: { x: 350, y: 350 }, data: { label: 'Node 3' } }
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
    link.download = `flow-export-${Date.now()}.png`
    link.click()
  } catch (err) {
    console.error(err)
  } finally {
    isDownloading.value = false
  }
}
</script>

<DemoBlock title="High-Fidelity Export" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; z-index: 2;">
      <button @click="downloadImage" :disabled="isDownloading" style="padding: 8px 16px; background: #3b82f6; color: white; border-radius: 4px; border: none; font-weight: bold; cursor: pointer;">
        {{ isDownloading ? 'Capturing...' : 'Download PNG ➔' }}
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

## Implementation Best Practices

To ensure a clean capture without broken styles or text overflows, follow these guidelines:

1.  **Forced Background**: Most image viewers default to a dark background when displaying transparent PNGs. If you don't want your black text to be invisible, explicitly pass `backgroundColor: '#ffffff'` to the `toPng()` options.
2.  **Target the Specific Container**: Capture the internal `.yh-flow` element instead of the entire app container. This prevents surrounding toolbars or layout sidebars from cluttering the resulting image.
3.  **High-Density Rendering**: Use `pixelRatio: 2` to generate "Retina" quality images that remain sharp when zoomed in or printed.
4.  **Auto-Center Before Capture**: For large graphs, it's a good practice to programmatically call `fitView()` before performing the capture to ensure no elements are clipped outside the current viewport.
