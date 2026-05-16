# Changelog

YH-UI 的重要版本变更会记录在这里。

本项目从 `1.0.8` 开始作为首个面向开发者的正式开源生产版本维护公开变更记录。此前的 `0.x` 与早期 `1.0.x` 构建主要服务于内部开发、发布工程打磨和开源准备，不再作为面向用户的正式变更历史展开。

## [1.0.9] - 2026-05-16

文档站点与在线示例发布修复版本，重点解决 GitHub Pages 侧栏当前项高亮不一致，以及 CodeSandbox 示例在云端环境下的兼容性问题。

### Added

- 新增 CodeSandbox 导出脚手架的穷举校验规则，覆盖必需文件、入口约定与兼容性约束，帮助文档示例在发布前尽早暴露问题。

### Changed

- 调整文档侧栏交互样式选择器，改为匹配 VitePress 当前实际输出的 `.VPSidebarItem.is-active > .item > .link` 结构，并同步修正 active / hover 文本样式。
- 将文档示例导出的 CodeSandbox 工程重新收敛为更稳定的兼容脚手架，统一使用 `.codesandbox/template.json` 与 `src/main.js` 入口。

### Fixed

- 修复 GitHub Pages 线上文档中，当前页侧栏项缺少预期高亮背景与加粗状态的问题。
- 修复部分文档示例导入 CodeSandbox 后因脚手架不兼容导致的预览失败问题，并补齐 `@yh-ui/*` 裸导入依赖收集。
- 修复中英文 `AiBubble` 引用示例中的断行 URL，避免生成无效的示例代码。

### Notes

- 本版本已完成文档构建验证，并对全部支持 CodeSandbox 的文档 demo 执行生成校验。

## [1.0.8] - 2026-05-16

首个面向开发者的正式开源生产版本。

这一版本把 YH-UI 收敛为可公开安装、可阅读、可验证、可贡献、可持续发布的 Vue 3.5+ 组件库工程。重点不是单个组件的补丁，而是把组件能力、文档体系、AI 友好资料、在线示例、发布门禁和开源协作流程一起整理到生产发布状态。

### Added

- 新增 YH-UI Agent Skill 知识包，包含组件选择规则、Vue / Nuxt / AI Chat / Request / Flow / Theme / Locale 场景模板、失败保护规则、source-truth、API cheatsheet、深度 recipes、`llms.txt` 与 `llms-full.txt`，方便 ChatGPT、Codex、Claude、Cursor 等 AI 工具按真实 API 生成代码。
- 新增中英文开源文档章节，覆盖迁移指南、设计原则、最佳实践、Figma / Token 体系、版本策略、社区反馈闭环、无障碍、包体积分层和旗舰示例。
- 新增 Hooks 中英文文档入口，补齐基础组件下组合式工具的使用说明。
- 新增图标组件化入口与图标集合文档，支持像使用普通 Vue 组件一样使用 YH-UI 图标。
- 新增组件质量矩阵与开放发布门禁脚本，覆盖组件文档、示例、类型、测试、可访问性证据和发布前验证。

### Changed

- 将公开安装入口统一为 `@yh-ui/yh-ui`，完整样式入口统一为 `@yh-ui/yh-ui/css`，避免继续传播未 scoped 的 `yh-ui` 包名。
- 优化 GitHub Release 发布链路，发布说明从 `CHANGELOG.md` 当前版本段落自动提取，降低打 tag 时遗漏发布描述的风险。
- 优化 CI / Release 工作流，把适合本地提前验证的格式、类型、测试、构建、包体积、consumer smoke、Playground、StackBlitz、文档构建等检查沉淀为可复用脚本。
- 优化文档顶部最新版本展示，版本号从 package metadata 自动读取，后续发布无需手动维护文案。
- 优化 CodeSandbox、StackBlitz、Playground 和文档运行时资源生成流程，减少在线示例样式缺失和包入口解析不一致的风险。
- 优化 AI Thought Chain 进行中状态的视觉反馈，为思考中节点增加轻量波动动画。
- 统一版权年份为 2026，并更新根 README 与各子包 README 的定位、安装方式和功能描述。

### Fixed

- 修复文档、示例和 README 中错误的 `pnpm add yh-ui`、`import YhUI from 'yh-ui'`、`import 'yh-ui/css'` 等旧包名描述。
- 修复部分在线示例、Playground、CodeSandbox、StackBlitz 场景下组件样式或运行时包入口丢失的问题。
- 修复 Nuxt playground、consumer smoke 和发布沙箱验证中本地 workspace 包入口解析不稳定的问题。
- 修复部分 Markdown 文档乱码、过期说明、无效链接和中英文内容不同步问题。
- 修复低覆盖组件测试不足的问题，补齐真实交互测试，避免通过扩大 exclude 硬过覆盖门禁。

### Notes

- 新项目应安装 `@yh-ui/yh-ui`，并通过 `import '@yh-ui/yh-ui/css'` 引入完整样式。
- Nuxt 项目优先使用 `@yh-ui/nuxt` 模块；涉及 Flow 等依赖浏览器布局能力的重交互示例，在 SSR 页面中建议配合 `<ClientOnly>` 使用。
- 发布前本地建议执行 `pnpm verify:open-source-release`；发布后建议执行 `pnpm wait:published-packages` 与 `pnpm verify:published-release`。
- GitHub Release 正文可通过 `pnpm release-notes:extract` 从本段 changelog 自动生成。

## [1.0.7] - 2026-05-16

首个标准化对外开源版本。

