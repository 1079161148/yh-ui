# AI 工作流节点 (AI Workflow)

YH-UI Flow 组件库开箱即用地提供了一整套专门为 **AIGC / LLM 智能体编排** 定制的节点组件。这使得开发者能够绕过繁琐的基础节点定制过程，极其快速地搭建出类似于 **Coze** 或 **Dify** 的核心流程编排面板。

## 节点特性解析

AI 工作流节点专门为特定语义进行了视觉强化和特定字段（如 `prompt`, `model`, `status`）预留。
支持的节点 `type` 及其常用 `data` 参数如下：

- **开始节点 (`ai-start`)**: 工作流入口。
- **提示词节点 (`ai-prompt`)**: 包含 `data.prompt` 的预览展示，用于 System Prompt 或模板包装。
- **大模型节点 (`ai-llm`)**: 包含 `data.model` (如 GPT-4) 和 `data.status` ('pending', 'running', 'success') 支持执行状态展示。
- **条件节点 (`ai-condition`)**: 包含 `data.condition`，自带多个连线点用于不同分支。
- **工具/插件节点 (`ai-tool`)**: 用于展现调用特定的三方工具或搜索引擎。
- **智能体节点 (`ai-agent`)**: 表示一个独立的 Agent 子循环。
- **记忆节点 (`ai-memory`)**: 对话上下文记忆接入节点。
- **结束节点 (`ai-end`)**: 工作流终点。

## 演示示例：基础对话流

这里演示了一个包含 开始 -> 提示词构建 -> LLM 生成 -> 结束 的基础工作流。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
// 如果不在全局导入，需引入依赖
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

// 初始化注册内部的 AI 专属节点，这会让底层的 CustomNode 匹配到专属组件
onMounted(() => {
  registerAiWorkflowNodes()
})

const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  {
    id: 's1',
    type: AI_WORKFLOW_NODE_TYPES.Start, // 'ai-start'
    position: { x: 50, y: 250 },
    data: { label: '对话入口' }
  },
  {
    id: 'p1',
    type: AI_WORKFLOW_NODE_TYPES.Prompt, // 'ai-prompt'
    position: { x: 250, y: 236 },
    data: { 
      label: '知识库组装',
      prompt: '你是一个严格的前端助手。请参考以下内容：{{context}}。如果不知晓，就回答“不知道”。'
    }
  },
  {
    id: 'c1',
    type: AI_WORKFLOW_NODE_TYPES.Condition, // 'ai-condition'
    position: { x: 550, y: 236 },
    data: { 
      label: '意图判断',
      condition: '是否涉及代码报错?'
    }
  },
  {
    id: 'l1',
    type: AI_WORKFLOW_NODE_TYPES.LLM, // 'ai-llm'
    position: { x: 800, y: 150 },
    data: { 
      label: '错误分析大模型',
      model: 'GPT-4o',
      status: 'pending' // pending | running | success
    }
  },
  {
    id: 'l2',
    type: AI_WORKFLOW_NODE_TYPES.LLM, // 'ai-llm'
    position: { x: 800, y: 350 },
    data: { 
      label: '通用问答大模型',
      model: 'Claude-3.5-Sonnet',
      status: 'success'
    }
  },
  {
    id: 'e1',
    type: AI_WORKFLOW_NODE_TYPES.End, // 'ai-end'
    position: { x: 1100, y: 250 },
    data: { label: '返回给用户' }
  }
])

const edges = ref<Edge[]>([
  { id: 'e-s-p', source: 's1', target: 'p1', type: 'bezier', animated: true },
  { id: 'e-p-c', source: 'p1', target: 'c1', type: 'bezier', animated: true },
  { id: 'e-c-l1', source: 'c1', target: 'l1', type: 'bezier', label: '是' },
  { id: 'e-c-l2', source: 'c1', target: 'l2', type: 'bezier', label: '否' },
  { id: 'e-l1-e', source: 'l1', target: 'e1', type: 'bezier', animated: true, style: { stroke: '#10b981' } },
  { id: 'e-l2-e', source: 'l2', target: 'e1', type: 'bezier' }
])

const handleNodeClick = (event: { node: Node; nativeEvent: MouseEvent }) => {
  // 点击如 LLM 节点，可在此展开右侧的超大参数配置抽屉
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

<DemoBlock title="基础大语言模型对话流编排" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 100%; height: 600px;">
    <!-- 由于 VitePress 文档编译无法像真正的 setup 那样保证运行时 registerAiWorkflowNodes， 这里需要使用一个通用的渲染块。但组件内部已暴露，故我们可以使用常规标签模拟或者通过外层包裹。 我们的样例通过动态执行会生效 -->
    <yh-flow
      :model-value="{ x: 0, y: 0, zoom: 0.8 }"
      :nodes="[
        {
          id: 's1',
          type: 'ai-start',
          position: { x: 50, y: 250 },
          data: { label: '对话入口' }
        },
        {
          id: 'p1',
          type: 'ai-prompt',
          position: { x: 250, y: 236 },
          data: { 
            label: '知识库组装',
            prompt: '你是一个严格的前端助手。请参考以下内容：{{context}}。如果不知晓，就回答“不知道”。'
          }
        },
        {
          id: 'c1',
          type: 'ai-condition',
          position: { x: 550, y: 236 },
          data: { 
            label: '意图判断',
            condition: '是否涉及代码报错?'
          }
        },
        {
          id: 'l1',
          type: 'ai-llm',
          position: { x: 800, y: 150 },
          data: { 
            label: '错误分析大模型',
            model: 'GPT-4o',
            status: 'running'
          }
        },
        {
          id: 'l2',
          type: 'ai-llm',
          position: { x: 800, y: 350 },
          data: { 
            label: '通用问答大模型',
            model: 'Claude-3.5-Sonnet',
            status: 'success'
          }
        },
        {
          id: 'e1',
          type: 'ai-end',
          position: { x: 1100, y: 250 },
          data: { label: '返回给用户' }
        }
      ]"
      :edges="[
        { id: 'e-s-p', source: 's1', target: 'p1', type: 'bezier', animated: true },
        { id: 'e-p-c', source: 'p1', target: 'c1', type: 'bezier', animated: true },
        { id: 'e-c-l1', source: 'c1', target: 'l1', type: 'bezier', label: '是' },
        { id: 'e-c-l2', source: 'c1', target: 'l2', type: 'bezier', label: '否' },
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

