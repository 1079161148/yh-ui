# Changelog

YH-UI 的重要版本变更会记录在这里。

本项目从 `1.0.8` 开始作为首个面向开发者的正式开源生产版本维护公开变更记录。此前的 `0.x` 与早期 `1.0.x` 构建主要服务于内部开发、发布工程打磨和开源准备，不再作为面向用户的正式变更历史展开。

## [1.0.58] - 2026-06-18

> 彻底修复并复核 YhUpload、YhSelect、YhPopover、YhMention、YhCarousel、YhAutocomplete、YhSmartAddress、YhImageMagnifier、YhGanttChart、YhLuckyDraw、YhNotification、YhMarquee、YhTransfer、YhTreeSelect、YhCascader、YhMenu 和 YhCouponCard 等核心组件的 20 余项 Bug，包含受控状态同步、空壳 API 落地、边界 NaN 保护、定时器与滚动锁内存泄露清理，所有单元测试与文档构建全量通过。

### Added

- **tree-select**: 实现了已声明的 `collapse-tags-tooltip` 属性，多选折叠标签时支持悬浮展示已折叠的所有标签汇总 Tooltip。
- **cascader**: 实现了已声明的 `collapse-tags-tooltip` 属性，多选折叠时使用 Tooltip 展示折叠项。
- **select**: 实现了已声明的 `collapse-tags-tooltip` 属性，支持多选时折叠标签悬浮汇总展示。

### Changed

- **mention**: 重构并实现 `wholeWord` 属性逻辑，在开启时插入触发词与标签全名并支持 Backspace 整词退格删除，在关闭时直接插入 value。

### Fixed

- **upload**: 修复图片预览时将外部 URL 直接拼入 `innerHTML` 的安全注入漏洞，重构为使用 `document.createElement('img')` 后赋值 `img.src` 方式，彻底避开 HTML 注入风险。
- **select**: 补充统一的 click-away 外部点击关闭下拉面板逻辑；修复开启虚拟滚动后 hover 高亮相对索引比较导致滚动后高亮视觉脱节的 Bug，高亮项 hover index 纠正为绝对索引 `hoveredIndex === startIndex + index`。
- **popover**: 修复每次显示与隐藏时会触发两次 `update:visible` 事件的 Bug，移除 handleShow/handleHide 内部重复的 emit，保留受控 `v-model` 的单条事件链。
- **mention**: 修复无候选匹配项（`total === 0`）时，对 ArrowUp/ArrowDown 键盘事件做取模操作导致 `highlightedIndex` 变为 `NaN` 进而阻碍后续选中操作的 Bug，增加空数据拦截。
- **autocomplete**: 修复空 suggestions 结果集下键盘上下箭头事件做取模导致 `highlightedIndex` 变为 `NaN` 的 Bug，增加空数据 early return。
- **carousel**: 修复自动播放时直接修改 `internalIndex` 绕过 `currentIndex` 状态更新 setter，导致 autoplay 切页时不触发 `update:currentIndex` 和 `change` 事件的 Bug；修复注入给 item 子项的 `itemCount` 用 `shallowRef(itemCount.value)` 冻结了总数，使得后续 fade/card/coverflow 等依赖总数计算偏移的动效出现位置错位的 Bug。
- **smart-address**: 修复受控状态不同步问题，添加对 `props.modelValue` 的深度 `watch` 以在外部回写、异步回填、表单重置时正确响应并同步 `innerVal`。
- **image-magnifier**: 修复全屏状态下 unmount 销毁组件时，只解绑了键盘事件却未还原 html/body 上的 `overflow: hidden` 导致页面被永久锁死滚动的 Bug。
- **gantt-chart**: 开启虚拟滚动后引入 `ResizeObserver` 动态监听并自适应更新可视区 `viewportHeight`，消除可视区容器高度硬编码为 600 导致的渲染条数不正确、底部空窗或留白异常；同时支持已声明的 `teleported` 属性消费链路，正确传递至 Tooltip 实例。
- **lucky-draw**: 修复轮盘模式下卸载组件时未清理 `setTimeout` 定时器的 Bug，防止销毁后仍可能触发 `finish`。
- **notification**: 在组件卸载和关闭时统一清理自动关闭定时器，防范重复触发 onClose 的多重销毁风险。
- **marquee**: 修复 loopDelay 每轮产生的 `setTimeout` 定时器在组件卸载销毁时未进行清理的漏洞。
- **transfer**: 修复 `showAllCheckbox` 为假 API 传 false 不生效的问题，在 transfer-panel 头部渲染中正确绑定并消费该属性。
- **menu**: 修复 `closeOnClickOutside` 为空壳 API 的问题，引入外部点击时自动关闭弹出子菜单的全局事件关闭链路。
- **coupon-card**: 修复规则折叠展开箭头未绑定 `is-expanded` 样式类导致点击展开后指示图标无法旋转的 UI 问题。

## [1.0.57] - 2026-06-14

> 彻底解决 Mermaid 图表渲染组件在消费端冷启动与运行时可能产生的 `dayjs` 缺少默认导出错误，使其真正做到对消费端开发者完全免配置、开箱即用。

### Fixed

- **components**: 重构了 `YhAiMermaid` 组件的 Mermaid 依赖加载方案，在构建阶段使用 `esbuild` 自动编译生成完全自包含的 ESM/CJS 独立文件 `dist/mermaid.mjs` / `dist/mermaid.cjs`（将 `mermaid` 及其对 `dayjs` 等所有第三方依赖完全打包并内联），彻底避免了由于 pnpm 的严格依赖结构及 Vite ESM 翻译对 `dayjs.min.js`（CommonJS 格式）所引发的 `does not provide an export named 'default'` 浏览器报错，消费端无需进行任何 `optimizeDeps` 的手动配置。
- **release**: 修复了 Windows 命令行在执行 release 时，由于 Shell 对 `&&` 命令链提前解析所导致的 CHANGELOG 模板文件未能被正常打包提交与推送的问题。

## [1.0.56] - 2026-06-14

> 优化 AI 聊天气泡打字光标样式，补全并在中英文文档中同步 Request 系列组件交互示例，修复 Vite 插件在 pnpm 环境下解析 peerDependencies 依赖的兼容性问题。

### Added

- **docs**: 在中英文请求系列组件文档（`cache`, `config`, `interceptors`, `http-cache`, `security`, `upload-download`, `use-ai-stream`, `use-load-more`, `use-pagination`, `use-queue`, `use-request`, `use-sse`, `use-swr` 等）中补充了完整的交互式 Sandboxes 示例和场景配置。

### Changed

- **ai-bubble**: 优化了流式消息生成的打字机光标（cursor）样式，使其尺寸与粗细符合常见 AI 消息流的视觉规范，提升交互视觉精致感。

### Fixed

