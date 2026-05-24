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

从当前版本开始，`monaco-editor`、`xlsx`、`viewerjs`、`markdown-it` 已统一移入 `peerDependencies`，并通过 `peerDependenciesMeta.optional` 标记为可选依赖。

这意味着：

- 仅安装 `@yh-ui/yh-ui` 或 `@yh-ui/components` 时，不会被强制额外下载这 4 个重型运行时
- 普通业务页面默认可以获得更低的首装成本，不再为编辑器、Excel、Viewer、Markdown 渲染能力“预付费”
- 只有在你实际启用对应能力时，才需要由宿主项目显式安装相关依赖

常见能力映射如下：

- `monaco-editor`：`YhAiCodeEditor` 等代码编辑器场景
- `xlsx`：`YhTable` 的 Excel 导入 / 导出能力
- `viewerjs`：`YhImage`、`YhUpload` 的高级图片预览能力
- `markdown-it`：AI 内容中的 Markdown 渲染场景

推荐把它理解为“消费端零初始强下载成本”策略：基础组件先装先用，重型能力按场景补装。

```bash
pnpm add monaco-editor xlsx viewerjs markdown-it
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

## 发布检查

发布前需要关注：

- `pnpm build` 的包产物体积输出
- `pnpm verify:package-size` 中维护的包体积预算
- `pnpm verify:consumer-smoke` 中 Vite 和 Nuxt 的真实消费构建
- 文档站和 playground 是否错误引入重型运行时

如果某次发布引入明显体积增长，需要在 changelog 中说明原因和收益。
