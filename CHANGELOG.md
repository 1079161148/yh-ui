# Changelog

All notable changes to YH-UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.19] - 2026-03-26

### 🛠️ Build & Registry Stabilization (Industrial Grade)

- **构建系统升级**: 彻底修复了 `@yh-ui/components` 在 Windows 环境下因 `mkdist` 与 `vue-tsc` 交互导致的构建崩溃（"Cannot read properties of undefined (reading 'errors')"）。通过引入独立的 `vue-tsc` 声明生成步骤，显著提升了构建流水线的稳定性。
- **类型系统精修 (Strict Mode)**:
  - **Menu**: 修复了 `YhMenuRecursiveItem` 中由于动态属性访问导致的 `unknown` 类型校验错误，并完善了递归组件的 Null 检查。
  - **Style Prop 标准化**: 统一了 `Tooltip`, `Popover`, `Popconfirm`, `Menu` 等所有组件的样式属性（`popperStyle`, `contentStyle` 等）为 `StyleValue` 类型，确保了在 Vue 3.5+ 严格模式下的类型兼容性。
  - **GanttChart**: 解决了 `FlattenedGanttTask` 内部接口在声明导出时“无法命名”的错误，通过提升关键类型至公用导出层，确保了 declaration 文件的正确生成。
- **质量保障**:
  - **100% 测试通过率**: 验证并确保了全量 3070 个单元测试/SSR 测试用例全部通过。
  - **工业级零警告交付**: 实现了 `pnpm typecheck` 逻辑层与构建层双重 0 错误目标。

---

## [0.1.18] - 2026-03-26

### 🐛 Bug Fixes

- **AiMermaid**: 修复了 SSR 环境下缺失 `YhSpin` 组件导致的渲染警告；同步了单测与 SSR 测试的选择器至最新的 BEM 命名规范；优化了 `header` 属性的类型定义以增强类型安全。
- **AiConversations**: 修复了空状态下文案不匹配的问题，通过新增专用的 `ai.conversations.noData` 词条提升了国际化准确性。
- **LuckyDraw**: 修复了 Vue 模板中多行 HTML 元素的换行格式问题，消除 Lint 警告。
- **Type Safety**: 修复了 `ai-mermaid` 属性定义中的 `any` 不规范用法。

### ✨ Refactor & Optimization

- **i18n**: 重构了 `Language` 接口，将 AI 组件（Conversations, Attachments, Mermaid, Canvas）的 locale 配置项改为可选（Optional），确保了与现有 67 种语言包的向后兼容性，彻底解决了构建时的类型检查报错。
- **i18n**: 同步补全了 `zh-cn`, `en`, `zh-tw` 等核心语言包中缺失的 AI 组件词条（如 `noData`, `retry`, `canvas` 等）。

### 🧪 Stability

- **全量测试验证**: 运行并确保全量 344 个测试文件（共 3070 个单测/SSR 用例）100% 通过。
- **Lint & TypeCheck**: 实现了 0 警告、0 错误的工业级代码交付标准。

---

## [0.1.17] - 2026-03-26

### 🛠️ Architecture & Standardization (Industrial Grade A+)

- **类型安全**: 实现了组件库 100% TypeScript 类型安全，全面杜绝 `any` 类型的使用。
- **导出规范**: 统一了所有组件实例和属性的导出方式，强制使用 `Yh` 前缀（如 `YhButtonInstance`, `YhTableProps`），显著提升了开发者的智能提示体验。
- **Nuxt 集成**: 完美对齐 Nuxt 自动导入规格，所有组件、Hooks 及全局工具函数均支持在 Nuxt 3 环境下开箱即用，无需手动配置。

---

## [0.1.16] - 2026-03-25

### 📄 Documentation & UX

- **FilterBar**: 完成了 FilterBar 组件文档的现代化升级，中英文档 100% 对齐。
- **交互示例**: 引入了交互式 DemoBlock，解决了多实例状态干扰及价格筛选重置的边界逻辑 Bug，为 SSR 环境提供了生产级用法参考。
- **SEO**: 全面优化了组件库文档的 SSR 性能及 SEO 标签。

---

## [0.1.15] - 2026-03-24

### 🛒 E-commerce Suite (Premium)

- **LuckyDraw**: 采用 BEM Mixins 以及全局主题变量重构了 SCSS 样式，在保持原有精美动画的同时，极大提升了样式的解耦度与 SSR 性能。
- **CouponCard**: 修复了规则展开高度突变的问题，将内容区强制锁定在 100px 基准高度，并补全了 Rules 展开项的 i18n 支持。
- **SKUSelector**: 优化了库存不足时的交互反馈，确保了在极端网络环境下的状态同步稳定性。