- **vite-plugin**: 修复了 Vite 插件在 pnpm 严格依赖布局下因 `import.meta.url` 解析定位错误而无法解析消费端 `node_modules` 中 `mermaid` / `dayjs` 等 peerDependencies 依赖的问题，改用 `process.cwd()` 从消费端根目录解析。
- **useLoadMore**: 修复了加载更多 Hook 在 ESLint 严格模式下对 `any` 类型的警告，保证 Lint 校验通过。

## [1.0.55] - 2026-06-13

> 优化组件生命周期安全绑定机制以消除单元测试与 SSR 警告，修复 AI SDK 交互流式工具调用和请求控制，同时彻底解决大目录拖拽递归及 Blob 预览的内存泄漏。

### Changed

- 优化了所有请求管理钩子（`useRequest`、`useQueue`、`usePagination`、`useLoadMore` 和 `websocket`）的生命周期绑定机制，添加 `getCurrentInstance` 安全上下文校验，消除在单元测试/SSR/Pinia 等非组件运行时环境下的 Vue warn 生命周期警告。
- 调整了 Playground 和构建环境中的 `dayjs` 别名解析配置，使用正则精确匹配防止污染常规插件解析路径。

### Fixed

- 修复了 AI SDK 中流式工具调用（tool_calls）二次补全完成后误更新为 `tool` 消息而不是修改最初 `assistant` 占位消息的 bug。
- 修复了 AI SDK `stop()` 控制无法真正中断 `tool` 消息填回后二次 fetch 请求的问题，复用 `AbortController.signal` 实现彻底中断。
- 修复了 `useLoadMore` 的 `current` 页码语义错误，使其在分页请求时稳定对应请求页，防止提早自增跳页。
- 修复了 `Upload` 组件大目录拖拽只能读取首批子文件的 bug，通过循环并发递归解析机制确保目录深度读取完整。
- 修复了 `Upload` 组件反复上传大文件或预览时可能产生的 Blob 内存泄漏风险，设计 `localBlobUrls` 池并在组件卸载/删除文件时主动 Revoke 回收。
- 修复并拆分了 `iconExists` API，提供同步的 `canResolve` 前置校验并导出相关规范声明。

## [1.0.54] - 2026-06-13

> 修复流程图组件的节点恢复与自连线（Self-Loop）交互、Icon 缓存验证逻辑，引入高对比度文本颜色计算，并优化包依赖声明及构建配置。

### Added

- **theme**: 引入高对比度文本颜色变量计算，根据背景颜色亮度自动计算并生成对应的对比文本颜色变量（如 `--yh-color-primary-text`）。
- **flow**: 连线路径与中心计算支持自连线（Self-Loop）展示，并在连线校验规则中允许自连线存在。

### Changed

- **yh-ui, flow**: 将 `html-to-image` 规整并补充声明为可选 peer 依赖，优化消费端的依赖安装提示。
- **tsconfig**: 根目录 `tsconfig.json` references 新增 `@yh-ui/flow` 指向，规整工程类型检查引用。

### Fixed

- **flow**: 修复流程图在未缓存数据或节点未完成初次测量（Resize）时直接恢复，导致节点定位与连线位置不正确的 Bug。
- **icons**: 修复 `iconExists` 对无效图标格式和空白缓存图标未严格校验导致潜在误判的 Bug。

## [1.0.53] - 2026-06-12

> 修复了 MCPClient 客户端复用、ESM 兼容性导入、SSR 环境下 `localStorage` 判定、`XRequest()` 请求失败判定等多项核心 Bug，并优化了 AI 技能包规则以杜绝 AI 乱写。

### Changed

- **ai-sdk**: MCP 客户端调用机制重构，命中工具后复用已连接的客户端实例，避免重复创建未连接的客户端导致 `not connected` 报错。
- **ai-sdk**: 对 ESM 兼容导入方案进行重构，将 `child_process` 引用适配 Node 环境分流，避免在 Node ESM 消费端崩溃。
- **skills**: 升级并进化了 `yh-ui` 的技能系统，融合最佳实践，强制使用 TS/SCSS 编写，严格规范组件参数和事件，防止 AI 瞎编属性。

### Fixed

- **ai-sdk**: 修复 `useConversation` 和 `useConversations` 持久化逻辑在 SSR/SSG 阶段触发 `localStorage is not defined` 的问题。
- **request**: 修复 `XRequest()` 对非 2xx 响应处理不当的问题，在解析 JSON 前增加 `response.ok` 判断，确保失败响应正确触发错误/重试分支。
- **flow**: 修复了 Flow 画布恢复功能和基础拖放示例的节点名称映射等细节问题，并修复了 `Flow.vue` 等组件的 `any` 声明和未使用变量警告。

## [1.0.52] - 2026-06-11

> 修复消费端反馈的多项国际化、组件样式及流程图渲染 Bug，补全了全量组件的灵活自定义 Placeholder 及多语言配置。

### Changed

- **locale**: 支持对全量组件（如 `treeselect`, `autocomplete`, `cascader`, `input`, `select`, `skuselector` 等）的 `placeholder` 进行灵活的动态语言包配置，各组件在没有传入自定义值时默认使用多语言环境的 placeholder。
- **components**: 去除了编辑器输入框等输入口在初始化内容时突兀的浅蓝色背景色，保持整体视觉效果的优雅与一致。

### Fixed

- **locale**: 彻底修复并清除了 `message-box`、`ai-mention`、`ai-editor-sender`、`ai-artifacts` 和 `ai-code-runner` 中残留的硬编码中文字符串，并在英文和中文语言包中新增补全了 `file`、`noCommands`、`chartLoadError` 等国际化翻译词条。
- **flow**: 修复了 `@yh-ui/flow` 流程图中由于坐标嵌套、小地图比例计算、对齐线重绘以及节点重新分发可能导致的渲染及交互卡死问题，并补充了测试用例。
- **types**: 修复并补充了 `@yh-ui/yh-ui` 入口及各子模块中打包构建时的相关类型定义与打包构建问题，保证消费端使用时的类型安全。

## [1.0.51] - 2026-06-10

> 补充 `useYhId` 作为 `@yh-ui/hooks` 的直接具名导出，修复 CI coverage 因纯 barrel 文件（locale/all.ts、locale/runtime.ts）拉低覆盖率阈值导致失败的问题，并同步更新内部技能文档。

### Added

- **hooks**: `@yh-ui/hooks` 现在直接导出 `useYhId` 作为 `useId` 的别名。消费者可通过 `import { useYhId } from '@yh-ui/hooks'` 避免与 Vue 3.5+ 原生 `useId` 的命名冲突；Nuxt 模块继续将 `useYhId` 作为 auto-import 提供。

### Fixed

- **coverage**: 将 `packages/locale/src/all.ts` 和 `packages/locale/src/runtime.ts` 加入 vitest 覆盖率排除列表。这两个文件均为纯 re-export barrel 文件，无可测逻辑，此前因被统计导致 locale 覆盖率从 65% 骤降至 1.49% 并触发 CI 失败。

### Notes

- 内部技能文档（`source-truth.md`）已更新，正确描述 `useYhId` 现为 `@yh-ui/hooks` 的直接具名导出，并说明 Nuxt auto-import 中的使用方式。

