# 旗舰场景示例

YH-UI 的独特价值不只在单个组件，而在 AI、Flow、Table、主题、请求和业务组件组合后的生产级体验。旗舰示例用于展示这些能力的完整组合。

## AI 工作台

目标：展示 AI 原生产品的完整交互闭环。

推荐组合：

- `AiChat` / `AiBubble` / `AiBubbleList`
- `AiSender` / `AiEditorSender`
- `AiThoughtChain`
- `AiCodeBlock` / `AiCodeEditor` / `AiCodeRunner`
- `AiArtifacts`
- `AiSources` / `AiAttachments`
- `@yh-ui/request` 的 SSE 和队列能力

验收重点：

- 支持流式响应、取消、重试和错误恢复。
- 代码、图表、附件、来源引用可以同时存在。
- 长会话保持滚动性能和键盘可用性。

## Flow 自动化编排

目标：展示可视化工作流、AI 节点和数据流编辑能力。

推荐组合：

- `@yh-ui/flow`
- Flow 节点、边、控制器、缩略图、背景
- 自动布局、导入导出、截图能力
- AI 工作流节点配置面板

验收重点：

- 节点拖拽、缩放、连线、选择和视口控制稳定。
- 可导入导出 JSON，并能恢复视口。
- 大画布下保持可交互性能。

## Heavy Data Table

目标：展示管理系统和数据运营后台的一线生产力。

推荐组合：

- `YhTable`
- 虚拟滚动
- 列拖拽、列宽调整、固定列
- 选择、排序、筛选、分页
- 导入、导出、打印
- `FilterBar` / `Pagination` / `Descriptions`

验收重点：

- 大数据量下滚动稳定。
- 列配置和用户选择可持久化。
- 导出和打印结果与屏幕数据一致。

## 示例发布标准

旗舰示例必须通过：

```bash
pnpm verify:visual-regression
pnpm verify:a11y
pnpm verify:consumer-smoke
```

每个示例需要同时覆盖桌面和移动视口，不能只展示静态 UI。