> 💡 **业务提示**: 上述代码只是视觉呈现与图层连接。真正的业务场景，需要在 Vue 组件外侧自行实现数据的获取、状态 `pending -> running -> success` 的事件驱动以及流式输出的数据通信。

## API 参考

AI 专属节点使用相同的泛用节点 `Node` 接口，但是其内置了独享的预制样式。在代码层面上，你需要确保通过 `registerAiWorkflowNodes()` 手动将其注入自定义节点池库。然后指定独有 `type`。

| 节点类型 Type  | 常规内置属性 (由data透传)                                        | 用途与作用                                                                     |
| -------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `ai-start`     | -                                                                | 用于展示绿色圆形带有启动 `Icon` 图标的流起始点。                               |
| `ai-prompt`    | `prompt` (字符串)                                                | 用于预设提示词展示。展示时为带有深色标题头。若 `prompt` 过长自动产生截断显示。 |
| `ai-llm`       | `model` (字符串) <br> `status` ('pending'\|'running'\|'success') | 最核心的大语言模型处理单元。包含模型名称、以及任务当前状态高亮展示。           |
| `ai-condition` | `condition` (字符串)                                             | 条件分析节点。红色的UI外框，且默认上下均带有手柄出口用于分支分发。             |
| `ai-tool`      | `tool` (字符串，非必传)                                          | 三方插件处理工具挂载。                                                         |
| `ai-end`       | -                                                                | 用于展示红色或灰黑色的结束/响应节点。                                          |

## 高阶特性与最佳实践

### 1. 超级模板引擎 (Super Template Engine)

基于 YH-UI Flow 完全数据驱动的本质，您可以构建一个**一键生成模板引擎**。
传统的画布往往要求用户在侧边栏手动拖拽节点组合。但利用 YH-UI Flow，我们教导开发者**跳过传统画布编排的心智模型**，直接在状态中通过一套预定义的 **JSON DSL 模版**动态 \`render\` 出一套复杂的图表结构。
例如，您可以预设一套『标准智能客服』的 JSON：它天生就包含**记忆节点 (AiMemoryNode)** 作为上下文起点，中间根据条件分支，分发到**智能体调度节点 (AiAgentNode)** 或是 RAG 知识检索分支。开发者只需解析这段 DSL 并映射到 \`nodes\` 和 \`edges\`，即可“一键上屏”呈现微观逻辑网结构。

### 2. “零配置”接入 Vercel AI SDK / LangChain

为了**重塑开发者的心智**，请牢记：YH-UI Flow 不再只是一个用于“画图”展示的拓扑图工具，而是强大的**逻辑层流控制引擎**！
得益于纯天然的 Vue 组件机制，你可以将外部大模型 SDK（如 \`useAiStream\` 或 MCP 协议回调）导出的响应式状态、Loading 句柄直接与 \`AiLlmNode\` 实行绑定。
文档指导的最佳实践为：每当触发对话时，底层网络请求层调用 \`useAiStream\`，其流式文字的下发与 Token 计数的累加会自动响应到画布里的 LLM 节点，从而产生状态值的更迭（\`pending -> running -> success\`），触发节点本体**“发光”**动画，并沿边缘动画**顺势驱动下一个相邻节点点亮**。这种深度化合是只懂操作 DOM/Canvas 的 AntV 等纯渲染型依赖难以一气呵成的。

### 3. Native Vue 3 的极致性能展现

我们这款组件基于 **纯血统的 Vue 3 组件生态**，以此全面对标并碾压 AntV X6 的 Vue Wrapper 封装损耗。
在构建复杂的 AIGC 表单配置面板时，我们指导开发者**放心大胆地**结合 Vue 本身的 \`Teleport\`（传送门）机制，将原本封闭在 Canvas 图元范围内的插槽数据，穿透渲染到右侧独立的参数表单栏。无需繁琐的 \`node.setData\` 或实例查找，借助 \`ref\` 即可全透明双向打通！
得益于虚拟滚动和深度的 Vue \`shallowRef\` 靶向更新优化，即便你的画布上容纳了同时流转数据甚至带有连线动画的 **2000 个引擎控制节点**，也能保持帧率卓越、拖拽丝滑，为极致复杂图表生态的性能作坚实背书。