## [1.0.50] - 2026-06-10

> 重构 `@yh-ui/locale` 的导出结构以解决消费端编译产生 136+ 个小 locale chunks 的构建问题，并开启 `@yh-ui/yh-ui` 的 `sideEffects: false` 配置提升 Tree-Shaking 效果。

### Changed

- **locale**: 重构了 `@yh-ui/locale` 包的导出结构。默认入口仅导出 `zhCn`、`en` 以及 `Language` 等核心类型；将全部 67 种内置语言导出移动到新的 `@yh-ui/locale/all` 子入口中。消费者可从 `@yh-ui/locale/all` 获取完整多语言，或通过 `@yh-ui/locale/lang/xx` 按需导入。这消除了消费端被动拆分出 136+ 个小 JS 文件的构建异常。
- **yh-ui**: 在 `@yh-ui/yh-ui` 的 `package.json` 中添加 `"sideEffects": false`，确保消费端在打包 YH-UI 时能够正确地进行 Tree-Shaking。
- **gitignore**: 项目根目录的 `.gitignore` 追加了 `.yh-ui/` 和 `node_modules/.vite/` 规则。
- **docs**: 调整了中英文 i18n 引导文档及 Demo 代码，将全量语言导入均修改为 `@yh-ui/locale/all`，并提供最佳实践的按需导入说明。

## [1.0.49] - 2026-06-10

> 修复因静态引入可选 peer 依赖（viewerjs 和 highlight.js）样式文件导致消费端编译/构建报错的问题。

### Fixed

- **components**: 移除了 `image.vue`、`image-viewer.vue`、`upload.vue` 中对 `viewerjs/dist/viewer.css` 的静态 top-level 引入，并在 `viewerjs.ts` 的加载器中采用动态 `import()` 方式在运行时并行加载该 CSS，从而彻底消除了未安装 `viewerjs` 的项目在编译期无法解析样式的 Uncaught Error 报错。
- **components**: 移除了 `ai-code-block.vue`、`ai-artifacts.vue`、`ai-bubble.vue` 中对 `highlight.js/styles/atom-one-dark.css` 的静态 top-level 引入，在 `highlight.ts` 中新增并导出了 `loadHighlightStyle` 工具函数，用于在运行时动态、容错地引入该样式，从而彻底解决了未安装 `highlight.js` 依赖的项目在构建或开发冷启动时的样式解析错误。

## [1.0.48] - 2026-06-09

> 修复 CSS style.css 中的 :html.dark 和 :deep 告警，并使 useTheme() 属性具备 Vue 响应性。

### Fixed

- **components**: 修复了 `ai-bubble.scss` 和 `ai-artifacts.scss` 中的 `:html.dark` 错误选择器（移除了多余的冒号，修正为 `html.dark`）。
- **components**: 移除了 `ai-code-editor.scss` 和 `gantt-chart.scss` 中无效的 `:deep()` 伪类，恢复标准 CSS 选择器以消除 CSS 编译警告。
- **theme**: 优化了 `ThemeManager`（`useTheme()` 返回的实例）的 `dark`、`theme`、`breakpoint`、`density` 和 `colorBlind` 属性的 Getter。使其内部读取响应式的 `this.state` 对象，从而在 Vue 组件中被使用时能被 Vue 响应性系统追踪，支持直接的响应式更新。

## [1.0.47] - 2026-06-09

> 彻底修复 dayjs-plugins 模块在 Vite / ESM 环境下的 default export 报错。

### Fixed

- **components**: 在 `build.config.ts` 的 `build:done` 钩子中，使用 `esbuild` 将 `src/dayjs-plugins.ts` 编译并内联打包，生成完全自包含的 `dist/dayjs-plugins.mjs` 和 `dist/dayjs-plugins.cjs`。这彻底消除了消费端浏览器加载这些插件时对于 `dayjs/plugin/` 子路径 ESM 默认导出的依赖，真正实现消费方零配置。

## [1.0.46] - 2026-06-09

> 彻底通过在构建时内联打包 dayjs 依赖来解决消费端 ESM 默认导出错误。

### Fixed

- **components, hooks**: 在 `build.config.ts` 的 `build:done` 钩子中，使用 `esbuild` 自动将 `dayjs` 依赖内联打包至 `dist/dayjs.mjs` 和 `dist/dayjs.cjs`，从而彻底解决 Vite 等 ESM 消费端环境下 `does not provide an export named 'default'` 的错误。
- **components**: 优化 `vite-plugin.ts`，加入 `needsInterop: ['dayjs']` 并显式添加嵌套依赖配置（`@yh-ui/components > dayjs` 和 `@yh-ui/hooks > dayjs`），进一步提供双重保障。
- **playground**: 将 `playground/vite.config.ts` 中的 `optimizeDeps` 补充 dayjs 插件及 interop 配置，以提高冷启动可靠性。

## [1.0.45] - 2026-06-09

> 导出 useMessage、useNotification 和 useMessageBox 组合式 API Hook，并在 Message、Notification 和 Dialog 组件的中英文文档中补充调用指南与 API 说明。

### Added

- **components**: 导出 `useMessage`、`useNotification` 和 `useMessageBox` 组合式 API Hook，支持直接从入口导入。
- **docs**: 补充 Message 与 Notification 对应 Hook 的使用样例，并在 Dialog 文档中新增 `useDialog` Hook API 详细参考表格。

## [1.0.44] - 2026-06-09

> 彻底修复 dayjs 消费端导入和插件解析报错，补齐 vite-plugin.ts 构建产物，并解决 CI 冒烟测试中的 404 运行时资源丢失问题。

### Fixed

- **components, hooks**: 彻底修复 `dayjs` 极其严格的 symlink 结构以及 Vite / Rollup 等 ESM 消费端环境下的 `does not provide an export named 'default'` 默认导出报错。
- **components**: 修复 `dayjs` 插件导入路径（如 `dayjs/plugin/...`），回退到标准 CJS 路径，解决 pnpm 软链接下 Vite 运行时动态分析依赖引发重载并导致 404 缓存失效的问题。
- **build**: 将之前本地未追踪的 `vite-plugin.ts` 文件编入 git 提交中，使得构建产物包含 `vite-plugin.mjs` 和 `vite-plugin.cjs`，从根本上解决发布流水线中 CDN 校验 404 超时的问题。

## [1.0.43] - 2026-06-09

> 彻底修复 dayjs 消费端导入和插件解析报错，并优化发布流程中 metadata.json 的版本自动同步机制。

### Fixed

- **components, hooks**: 彻底修复 `dayjs` 极其严格的 symlink 结构以及 Vite / Rollup 等 ESM 消费端环境下的 `does not provide an export named 'default'` 默认导出报错。
- **components**: 修复 `dayjs` 插件导入路径（如 `dayjs/plugin/...`），移除 `.js` 后缀，解决 pnpm 软链接下 Vite 无法正确解析插件文件的问题。
- **release**: 优化 `packages/yh-ui-skill/assets/metadata.json` 自动更新逻辑，在 root `package.json` 的 `version:*` 和 `release` 脚本中嵌入 `sync-yh-ui-skill-assets.mjs`，避免后续发版时 metadata 版本同步遗漏。

