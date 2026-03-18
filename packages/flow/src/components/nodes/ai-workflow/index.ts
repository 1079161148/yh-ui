// ============================================
// AI Workflow Node Components - AI 工作流节点库
// ============================================

import { registerCustomNode } from '../../../utils/custom-types'
import AiLlmNode from './AiLlmNode.vue'
import AiPromptNode from './AiPromptNode.vue'
import AiAgentNode from './AiAgentNode.vue'
import AiToolNode from './AiToolNode.vue'
import AiConditionNode from './AiConditionNode.vue'
import AiStartNode from './AiStartNode.vue'
import AiEndNode from './AiEndNode.vue'
import AiMemoryNode from './AiMemoryNode.vue'

export { default as AiLlmNode } from './AiLlmNode.vue'
export { default as AiPromptNode } from './AiPromptNode.vue'
export { default as AiAgentNode } from './AiAgentNode.vue'
export { default as AiToolNode } from './AiToolNode.vue'
export { default as AiConditionNode } from './AiConditionNode.vue'
export { default as AiStartNode } from './AiStartNode.vue'
export { default as AiEndNode } from './AiEndNode.vue'
export { default as AiMemoryNode } from './AiMemoryNode.vue'

/** AI 工作流节点类型名，用于 nodes 的 type 字段 */
export const AI_WORKFLOW_NODE_TYPES = {
  LLM: 'ai-llm',
  Prompt: 'ai-prompt',
  Agent: 'ai-agent',
  Tool: 'ai-tool',
  Condition: 'ai-condition',
  Start: 'ai-start',
  End: 'ai-end',
  Memory: 'ai-memory'
} as const

/**
 * 注册所有 AI 工作流节点类型到自定义节点库
 */
export function registerAiWorkflowNodes(): void {
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.LLM, component: AiLlmNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.Prompt, component: AiPromptNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.Agent, component: AiAgentNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.Tool, component: AiToolNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.Condition, component: AiConditionNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.Start, component: AiStartNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.End, component: AiEndNode })
  registerCustomNode({ type: AI_WORKFLOW_NODE_TYPES.Memory, component: AiMemoryNode })
}
