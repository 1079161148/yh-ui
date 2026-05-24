# YH-UI Skills 安装使用

YH-UI Skills 是为 AI 编程工具准备的项目知识包。它把组件导出、重点 API、Vue 组件实践、Nuxt/Request/Flow/AI SDK 工作流、深度 recipes 和反幻觉规则整理成一组可被 AI 读取的文档，让 ChatGPT、Claude、Cursor、Codex 等工具在生成 YH-UI 代码时更贴近当前源码。

## 快速安装

推荐通过 npm 包安装技能库，然后用 CLI 安装到当前项目或 AI 工具目录。

::: code-group

```bash [npm]
# 全局安装技能库
npm i -g @yh-ui/yh-ui-skill

# 安装到当前项目
yh-ui-skill install

# 或安装到 Cursor
yh-ui-skill install --target cursor
```

```bash [pnpm]
# 免全局安装，直接执行一次
pnpm dlx @yh-ui/yh-ui-skill install --target cursor
```

```bash [yarn]
# 免全局安装，直接执行一次
yarn dlx @yh-ui/yh-ui-skill install --target claude
```

:::

安装命令会把 YH-UI Skills 写入目标目录下的 `skills/yh-ui`，并同时复制 `llms.txt`、`llms-full.txt` 与安装清单文件。

默认目标目录：

```txt
project  -> .yh-ui/
cursor   -> .cursor/
claude   -> .claude/
codex    -> .codex/
markdown -> yh-ui-skill/
```

常用命令：

```bash
yh-ui-skill install
yh-ui-skill install --target cursor
yh-ui-skill install --target codex --force
yh-ui-skill install --out-dir ./.custom-skill
yh-ui-skill doctor --target claude
```

::: tip 当前仓库开发态
如果你是在 YH-UI 仓库内开发 skill，不需要先安装 npm 包，直接使用仓库里的 `skills/yh-ui/`、`llms.txt` 和 `llms-full.txt` 即可。
:::

## 适用场景

- 让 AI 正确使用 `@yh-ui/yh-ui`、`@yh-ui/components`、`@yh-ui/nuxt`、`@yh-ui/request`、`@yh-ui/flow`、`@yh-ui/ai-sdk`。
- 生成 YH-UI 组件示例、后台页面、AI Chat、Flow 画布、Request hooks、Nuxt 集成代码。
- 修复 AI 编造的旧 API 或不存在的组件，例如 `createYhTheme`、`createRequestInstance`、错误 locale 路径。
- 给检索型 AI 工具提供 `llms.txt` / `llms-full.txt` 入口。

## 文件位置

在 YH-UI 仓库内，核心入口是：

```txt
skills/yh-ui/SKILL.md
```

检索入口：

```txt
llms.txt
llms-full.txt
```

常用参考：

```txt
skills/yh-ui/references/source-truth.md
skills/yh-ui/references/api-cheatsheet.md
skills/yh-ui/references/agent-workflows.md
skills/yh-ui/references/vue-component-practices.md
skills/yh-ui/references/codegen-rubric.md
skills/yh-ui/references/recipes-table.md
skills/yh-ui/references/recipes-form-schema.md
skills/yh-ui/references/recipes-ai.md
skills/yh-ui/references/recipes-flow.md
```

## 在 AI 工具中使用

### ChatGPT / Claude

把 `skills/yh-ui/SKILL.md` 作为主上下文上传或粘贴，再按任务追加对应 reference。

建议顺序：

1. `skills/yh-ui/SKILL.md`
2. `skills/yh-ui/references/source-truth.md`
3. `skills/yh-ui/references/api-cheatsheet.md`
4. 当前任务相关 recipe，例如 Table 使用 `recipes-table.md`，Flow 使用 `recipes-flow.md`

提示词示例：

```txt
你正在为 YH-UI 项目生成 Vue 3 代码。请先遵守 skills/yh-ui/SKILL.md，再根据 source-truth.md 和 api-cheatsheet.md 选择真实存在的组件、props、emits、slots 和 exposed methods。
```

### Cursor / Windsurf / 代码编辑器 Agent

把仓库根目录作为工作区打开，确保 Agent 能读取：

```txt
skills/yh-ui/
llms.txt
llms-full.txt
```

然后在任务里明确引用：

```txt
请使用 skills/yh-ui/SKILL.md 作为 YH-UI 组件库规则，生成一个带筛选、分页和 loading 状态的 YhTable 页面。
```

### Codex / 本地 Agent

在仓库内工作时直接让 Agent 读取 skill：

```txt
先阅读 skills/yh-ui/SKILL.md，再按 references/agent-workflows.md 的流程完成这个 YH-UI 任务。
```

如果任务涉及复杂组件，额外指定 recipe：

```txt
这个任务涉及 Flow，请同时读取 references/recipes-flow.md。
```

## 更新 Source Truth

当组件导出、重点组件 API、Flow API 或 AI 组件 API 发生变化后，重新生成 skill 的源码索引：

```bash
pnpm generate:yh-ui-skill
```

该命令会更新：

```txt
skills/yh-ui/references/source-truth.md
skills/yh-ui/references/api-cheatsheet.md
```

生成脚本使用 TypeScript AST 抽取：

- `export const xxxProps`
- `export const xxxEmits`
- typed `defineEmits`
- `interface XxxSlots`
- `interface XxxExpose` / `interface XxxInstance`
- `defineExpose({ ... })`
- `const expose = { ... }; defineExpose(expose)`

Vue template 中的 `<slot>` 名称会作为补充扫描。

## 验证 Skill

提交前运行：

```bash
pnpm verify:yh-ui-skill
```

这个校验会检查：

- 必要的 skill 文件是否存在。
- `source-truth.md` 是否覆盖源码导出的 `Yh*` 组件。
- 参考文档是否包含关键包、组件、Vue practices 和 workflows。
- 普通参考文档中是否出现已知幻觉 API。
- `llms.txt` 和 `llms-full.txt` 是否存在。

推荐完整检查：

```bash
pnpm generate:yh-ui-skill
pnpm verify:yh-ui-skill
pnpm typecheck
```

## 编写任务提示词

写提示词时尽量给 AI 三类信息：

- 要做什么：页面、组件、修复、迁移、评审。
- 使用边界：Vue、Nuxt、Request、Flow、AI SDK、组件包。
- 验收标准：类型正确、真实组件、可访问性、SSR 安全、loading/error/empty 状态。

示例：

```txt
基于 skills/yh-ui/SKILL.md，为 Nuxt 页面生成一个 Flow AI 工作流编辑器。
要求：
- 使用 @yh-ui/flow 的真实导出。
- 在 Nuxt 中使用 <ClientOnly>。
- 画布必须有明确高度。
- 节点数据保持可序列化。
- 不要编造组件名或 props。
```

## 维护建议

- 新增组件后先跑 `pnpm generate:yh-ui-skill`，再补必要 recipe。
- 复杂组件优先补 `references/recipes-*.md`，不要只堆 API 表格。
- 发现 AI 经常犯的错，记录到 `evals/`，再把修正规则反向补进 `codegen-rubric.md` 或对应 recipe。
- `source-truth.md` 和 `api-cheatsheet.md` 是生成文件，长期规则应写在脚本或非生成 reference 中。