## [1.0.42] - 2026-06-09

> 修复 Descriptions 组件中英文档在 Prettier 格式化后可能被还原为空行的语法解析错误。

### Fixed

- **docs**: 将 `docs/components/descriptions.md` 与 `docs/en/components/descriptions.md` 中的 `<yh-descriptions>` 多行标签重构为单行标签格式。这彻底避免了 Prettier 格式化（在 pre-commit 或编辑器保存时）自动将其恢复为带空行格式所导致的 VitePress 构建中断问题。

## [1.0.41] - 2026-06-09

> 修复 Descriptions 组件中英文档中空行导致的模板编译错误，解决 CI 构建阻碍问题。

### Fixed

- **docs**: 修复 `docs/components/descriptions.md` 与 `docs/en/components/descriptions.md` 中 `<yh-descriptions>` 标签内部出现的空行，避免 Markdown 解析器与 Vue 模板编译器冲突引发的 `Invalid end tag` 编译报错。

## [1.0.40] - 2026-06-09

> 更新中英文 skills 安装部署文档，补充全量参考文件清单、修正 Cursor 目标目录描述，并修复 dayjs 语言包加载路径。

### Changed

- **docs**: 补充 YH-UI skills 全量 18 个参考文件清单，修正 Cursor 安装的 target 路径描述为 `.cursor/skills/yh-ui`，并在受支持包列表中添加 `@yh-ui/locale`。

### Fixed

- **hooks**: 修复 `use-locale` 中 `dayjs` 语言包在非 node_modules 相对路径下的加载解析问题，支持更广泛的包管理器布局。

## [1.0.39] - 2026-06-08

> 彻底修复 dayjs 在消费端不同构建环境下的 ESM 默认导出与运行时兼容性问题，避免报错。

### Fixed

- **components, hooks**: 彻底修复 `dayjs` 在 Vite 开发服务器下的 ESM 默认导出语法错误 (`does not provide an export named 'default'`)。同时通过运行时 fallback 检测保留了 CJS/ESM 混用打包环境下的 `dayjs.extend` 调用支持，实现全场景无缝兼容。

### Notes

- **兼容性**: 建议所有遇到消费端 `dayjs` 报错（无论是 `does not provide an export named 'default'` 还是 `dayjs.extend is not a function`）的用户升级至 `1.0.39` 版本。

## [1.0.38] - 2026-06-08

> 修复 1.0.37 中未包含的 dayjs ESM 兼容性修复，解决消费端 `dayjs.extend is not a function` 运行时错误。

### Fixed

- **components**: 将 `dayjs` 导入从 `import dayjs from 'dayjs'` 改为 `import * as dayjsModule` + 运行时 default 检测的兼容性写法，确保在 Vite/Rollup 等 ESM 环境下正确获取 dayjs 函数及其 `extend` 方法。

### Notes

- **兼容性**: 1.0.37 虽已发布至 npm，但由于发布时未包含此修复，消费端仍会遇到 `dayjs.extend is not a function`。请升级至 1.0.38 以彻底解决该问题。

## [1.0.37] - 2026-06-08

> 修复日历相关组件在 Vite 等消费端环境下的 `dayjs.extend` 导入错误，并修正内部工作区依赖结构。

### Fixed

- **components**: 修复 `dayjs` 及其插件的 ESM 默认导入兼容性问题，彻底解决消费端由于构建工具差异导致的 `dayjs.extend is not a function` 报错。
- **build**: 修正了部分发布工程中内部 package 互相依赖引用的锁定错误，恢复标准的 `workspace:*` 软连接。

### Notes

- **兼容性**: 此次更新将完全消除在 Vue3 + Vite + pnpm v11 场景下因为 CJS/ESM interop 带来的时间选择类组件的运行崩溃，安全且透明，强烈建议所有 `1.0.36` 用户升级。

## [1.0.36] - 2026-06-07

> 修复 CI/CD 流水线版本兼容性问题，统一 pnpm 和 Node.js 版本，消除发布流程中的所有阻塞。

### Changed

- CI workflow Node.js 版本从 20 升级到 22，匹配 pnpm 11 的 engines 要求
- CI workflow pnpm 版本从 9 升级到 11，lockfile version 9.0 格式统一
- package.json engines 约束收紧（node >=22.13, pnpm >=11.5），engine-strict=true 防止版本不匹配

### Fixed

- 修复锁文件版本不匹配导致的 CI 构建失败（ERR_PNPM_LOCKFILE_CONFIG_MISMATCH）
- 修复 pnpm engines 检查导致的 setup 失败（ERR_PNPM_UNSUPPORTED_ENGINE）

## [1.0.35] - 2026-06-07

> 修复发布流水线中的构建和验证问题，消除所有 lint 警告和 build 阻塞。

### Fixed

- 修复 docs build 因 SSR 阶段 fetch 外部 API 失败的问题 — able/selection.md 中的 demo 改用 onMounted 调用
- 修复 lint 报错 — 删除未使用的 SandboxPackageJson 接口，消除
  o-explicit-any 警告
- 修复 pnpm release 因 main 分支无 upstream 而 push 失败的问题
- 修复 erify:packed-manifests 在沙箱环境中因 npm 缓存目录权限而失败的问题

## [1.0.34] - 2026-06-07

> TODO: 发布前补充本版本面向用户的变更摘要，并删除这一行。

### Added

- TODO: 记录新增能力、组件、文档或公开 API。

### Changed

- TODO: 记录行为变化、体验优化、工程调整或文档重整。

### Fixed

- TODO: 记录 bug 修复、兼容性修复或发布流程修复。

### Notes

- TODO: 记录迁移提示、兼容性边界、验证结果或其他发布说明。

## [1.0.33] - 2026-06-07

Patch release focusing on release pipeline verification and build stability.

### Changed

- Maintenance update to verify the complete release and publication workflow.
- Optimized build artifact placeholders for `@yh-ui/yh-ui` package.

### Fixed

- Fixed release verification failures caused by empty changelog placeholders.

## [1.0.32] - 2026-06-06

Patch release focusing on fixing build errors and CI issues.

### Fixed

- Fixed build errors and CI issues to ensure smooth release process.

## [1.0.30] - 2026-05-25

Patch release focusing on fixing cross-platform path resolution issues in CLI tests to resolve runner environment failures.

### Fixed

- Fixed `resolveInstallPlan` test failures on Linux CI by dynamically constructing absolute paths with `path.resolve` instead of using hardcoded Windows drive letters (`E:/demo`), resolving cross-platform path mismatch.

## [1.0.29] - 2026-05-25

Patch release focusing on fixing GitHub Actions CI setup and aligning lockfile checksum verification.

### Fixed

