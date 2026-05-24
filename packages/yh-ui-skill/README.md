# @yh-ui/yh-ui-skill

`@yh-ui/yh-ui-skill` packages the YH-UI agent knowledge base as a publishable CLI.

## Install

```bash
npm i -g @yh-ui/yh-ui-skill
```

Or run it without a global install:

```bash
npx @yh-ui/yh-ui-skill install --target cursor
```

## Usage

```bash
yh-ui-skill install
yh-ui-skill install --target cursor
yh-ui-skill install --target codex --force
yh-ui-skill install --out-dir ./.yh-ui
yh-ui-skill doctor --target claude
```

## Targets

- `project`: install into `.yh-ui/`
- `cursor`: install into `.cursor/`
- `claude`: install into `.claude/`
- `codex`: install into `.codex/`
- `markdown`: export into `yh-ui-skill/`

## Package Contents

- `skills/yh-ui/`
- `llms.txt`
- `llms-full.txt`
- install manifest for doctor checks
