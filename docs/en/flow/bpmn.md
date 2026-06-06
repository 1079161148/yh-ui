# BPMN XML Import & Export

`yh-flow` exposes a BPMN 2.0 XML bridge so you can export Flow canvas content for BPMN engines or import existing BPMN diagrams back into Flow for preview and validation.

## When to Use

- When you need to deliver Flow diagrams to BPMN tooling such as Camunda, Flowable, or bpmn.io
- When you want to inspect or visualize BPMN XML created elsewhere inside Flow
- When you want to verify and sanitize XML before handing it to another system

## Core APIs

| API                                    | Description                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `flowToBpmnXml(nodes, edges, options)` | Converts nodes and edges into BPMN 2.0 XML; `includeDi` controls whether graphical coordinates are emitted |
| `bpmnXmlToFlow(xml, options)`          | Parses BPMN XML and returns Flow-friendly nodes/edges with optional fallback layout                        |
| `validateBpmnXml(xml)`                 | Ensures the XML contains the required `<definitions>` and `<process>` sections                             |
| `generateSampleBpmnXml()`              | Returns a built-in sample process that can be imported or featured in demos                                |

## Example

The demo below exports BPMN XML from the canvas, loads the built-in sample XML, and validates the serialized result.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
import {
  flowToBpmnXml,
  bpmnXmlToFlow,
  validateBpmnXml,
  generateSampleBpmnXml
} from '@yh-ui/flow'

const sampleXml = generateSampleBpmnXml()
const parsedSample = bpmnXmlToFlow(sampleXml)

const flowRef = ref<FlowInstance>()
const nodes = ref<Node[]>(parsedSample.nodes)
const edges = ref<Edge[]>(parsedSample.edges)
const bpmnXml = ref(sampleXml)
const validationMessage = ref('Ready for export. Press a button to see the XML')

const exportBpmn = () => {
  const result = flowToBpmnXml(nodes.value, edges.value, { processName: 'Flow Docs Process' })
  bpmnXml.value = result.xml
  validationMessage.value = `Generated BPMN: ${result.processId}`
}

const importSample = () => {
  const xml = generateSampleBpmnXml()
  const parsed = bpmnXmlToFlow(xml)
  nodes.value = parsed.nodes
  edges.value = parsed.edges
  bpmnXml.value = xml
  validationMessage.value = 'Loaded the sample BPMN'
}

const validateXml = () => {
  const target = bpmnXml.value || generateSampleBpmnXml()
  const result = validateBpmnXml(target)
  validationMessage.value = result.valid ? 'BPMN XML is valid 🎉' : `Validation failed: ${result.error ?? 'Unknown error'}`
}

const tsCode = `<${_T}>
  <div class="bpmn-demo">
    <div class="toolbar">
      <button @click="exportBpmn">Export BPMN XML</button>
      <button @click="importSample">Load Sample</button>
      <button @click="validateXml">Validate XML</button>
    </div>
    <textarea
      readonly
      class="xml-box"
      :value="bpmnXml"
      placeholder="BPMN XML will appear here"
    />
    <div class="flow-wrapper">
      <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
    </div>
    <div class="status">{{ validationMessage }}</div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, FlowInstance } from '@yh-ui/flow';
import {
  flowToBpmnXml,
  bpmnXmlToFlow,
  validateBpmnXml,
  generateSampleBpmnXml
} from '@yh-ui/flow';

const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);
const flowRef = ref<FlowInstance>();
const bpmnXml = ref('');
const validationMessage = ref('Ready for export. Press a button to see the XML');

const exportBpmn = () => {
  const result = flowToBpmnXml(nodes.value, edges.value, { processName: 'Flow Docs Process' });
  bpmnXml.value = result.xml;
  validationMessage.value = \`Generated BPMN: \${result.processId}\`;
};

const importSample = () => {
  const xml = generateSampleBpmnXml();
  const parsed = bpmnXmlToFlow(xml);
  nodes.value = parsed.nodes;
  edges.value = parsed.edges;
  bpmnXml.value = xml;
  validationMessage.value = 'Loaded the sample BPMN';
};

const validateXml = () => {
  const target = bpmnXml.value || generateSampleBpmnXml();
  const result = validateBpmnXml(target);
  validationMessage.value = result.valid ? 'BPMN XML is valid 🎉' : \`Validation failed: \${result.error ?? 'Unknown error'}\`;
};
</${_S}>

<${_St}>
.bpmn-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 520px;
}
.toolbar {
  display: flex;
  gap: 8px;
}
.toolbar button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: #fff;
  cursor: pointer;
}
.xml-box {
  flex: 0 0 140px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px;
  font-family: 'JetBrains Mono', 'SFMono-Regular', monospace;
  background: #f8fafc;
  resize: none;
}
.flow-wrapper {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.status {
  font-size: 13px;
  color: #606266;
}
</${_St}>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="BPMN XML Import Sample" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:10px;height:520px;">
    <div style="display:flex;gap:8px;">
      <button
        style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportBpmn"
      >
        Export BPMN XML
      </button>
      <button
        style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="importSample"
      >
        Load Sample
      </button>
      <button
        style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="validateXml"
      >
        Validate XML
      </button>
    </div>
    <textarea
      readonly
      style="flex:0 0 140px;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-family:'JetBrains Mono','SFMono-Regular',monospace;background:#f8fafc;"
      :value="bpmnXml"
    ></textarea>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;">
      </yh-flow>
    </div>
    <div style="font-size:13px;color:#606266;">{{ validationMessage }}</div>
  </div>
</DemoBlock>

## Best Practices

1. **Keep definitions in sync**: Always call `flowToBpmnXml` before exporting so the XML reflects the latest canvas state.
2. **Validate before import**: Run `validateBpmnXml` before feeding XML into another system to catch structural issues early.
3. **Control DI output**: Use the `includeDi` option to decide whether the export contains layout information.
4. **Leverage the sample**: `generateSampleBpmnXml` is great for smoke tests, onboarding demos, or generating mock data.