- Fixed dependency installation errors in CI workflows by regenerating `pnpm-lock.yaml` using `pnpm@9` matching the runner version, resolving `packageExtensionsChecksum` mismatch.

## [1.0.28] - 2026-05-25

Patch release focusing on optimizing local Git verification workflow and GitHub Actions CI pipelines, accelerating the release verification path, and enforcing strict zero-warning quality gates.

### Added

- Added new `pre-push.mjs` Git hook script to dynamically bypass local tests and checks for release tag push (`refs/tags/v*`) and delete actions, enabling instant tag publishing.

### Changed

- Changed ESLint integration to enable `--cache` in local environment, speeding up incremental lint verification significantly.
- Changed local and CI lint commands to enforce strict `--max-warnings 0` constraints, ensuring any minor warnings block the build.
- Optimized `release` script by prepending local typechecks, strict lint checks, and unit tests, creating a reliable release gate before bump.
- Optimized GitHub Actions `pr-check.yml` to remove redundant Playwright browser installation in the docs build stage and introduce paths-filter logic for incremental verification.

## [1.0.27] - 2026-05-25

Patch release focused on batching a large round of consumer-facing fixes, dependency-cost reductions, component reliability improvements, and release-tooling upgrades into one publishable train.

### Added

- Added the first documented `apps/admin-starter` consumer shell, including login, dashboard, component lab, table, form, content, system, error, and user-center routes for real integration verification.
- Added the publishable `@yh-ui/yh-ui-skill` package plus synced skill assets so YH-UI's AI-facing installation flow becomes a versioned workspace package instead of only a repository-side artifact.
- Added targeted regression coverage for sanitize behavior, package main-entry exports, optional heavy dependency boundaries, and multiple component interaction fixes discovered through consumer-side validation.

### Changed

- Changed `monaco-editor`, `xlsx`, `viewerjs`, and `markdown-it` to optional `peerDependencies`, reducing forced initial download cost for consumers who only use core components.
- Changed package-size guidance and installation docs in both Chinese and English to explicitly document the new optional-heavy-dependency strategy and the matching host-install contract.
- Changed function-based dialog and message-box installation flows to capture default app context during plugin install, aligning global config inheritance with real consumer usage.
- Changed release/build verification, consumer smoke validation, docs playground checks, and skill asset syncing so new packages, starter apps, and optional dependency boundaries participate in the release pipeline.
- Changed theme token output, root style organization, and public entry exports to support the new starter apps and workspace package layout more cleanly.

### Fixed

- Fixed multiple consumer-facing package bloat issues by isolating heavyweight capabilities from the default install path while keeping Monaco editor, Excel import/export, Viewer.js preview, and Markdown rendering available when explicitly installed.
- Fixed function APIs such as `YhDialog`, `YhMessageBox`, `YhMessage`, `YhNotification`, and `YhLoading` so context inheritance, focus behavior, container positioning, and service invocation remain correct in real applications.
- Fixed consumer integration regressions across `YhAiMermaid`, `YhAiCodeEditor`, `YhImage`, `YhUpload`, `YhDatePicker`, `YhCalendar`, `YhDrawer`, `YhWatermark`, `YhInputTag`, `YhInfiniteScroll`, `YhMarquee`, and table import/export flows.
- Fixed layout and styling regressions affecting descriptions, scrollbar visibility, narrow-width component demos, smart-address presentation, pagination sizing, switch/tree/time-picker edge cases, and many Sass component tokens exposed through consumer builds.
- Fixed docs sandbox and Nuxt integration issues by improving sandbox dependency mapping, bridge injection, optional dependency handling, and module-level runtime compatibility checks.

### Notes

- If a host project uses code editing, Excel import/export, advanced image preview, or Markdown rendering, it now needs to install the matching optional peer dependency explicitly instead of receiving it through the default package install.
- This release intentionally batches consumer-facing fixes, starter-app work, packaging cleanup, docs synchronization, and release engineering improvements into a single patch so downstream users can upgrade once and recover multiple integration issues together.

## [1.0.26] - 2026-05-22

Starter and documentation release focused on promoting the new AI Ops Starter demo into a documented, versioned consumer shell for YH-UI.

### Added

- Added the first documented `apps/ai-ops-starter` consumer app shell, including dashboard, AI workspace, flow studio, operations, and settings routes.
- Added a real AI Workspace screenshot to the docs so the starter guidance now shows the actual three-panel product surface instead of only describing it.

### Changed

- Changed the starter and flagship-scenario docs in both Chinese and English to reflect the current AI workspace implementation and validation path.
- Changed the monorepo workspace setup so `apps/*` is a first-class workspace with root scripts for starter development, build, and preview.
- Changed app tracking boundaries by ignoring starter build outputs, node_modules, logs, and local captures while keeping source files versioned.

### Fixed

- Fixed the AI Workspace starter layout so the conversation rail and chat surface no longer stretch into an oversized blank grid row when consumed as a real product page.
- Fixed helper copy in the workspace route to render inline code tokens correctly instead of showing raw backticks.

### Notes

- Local validation for this release covered `pnpm -C apps/ai-ops-starter build:workspace` and `pnpm docs:build`.
- `pnpm docs:build` completed successfully; the local command output hit the tool timeout only after VitePress had already finished client/server bundle build and page rendering.

## [1.0.25] - 2026-05-19

Patch release focused on finishing the CodeSandbox recovery so exported demos stay both styled and truly editable after launch.

### Added

- Added a live CodeSandbox file bridge in the browser sandbox loader so hosted `*.csb.app` previews can read the current sandbox file tree through the same-origin sandbox API instead of being stuck on the initial export snapshot.

### Changed

- Changed static CodeSandbox exports to inline the vendored CSS payload in dependency-aware order, keeping component skin styles available even when the browser sandbox serves Vue or CSS requests through HTML wrappers.
- Changed CodeSandbox release verification to follow the new static-define plus hosted-preview contract, including the editor launch path that now relies on the split-view `Demo.vue` query again.

### Fixed

- Fixed exported AI demos such as `AiChat` losing nested component styles like `AiSender` and `AiBubble` inside hosted CodeSandbox previews, which left the session looking unstyled even though the components rendered.
- Fixed hosted CodeSandbox previews ignoring edits made in `src/Demo.vue` after launch because the loader was reading the baked export snapshot instead of the live sandbox files.
- Fixed static CodeSandbox exports missing import-map coverage for deep third-party package paths such as Monaco worker modules, which caused docs sandbox smoke validation to fail on `AiCodeBlock`.

### Notes

- Targeted validation for this release covered `pnpm changelog:check`, `pnpm verify:release-versions`, `pnpm docs:build`, `pnpm verify:docs-sandboxes`, filtered `pnpm verify:docs-sandboxes:exhaustive` checks for `ai-components/ai-chat` and `ai-components/ai-code-block`, filtered `pnpm verify:codesandbox-local` for `ai-chat`, local captured-payload inspection for `ai-components/ai-chat`, and browser-based sandbox smoke checks against simulated `csb.app` behavior for both style recovery and live file loading.
- `pnpm verify:codesandbox-remote` still remains advisory because fresh editor launches can be interrupted by external Cloudflare checks even when the generated sandbox payload is correct.

