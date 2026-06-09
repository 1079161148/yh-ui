# YH-UI Agent Skill (智能 Agent 辅助开发规则库)

[English Documentation (英文文档)](./README.md)

此目录封装了 YH-UI 组件库的专业知识，专为现代 AI 编码助手（如 Cursor、Trae、Claude Code 等）设计。它采用轻量化的跨平台 Skill 设计结构：由一个作为入口导向的 `SKILL.md` 文件以及一组按需加载的 Reference 参考文件组成。

## 主要用途

- 生成符合 YH-UI 规范的 Vue 3 或 Nuxt 3 页面与组件代码。
- 引导 AI 选择正确的 YH-UI 模块包边界，避免引入多余的三方依赖。
- 杜绝 AI 凭空捏造不存在的组件名、属性、主题配置或语言包路径。
- **100% 强制 AI 优先使用已有的 YH-UI 组件**，严禁在组件库有支持时手写原生 HTML/CSS 重复造轮子。
- 为 AI 助手提供高价值的进阶 Recipes（表格虚拟滚动、嵌套表单 Schema、AI 思维链、可视化流程图、全局国际化及主题配置）。

## 设计原则

- **`SKILL.md`**：作为 AI 的系统指令入口与核心操作指南，定义了严格的防错守卫。
- **按需渐进加载**：参考文件按职责细分，AI 仅在处理特定任务（如 Table 或 Flow）时才读取对应文件，保持上下文体积小巧高效。
- **`references/source-truth.md`**：由源码 AST 自动提取生成的导出真相图谱，确保名字 100% 准确。
- **`references/vue-component-practices.md`**：定义了 Vue 3.5+ 响应式属性解构、严格 TypeScript 类型、组件销毁内存清理以及组件库二次封装工作流。
- **核心业务 Recipes**：
  - `recipes-table.md`：大列表虚拟滚动、表格插槽自定义、Excel 导入导出与打印 API。
  - `recipes-form-schema.md`：动态表单 Schema、重复嵌套列表（`type: 'list'`）、自定义 render 渲染 VNode。
  - `recipes-ai.md`：AI 聊天气泡、DeepSeek-R1 思维链（`YhAiThoughtChain`）渲染、代码沙箱执行、Mermaid 图表渲染。
  - `recipes-flow.md`：BPMN 与 AI 智能工作流节点注册、NodeResizer、NodeToolbar、撤销/重做历史记录。
  - `recipes-theme.md`：全局 ConfigProvider 国际化配置、Preset 预设、密度调整、色盲友好模式、WCAG 2.1 对比度无障碍校验。
  - `recipes-icons.md`：Iconify 图标集异步加载、自定义 SVG 渲染、旋转动画。
- **`codegen-rubric.md`**：代码生成评审准则，若 AI 绕过 YH-UI 手写重复控制，则判定生成失败。

## 安装与集成方法

您可以使用 Monorepo 提供的命令行工具将这些规则自动同步到本地 IDE 配置中：

```bash
# 自动部署到 Cursor 规则目录 (.cursor/rules/)
npx @yh-ui/yh-ui-skill install --target cursor

# 自动部署到 Trae 规则目录
npx @yh-ui/yh-ui-skill install --target cursor

# 导出到项目当前目录 (.yh-ui/)
npx @yh-ui/yh-ui-skill install --target project
```

### 手动引入上下文

- **Cursor**：将 `SKILL.md` 的内容粘贴至根目录的 `.cursorrules` 文件中，或将 references 下的文件直接拖入 `.cursor/rules/` 文件夹。
- **Trae**：在根目录下创建 `.traerules` 并粘贴 `SKILL.md` 内容。在提问时，使用 **`#SKILL.md`** 引入对应规则作为对话上下文。
- **Claude Project / Custom GPTs**：将 `SKILL.md` 和 `references/` 目录上传至知识库（Knowledge）中。

## 维护与发布流程

- 开发中如新增组件，应运行 `pnpm generate:yh-ui-skill` 重新生成 API 导出。
- 修改规则后，执行 `pnpm verify:yh-ui-skill` 进行链接与 frontmatter 静态校验（通过 21 个文档的测试方可提交）。
- 执行 `pnpm format` 以对齐 Markdown 排版。
