# YH-UI Skills Setup

YH-UI Skills is an AI coding knowledge pack for this repository. It gives AI tools source-aligned component exports, priority APIs, Vue practices, workflows, deep recipes, retrieval entry files, and anti-hallucination rules.

## Quick Install

Install the skill package, then use the CLI to copy the skill into the current project or AI tool directory.

::: code-group

```bash [npm]
# Install globally
npm i -g @yh-ui/yh-ui-skill

# Install into the current project
yh-ui-skill install

# Or install into Cursor
yh-ui-skill install --target cursor
```

```bash [pnpm]
# Run once without a global install
pnpm dlx @yh-ui/yh-ui-skill install --target cursor
```

```bash [yarn]
# Run once without a global install
yarn dlx @yh-ui/yh-ui-skill install --target claude
```

:::

The installer writes `skills/yh-ui`, `llms.txt`, `llms-full.txt`, and an install manifest into the selected target directory.

Default target directories:

```txt
project  -> .yh-ui/
cursor   -> .cursor/
claude   -> .claude/
codex    -> .codex/
markdown -> yh-ui-skill/
```

Common commands:

```bash
yh-ui-skill install
yh-ui-skill install --target cursor
yh-ui-skill install --target codex --force
yh-ui-skill install --out-dir ./.custom-skill
yh-ui-skill doctor --target claude
```

::: tip Repository development
When developing inside this repository, use `skills/yh-ui/`, `llms.txt`, and `llms-full.txt` directly.
:::

## Use Cases

- Use the real packages and exports from `@yh-ui/yh-ui`, `@yh-ui/components`, `@yh-ui/nuxt`, `@yh-ui/request`, `@yh-ui/flow`, `@yh-ui/ai-sdk`, `@yh-ui/theme`, `@yh-ui/icons`, and `@yh-ui/locale`.
- Generate YH-UI component demos, admin pages, AI chat experiences, Flow canvases, request hooks, Nuxt integration code, global configurations, themes, and icon sets.
- Correct hallucinated legacy APIs or missing components such as `createYhTheme`, `createRequestInstance`, or invalid locale paths.
- Provide `llms.txt` and `llms-full.txt` as retrieval entry files for search-oriented AI tools.

## File Locations

Inside the YH-UI repository, the main entry is:

```txt
skills/yh-ui/SKILL.md
```

Retrieval entry files:

```txt
llms.txt
llms-full.txt
```

Common reference files:

```txt
skills/yh-ui/references/source-truth.md
skills/yh-ui/references/agent-workflows.md
skills/yh-ui/references/vue-component-practices.md
skills/yh-ui/references/component-map.md
skills/yh-ui/references/usage-patterns.md
skills/yh-ui/references/api-cheatsheet.md
skills/yh-ui/references/nuxt.md
skills/yh-ui/references/ai-components.md
skills/yh-ui/references/request.md
skills/yh-ui/references/flow.md
skills/yh-ui/references/recipes-table.md
skills/yh-ui/references/recipes-form-schema.md
skills/yh-ui/references/recipes-ai.md
skills/yh-ui/references/recipes-flow.md
skills/yh-ui/references/recipes-theme.md
skills/yh-ui/references/recipes-icons.md
skills/yh-ui/references/codegen-rubric.md
skills/yh-ui/references/eval-scenarios.md
```

## Use With AI Tools

### ChatGPT / Claude

Upload or paste `skills/yh-ui/SKILL.md` as the primary context, then add the relevant references for the task.

Suggested order:

1. `skills/yh-ui/SKILL.md`
2. `skills/yh-ui/references/source-truth.md`
3. `skills/yh-ui/references/api-cheatsheet.md`
4. A task-specific recipe such as `recipes-table.md` or `recipes-flow.md`

Prompt example:

```txt
You are generating Vue 3 code for the YH-UI project. Follow skills/yh-ui/SKILL.md first, then use source-truth.md and api-cheatsheet.md to choose real components, props, emits, slots, and exposed methods.
```

### Cursor / Trae / Windsurf / Editor Agents

Open the repository root as the workspace and generate configuration files in the project to ensure the agent can index the rules:

- **Cursor**: Use `install --target cursor` to write rules and retrieval files into the `.cursor/` directory (e.g., `.cursor/skills/yh-ui`).
- **Trae**: Create a `.traerules` file in the project root directory and paste the contents of `SKILL.md` into it. In conversations, you can directly reference the rules file via `#SKILL.md`.

Ensure the project includes the retrieval entries:

```txt
skills/yh-ui/
llms.txt
llms-full.txt
```

Then reference the skill explicitly in the task or Chat window:

```txt
Use skills/yh-ui/SKILL.md as the YH-UI rules. Generate a Vue 3 page with YhTable, filters, pagination, loading, empty state, and typed rows.
```

### Codex / Local Agents

When working inside the repository, tell the agent to read the skill directly:

```txt
Read skills/yh-ui/SKILL.md first, then follow references/agent-workflows.md to complete this YH-UI task.
```

If the task involves a complex component, explicitly add the matching recipe:

```txt
This task involves Flow. Read references/recipes-flow.md as well.
```

## Regenerate Source Truth

Run this after component exports, priority component APIs, Flow APIs, or AI component APIs change:

```bash
pnpm generate:yh-ui-skill
```

It updates:

```txt
skills/yh-ui/references/source-truth.md
skills/yh-ui/references/api-cheatsheet.md
```

The generator uses TypeScript AST extraction for:

- `export const xxxProps`
- `export const xxxEmits`
- typed `defineEmits`
- `interface XxxSlots`
- `interface XxxExpose` / `interface XxxInstance`
- `defineExpose({ ... })`
- `const expose = { ... }; defineExpose(expose)`

Vue template slot names are scanned as a supplement.

## Verify Skill

Run before submitting changes:

```bash
pnpm verify:yh-ui-skill
```

The verification checks:

- Required skill files exist.
- `source-truth.md` covers exported `Yh*` components from source.
- Reference files contain key packages, components, Vue practices, and workflows.
- Normal reference files do not contain known hallucinated APIs.
- `llms.txt` and `llms-full.txt` exist.

Recommended full check:

```bash
pnpm generate:yh-ui-skill
pnpm verify:yh-ui-skill
pnpm typecheck
```

## Writing Prompts

When writing prompts, try to provide three kinds of information:

- What to do: page, component, fix, migration, or review.
- Scope boundaries: Vue, Nuxt, Request, Flow, AI SDK, or component packages.
- Acceptance criteria: type safety, real components, accessibility, SSR safety, and loading/error/empty states.

Example:

```txt
Based on skills/yh-ui/SKILL.md, generate a Nuxt page for a Flow AI workflow editor.
Requirements:
- Use real exports from @yh-ui/flow.
- Use <ClientOnly> in Nuxt.
- Give the canvas an explicit height.
- Keep node data serializable.
- Do not invent component names or props.
```

## Maintenance Tips

- After adding a new component, run `pnpm generate:yh-ui-skill` first, then add any required recipes.
- For complex components, prefer high-value `references/recipes-*.md` guidance instead of only adding API tables.
- When you find recurring AI mistakes, record them in `evals/`, then feed the correction back into `codegen-rubric.md` or the relevant recipe.
- `source-truth.md` and `api-cheatsheet.md` are generated files. Long-term rules should live in scripts or non-generated references.
