# Package Size Layering

YH-UI covers a large product surface, so releases must avoid making every user pay for heavyweight scenarios. Use layered entry points, on-demand imports, and optional dependencies.

## Entry Layers

| Scenario              | Recommended entry   | Notes                                                  |
| --------------------- | ------------------- | ------------------------------------------------------ |
| General business apps | `@yh-ui/yh-ui`      | Full component library and shared capabilities         |
| Core components only  | `@yh-ui/components` | Clear component-layer dependency                       |
| Theme only            | `@yh-ui/theme`      | Theme engine, tokens, CSS variables                    |
| Composables only      | `@yh-ui/hooks`      | No UI component runtime                                |
| Icons only            | `@yh-ui/icons`      | Iconify string API and individual icon components      |
| Request and streaming | `@yh-ui/request`    | Fetch, cache, SSE, queues, upload/download             |
| Flow editor           | `@yh-ui/flow`       | Standalone Flow package                                |
| AI SDK integration    | `@yh-ui/ai-sdk`     | AI composables and LangChain/Vercel AI SDK integration |
| Nuxt projects         | `@yh-ui/nuxt`       | Nuxt module and SSR integration                        |

## Heavyweight Boundaries

These capabilities should be explicit choices, not default costs for ordinary form pages:

- Monaco Editor
- Mermaid
- ECharts
- XLSX
- Flow editor
- AI SDK / LangChain integration

These dependencies are isolated through sub-packages, optional dependencies, or dedicated entry points. A project that only uses Button, Input, Form, and basic Table features should not pull in AI, Flow, or editor runtimes.

## Recommended Usage

```ts
import { YhButton, YhInput } from '@yh-ui/components'
import '@yh-ui/components/style.css'
```

For large applications, prefer automatic imports with `unplugin-vue-components`:

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

## Release Checks

Before publishing, review:

- package size output from `pnpm build`
- package budgets from `pnpm verify:package-size`
- real Vite and Nuxt consumer builds from `pnpm verify:consumer-smoke`
- docs and playground imports to avoid accidental heavyweight runtimes

If a release meaningfully increases size, explain the reason and product value in the changelog.
