# Flow 更新日志

本文档记录 YH-UI Flow 组件库的所有重要更新。

---

## v1.0.0 (2024-03-17)

### 新增功能

#### 1. 节点系统

- **BPMN 节点库**: 新增完整的 BPMN 流程节点支持
  - `BpmnStartEvent` / `BpmnEndEvent` - 开始/结束事件
  - `BpmnTask` / `BpmnServiceTask` / `BpmnUserTask` - 任务节点
  - `BpmnExclusiveGateway` - 排他网关
  - `BpmnParallelGateway` - 并行网关
  - `BpmnInclusiveGateway` - 包容网关

- **AI 工作流节点库**: 业界首个原生支持 AI Agent 工作流的 Vue 流程图组件
  - `AiLlmNode` - LLM 调用节点
  - `AiPromptNode` - Prompt 工程节点
  - `AiAgentNode` - Agent 智能体节点
  - `AiToolNode` - 工具调用节点
  - `AiConditionNode` - 条件分支节点
  - `AiStartNode` / `AiEndNode` - 开始/结束节点
  - `AiMemoryNode` - 记忆存储节点

- **节点模板系统**: 快速创建业务专属节点
  - `registerCustomNodeTemplate()` - 注册自定义节点模板
  - `createNodeFromTemplate()` - 从模板创建节点
  - 支持默认数据和尺寸配置

#### 2. 交互增强

- **节点缩放器 (NodeResizer)**: 自由调整节点大小
- **节点工具栏 (NodeToolbar)**: 节点操作快捷菜单
- **智能辅助线**: 自动对齐提示
- **确认删除拦截**: 删除前二次确认
- **拖拽式创建**: 从侧边栏拖入节点

#### 3. 视图与导航

- **交互式小地图 (Minimap)**: 缩略图导航
- **视口平滑过渡**: 动画切换视图
- **跨层传送 (Teleport)**: 节点跨层级连接

#### 4. 导出与持久化

- **截图导出**: 支持 PNG/SVG 格式
- **数据持久化**: JSON 格式保存/恢复
- **导出插件**: 完整流程导出功能

#### 5. 布局算法

- **自动布局 (Dagre)**: 树状/层级布局
- **布局动画**: 布局变更时的过渡效果

#### 6. 编辑体验

- **节点编辑面板**: 双击编辑节点属性
- **连线编辑面板**: 编辑连线样式和标签
- **AI 节点编辑面板**: 专用 AI 节点配置

### 架构升级

- **Pinia 状态管理**: 状态持久化和跨组件共享
- **多实例协作**: 支持多个 Flow 实例
- **SSR 支持**: 服务端渲染兼容
- **高性能优化**:
  - 图算法优化 (最短路径、环检测、拓扑排序)
  - 虚拟化渲染支持
  - 性能压力测试验证

### 插件系统

- `Minimap` - 小地图
- `Controls` - 缩放控制
- `Grid` - 网格背景
- `Snap` - 自动对齐
- `Keyboard` - 快捷键
- `Export` - 导出功能
- `Layout` - 自动布局

---

## v0.x 版本

### 基础功能

- 核心流程图渲染
- 基础节点: Input / Output / Custom
- 基础连线: Bezier / Step / Smooth
- 视口管理: 平移/缩放
- 框选功能
- 撤销/重做历史
- 自定义节点/连线渲染

---

## 迁移指南

### 从 v0.x 升级

1. 更新依赖版本
2. 检查节点/连线类型兼容性
3. 如使用自定义渲染器，可能需要适配新 API

### BPMN 节点使用

```vue
<script setup lang="ts">
import { registerBpmnNodes } from '@yh-ui/flow'

// 注册 BPMN 节点
registerBpmnNodes()
</script>

<template>
  <yh-flow :nodes="bpmnNodes" :edges="bpmnEdges" />
</template>
```

### AI 工作流节点使用

```vue
<script setup lang="ts">
import { registerAiWorkflowNodes } from '@yh-ui/flow'

// 注册 AI 工作流节点
registerAiWorkflowNodes()
</script>

<template>
  <yh-flow :nodes="aiNodes" :edges="aiEdges" />
</template>
```

---

## 路线图

- [ ] BPMN 2.0 流程执行引擎
- [ ] 多人实时协作 (CRDT/WebSocket)
- [ ] React 版本适配
- [ ] 移动端触控优化
- [ ] 主题系统增强

---

## 社区支持

- GitHub: [https://github.com/1079161148/yh-ui](https://github.com/1079161148/yh-ui)
- 问题反馈: [https://github.com/1079161148/yh-ui/issues](https://github.com/1079161148/yh-ui/issues)