这一版本将 YH-UI 从一个持续迭代的组件库工程整理为可公开安装、可验证、可贡献、可持续发布的 Vue 3.5+ 组件系统。它不是一次单点功能发布，而是对组件能力、包结构、文档、质量门禁和开源协作流程的完整定版。

### 发布定位

- 将 `@yh-ui/yh-ui` 确立为完整安装入口。
- 将 `@yh-ui/yh-ui/css` 确立为完整样式入口。
- 将 `@yh-ui/yh-ui/resolver` 确立为按需导入解析器入口。
- 将 `@yh-ui/nuxt` 确立为 Nuxt 集成入口。
- 将 `pnpm verify:open-source-release` 确立为标准公开发布门禁。

### 安装入口

```bash
pnpm add @yh-ui/yh-ui
```

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

createApp(App).use(YhUI).mount('#app')
```

### 包范围

本次标准版本同步发布以下公开包：

| Package             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `@yh-ui/yh-ui`      | 完整入口包，面向应用侧直接安装和使用。                    |
| `@yh-ui/components` | 核心 Vue 组件与业务组件。                                 |
| `@yh-ui/theme`      | 主题系统、设计 Token、暗色模式与运行时 CSS 变量能力。     |
| `@yh-ui/hooks`      | Vue 组合式工具。                                          |
| `@yh-ui/utils`      | 共享运行时工具。                                          |
| `@yh-ui/icons`      | Iconify 兼容图标运行时与组件化图标入口。                  |
| `@yh-ui/request`    | 请求客户端、请求 hooks、缓存、SSE、队列、上传和下载能力。 |
| `@yh-ui/flow`       | 流程图与节点编辑器能力。                                  |
| `@yh-ui/ai-sdk`     | Vercel AI SDK、LangChain 等 AI 集成能力。                 |
| `@yh-ui/locale`     | 国际化语言包。                                            |
| `@yh-ui/nuxt`       | Nuxt 3 / Nuxt 4 集成模块。                                |

### 核心能力

- 提供 103 个通过质量矩阵检查的组件，覆盖基础组件、表单、数据展示、反馈弹层、导航、布局、电商业务组件、AI 交互组件和工作流组件。
- 提供完整 TypeScript 类型导出，覆盖 props、events、slots、expose、配置项、数据项和列配置等常见使用面。
- 提供主题 Token、暗色模式、运行时主题变量、组件级主题能力和主题文档。
- 提供 AI Chat、Sender、Bubble、Thought Chain、Code Block、Code Editor、Code Runner、Artifacts、Prompts、Sources、Attachments 等 AI 产品界面能力。
- 提供 Table、Gantt Chart、Flow editor、虚拟滚动、上传、表单校验、消息通知、弹层和复杂业务组件能力。
- 提供 Vite、Nuxt、按需导入、完整导入、文档 Playground、CodeSandbox / StackBlitz 验证路径。

### 文档与开源协作

- 重整 README，使安装、包说明、Nuxt 用法、质量门禁、发布流程和兼容边界对外清晰可读。
- 补齐中英文文档结构，覆盖快速开始、安装、构建、主题、兼容性、包体积、迁移指南、Nuxt 集成和组件示例。
- 增加并保留开源协作文件：
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
- 增加 issue templates，便于 bug、功能请求和文档问题进入结构化维护流程。

### 质量标准

这一版本以公开发布为目标，建立以下可重复验证的质量门禁：

- `pnpm format:check`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test:ci`
- `pnpm build`
- `pnpm verify:package-size`
- `pnpm verify:component-quality`
- `pnpm verify:consumer-smoke`
- `pnpm verify:playgrounds`
- `pnpm verify:docs-i18n`
- `pnpm verify:docs`
- `pnpm verify:open-source-release`

组件质量矩阵要求每个组件具备源码入口、样式或豁免说明、中英文文档、API 文档、可运行示例、单元测试、SSR 测试、交互组件可访问性证据和公开类型证据。

### 发布验证

公开发布前建议执行：

```bash
pnpm verify:open-source-release
pnpm verify:codesandbox-remote
```

发布后建议执行：

```bash
pnpm wait:published-packages
pnpm verify:published-release
```

这些检查覆盖本地构建、包体积预算、版本一致性、组件质量、Vite / Nuxt 消费端 smoke、Playground、文档构建、StackBlitz、CodeSandbox、npm 可见性、jsDelivr 与 unpkg 资源可用性。

### 兼容性

- Vue: `>= 3.5.0`
- Node.js: `>= 18.0.0`
- pnpm: `>= 9.0.0`
- Nuxt: `^3.11.0 || ^4.0.0-rc.1`
- Browser: 现代 Chrome、Edge、Firefox、Safari
- SSR: 支持主流组件用法和 Nuxt 集成；依赖浏览器 API 的重交互能力应在目标运行环境中单独验证。

### 迁移说明

- 新项目应使用 `@yh-ui/yh-ui`，不要使用未 scoped 的 `yh-ui` 包名。
- 完整样式入口应使用 `@yh-ui/yh-ui/css`。
- Nuxt 项目优先使用 `@yh-ui/nuxt` 模块。
- 从旧版本、其他组件库或自研组件迁移时，建议先迁移基础样式和低风险展示组件，再逐步迁移表单、弹层、表格、上传、流程和 AI 组件。

### Notes

- `1.0.7` 是 YH-UI 面向外部用户和开源协作者的第一个标准版本记录。
- 之后的 changelog 将从该版本继续追加，按版本记录新增、变更、修复、兼容性说明和迁移提示。
