// ============================================
// YhFlow - 流程图组件导出入口
// ============================================

// 类型导出
export * from './types'

// 核心 composables
export * from './core'

// 工具函数
export * from './utils'

// 插件系统
export * from './plugins'

// 主入口 - Props 和 Emits
export * from './flow'

// 内置节点组件 - 命名导出以避免循环依赖
export { default as BaseNode } from './components/nodes/BaseNode.vue'
export { default as InputNode } from './components/nodes/InputNode.vue'
export { default as OutputNode } from './components/nodes/OutputNode.vue'
export { default as GroupNode } from './components/nodes/GroupNode.vue'
export { default as CustomNode } from './components/nodes/CustomNode.vue'
export { default as NodeResizer } from './components/nodes/NodeResizer.vue'
export { default as NodeToolbar } from './components/nodes/NodeToolbar.vue'

// 内置连线组件
export { default as BaseEdge } from './components/edges/BaseEdge.vue'
export { default as SmoothEdge } from './components/edges/SmoothEdge.vue'
export { default as StepEdge } from './components/edges/StepEdge.vue'
export { default as BezierEdge } from './components/edges/BezierEdge.vue'

// 主组件
export { default as Flow } from './Flow.vue'

// 编辑面板组件
export { default as NodeEditPanel } from './components/NodeEditPanel.vue'
export { default as EdgeEditPanel } from './components/EdgeEditPanel.vue'

// 暴露辅助 UI 组件作为功能插件使用（Vue 通用最佳实践）
export { default as Minimap } from './renderer/Minimap.vue'
export { default as Controls } from './renderer/Controls.vue'
export { default as FlowBackground } from './renderer/FlowBackground.vue'