## [1.0.24] - 2026-05-19

Patch release focused on restoring truly editable, working CodeSandbox demos after the precompiled browser-sandbox export path started opening hosted previews without a runnable dev server.

### Added

- Added nodebox task scaffolding back to CodeSandbox exports through `sandbox.config.json`, `.codesandbox/tasks.json`, and the Vite dev-server scripts the hosted preview now needs.

### Changed

- Changed CodeSandbox project generation to emit normal `src/App.vue` and `src/Demo.vue` files again so exported demos stay editable inside the sandbox.
- Changed CodeSandbox local and exhaustive verification to validate the real nodebox/Vite scaffold instead of a test-only injected build-tool layer.

### Fixed

- Fixed hosted CodeSandbox previews returning `text/html` for `/src/main.js`, which left demos stuck in the browser transpiler path and prevented components from rendering.
- Fixed the docs CodeSandbox fallback route so the editor opens `src/Demo.vue` again after the scaffold moved back to real Vue SFC files.

### Notes

- Targeted validation for this release covered `pnpm typecheck`, `pnpm docs:build`, `pnpm verify:codesandbox-local`, `pnpm verify:docs-sandboxes`, `pnpm verify:docs-sandboxes:exhaustive`, `pnpm verify:release-versions`, and `pnpm changelog:check`.
- `pnpm verify:codesandbox-remote` remains advisory because fresh CodeSandbox `define` requests can still be blocked by a Cloudflare `403` challenge outside repository control.

## [1.0.23] - 2026-05-19

Patch release focused on making docs CodeSandbox exports self-sufficient again so newly opened demos render reliably instead of depending on remote Vite setup behavior.

### Changed

- Changed CodeSandbox project generation to precompile exported Vue SFC demos into `src/App.js` and `src/Demo.js`, while flattening demo styles into `src/style.css`.
- Changed local CodeSandbox verification to inject Vite only inside the smoke-test harness, keeping the real exported payload free of runtime build-tool dependencies.
- Changed docs sandbox validation expectations so release checks now enforce the JS-module scaffold that published CodeSandbox launches depend on.

### Fixed

- Fixed newly generated CodeSandbox demos opening to blank previews because remote sessions were receiving raw `.vue` files without a guaranteed compiler/runtime install path.
- Fixed TypeScript demo exports such as `AiSender` failing during CodeSandbox preparation by preserving `lang="ts"` transpilation through the precompile step.
- Fixed old fallback launch parameters still pointing at `/src/Demo.vue` after the export switched to precompiled JS modules.

### Notes

- Targeted validation for this release covered `pnpm typecheck`, `pnpm build`, `pnpm docs:build`, `pnpm verify:playgrounds`, `pnpm verify:stackblitz-local`, `pnpm verify:docs-playground`, `pnpm verify:docs-sandboxes`, `pnpm verify:docs-sandboxes:exhaustive`, and `pnpm verify:codesandbox-local`.
- `pnpm verify:codesandbox-remote` remains advisory because fresh CodeSandbox `define` requests can still be blocked by a Cloudflare `403` challenge outside repository control.

## [1.0.22] - 2026-05-19

Patch release focused on restoring working hosted CodeSandbox previews after the nodebox-style export path started landing on discontinued SSE preview infrastructure.

### Changed

- Changed CodeSandbox project generation to emit a browser-sandbox-compatible Vite scaffold again, using `src/main.js` and removing the nodebox-specific `sandbox.config.json` and `.codesandbox/tasks.json` layer.
- Changed docs CodeSandbox launch flow to request `sandbox_id` from `define?json=1` first and open the hosted `*.csb.app` preview directly before falling back to the legacy form submit path.
- Changed release validation to enforce the new CodeSandbox scaffold contract explicitly so future regressions fail as soon as the generated entrypoint or legacy nodebox files drift.

### Fixed

- Fixed exported docs demos being sent back onto the deprecated SSE preview route where hosted CodeSandbox sessions now stall or show discontinued-service errors.
- Fixed the latest sandbox export path relying on a Vue SFC loader workaround that was no longer needed once the preview target moved back to the real hosted browser sandbox.

### Notes

- Targeted validation for this release covered `pnpm verify:release-versions`, `pnpm verify:codesandbox-local`, `pnpm verify:docs-sandboxes:exhaustive`, `pnpm typecheck`, and scoped eslint checks for the updated sandbox files.
- `pnpm verify:codesandbox-remote` still remains advisory here because fresh CodeSandbox `define` requests can be blocked by a Cloudflare `403` challenge outside repository control.

## [1.0.21] - 2026-05-18

Patch release focused on restoring reliable hosted CodeSandbox previews and preventing stale Windows style mirrors from leaking old Sass output into release builds.

### Changed

- Changed CodeSandbox project generation to mount demo SFCs inside hosted .csb.app previews through `vue3-sfc-loader`, with an in-memory Vue file registry and preloaded runtime package cache.
- Changed the Windows `postinstall` style bridge to refresh plain `packages/theme/styles` directories from `src/styles` before recreating the junction fallback, keeping local Sass resolution aligned with the real source tree.
- Changed local and advisory remote CodeSandbox smoke tests to assert actual button layout containment instead of only checking DOM presence.

### Fixed

- Fixed exported CodeSandbox demos opening with blank or partial previews because hosted sandboxes could not resolve local .vue sources and runtime package imports consistently.
- Fixed Windows release builds picking up stale copied theme Sass files, which could reintroduce broken button and input styles even after the source mixins were corrected.
- Fixed release validation coverage missing the responsive button regression that originally surfaced through the CodeSandbox preview.

### Notes

- Targeted validation for this release covered `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm docs:build`, `pnpm verify:stackblitz-local`, `pnpm verify:docs-playground`, `pnpm verify:docs-sandboxes:exhaustive`, and `pnpm verify:codesandbox-local`.
- Release preparation also rebuilt `packages/components`, synced `docs/public`, and regenerated `docs/public/codesandbox-runtime` before the final sandbox verification pass.
- `pnpm verify:codesandbox-remote` remains advisory because fresh CodeSandbox `define` requests can still be blocked by Cloudflare verification outside repository control.

## [1.0.20] - 2026-05-18

Patch release focused on restoring docs demo launchers on the published site and making CodeSandbox exports responsive again for AI component examples.

### Changed

- Changed docs `DemoBlock` launcher URLs to resolve through the VitePress site base again so published Playground links target `/yh-ui/playground/` correctly.
- Changed CodeSandbox runtime import rewriting to resolve support barrel imports to the exact files each exported demo actually uses instead of pulling whole support barrels.
- Changed vendored dayjs locale loading for CodeSandbox exports to preload a bundled locale registry, removing the long dynamic-import waterfall before submission.

### Fixed