---

## [0.1.14] - 2026-03-24

### 🏗️ Industrial Gantt Chart (Stable)

- **核心功能**: 正式发布工业级甘特图组件，支持任务拖拽、依赖可视化及多视图（日/周/月）切换。
- **性能优化**: 解决了在极端缩放比例下元素失效及内存泄漏的问题。
- **稳定性**: 通过了完整的 SSR 测试用例，确保在所有 Nuxt 场景下表现一致。

---

## [0.1.13] - 2026-03-23

### ✨ Enhancements & Refactoring

- **Demo Escaping**: 全面优化了文档系统的 Demo 代码转义逻辑，通过 `demo-utils.ts` 彻底解决了 Script/Style 标签嵌套导致的渲染错误。
- **Global Styles**: 统一了所有 AI 组件及电商组件的圆角、阴影及过渡动画，形成了 V3 风格的统一品牌视觉。

---

## [0.1.12] - 2026-03-01

### 🐛 Bug Fixes

- **AiVoiceTrigger**: 修复波形动画 SCSS 样式不生效的问题，优化波形条 transform 动画表现
- **AiBubble**: 修复气泡组件 SCSS 作用域样式隔离问题
- **useLocale / dayjs-locale**: 修复 `Failed to load dayjs locale` 控制台警告，改用静态 import map 替代动态 import，彻底消除 Vite dev 下的 404 请求
- **SSR**: 修复多处 `setInterval` / `setInterval` 在 SSR 环境下未被 `onMounted`/`onUnmounted` 包裹导致的进程挂起问题
- **文档**: 修复 `ai-voice-trigger` 文档示例中 HTML 转义格式错误，补充与 `AiBubble` 组合使用的实战场景 Demo

### 📦 依赖

- 同步更新 `pnpm-lock.yaml` 及 `pnpm-workspace.yaml`

---

## [0.1.11] - 2026-03-01

### 🤖 新增 AI 工业级全套组件 (Alpha)

- **AiProvider**: AI 全局配置中心，支持 base-url、token 注入及打字机配置。
- **AiChat**: 开箱即用的智能对话流容器。
- **AiBubble**: 高性能对话气泡，支持多模态及思维链展示。
- **AiSender**: 增强型 AI 输入框，内置附件上传与指令集支持。
- **AiArtifacts**: AI 多版本工件管理系统。
- **AiAgentCard / AiSources / AiThoughtChain**: 完善 Agent 的深度分析。
- **AiWelcome / AiPrompts**: 提升落地后的首次交互引导。

### 📄 文档与开发者体验

- **文档三位一体标准**: 开发并应用 `demo-utils.ts` 实现文档示例的 TS/JS 100% 自动对齐转换。
- **AiProvider 文档**: 完善的中英文档，包含身份配置及动态交互 Demo。
- **i18n**: 补全所有 AI 组件的 67 种国际化词条，强制类型校验。

### 🧪 稳定性与质量

- **全量测试提升**: 覆盖所有 AI 组件的单测与 SSR 测试（312 个用例全部通过）。
- **组件注册**: 完善 `component.d.ts` 为 Volar 提供精准的全局组件映射。
- **Lint 修正**: 全量修复 AI 组件及测试目录中的 13 个重要 Lint 警告及错误。

---

## [0.1.10] - 2026-02-23

### Fixed

- 修复了若干 AI 交互场景下的 CSS 样式隔离问题。
- 补全了部分包路径错误导致的构建失败问题。

---

## [0.1.0] - 2026-02-21

### ✨ 初始正式发布

这是 YH-UI 的第一个公开版本。经过深度设计与开发，本版本包含：

### 🧩 组件（61 个）

#### 基础组件

- **Button** - 按钮，支持 6 种类型、3 种尺寸、plain/round/circle/text/link/block 等变体
- **Icon** - 图标，基于 SVG 的图标系统

#### 表单组件

- **Input** - 输入框，支持视觉变体（default/filled/borderless/underlined）、加载状态、状态反馈、聚焦自选、Esc清空、datalist、字数统计自定义
- **InputNumber** - 数字输入框
- **InputTag** - 标签输入框，支持动态标签创建
- **Select** - 选择器，支持单选/多选/远程搜索/分组/虚拟化
- **Cascader** - 级联选择器
- **Checkbox** - 复选框 & 组
- **Radio** - 单选框 & 组
- **Switch** - 开关
- **Slider** - 滑块
- **Rate** - 评分
- **ColorPicker** - 颜色选择器
- **DatePicker** - 日期选择器（支持 date/daterange/month/year 等多种 type）
- **TimePicker** - 时间选择器
- **TimeSelect** - 时间选择（步进式）
- **Form** + **FormItem** - 表单 & 校验，集成 async-validator
- **Upload** - 上传，支持拖拽/多文件/自定义请求

