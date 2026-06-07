# Starter 计划

Starter 的作用不是展示组件，而是让团队在第一周就能把产品壳搭出来。

对 YH-UI 来说，starter 应该是开源增长层的第一优先级之一。

## 第一个免费 starter 应该是什么

建议先做一个 **AI + 运营后台混合工作台 starter**，因为它最能同时体现：

- AI 组件
- 后台布局
- 表格与筛选
- Flow 页面入口
- 主题与多语言
- Request 层能力

## 这个 starter 至少要包含什么

### 工程层

- Vue 3.5 + Vite
- `@yh-ui/yh-ui`
- `@yh-ui/request`
- `@yh-ui/flow`
- 主题切换与多语言
- 路由、布局、mock 数据、基础权限壳

### 页面层

- 仪表盘首页
- AI 工作台页
- 运营表格页
- Flow 编排页
- 设置 / 主题 / 语言页

## 当前已落地的 AI Ops Starter

现在仓库里已经补上了第一版真实消费端壳子：`apps/ai-ops-starter`。

它不是单页 demo，而是一个可以直接启动、继续演化、并用来反向验证组件库真实使用面的产品壳。

### 已实现的页面骨架

- `Dashboard`：控制塔首页，展示 starter 当前状态、路线和依赖模式
- `Workspace`：三栏 AI 工作台，包含会话栏、生成式主工作区、思维链与知识来源侧栏
- `Flow Studio`：流程编排页壳
- `Operations`：偏运营后台的数据面板页
- `Settings`：工作区与租户级设置页

### AI Workspace 当前效果

这一页现在已经从“组件拼盘”收敛成更像真实产品面的结构：

- 左侧 `Conversation Rail` 承载会话切换与新建 lane
- 中间 `Generative Surface` 承载多轮对话、推荐 prompt、清空 / 停止 / 工件打开动作
- 右侧承载 `Thought chain` 与 `Knowledge recall`
- 工件抽屉通过 `YhAiArtifacts` 打开，形成完整的工作台闭环

<img src="/images/starter/ai-workspace.png" alt="AI Workspace Starter" class="zoomable" />

### 这版 starter 的意义

- 它让组件库问题可以在真实消费层暴露，而不只是在 docs demo 里看起来“能用”
- 它让布局、状态、滚动、密度和复杂面板组合这些问题更早暴露
- 它为后续独立 starter repo、showcase、付费模板和产品级 blocks 提供母版

### 当前验证方式

- `pnpm starter:dev:workspace`
- `pnpm starter:build:workspace`

其中 `workspace` 模式直接消费 monorepo 源码，适合在修组件时立刻验证真实产品面是否仍然成立。

### 体验层

- 空状态、加载状态、错误状态
- 桌面端优先，同时给出窄视口策略
- 明确的导航、面包屑、筛选、抽屉、详情结构

## 什么不算 starter

下面这些不够：

- 只有几个组件拼成的静态 demo
- 没有布局、路由和状态的样例页
- 没有错误和空状态的“截图工程”
- 不能直接被团队拿去改造成内部系统的仓库

## 后续 starter 序列

| Starter                 | 目标场景               | 优先级   |
| ----------------------- | ---------------------- | -------- |
| AI Ops Starter          | AI 工作台 + 数据后台   | 第一优先 |
| Workflow Studio Starter | Flow 编排与节点配置    | 第二优先 |
| Commerce Ops Starter    | 商品、订单、筛选、导出 | 第三优先 |

## 交付标准

starter 至少应该满足：

- `pnpm install` 后可以直接启动
- 有清晰的目录结构
- 有真实页面，不是空白壳
- 有说明文档、截图和二次开发提示
- 能作为 showcase 与 blocks 的来源仓库

## 与开源 / 商业化的关系

starter 适合采用“免费 starter 打开采用，后续增值层再收费”的方式：

- 免费 starter：降低首次采用门槛
- 付费 starter / blocks：提供更高完成度业务资产
- 付费支持：帮助团队真正落地

这比过早把基础组件切成半开源更健康。
