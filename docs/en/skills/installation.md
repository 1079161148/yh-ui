# YH-UI Skills Setup

YH-UI Skills is an AI coding knowledge pack for this repository. It gives AI tools source-aligned component exports, priority APIs, Vue practices, workflows, deep recipes, retrieval entry files, and anti-hallucination rules.

## Quick Install

Install the skill package globally, then run the interactive installer for the current IDE or agent workspace.

::: code-group

```bash [npm]
# Install globally
npm i -g @yh-ui/yh-ui-skill

# Inject into the current IDE
npx yh-ui-skill
```

```bash [pnpm]
# Install globally
pnpm add -g @yh-ui/yh-ui-skill

# Inject into the current IDE
pnpm dlx yh-ui-skill
```

```bash [yarn]
# Install globally
yarn global add @yh-ui/yh-ui-skill

# Inject into the current IDE
yarn dlx yh-ui-skill
```

:::

The interactive installer copies the YH-UI Skills files into the current project or the configured skills directory for tools such as Cursor, Claude, Codex, local agents, or generic Markdown context.

::: tip Repository development
When developing inside this repository, use `skills/yh-ui/`, `llms.txt`, and `llms-full.txt` directly.
:::

## Main Files

```txt
skills/yh-ui/SKILL.md
llms.txt
llms-full.txt
```

High-value references:

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

## Use With AI Tools

For ChatGPT or Claude, attach `skills/yh-ui/SKILL.md` first, then add `source-truth.md`, `api-cheatsheet.md`, and the task-specific recipe.

For Cursor, Windsurf, Codex, or local agents, open the repository root and explicitly ask the agent to read:

```txt
skills/yh-ui/SKILL.md
```

Example:

```txt
Use skills/yh-ui/SKILL.md as the YH-UI rules. Generate a Vue 3 page with YhTable, filters, pagination, loading, empty state, and typed rows.
```

## Regenerate Source Truth

Run this after component exports or priority APIs change:

```bash
pnpm generate:yh-ui-skill
```

It updates:

```txt
skills/yh-ui/references/source-truth.md
skills/yh-ui/references/api-cheatsheet.md
```

The generator uses TypeScript AST extraction for exported props/emits, typed `defineEmits`, slot/expose interfaces, and `defineExpose(expose)` patterns. Vue template slots are scanned as a supplement.

## Verify

```bash
pnpm verify:yh-ui-skill
```

Recommended full check:

```bash
pnpm generate:yh-ui-skill
pnpm verify:yh-ui-skill
pnpm typecheck
```

## Prompt Pattern

```txt
Read skills/yh-ui/SKILL.md first. Use source-truth.md and api-cheatsheet.md to choose real YH-UI components and APIs. Do not invent components, props, emits, slots, or old APIs.
```

For complex features, add the matching recipe, such as `recipes-table.md`, `recipes-form-schema.md`, `recipes-ai.md`, or `recipes-flow.md`.
