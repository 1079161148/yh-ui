// ============================================
// BPMN Node Components - BPMN 风格节点库
// ============================================

import { registerCustomNode } from '../../../utils/custom-types'
import BpmnStartEvent from './BpmnStartEvent.vue'
import BpmnEndEvent from './BpmnEndEvent.vue'
import BpmnTask from './BpmnTask.vue'
import BpmnServiceTask from './BpmnServiceTask.vue'
import BpmnUserTask from './BpmnUserTask.vue'
import BpmnExclusiveGateway from './BpmnExclusiveGateway.vue'
import BpmnParallelGateway from './BpmnParallelGateway.vue'
import BpmnInclusiveGateway from './BpmnInclusiveGateway.vue'

export { default as BpmnStartEvent } from './BpmnStartEvent.vue'
export { default as BpmnEndEvent } from './BpmnEndEvent.vue'
export { default as BpmnTask } from './BpmnTask.vue'
export { default as BpmnServiceTask } from './BpmnServiceTask.vue'
export { default as BpmnUserTask } from './BpmnUserTask.vue'
export { default as BpmnExclusiveGateway } from './BpmnExclusiveGateway.vue'
export { default as BpmnParallelGateway } from './BpmnParallelGateway.vue'
export { default as BpmnInclusiveGateway } from './BpmnInclusiveGateway.vue'

/** BPMN 节点类型名，用于 nodes 的 type 字段 */
export const BPMN_NODE_TYPES = {
  StartEvent: 'bpmn-start',
  EndEvent: 'bpmn-end',
  Task: 'bpmn-task',
  ServiceTask: 'bpmn-service-task',
  UserTask: 'bpmn-user-task',
  ExclusiveGateway: 'bpmn-exclusive-gateway',
  ParallelGateway: 'bpmn-parallel-gateway',
  InclusiveGateway: 'bpmn-inclusive-gateway'
} as const

/**
 * 注册所有 BPMN 节点类型到自定义节点库，注册后 Flow 会按 node.type 自动渲染对应 BPMN 组件
 */
export function registerBpmnNodes(): void {
  registerCustomNode({ type: BPMN_NODE_TYPES.StartEvent, component: BpmnStartEvent })
  registerCustomNode({ type: BPMN_NODE_TYPES.EndEvent, component: BpmnEndEvent })
  registerCustomNode({ type: BPMN_NODE_TYPES.Task, component: BpmnTask })
  registerCustomNode({ type: BPMN_NODE_TYPES.ServiceTask, component: BpmnServiceTask })
  registerCustomNode({ type: BPMN_NODE_TYPES.UserTask, component: BpmnUserTask })
  registerCustomNode({ type: BPMN_NODE_TYPES.ExclusiveGateway, component: BpmnExclusiveGateway })
  registerCustomNode({ type: BPMN_NODE_TYPES.ParallelGateway, component: BpmnParallelGateway })
  registerCustomNode({ type: BPMN_NODE_TYPES.InclusiveGateway, component: BpmnInclusiveGateway })
}
