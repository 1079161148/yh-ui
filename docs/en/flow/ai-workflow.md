# AI Workflow Nodes

The YH-UI Flow component library provides out-of-the-box custom node components designed specifically for **AIGC / LLM agent orchestration**. This allows developers to bypass tedious low-level custom node implementation and build workflow panels similar to **Coze** or **Dify** rapidly.

## Features

The AI workflow nodes are visually enhanced for specfic semantic contexts and come pre-configured with fields like `prompt`, `model`, and `status`. Provide these attributes inside each node's `data`.
Here are the supported `type` strings and common `data` parameters:

- **Start Node (`ai-start`)**: Entry point of the workflow.
- **Prompt Node (`ai-prompt`)**: Displays `data.prompt` as a preview string, for system prompts or template configuration.
- **LLM Node (`ai-llm`)**: Displays `data.model` (like GPT-4) and `data.status` ('pending', 'running', 'success') to exhibit progress properly.
- **Condition Node (`ai-condition`)**: Contains a `data.condition` displaying the rule. Has top/bottom extra handles natively for multiple outcome paths.
- **Tool Node (`ai-tool`)**: Third-party tool invocations (plugins).
- **Agent Node (`ai-agent`)**: A distinct AI Agent processing loop.
- **Memory Node (`ai-memory`)**: Hook context or memories.
- **End Node (`ai-end`)**: End of the workflow pipe.

## Demo: Basic Chatbot Pipeline

This demo exhibits a standard process: Start -> Prompt Config -> LLM -> End.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const _Ts = _T
const _Ss = _S

const tsBasic = `<template>
  <div style="width: 100%; height: 600px;">
    <yh-flow
      v-model="viewport"
      :nodes="nodes"
      :edges="edges"
      show-controls
      show-minimap
      background="dots"
      :grid-size="20"
      @node-click="handleNodeClick"
    />
  </div>
<\/template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { registerAiWorkflowNodes, AI_WORKFLOW_NODE_TYPES } from '@yh-ui/flow'
// Add typical imports
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

// Make sure to register the specific node UI components before rendering
onMounted(() => {
  registerAiWorkflowNodes()
})

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: 's1',
    type: AI_WORKFLOW_NODE_TYPES.Start, // 'ai-start'
    position: { x: 50, y: 250 },
    data: { label: 'Chat Start' }
  },
  {
    id: 'p1',
    type: AI_WORKFLOW_NODE_TYPES.Prompt, // 'ai-prompt'
    position: { x: 250, y: 236 },
    data: { 
      label: 'Dataset Assembling',
      prompt: 'You are a rigid coding assistant. Refer to {{context}}.'
    }
  },
  {
    id: 'c1',
    type: AI_WORKFLOW_NODE_TYPES.Condition, // 'ai-condition'
    position: { x: 550, y: 236 },
    data: { 
      label: 'Intent Classification',
      condition: 'Is resolving error?'
    }
  },
  {
    id: 'l1',
    type: AI_WORKFLOW_NODE_TYPES.LLM, // 'ai-llm'
    position: { x: 800, y: 150 },
    data: { 
      label: 'Debugger Agent',
      model: 'GPT-4o',
      status: 'pending' // pending | running | success
    }
  },
  {
    id: 'l2',
    type: AI_WORKFLOW_NODE_TYPES.LLM, // 'ai-llm'
    position: { x: 800, y: 350 },
    data: { 
      label: 'Q&A Chatbot',
      model: 'Claude-3.5-Sonnet',
      status: 'success'
    }
  },
  {
    id: 'e1',
    type: AI_WORKFLOW_NODE_TYPES.End, // 'ai-end'
    position: { x: 1100, y: 250 },
    data: { label: 'Return message' }
  }
])

const edges = ref<Edge[]>([
  { id: 'e-s-p', source: 's1', target: 'p1', type: 'bezier', animated: true },
  { id: 'e-p-c', source: 'p1', target: 'c1', type: 'bezier', animated: true },
  { id: 'e-c-l1', source: 'c1', target: 'l1', type: 'bezier', label: 'yes' },
  { id: 'e-c-l2', source: 'c1', target: 'l2', type: 'bezier', label: 'no' },
  { id: 'e-l1-e', source: 'l1', target: 'e1', type: 'bezier', animated: true, style: { stroke: '#10b981' } },
  { id: 'e-l2-e', source: 'l2', target: 'e1', type: 'bezier' }
])

const handleNodeClick = (event: { node: Node; nativeEvent: MouseEvent }) => {
  // A simple hack to toggle LLM statuses upon user clicks
  const node = event.node
  if (node.type === AI_WORKFLOW_NODE_TYPES.LLM) {
    if (node.data?.status === 'pending') {
      node.data.status = 'running'
    } else if (node.data?.status === 'running') {
      node.data.status = 'success'
    } else {
      node.data.status = 'pending'
    }
  }
}
<\/script>`

const jsBasic = toJs(tsBasic)

</script>

