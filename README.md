# YH-UI

YH-UI is a Vue 3.5+ component system for serious product teams: a polished component library, theme engine, AI interaction kit, flow editor, request hooks, icon system, locale package, and Nuxt module in one monorepo.

The goal is not to clone an existing UI library. YH-UI is built for modern admin systems, AI-native products, ecommerce workflows, heavy data tables, and visual workflow applications.

<p>
  <a href="https://www.npmjs.com/package/@yh-ui/yh-ui"><img src="https://img.shields.io/npm/v/@yh-ui/yh-ui.svg?style=flat-square&colorB=409eff" alt="npm version"></a>
  <a href="https://github.com/1079161148/yh-ui/actions/workflows/pr-check.yml"><img src="https://img.shields.io/github/actions/workflow/status/1079161148/yh-ui/pr-check.yml?style=flat-square&label=CI&colorB=67c23a" alt="CI status"></a>
  <a href="https://www.npmjs.com/package/@yh-ui/yh-ui"><img src="https://img.shields.io/npm/dm/@yh-ui/yh-ui.svg?style=flat-square&colorB=409eff" alt="npm downloads"></a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@yh-ui/yh-ui.svg?style=flat-square" alt="license"></a>
</p>

## Links

- Documentation: https://1079161148.github.io/yh-ui/
- Quick start: https://1079161148.github.io/yh-ui/guide/quickstart
- AI agent skill: [skills/yh-ui](./skills/yh-ui)
- AI retrieval entry: [llms.txt](./llms.txt)
- Changelog: [CHANGELOG.md](./CHANGELOG.md)
- Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Security: [SECURITY.md](./SECURITY.md)

## Why YH-UI

YH-UI focuses on product-grade breadth and depth:

| Area                 | What YH-UI provides                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Core UI              | Vue 3 components with TypeScript types, SSR-aware utilities, theme tokens, and consistent install APIs                |
| AI UI                | Chat, sender, thought chain, code block, code editor, code runner, artifacts, prompts, sources, attachments, and more |
| Data and workflow    | Table, Gantt, Flow editor, virtual scrolling, import/export, printing, layout, history, collaboration-oriented APIs   |
| Theme system         | Presets, runtime CSS variables, dark mode, density, color-blind-friendly modes, and component-level theming           |
| Developer experience | Vite, Nuxt, on-demand import, playground, docs demos, consumer smoke tests, release verification scripts              |
| Global products      | Locale package and documented compatibility boundaries for browser, SSR, Node, Vue, and Nuxt support                  |

## Packages

| Package              | Purpose                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `@yh-ui/yh-ui`       | All-in-one entry package                                                       |
| `@yh-ui/components`  | Core UI and business components                                                |
| `@yh-ui/theme`       | Theme engine and design tokens                                                 |
| `@yh-ui/hooks`       | Vue composition utilities                                                      |
| `@yh-ui/utils`       | Shared runtime utilities                                                       |
| `@yh-ui/icons`       | Iconify-based icon runtime plus modern component-library-style icon components |
| `@yh-ui/request`     | Request client, hooks, cache, SSE, queue, and upload/download helpers          |
| `@yh-ui/flow`        | Flow chart and node editor package                                             |
| `@yh-ui/ai-sdk`      | AI SDK integrations and Vue composables                                        |
| `@yh-ui/locale`      | Internationalization locale files                                              |
| `@yh-ui/nuxt`        | Nuxt integration module                                                        |
| `@yh-ui/yh-ui-skill` | Publishable CLI that installs the YH-UI AI skill into local agent workspaces   |

## Install

```bash
pnpm add @yh-ui/yh-ui
```

```bash
npm install @yh-ui/yh-ui
```

```bash
yarn add @yh-ui/yh-ui
```

## Basic Usage

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

createApp(App).use(YhUI).mount('#app')
```

## On-Demand Import

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

The resolver injects component styles automatically.

## Icon Components

The icon package keeps the original Iconify string API and also exports individual icon components:

```vue
<script setup lang="ts">
import { Icon, Search, Edit, Delete } from '@yh-ui/icons'
</script>

<template>
  <Icon icon="mdi:home" />
  <Search />
  <Edit color="var(--yh-color-primary)" />
  <Delete />
</template>
```

## Nuxt

```ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']
})
```

See the Nuxt guide for SSR and auto-import details:
https://1079161148.github.io/yh-ui/guide/nuxt

## Development

```bash
pnpm install
pnpm dev
pnpm docs:dev
```

## Quality Gates

For ordinary development:

```bash
pnpm typecheck
pnpm lint
pnpm test:ci
pnpm build
pnpm docs:build
```

For a public release candidate:

```bash
pnpm verify:open-source-release
```

This gate runs formatting checks, type checks, linting, tests, package builds, docs builds, consumer smoke tests, playground checks, and release metadata validation.

## Release

```bash
pnpm version:patch
pnpm verify:open-source-release
pnpm release
pnpm publish:all
pnpm wait:published-packages
pnpm verify:published-release
```

The GitHub release workflow repeats the critical validation steps before publishing and documentation deployment.

## Compatibility

- Vue: `>= 3.5.0`
- Node.js: `>= 18.0.0`
- pnpm: `>= 9.0.0`
- Nuxt: `^3.11.0 || ^4.0.0-rc.1`
- Browsers: modern Chrome, Edge, Firefox, and Safari
- SSR: supported for mainstream component usage and Nuxt integration; browser-API-heavy features should be validated in their target runtime

Detailed support boundaries are documented in [docs/guide/compatibility.md](./docs/guide/compatibility.md).

## Community

Issues and pull requests are welcome. Before submitting a PR, please run the relevant quality gates and read:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [SECURITY.md](./SECURITY.md)

## License

[MIT](./LICENSE) License. Copyright 2026 YH-UI Team.