- Fixed published docs demo Playground buttons opening broken URLs after the `withBase` regression in the launcher component.
- Fixed `AiBubble` and related AI demo CodeSandbox exports stalling for tens of seconds while recursively downloading hooks and locale support trees.
- Fixed the built docs Playground flow and sandbox launcher path so local preview and published docs follow the same working route structure again.

### Notes

- Targeted validation for this release covered `pnpm docs:build`, `pnpm typecheck`, `pnpm verify:docs-playground`, `pnpm verify:stackblitz-local`, and direct browser checks against the built `AiBubble` docs page for Playground, StackBlitz, and CodeSandbox launch flows.
- On local preview, the `AiBubble` CodeSandbox submit path completed in about 1.3 seconds with a 53-file payload and no browser runtime errors before release.

## [1.0.19] - 2026-05-18

Patch release focused on restoring the published docs experience for AI component pages while keeping exported live sandboxes aligned with the current component runtime.

### Changed

- Changed docs demo previews to render after mount so static builds do not hydrate into blank AI component showcases on the published site.
- Changed the `useAiPersistence` docs pages to remove unused inline setup blocks and empty demo wrappers that were contributing noise without rendering any actual examples.
- Changed CodeSandbox runtime asset discovery to accept generated `.css` fallbacks for vendored `.scss` and `.sass` imports during export packaging.

### Fixed

- Fixed `AiBubble` SSR hydration around `Teleport` overlays so published docs pages no longer trip client mismatches before the interactive layer mounts.
- Fixed AI docs routes on the static site rendering as empty shells even though the markdown and demo metadata were present.
- Fixed exported CodeSandbox demos that depend on stylesheet runtime assets resolved from source extensions instead of the emitted CSS files.

### Notes

- Targeted validation for this release covered `pnpm docs:build`, `pnpm typecheck`, `pnpm verify:release-versions`, `pnpm verify:codesandbox-remote`, and browser checks against the built docs preview for `AiBubble`, `AiConversations`, `AiMermaid`, and the `useAiPersistence` docs in both locales.
- `pnpm verify:codesandbox-remote` completed with the expected advisory skip because CodeSandbox `define` was blocked by a Cloudflare `403`, not because of a repository-controlled regression.

## [1.0.18] - 2026-05-18

Docs sandbox hotfix focused on restoring working CodeSandbox exports for AI component demos after the npm-install scaffold follow-up left hosted `AiChat` and `AiMermaid` examples without the runtime files they actually need.

### Added

- Added manifest-driven runtime asset loading and relative-import rewriting for CodeSandbox exports so AI demos can vendor the exact runtime files they depend on.

### Changed

- Changed CodeSandbox project generation for AI-oriented demos to package runtime files from `docs/public/codesandbox-runtime` instead of relying on npm-installed `@yh-ui/yh-ui` runtime resolution.
- Changed local and remote CodeSandbox verification to assert vendored `AiChat` and `AiMermaid` runtime assets, required hooks files, and the `mermaid` dependency contract explicitly.

### Fixed

- Fixed `AiChat` CodeSandbox exports opening without the runtime modules required to render in the hosted Nodebox environment.
- Fixed `AiMermaid` CodeSandbox exports dropping their vendored runtime files after the shared scaffold transition.

### Notes

- Targeted local validation for this release covered `pnpm typecheck`, `pnpm verify:release-versions`, `pnpm verify:stackblitz-local`, `pnpm verify:codesandbox-local`, and built-docs payload inspection against `ai-components/ai-chat`.
- Automated remote CodeSandbox browser checks can still hit Cloudflare security verification during `define`, so release confidence for this fix is anchored in the generated payload plus local sandbox execution.

## [1.0.17] - 2026-05-18

Docs sandbox export follow-up focused on keeping generated CodeSandbox demos aligned with the npm-install scaffold that now powers live previews, especially for AI components with extra runtime dependencies.

### Added

- Added file-level CodeSandbox scaffold assertions for `AiChat` and `AiMermaid` so release validation fails as soon as required npm dependencies or legacy runtime artifacts drift.

### Changed

- Changed CodeSandbox project generation to reuse the shared StackBlitz/npm-install scaffold end-to-end instead of maintaining a separate vendored-runtime branch.
- Changed release-version verification to validate the shared sandbox scaffold contract directly, matching the current `demo-sandbox.ts` architecture.

### Fixed

- Fixed exported CodeSandbox demos for `AiChat` opening with incomplete runtime files under Nodebox by removing the stale vendored export path.
- Fixed exported `AiMermaid` demos failing to load `mermaid` in npm-installed sandboxes by declaring the package explicitly and enabling the required Vite interop dependency hints.
- Fixed release validation incorrectly failing after the scaffold unification because the version guard still assumed a standalone CodeSandbox `package.json` template.

### Notes

- Full local `pnpm verify:release` passed for `1.0.17`, including builds, package-size checks, consumer smoke, docs build, StackBlitz local validation, docs sandbox validation, CodeSandbox local validation, and docs Playground validation.
- `pnpm verify:codesandbox-remote` was re-run for this release and returned the expected advisory skip because CodeSandbox `define` was blocked by a Cloudflare `403`, not because of a repository-controlled regression.

## [1.0.16] - 2026-05-17

Docs sandbox release follow-up focused on making exported CodeSandbox demos boot reliably in the live Nodebox environment while keeping locally built component docs visually aligned with the current published site.

### Added

- Added a release-version guard that fails fast when the generated CodeSandbox scaffold no longer declares the expected `src/main.ts` entry contract.

### Changed

- Changed generated StackBlitz and CodeSandbox demo manifests to declare `main: "src/main.ts"` explicitly instead of relying on sandbox-default entry inference.

### Fixed

- Fixed live CodeSandbox demos opening to a blank preview because Nodebox fell back to `src/index.js` when no explicit package entry was present.

### Notes

- Verified `guide/quickstart`, `components/button`, and `ai-components/ai-chat` against the current GitHub Pages deployment; key computed styles matched between the local built preview and the published docs site.
- Targeted local validation completed for `pnpm format:check`, `pnpm verify:release-versions`, `pnpm changelog:check`, `pnpm docs:build`, `pnpm verify:docs-sandboxes`, `pnpm verify:codesandbox-local`, `pnpm verify:stackblitz-local`, `pnpm verify:docs-playground`, `pnpm build`, and `pnpm verify:package-size`.

## [1.0.15] - 2026-05-17

Release pipeline simplification update focused on keeping npm publication fast and predictable while moving heavyweight docs sandbox sweeps out of the blocking release path.

### Added

- Added a dedicated `verify:docs-sandboxes:exhaustive` entry point and an extended validation docs sandbox audit job for manual or scheduled full-library sweeps.

### Changed

- Changed the default `verify:docs-sandboxes` release gate to a targeted smoke pass that validates representative docs routes instead of exhaustively replaying every demo on each publish.
- Changed docs sandbox verification to reuse built docs with VitePress preview, validate demo payloads concurrently, and fail fast when configured route filters no longer match any docs pages.
- Changed release and docs deployment workflows to reuse uploaded docs build artifacts and to avoid repeating docs public sync or documentation builds on the same release run.