<DemoBlock title="Interactive Diagram" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 600px;">
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 0.8 }"
      :nodes="[
        {
          id: 's1',
          type: 'ai-start',
          position: { x: 50, y: 250 },
          data: { label: 'Chat Start' }
        },
        {
          id: 'p1',
          type: 'ai-prompt',
          position: { x: 250, y: 236 },
          data: { 
            label: 'Dataset Assembling',
            prompt: 'You are a rigid coding assistant. Refer to {{context}}.'
          }
        },
        {
          id: 'c1',
          type: 'ai-condition',
          position: { x: 550, y: 236 },
          data: { 
            label: 'Intent Classification',
            condition: 'Is resolving error?'
          }
        },
        {
          id: 'l1',
          type: 'ai-llm',
          position: { x: 800, y: 150 },
          data: { 
            label: 'Debugger Agent',
            model: 'GPT-4o',
            status: 'running'
          }
        },
        {
          id: 'l2',
          type: 'ai-llm',
          position: { x: 800, y: 350 },
          data: { 
            label: 'Q&A Chatbot',
            model: 'Claude-3.5-Sonnet',
            status: 'success'
          }
        },
        {
          id: 'e1',
          type: 'ai-end',
          position: { x: 1100, y: 250 },
          data: { label: 'Return message' }
        }
      ]"
      :edges="[
        { id: 'e-s-p', source: 's1', target: 'p1', type: 'bezier', animated: true },
        { id: 'e-p-c', source: 'p1', target: 'c1', type: 'bezier', animated: true },
        { id: 'e-c-l1', source: 'c1', target: 'l1', type: 'bezier', label: 'yes' },
        { id: 'e-c-l2', source: 'c1', target: 'l2', type: 'bezier', label: 'no' },
        { id: 'e-l1-e', source: 'l1', target: 'e1', type: 'bezier', animated: true, style: { stroke: '#f59e0b' } },
        { id: 'e-l2-e', source: 'l2', target: 'e1', type: 'bezier' }
      ]"
      show-controls
      show-minimap
      background="dots"
      :grid-size="20"
    />
  </div>
</DemoBlock>

## API Reference

AI native nodes consume the same `Node` interface as default nodes do but have customized UIs. To activate them, do run `registerAiWorkflowNodes()` first or register those nodes using standard `registerCustomNode()` API.

| Node Type      | Extra payload (inject from \`data\`)                             | Description                                                                                  |
| -------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `ai-start`     | -                                                                | Start Node, rounded component with start icon.                                               |
| `ai-prompt`    | `prompt` (string)                                                | System prompt preview. Overflown long texts will visually vanish via ellipses natively.      |
| `ai-llm`       | `model` (string) <br> `status` ('pending'\|'running'\|'success') | The Core. Highlight the execution sequence dynamically via the `status` text-coloring rules. |
| `ai-condition` | `condition` (string)                                             | Split condition branches.                                                                    |
| `ai-tool`      | `tool` (string, optional)                                        | Hook for API integrations.                                                                   |
| `ai-end`       | -                                                                | Finalize output Node, colored differently.                                                   |

## Advanced Features & Best Practices

### 1. Super Template Engine

Leveraging YH-UI Flow's fully data-driven ecosystem, you can architect a **one-click Template Generation Engine**.
Instead of forcing users to rigidly drag and arrange primitives on a canvas, we guide developers to **bypass traditional orchestration paradigms**. Through an easy-to-use **JSON DSL config**, you can dynamically \`render\` an interconnected lattice of logic.
Imagine instantly assembling an inclusive "Standard Customer Service Agent": immediately conjuring a Memory Node (`AiMemoryNode`), branching off with an Agent Orchestration node (`AiAgentNode`), or spawning a RAG retrieval subtree from a raw JSON payload – transforming the graph to a one-click logic grid.

### 2. "Zero-Config" Integration with Vercel AI SDK / LangChain

To **re-mold the developer mindset**, remember this: YH-UI Flow is absolutely not just another "drawing interface," but a competent **Logical Stream Control Engine**.
Since the architecture relies on native Vue components, developers can effortlessly tether external states gracefully (like \`useAiStream\` or MCP callbacks) directly to the \`AiLlmNode\`.
We instruct users to embrace bidirectional data bindings: as you ping LLM networks and funnel down streamed sequences or token accumulation metrics, those variables map directly to your Node props. This gracefully mutates status fields (`pending -> running -> success`), causing nodes to emit a native **"glowing" feedback**, and sequentially drives the next active edge illumination. This dimension of native UI/data synchronization is unparalleled and near-impossible for rendering-only libraries like AntV!

### 3. Native Vue 3 Ultimate Performance Showcase

Built around a **pure-blooded Vue 3 component architecture**, we outscale the heavy vanilla-JS wrapper boundaries typically endured when adopting AntV X6.
When structuring massive AIGC forms and configuration sheets, we empower developers to boldly implement Vue's \`Teleport\` mechanism. Confidently map internal canvas slots outward onto robust right-side drawer panels! No archaic \`node.setData\` needed—all UI interactions stay seamlessly unified with \`ref\` reactive data bridging.
Bolstered by inner virtual scrolling thresholds and targeted \`shallowRef\` pipelines, our engine proudly pledges rock-solid capabilities. We're endorsing flawlessly synchronized renders spanning **up to 2,000 parallel pulsing/animating stream nodes**, providing flawless viewport pannings without inflicting massive synchronization fatigue onto the developers.
