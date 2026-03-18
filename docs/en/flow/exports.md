# Export

`yh-flow` provides comprehensive export functionality, supporting the export of flowcharts to JSON, PNG, SVG and other formats.

## Exporting JSON

### Basic Usage

```typescript
const flowRef = ref<FlowInstance>()

// Export as JSON string
const json = flowRef.value.exportJson()
console.log(json)
```

### Custom Export Data

Use `exportFlowData` to export complete data including viewport information:

```typescript
import { exportFlowData } from '@yh-ui/flow'

const data = exportFlowData(nodes.value, edges.value, { x: 0, y: 0, zoom: 1 })
console.log(data) // JSON string
```

## Exporting Images

### Export as PNG

```typescript
const flowRef = ref<FlowInstance>()

// Export as PNG
await flowRef.value.exportImage?.({
  imageType: 'png',
  fileName: 'flow-chart',
  download: true
})
```

### Export as JPEG

```typescript
await flowRef.value.exportImage?.({
  imageType: 'jpeg',
  imageQuality: 0.9,
  fileName: 'flow-chart',
  download: true
})
```

### Export as SVG

SVG export allows exporting the flowchart as vector graphics:

```typescript
// Get SVG string
const svgString = await captureFlowAsSvg(flowRef.value.$el)

// Or use plugin method
await flowRef.value.exportImage?.({
  // Future version support
})
```

## Export Options

### ScreenshotOptions

| Option            | Type                        | Default        | Description         |
| ----------------- | --------------------------- | -------------- | ------------------- |
| `mode`            | `'viewport' \| 'full'`      | `'viewport'`   | Export scope        |
| `imageType`       | `'png' \| 'jpeg' \| 'webp'` | `'png'`        | Image format        |
| `imageQuality`    | `number`                    | `1`            | Image quality (0-1) |
| `pixelRatio`      | `number`                    | `2`            | Device pixel ratio  |
| `backgroundColor` | `string`                    | `'#ffffff'`    | Background color    |
| `fileName`        | `string`                    | `'flow-chart'` | File name           |
| `download`        | `boolean`                   | `true`         | Trigger download    |
| `copyToClipboard` | `boolean`                   | `false`        | Copy to clipboard   |
| `fullModePadding` | `number`                    | `20`           | Full mode padding   |

### Export Modes

| Mode       | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `viewport` | Only export current visible area                           |
| `full`     | Export complete flowchart (adjusts viewport automatically) |

## Complete Example

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'

const flowRef = ref<FlowInstance>();

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Start' } },
  { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Process' } },
  { id: '3', type: 'output', position: { x: 500, y: 100 }, data: { label: 'End' } }
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
    copyToClipboard: true,
    download: false
  });
};

const tsCode = `<${_T}>
  <div class="export-demo">
    <div class="toolbar">
      <button @click="exportAsPng">Export PNG</button>
      <button @click="exportAsJpeg">Export JPEG</button>
      <button @click="exportAsJson">Export JSON</button>
      <button @click="copyToClipboard">Copy to Clipboard</button>
    </div>
    
    <yh-flow
      ref="flowRef"
      :nodes="nodes"
      :edges="edges"
      background="dots"
      enable-export
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, FlowInstance } from '@yh-ui/flow';

const flowRef = ref<FlowInstance>();

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'Start' } },
  { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Process' } },
  { id: '3', type: 'output', position: { x: 500, y: 100 }, data: { label: 'End' } }
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

<DemoBlock title="Export Toolbar Demo" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:12px;height:520px;">
    <div style="display:flex;gap:10px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportAsPng"
      >
        Export PNG
      </button>
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportAsJpeg"
      >
        Export JPEG
      </button>
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportAsJson"
      >
        Export JSON
      </button>
      <button
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="copyToClipboard"
      >
        Copy to Clipboard
      </button>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;flex:1;overflow:hidden;">
      <yh-flow
        ref="flowRef"
        :nodes="nodes"
        :edges="edges"
        background="dots"
        enable-export
        style="width:100%;height:100%;"
      ></yh-flow>
    </div>
  </div>
</DemoBlock>

## Importing Data

## Importing Data

### Import from JSON

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

## Best Practices

1. **Maintain data persistence**: Regularly export JSON as backup for data recovery
2. **Quality settings**: Choose appropriate image quality and format based on use case
3. **User feedback**: Export operations may take time, consider adding loading state
4. **Clipboard functionality**: Use `copyToClipboard` in supported environments for better UX

> [!TIP]
>
> Using `mode: 'full'` exports the complete flowchart even if the current viewport only shows partial content.
