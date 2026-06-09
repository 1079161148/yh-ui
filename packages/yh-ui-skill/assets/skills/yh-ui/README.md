# YH-UI Agent Skill

[中文文档 (Chinese Documentation)](./README.zh-CN.md)

This directory packages YH-UI knowledge for modern AI coding agents. It is designed as a small, progressive cross-platform skill: one `SKILL.md` file acting as the entry point, plus progressively loaded reference files.

## Use Cases

- Generate Vue 3 or Nuxt 3 code with YH-UI components.
- Choose the correct YH-UI package boundary for a task.
- Avoid hallucinated component names, packages, theme options, and locale paths.
- Enforce 100% prioritization of YH-UI's built-in components and utilities over writing custom HTML elements.
- Provide AI agents with precise recipes for data tables, form schemas, AI chat bubbles, flow canvases, themes, and icons.

## Design Principles

- `SKILL.md` is the trigger surface and central manual for the AI.
- Reference files are loaded progressively by task, keeping the agent's context small and efficient.
- `references/source-truth.md` is the compiled export map generated from source packages.
- `references/vue-component-practices.md` defines Vue 3.5+ setup guidelines, TS type-safety structures, and component encapsulation decisions.
- Deep recipe files hold high-value code blocks for advanced scenarios:
  - `recipes-table.md`: Virtual scrolls, cell slots, data export, printing.
  - `recipes-form-schema.md`: Repeating lists (`type: 'list'`), custom renderers.
  - `recipes-ai.md`: DeepSeek-R1 thinking steps (`YhAiThoughtChain`), code execution, Mermaid diagrams.
  - `recipes-flow.md`: BPMN and AI workflow nodes, resizers, toolbars, undo/redo logs.
  - `recipes-theme.md`: Global config providers, density, preset themes, WCAG contrast.
  - `recipes-icons.md`: Iconify collection loads, inline SVG.
- `codegen-rubric.md` provides strict evaluation rules (fails the AI if it writes custom CSS/HTML for controls supported by YH-UI).

## Installation & Usage

You can deploy these rules into your local IDE setups using the monorepo CLI:

```bash
# Install to Cursor (.cursor/rules/)
npx @yh-ui/yh-ui-skill install --target cursor

# Install to Trae (.traerules or root config)
npx @yh-ui/yh-ui-skill install --target cursor

# Export to general project directory (.yh-ui/)
npx @yh-ui/yh-ui-skill install --target project
```

### Manual Configuration

- **Cursor**: Create/update `.cursorrules` or drop these files into `.cursor/rules/`.
- **Trae**: Create/update `.traerules` at the project root with the core rules from `SKILL.md`. In chats, use `#SKILL.md` to reference rules.
- **Claude Project / Custom GPTs**: Upload `SKILL.md` and the `references/` files as custom knowledge documents.

## Release Checklist

- Run `pnpm verify:yh-ui-skill`.
- Run `pnpm generate:yh-ui-skill` when component exports or priority APIs change.
- Confirm `references/source-truth.md` and `references/api-cheatsheet.md` matches package exports when components are added or renamed.
- Run the prompts in `references/eval-scenarios.md` against at least one target AI model before a major skill release.