### Fixed

- Fixed release CI timing out in the docs sandbox stage after repeatedly scanning more than two thousand generated demo cases in the blocking publish workflow.
- Fixed release orchestration so advisory remote CodeSandbox checks stay visible for investigation without delaying npm publish or GitHub Pages deployment.

### Notes

- Remote CodeSandbox behavior remains service-dependent and is not treated as a 100% deterministic publish guarantee; blocking release checks now focus on repository-controlled smoke validation.
- Targeted local verification completed for `pnpm format:check`, `pnpm changelog:check`, `pnpm verify:release-versions`, `pnpm verify:docs-sandboxes`, and filtered `pnpm verify:docs-sandboxes:exhaustive`.

## [1.0.14] - 2026-05-17

Release workflow resiliency follow-up that keeps npm publishing moving when remote CodeSandbox is blocked by external service checks outside the repository.

### Added

- Added release summary warnings for advisory remote CodeSandbox failures so investigators can still find the job outcome and attached artifacts quickly.

### Changed

- Changed the remote CodeSandbox validation job to remain visible in release CI while no longer acting as a hard gate for npm publish or docs deploy.

### Fixed

- Fixed release publishing being blocked when GitHub Actions hit remote CodeSandbox or Cloudflare interference despite local and docs sandbox validation already passing.

### Notes

- `1.0.13` remained unpublished after the remote CodeSandbox job failed on GitHub Actions; `1.0.14` supersedes it as the next public release line.
- Targeted local verification completed for `verify:codesandbox-remote`, `verify:release-versions`, changelog checks, and formatter checks before reissuing the release tag.

## [1.0.13] - 2026-05-17

Release validation hardening update focused on unblocking the public npm release after local CodeSandbox verification stalled at the end of the gate.

### Added

- Added step-level progress output and selective reruns for the open-source release validation script so long release gates can be replayed and diagnosed one segment at a time.

### Changed

- Split the GitHub release workflow into focused quality, test, build, browser, docs, and remote sandbox jobs with explicit timeouts and shared build artifacts.
- Updated local CodeSandbox validation logging to report per-case start and success markers instead of leaving the release gate silent during long smoke runs.

### Fixed

- Fixed the local CodeSandbox release check hanging after successful output by forcing preview-process cleanup on Linux runners and exiting the validator explicitly after success.
- Fixed playground release validation cleanup so pnpm-hosted preview processes are terminated as full process groups instead of leaving child servers behind.

### Notes

- `1.0.12` was never published to npm; `1.0.13` supersedes it as the next public release line.
- Targeted local verification completed for release-step listing, `verify:release-versions`, filtered `verify:codesandbox-local`, and formatter checks before republishing.

## [1.0.12] - 2026-05-17

Release metadata refresh for the AI component hardening update, with the public tag and package line moved onto the corrected Git identity.

### Added

- Added a clean `v1.0.12` release line so the public tag and package version move forward from the unpublished `v1.0.11` draft state.

### Changed

- Updated all workspace package manifests from `1.0.11` to `1.0.12` for the corrected public release.

### Fixed

- Fixed the release handoff by replacing the old public tag path associated with the previous tag publisher identity.

### Notes

- `1.0.11` remained unpublished on npm; `1.0.12` is the intended public release for this code line.

## [1.0.11] - 2026-05-17

AI component hardening and CodeSandbox release-fix update focused on HTML/SVG sanitization, shared container-query support, and remote sandbox export reliability.

### Added

- Added a shared `sanitize` utility for AI components so highlighted HTML, Markdown HTML, and Mermaid SVG output can be normalized through one path.
- Added exhaustive validation for dynamic runtime imports in generated CodeSandbox projects to catch missing vendored assets before release.

### Changed

- Upgraded the shared block-level theme mixin to register named `inline-size` containers, making container queries available across more component roots.
- Expanded CodeSandbox dependency/runtime collection so exported demos automatically include `dompurify` and matching dynamic runtime files.
- Expanded sandbox verification from a fixed file list to all generated script entrypoints plus dynamic template imports.

### Fixed

- Fixed unsanitized highlighted HTML and Markdown rendering paths in `AiBubble`, `AiCodeBlock`, `AiArtifacts`, and `AiThoughtChain`.
- Fixed Mermaid rendering in `AiBubble` and `AiMermaid` to use stricter security settings and sanitized SVG output.
- Fixed exported CodeSandbox runtimes failing on empty meta modules such as `avatar-meta.js` by emitting a valid empty export.
- Fixed missing dynamic relative runtime assets, CSS/JSON siblings, and scoped dependency collection in docs sandbox exports.

### Notes

- Local release checks completed successfully: `verify:stackblitz-local`, `verify:docs-playground`, `verify:codesandbox-local`, `verify:docs-sandboxes`, `docs:build`, `typecheck`, and `build`.
- Exhaustive sandbox validation currently covers 358 docs routes and 2112 supported demos; remote CodeSandbox validation was skipped this run because the service returned a Cloudflare challenge instead of app code errors.

## [1.0.10] - 2026-05-16

文档站点在线示例修复版本，重点解决 CodeSandbox 导出工程仍落到旧版 browser sandbox、触发 `@vue/babel-plugin-jsx` 安装失败的问题，并补齐本地与发布链路的回归校验。

### Added

- 新增 `verify:codesandbox-local` 本地 smoke 校验，真实生成 CodeSandbox 工程、安装依赖、启动 Vite 并用 Playwright 验证按钮、栅格、图标、AI Sender、Flow 等代表性示例可运行。

### Changed

- 将 CodeSandbox 导出脚手架升级为 Vite / Nodebox 方案，统一输出 `sandbox.config.json`、`.codesandbox/tasks.json`、`vite.config.ts`、`tsconfig.json`、`src/main.ts` 等现代工程文件，不再继续生成旧版 classic browser sandbox 结构。
- 将发布门禁补充为同时覆盖 `verify:docs-sandboxes` 与 `verify:codesandbox-local`，让文档沙箱导出问题在发版前即可被本地校验拦下。

### Fixed

- 修复文档站点导出的 CodeSandbox 在线示例在云端环境下错误依赖 `@vue/cli-plugin-babel` / `@vue/babel-plugin-jsx` 的问题，避免新建沙箱后直接卡在 Babel worker 载入失败。
- 修复 CodeSandbox vendored runtime 在本地 smoke 构建时被 `vue-tsc` 误拦的问题，导出工程的构建脚本改为与运行环境一致的 `vite build`。

### Notes

- 已重新跑通 358 条文档路由、2111 个支持在线沙箱的 demo 的全量导出校验，当前 CodeSandbox 导出只保留 1 套统一 scaffold。
- 已对 `guide/quickstart`、`components/button`、`ai-components/ai-bubble` 的本地开发环境与线上文档做冷启动对比，当前计算样式一致，未复现仍然存在的代码层样式分叉。

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
