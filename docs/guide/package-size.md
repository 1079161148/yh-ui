# 包体积分层

YH-UI 的功能面很宽，发布策略必须避免让所有用户为少数重型场景付费。推荐按“入口分层 + 按需导入 + 可选依赖”的方式使用。

## 分层入口

| 场景           | 推荐入口            | 说明                                      |
| -------------- | ------------------- | ----------------------------------------- |
| 常规业务应用   | `@yh-ui/yh-ui`      | 安装完整组件库和通用能力                  |
| 只使用基础组件 | `@yh-ui/components` | 更清晰的组件层依赖                        |
| 只使用主题能力 | `@yh-ui/theme`      | 主题、Token、CSS 变量                     |
| 只使用组合函数 | `@yh-ui/hooks`      | 不引入组件 UI                             |
| 只使用图标     | `@yh-ui/icons`      | Iconify 字符串 API 与独立图标组件         |
| 请求与流式能力 | `@yh-ui/request`    | Fetch、缓存、SSE、队列、上传下载          |
| 流程图编辑器   | `@yh-ui/flow`       | 独立 Flow 包                              |
| AI SDK 集成    | `@yh-ui/ai-sdk`     | AI 组合函数、LangChain/Vercel AI SDK 集成 |
| Nuxt 项目      | `@yh-ui/nuxt`       | Nuxt 模块和 SSR 集成                      |

## 重型能力边界

以下能力应作为显式选择，而不是普通表单页面的默认成本：

- Monaco Editor
- Mermaid
- ECharts
- XLSX
- Flow 编辑器
- AI SDK / LangChain 集成

这些依赖已经通过子包、可选依赖或独立入口隔离。业务项目如果只使用 Button、Input、Form、Table 的基础能力，不应主动引入 AI、Flow 或编辑器运行时。

### 可选 Peer 依赖提醒

从当前版本开始，重型或特定用途的第三方依赖已统一移入 `peerDependencies`，并通过 `peerDependenciesMeta.optional` 标记为可选依赖。

这意味着：

- 仅安装 `@yh-ui/yh-ui` 或 `@yh-ui/components` 时，不会被强制额外下载这些重型运行时，使得宿主项目具有极低的首装成本。
- 只有在你实际启用对应的高级能力时，才需要由宿主项目显式安装相关依赖。

常见可选对等依赖（peerDependencies）与对应功能映射如下：

- **编辑器与渲染**：
  - `monaco-editor`：`YhAiCodeEditor` 等代码编辑器场景
  - `markdown-it`：AI 聊天等场景中的 Markdown 渲染支持
  - `highlight.js`：Markdown 渲染中的代码语法高亮
  - `mermaid`：Markdown 渲染中的 Mermaid 图表绘制
- **数据、图表与多媒体**：
  - `xlsx`：`YhTable` 的 Excel 导入 / 导出能力
  - `viewerjs`：`YhImage`、`YhUpload` 的高级图片预览与旋转缩放能力
  - `echarts`：`YhChart` 图表可视化场景
- **流程图编辑器（`@yh-ui/flow`）**：
  - `dagre` / `elkjs` / `d3-force`：流程图自动布局插件（Dagre, Elk, 力导向布局）
  - `html-to-image`：流程图高保真图片/截图导出功能
- **AI 框架集成（`@yh-ui/ai-sdk`）**：
  - `@langchain/core`：与 LangChain 框架结合的 AI 模型及链式调用支持

宿主项目可按需安装所需依赖：

```bash
# 例如仅需要使用 Excel 导出、图表以及流程图截图导出功能：
pnpm add xlsx echarts html-to-image
```

如果你只使用其中某一项能力，只安装对应依赖即可。

## 推荐做法

```ts
import { YhButton, YhInput } from '@yh-ui/components'
import '@yh-ui/components/style.css'
```

在大型应用中，优先配合 `unplugin-vue-components` 自动导入：

```ts
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from '@yh-ui/yh-ui/resolver'

export default {
  plugins: [
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
}
```

## 体积评估与行业对比

为了保障宿主应用的首屏加载性能，每一项子包的运行时体积都经过了精细打磨。以下是 YH-UI 实际构建产物在行业内同类库中的体积水平评估：

### 核心运行时大小对照

- **`@yh-ui/components`（核心组件库）**：核心运行时（Gzip 压缩）仅 **460 KB** 左右，相较于 Element Plus（JS ~800KB）或 Ant Design Vue（JS ~2.1MB）更为轻量。
- **`@yh-ui/flow`（流程图编辑器）**：未压缩的单文件 JS 仅 **55.6 KB**，在同类流程图编辑器（如 Vue Flow ~80KB 或 bpmn-js ~2MB）中具有绝对的体积优势。
- **`@yh-ui/ai-sdk`（AI 集成库）**：未压缩的单文件 JS 仅 **15.5 KB**，通过将大体量的 LangChain 等依赖进行可选对等依赖隔离，实现了极轻量的底层 AI 通讯集成。

### 为什么选择分层方案？

基于 YH-UI 的“包体积分层”和“按需引入”策略，开发者拥有完全的**打包体积偏向与裁剪控制权**：

1. **“按需消费”**：如果您仅需要常规的 Form、Button 和 Table，只需安装 `@yh-ui/components` 即可，这避免了 AI 聊天窗口或流程图编辑器的大体量逻辑污染您的首屏资源包。
2. **“渐进式升级”**：当后续业务增加 AI 交互或可视化拓扑图功能时，再引入 `@yh-ui/ai-sdk` 或 `@yh-ui/flow`，实现了功能与加载体积的渐进式对等。

## 发布检查

发布前需要关注：

- `pnpm build` 的包产物体积输出
- `pnpm verify:package-size` 中维护的包体积预算
- `pnpm verify:consumer-smoke` 中 Vite 和 Nuxt 的真实消费构建
- 文档站和 playground 是否错误引入重型运行时

如果某次发布引入明显体积增长，需要在 changelog 中说明原因和收益。
