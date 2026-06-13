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

### Optional Peer Dependency Notice

Starting from the current release, heavyweight or domain-specific third-party dependencies have been moved into `peerDependencies` and marked as optional via `peerDependenciesMeta.optional`.

This means:

- Installing only `@yh-ui/yh-ui` or `@yh-ui/components` no longer forces these heavy runtimes to download up front, giving the host project a very low initial footprint.
- Host projects install these optional packages only when their specific, matching features are actually used.

Typical optional peer dependencies and their feature mapping:

- **Editors & Rendering**:
  - `monaco-editor`: Code editor scenarios like `YhAiCodeEditor`
  - `markdown-it`: Markdown rendering in AI chat response scenarios
  - `highlight.js`: Syntax highlighting in Markdown code blocks
  - `mermaid`: Diagram drawing in Markdown content
- **Data, Charts & Media**:
  - `xlsx`: Excel import/export capabilities in `YhTable`
  - `viewerjs`: Advanced image preview, rotation, and scaling in `YhImage` and `YhUpload`
  - `echarts`: Data visualization with `YhChart`
- **Flowchart Editor (`@yh-ui/flow`)**:
  - `dagre` / `elkjs` / `d3-force`: Flowchart layout plugins (Dagre, Elk, Force-directed layout)
  - `html-to-image`: Flowchart high-fidelity image capture and export features
- **AI Integration (`@yh-ui/ai-sdk`)**:
  - `@langchain/core`: Deep integration with LangChain framework for LLM orchestration

Host projects can install dependencies as needed:

```bash
# E.g., if you only need Excel export, chart visualizations, and flowchart image export:
pnpm add xlsx echarts html-to-image
```

If you only use one of these capabilities, install just that dependency.

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

## Size Evaluation & Industry Comparison

To protect host application performance, the runtime footprint of each sub-package is finely optimized. Below is an evaluation of YH-UI's built sizes against industry benchmarks:

### Core Runtime Size Comparison

- **`@yh-ui/components` (Core UI)**: The core runtime (Gzip compressed) is only ~**460 KB**, which is significantly lighter than alternatives like Element Plus (JS ~800KB) or Ant Design Vue (JS ~2.1MB).
- **`@yh-ui/flow` (Flowchart Editor)**: The uncompressed single-file JS bundle is only **55.6 KB**, holding a huge volume advantage compared to editors like Vue Flow (~80KB) or bpmn-js (~2.2MB).
- **`@yh-ui/ai-sdk` (AI Integrations)**: The uncompressed single-file JS bundle is only **15.5 KB**. By isolating heavy runtimes like LangChain as optional peer dependencies, it provides a lightweight base communication layer.

### Why Choose YH-UI's Layered Design?

With YH-UI's layered structure and on-demand imports, developers have complete control over **bundle size bias and asset clipping**:

1. **"Pay as You Use"**: If you only need typical forms, buttons, or tables, installing `@yh-ui/components` keeps your bundle clean. Heavyweight logic for AI chats or flow editors won't clutter your initial load assets.
2. **"Incremental Upgrades"**: When your business grows to require AI integrations or flow editors, pull in `@yh-ui/ai-sdk` or `@yh-ui/flow` dynamically. Capabilities and bundle size scale together.

## Release Checks

Before publishing, review:

- package size output from `pnpm build`
- package budgets from `pnpm verify:package-size`
- real Vite and Nuxt consumer builds from `pnpm verify:consumer-smoke`
- docs and playground imports to avoid accidental heavyweight runtimes

If a release meaningfully increases size, explain the reason and product value in the changelog.
