# BPMN XML 导入导出

`yh-flow` 通过 BPMN 2.0 XML 接口与其他流程建模工具打通，能够将当前画布内容导出为标准的 BPMN 文档，也能将外部 BPMN 导入到 Flow，用于调试、迁移或演示。

## 何时使用

- 将 Flow 编辑器中的流程直接交付给 BPMN 引擎或团队的设计工具
- 将团队在其他工具里产出的 BPMN 文件带回 Flow 以便可视化预览与验证
- 在导出前先验证 XML 合法性，保证对接的稳定性

## 核心 API

| 函数                                   | 说明                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `flowToBpmnXml(nodes, edges, options)` | 将节点/连线转换为 BPMN 2.0 XML 字符串和流程 ID，`includeDi` 控制是否输出图形信息 |
| `bpmnXmlToFlow(xml, options)`          | 解析 BPMN XML 并恢复节点、连线，若缺少 DI 会自动施加简单布局                     |
| `validateBpmnXml(xml)`                 | 验证 XML 是否包含 `definitions` 与 `process`，防止导入抛出                       |
| `generateSampleBpmnXml()`              | 返回内置示例流程，便于快速 Demo 或测试                                           |

## 示例

下面示例展示如何导出 BPMN、导入默认 XML，并实时查看解析结果。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
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
const validationMessage = ref('准备就绪，点击导出按钮可生成 BPMN XML')

const exportBpmn = () => {
  const result = flowToBpmnXml(nodes.value, edges.value, { processName: 'Flow Docs Process' })
  bpmnXml.value = result.xml
  validationMessage.value = `已生成 BPMN：${result.processId}`
}

const importSample = () => {
  const xml = generateSampleBpmnXml()
  const parsed = bpmnXmlToFlow(xml)
  nodes.value = parsed.nodes
  edges.value = parsed.edges
  bpmnXml.value = xml
  validationMessage.value = '已加载示例 BPMN'
}

const validateXml = () => {
  const target = bpmnXml.value || generateSampleBpmnXml()
  const result = validateBpmnXml(target)
  validationMessage.value = result.valid ? 'BPMN XML 校验通过 🎉' : `校验失败：${result.error ?? '未知错误'}`
}

const tsCode = `<${_T}>
  <div class="bpmn-demo">
    <div class="toolbar">
      <button @click="exportBpmn">导出 BPMN XML</button>
      <button @click="importSample">加载示例 BPMN</button>
      <button @click="validateXml">校验 XML</button>
    </div>
    <textarea
      readonly
      class="xml-box"
      :value="bpmnXml"
      placeholder="BPMN XML 会在此展示"
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
const validationMessage = ref('Ready to export BPMN XML');

const exportBpmn = () => {
  const result = flowToBpmnXml(nodes.value, edges.value, { processName: 'Flow Docs Process' });
  bpmnXml.value = result.xml;
  validationMessage.value = \`已生成 BPMN：\${result.processId}\`;
};

const importSample = () => {
  const xml = generateSampleBpmnXml();
  const parsed = bpmnXmlToFlow(xml);
  nodes.value = parsed.nodes;
  edges.value = parsed.edges;
  bpmnXml.value = xml;
  validationMessage.value = '已加载示例 BPMN';
};

const validateXml = () => {
  const target = bpmnXml.value || generateSampleBpmnXml();
  const result = validateBpmnXml(target);
  validationMessage.value = result.valid ? 'BPMN XML 校验通过 🎉' : \`校验失败：\${result.error ?? '未知错误'}\`;
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

<DemoBlock title="BPMN XML 导入导出示例" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:10px;height:520px;">
    <div style="display:flex;gap:8px;">
      <button
        style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="exportBpmn"
      >
        导出 BPMN XML
      </button>
      <button
        style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="importSample"
      >
        加载示例 BPMN
      </button>
      <button
        style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="validateXml"
      >
        校验 XML
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

## 最佳实践

1. **保持流程定义同步**：导出 BPMN 以前先调用 `flowToBpmnXml` 获取最新结构，再写入版本控制。
2. **批量校验**：在导入前用 `validateBpmnXml` 检查 XML，避免因格式异常导致解析失败。
3. **分离图形信息**：`flowToBpmnXml` 的 `includeDi` 参数允许你决定是否输出布局信息，便于自定义还原。
4. **结合示例模板**：`generateSampleBpmnXml` 可用于 smoke test 或教学演示，快速让团队理解 Flow ↔ BPMN 的链路。