#### 数据展示

- **Table** - 表格，媲美 vxe-table 的功能密度：
  - 虚拟滚动（万行性能保障）
  - 行/列拖拽排序（原生拖拽 API）
  - 列宽调整
  - 分组表头
  - 合并单元格（spanMethod）
  - 汇总行
  - 右键菜单
  - 工具栏（导出/打印/列设置/全屏）
  - CSV、XLSX、PDF 导出
  - 打印功能
  - 行内编辑
  - 树形数据（懒加载）
  - 表单校验集成
- **Tree** - 树形控件，支持懒加载/虚拟滚动
- **TreeSelect** - 树形选择器
- **Pagination** - 分页
- **Badge** - 徽标
- **Tag** - 标签
- **Avatar** - （规划中）
- **Image** - 图片，支持懒加载/预览/图片组
- **Descriptions** - 描述列表
- **Calendar** - 日历
- **Progress** - 进度条
- **Skeleton** - 骨架屏
- **Countdown** - 倒计时
- **InfiniteScroll** - 无限滚动指令
- **Waterfall** - 瀑布流布局（特色组件）
- **Watermark** - 水印

#### 反馈组件

- **Alert** - 警告提示
- **Dialog** - 对话框
- **Drawer** - 抽屉
- **Message** - 消息提示
- **MessageBox** - 消息弹框（Alert/Confirm/Prompt）
- **Notification** - 通知
- **Popconfirm** - 气泡确认框
- **Loading** - 加载（指令和服务调用）
- **Spin** - 加载旋转

#### 导航组件

- **Menu** - 导航菜单（水平/垂直/折叠）
- **Tabs** - 标签页
- **Breadcrumb** - 面包屑
- **Dropdown** - 下拉菜单
- **Steps** - 步骤条
- **Affix** - 固钉
- **BackTop** - 返回顶部

#### 布局组件

- **Row** + **Col** - 栅格布局（24列系统，响应式断点）
- **Divider** - 分割线
- **Marquee** - 滚动公告（特色组件）

#### 配置提供

- **ConfigProvider** - 全局配置提供（locale/size/zIndex/theme）

### 🎨 主题系统（行业领先）

- 12 种预设主题（default/dark/blue/green/purple/orange/rose/amber/teal/indigo/slate/zinc）
- 色盲友好模式（protanopia/deuteranopia/tritanopia/achromatopsia）
- WCAG 2.1 对比度自动校验
- 3 种密度配置（comfortable/compact/dense）
- 4 种颜色算法（default/vibrant/muted/pastel）
- 主题快照与历史回滚
- 响应式断点主题
- 主题切换动画
- 从主色自动推导完整调色板

### 🌍 国际化（67 种语言）

超越 Element Plus(43种)、Naive UI(25种)，与 Ant Design 持平。

### 🔌 原生 Nuxt 3 支持

提供 `@yh-ui/nuxt` 模块，零配置支持 SSR。

### 🛠️ Hooks

- `useNamespace` - BEM 命名工具
- `useLocale` - 国际化
- `useFormItem` - 表单集成
- `useConfig` - 全局配置
- `useZIndex` - 层级管理
- `useId` - 唯一ID生成
- `useScrollLock` - 滚动锁定
- `useEventListener` - 事件监听
- `useClickOutside` - 点击外部
- `useVirtualScroll` - 虚拟滚动
- `useCache` - 缓存工具

---

[0.1.18]: https://github.com/1079161148/yh-ui/compare/v0.1.12...v0.1.18
[0.1.17]: https://github.com/1079161148/yh-ui/compare/v0.1.16...v0.1.17
[0.1.16]: https://github.com/1079161148/yh-ui/compare/v0.1.15...v0.1.16
[0.1.15]: https://github.com/1079161148/yh-ui/compare/v0.1.14...v0.1.15
[0.1.14]: https://github.com/1079161148/yh-ui/compare/v0.1.13...v0.1.14
[0.1.13]: https://github.com/1079161148/yh-ui/compare/v0.1.12...v0.1.13
[0.1.12]: https://github.com/1079161148/yh-ui/compare/v0.1.11...v0.1.12
[0.1.11]: https://github.com/1079161148/yh-ui/compare/v0.1.0...v0.1.11
[0.1.10]: https://github.com/1079161148/yh-ui/compare/v0.1.0...v0.1.10
[0.1.0]: https://github.com/1079161148/yh-ui/releases/tag/v0.1.0
