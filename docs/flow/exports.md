# 导出功能 (Export)

`yh-flow` 提供了完整的导出功能，支持将流程图导出为 JSON、PNG、SVG 等多种格式。

## 导出 JSON

### 基本用法

```typescript
const flowRef = ref<FlowInstance>()

// 导出为 JSON 字符串
const json = flowRef.value.exportJson()
console.log(json)
```

### 自定义导出数据

使用 `exportFlowData` 方法可以导出包含视口信息的完整数据：

```typescript
import { exportFlowData } from '@yh-ui/flow'

const data = exportFlowData(nodes.value, edges.value, { x: 0, y: 0, zoom: 1 })
console.log(data) // JSON 字符串
```

## 导出图片

### 导出 PNG

```typescript
const flowRef = ref<FlowInstance>()

// 导出为 PNG
await flowRef.value.exportImage?.({
  imageType: 'png',
  fileName: 'flow-chart',
  download: true
})
```

### 导出 JPEG

```typescript
await flowRef.value.exportImage?.({
  imageType: 'jpeg',
  imageQuality: 0.9,
  fileName: 'flow-chart',
  download: true
})
```

### 导出 SVG

SVG 导出功能可以将流程图导出为矢量图形：

```typescript
// 获取 SVG 字符串
const svgString = await captureFlowAsSvg(flowRef.value.$el)

// 或者使用插件方式
await flowRef.value.exportImage?.({
  // 未来版本支持
})
```

## 导出选项

### ScreenshotOptions

| 选项              | 类型                        | 默认值         | 说明             |
| ----------------- | --------------------------- | -------------- | ---------------- |
| `mode`            | `'viewport' \| 'full'`      | `'viewport'`   | 导出范围         |
| `imageType`       | `'png' \| 'jpeg' \| 'webp'` | `'png'`        | 图片格式         |
| `imageQuality`    | `number`                    | `1`            | 图片质量（0-1）  |
| `pixelRatio`      | `number`                    | `2`            | 设备像素比       |
| `backgroundColor` | `string`                    | `'#ffffff'`    | 背景颜色         |
| `fileName`        | `string`                    | `'flow-chart'` | 文件名           |
| `download`        | `boolean`                   | `true`         | 是否触发下载     |
| `copyToClipboard` | `boolean`                   | `false`        | 是否复制到剪贴板 |
| `fullModePadding` | `number`                    | `20`           | 全图模式内边距   |

### 导出模式

| 模式       | 说明                                 |
| ---------- | ------------------------------------ |
| `viewport` | 仅导出当前可视区域                   |
| `full`     | 导出完整流程图（自动调整视口后导出） |

## 完整示例

### 工具栏导出按钮

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'

const flowRef = ref<FlowInstance>();

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '开始' } },
  { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: '处理' } },
  { id: '3', type: 'output', position: { x: 500, y: 100 }, data: { label: '结束' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
]);

const exportAsPng = async () => {
  await flowRef.value?.exportImage?.({
    imageType: 'png',
    fileName: 'flow-chart',
    download: true
  });
};

const exportAsJpeg = async () => {
  await flowRef.value?.exportImage?.({
    imageType: 'jpeg',
    imageQuality: 0.9,
    fileName: 'flow-chart',
    download: true
  });
};

const exportAsJson = () => {
  const json = flowRef.value?.exportJson();
  if (json) {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-chart.json';
    a.click();
    URL.revokeObjectURL(url);
  }
};

const copyToClipboard = async () => {
  await flowRef.value?.exportImage?.({
    copyToClipboard: true
  });
};

const tsCode = `<${_T}>
  <div class="export-demo">
    <div class="toolbar">
      <button @click="exportAsPng">导出 PNG</button>
      <button @click="exportAsJpeg">导出 JPEG</button>
      <button @click="exportAsJson">导出 JSON</button>
      <button @click="copyToClipboard">复制到剪贴板</button>
    </div>
    
    <yh-flow
      ref="flowRef"
      :nodes="nodes"
      :edges="edges"
      background="dots"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, FlowInstance } from '@yh-ui/flow';

const flowRef = ref<FlowInstance>();

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: '开始' } },
  { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: '处理' } },
  { id: '3', type: 'output', position: { x: 500, y: 100 }, data: { label: '结束' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
]);

const exportAsPng = async () => {
  const result = await flowRef.value?.exportImage?.({
    imageType: 'png',
    fileName: 'flow-chart',
    download: true
  });
  console.log('Exported:', result);
};

const exportAsJpeg = async () => {
  await flowRef.value?.exportImage?.({
    imageType: 'jpeg',
    imageQuality: 0.9,
    fileName: 'flow-chart',
    download: true
  });
};

const exportAsJson = () => {
  const json = flowRef.value?.exportJson();
  if (json) {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-chart.json';
    a.click();
    URL.revokeObjectURL(url);
  }
};

const copyToClipboard = async () => {
  await flowRef.value?.exportImage?.({
    copyToClipboard: true
  });
};
</${_S}>

<style scoped>
.export-demo {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 8px;
}

.toolbar button {
  padding: 6px 14px;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.toolbar button:hover {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
</${_St}>`;
const jsCode = toJs(tsCode);
</script>

<DemoBlock title="工具栏导出演示" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:12px;height:520px;">
    <div style="display:flex;gap:10px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportAsPng"
      >
        导出 PNG
      </button>
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportAsJpeg"
      >
        导出 JPEG
      </button>
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportAsJson"
      >
        导出 JSON
      </button>
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="copyToClipboard"
      >
        复制到剪贴板
      </button>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;flex:1;overflow:hidden;">
      <yh-flow
        ref="flowRef"
        :nodes="nodes"
        :edges="edges"
        background="dots"
        style="width:100%;height:100%;"
      ></yh-flow>
    </div>
  </div>
</DemoBlock>

## 导入数据

### 从 JSON 导入

```typescript
import { importFlowData } from '@yh-ui/flow'

const loadFromJson = (json: string) => {
  const data = importFlowData(json)
  if (data) {
    nodes.value = data.nodes
    edges.value = data.edges as unknown as Edge[]
    if (data.viewport) {
      viewport.value = data.viewport
    }
  }
}
```

## 最佳实践

1. **保持数据持久化**：定期导出 JSON 作为备份，支持数据恢复
2. **质量设置**：根据用途选择合适的图片质量和格式
3. **用户反馈**：导出操作可能需要一些时间，建议添加 loading 状态
4. **剪贴板功能**：在支持的环境中使用 `copyToClipboard` 提供更好的用户体验

> [!TIP]
>
> 使用 `mode: 'full'` 可以导出完整的流程图，即使当前视口只显示了部分内容。
