// ============================================
// Node Components - 内置节点组件导出
// ============================================

export { default as BaseNode } from './BaseNode.vue'
export { default as InputNode } from './InputNode.vue'
export { default as OutputNode } from './OutputNode.vue'
export { default as GroupNode } from './GroupNode.vue'
export { default as CustomNode } from './CustomNode.vue'
export { default as NodeResizer } from './NodeResizer.vue'
export { default as NodeToolbar } from './NodeToolbar.vue'

// BPMN 节点库
export {
  BpmnStartEvent,
  BpmnEndEvent,
  BpmnTask,
  BpmnServiceTask,
  BpmnUserTask,
  BpmnExclusiveGateway,
  BpmnParallelGateway,
  BpmnInclusiveGateway
} from './bpmn'
// AI 工作流节点库
export {
  AiLlmNode,
  AiPromptNode,
  AiAgentNode,
  AiToolNode,
  AiConditionNode,
  AiStartNode,
  AiEndNode,
  AiMemoryNode
} from './ai-workflow'

// ============================================
// Node Template Registration Helpers
// ============================================

export {
  registerCustomNodeTemplate,
  getCustomNodeTemplate,
  getAllCustomNodeTemplates,
  hasCustomNodeTemplate,
  createNodeFromTemplate,
  isNestedNode,
  getNodeChildren,
  getNodeParent,
  registerEdgeTemplate,
  getEdgeTemplate,
  getAllEdgeTemplates,
  exportFlowData,
  importFlowData
} from '../utils/custom-types'
export type {
  CustomNodeTemplate,
  EdgeTemplate,
  NestedNodeConfig,
  FlowExportData
} from '../utils/custom-types'
