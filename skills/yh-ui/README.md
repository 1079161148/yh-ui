# YH-UI Agent Skill

This directory packages YH-UI knowledge for modern AI coding agents. It is designed as a small cross-platform skill: one `SKILL.md` file plus progressively loaded reference files.

## Use Cases

- Generate Vue 3 or Nuxt code with YH-UI components.
- Choose the right YH-UI package for a task.
- Avoid hallucinated component names, package paths, theme APIs, and locale paths.
- Give AI agents compact examples for admin pages, AI chat, request hooks, flow editors, themes, icons, and locale setup.
- Anchor generated code to source exports documented in `references/source-truth.md`.

## Design Principles

- `SKILL.md` stays as the operating manual and trigger surface.
- Reference files are loaded progressively by task, keeping agent context small.
- `source-truth.md` is the compact export map and must match source exports.
- `api-cheatsheet.md` is generated from source using TypeScript AST extraction for priority props, emits, slots, and exposed methods.
- Deep recipe files hold opinionated high-value patterns for complex components.
- `codegen-rubric.md` defines what generated YH-UI code must satisfy.
- `eval-scenarios.md` captures regression prompts for checking AI behavior over time.

## How To Use

### ChatGPT, Codex, Claude, and compatible skill loaders

Add the `skills/yh-ui` folder as a project skill or knowledge folder. The primary entry is `SKILL.md`.

### Claude.ai / Claude Code style

Upload or reference this folder as a skill. The YAML frontmatter in `SKILL.md` provides the name and trigger description. Reference files are intentionally split so the model can load only what it needs.

### Cursor, Codex, and engineering agents

Point the agent to `skills/yh-ui/SKILL.md` before asking it to generate YH-UI code. For repository-level rules, reuse the core rules from `SKILL.md` in your agent instructions.

### ChatGPT project knowledge

Upload `SKILL.md` plus the `references` directory. Tell the assistant to read `SKILL.md` first and open reference files only when relevant.

## Release Checklist

- Run `pnpm verify:yh-ui-skill`.
- Run `pnpm generate:yh-ui-skill` when component exports or priority APIs change.
- Confirm package versions in the repository are current.
- Confirm `references/source-truth.md` matches package exports when components are added or renamed.
- Run the prompts in `references/eval-scenarios.md` against at least one target AI model before a major skill release.
- Confirm README links still resolve.
- Regenerate the skill if component package boundaries change.

## License

MIT. See `LICENSE.txt`.
