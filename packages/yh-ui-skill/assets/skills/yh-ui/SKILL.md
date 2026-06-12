---
name: yh-ui
description: Use this skill when building Vue 3 or Nuxt interfaces with YH-UI, including admin screens, AI chat products, request hooks, flow editors, themes, icons, locale setup, and component selection. It helps coding agents choose real YH-UI packages/components and produce correct examples without inventing APIs.
---

# YH-UI Agent Skill

YH-UI is a Vue 3.5+ component system for product-grade applications. Use this skill to generate code that uses the actual YH-UI package boundaries, component names, and integration patterns.

## When To Use

Use this skill for:

- Vue 3 or Nuxt UI built with YH-UI.
- Selecting YH-UI components for admin, AI, ecommerce, workflow, data, theme, locale, or request tasks.
- Fixing hallucinated YH-UI imports, component names, paths, or outdated examples.
- Reviewing whether generated YH-UI code follows source-aligned package boundaries.
- Improving YH-UI code so it follows modern Vue 3 component-library practices.

Do not use this skill for:

- Non-Vue UI libraries.
- Generic prompt writing unrelated to YH-UI implementation.
- Backend-only AI workflows unless they use `@yh-ui/ai-sdk`, MCP, RAG, or provider adapters.

## Core Rules

> [!IMPORTANT]
> **🚫 The Absolute Anti-Hallucination Standard (第一准则)**
> **DO NOT invent or guess any properties, events, slots, methods, CSS selectors, theme presets, locale files, sub-components, or package names.**
> All code generated **MUST align 100%** with the actual source code definitions in this repository (refer to `references/source-truth.md` for extracted AST data) and the official component library documentation (`https://1079161148.github.io/yh-ui/`).
> If a property, method, or event is not defined in the source code or documented in the official site, you **must not** guess it. Doing so will directly crash compiler or runtime systems and is strictly forbidden.

- **Strict YH-UI Prioritization**: Under no circumstances should you generate custom HTML/CSS controls (e.g. custom buttons, inputs, tables, dialogs, drawers, scrollbars, markdown cards) or manually construct network fetches/stream connections when YH-UI packages support them. You must 100% prioritize utilizing YH-UI components and utilities.
- **Extension & Re-encapsulation Principle**: If a YH-UI component does not fully meet a specific UI requirement, you must first try to extend it using slot customization, CSS overrides, or component composition. Writing custom elements from scratch is a last resort, and you must justify why YH-UI could not be extended.
- **On-Demand Loading (按需加载) by Default**: Unless configuring global imports, prioritize on-demand imports to ensure optimal bundle size (体积最优).
  - Import components from `@yh-ui/components` and their styling:
    ```ts
    import { YhButton, YhTable } from '@yh-ui/components'
    import '@yh-ui/components/style.css'
    ```
  - Import icons from `@yh-ui/icons/vue` or `@yh-ui/icons`:
    ```ts
    import { Icon } from '@yh-ui/icons/vue'
    ```
- **Language Defaults (TypeScript & SCSS/Sass)**: By default, SFC files and code snippets must declare TypeScript (`lang="ts"`) for script blocks and SCSS/Sass (`lang="scss"`) for style blocks.
- Use `@yh-ui/yh-ui` for ordinary Vue apps that want the all-in-one entry.
- Use `@yh-ui/nuxt` for Nuxt apps and rely on auto-imported components/composables.
- Use `@yh-ui/components` when the user asks for component-only usage.
- Use `@yh-ui/request` for request state, SSE, pagination, queues, GraphQL, WebSocket, or HTTP cache helpers.
- Use `@yh-ui/flow` for flow charts, node editors, BPMN sketches, or AI workflow diagrams.
- Use `@yh-ui/ai-sdk` with `@yh-ui/components` for AI chat, streaming, tools, and provider adapters.
- Use `@yh-ui/theme` tokens and CSS variables instead of hard-coded visual systems.
- Keep model API keys on the server. Never put provider secrets in browser code.
- In SSR/Nuxt, wrap browser-heavy flow editors in `<ClientOnly>`.

### Component-Level Best Practices & Source Alignment

Below are the detailed rules and best practices for core YH-UI components. Refer to `references/source-truth.md` for the complete API surface of all priority components.

#### 1. Data Tables: `YhTable` & `YhTableColumn`

- **Column Setup**: Bind column configurations via the `columns` property as a stable array (computed or constant). Do not write raw loop markups inside the component unless using column-slot extensions.
- **Feature Integration**: Use built-in properties like `pagination`, `resizable`, `loading`, `border` directly.
- **Exposed Methods**: Use typed refs (`InstanceType<typeof YhTable>`) to invoke functions like `exportData`, `importData`, `insertRow`, `removeRow`, `scrollTo`, and `clearSelection`. Do not guess names (e.g., do not write `.getSelectedRows()` if the source exposes `.getSelectionRows()`).
- **Events**: Handle events like `selection-change`, `page-change`, `row-click`, `sort-change`, `update:data` exactly as defined.

#### 2. Forms & Inputs: `YhForm`, `YhFormItem`, `YhFormSchema`

- **Form Validation**: Always bind `:model` and `:rules` on `YhForm`. `YhFormItem` must define the matching `prop` string for validation.
- **Form Schema**: Use `YhFormSchema` with `:schema` and `:formProps` to render dynamic schemas. Schema configurations must utilize real component names (e.g., `input`, `select`, `date-picker`).
- **Input Components**: Use `v-model` with native properties like `clearable`, `placeholder`, `disabled`, `show-word-limit`.

#### 3. AI UI Components: `YhAiChat`, `YhAiBubble`, `YhAiSender`, `YhAiThoughtChain`

- **State Binding**: Do not manage messages and loading states manually. Connect them directly to `useAIChat` or `useAIStream` from `@yh-ui/ai-sdk/vue`.
- **Sender Layout (`YhAiSender`)**: Bind `v-model` for input and listen to `@send`, `@upload`, and `@command` events. Custom action icons should be placed inside `#actions` or `#submit` slots.
- **Bubble Layout (`YhAiBubble`)**: Use `citations` array to display reference sources, and handle citation click logic. Ensure `role` (`'user'` or `'assistant'`), `streaming`, and `loading` are properly set.
- **Thought Chain (`YhAiThoughtChain`)**: Feed structured steps into the `items` property. Bind `@node-click` to let users view step details.

#### 4. Interactive Flow Canvas: `Flow` (from `@yh-ui/flow`)

- **Layout Sizing**: Always wrap the `Flow` component in a container with a defined height (e.g., `height: 600px;` or `h-screen`).
- **Canvas Extensions**: Place `Minimap`, `Controls`, and `FlowBackground` inside the `Flow` template body.
- **Gating in SSR**: Wrap the `Flow` component inside `<ClientOnly>` in SSR environments (such as Nuxt) to avoid canvas/ResizeObserver errors during server builds.

#### 5. Layout & Utilities: `YhScrollbar`, `YhConfigProvider`

- **Custom Scrollbars**: Use `YhScrollbar` with `height` or `max-height` instead of styling custom divs.
- **Global Provider**: Place `YhConfigProvider` at the root of the app to control global sizes and internationalization (`:locale`).
- **Locale Files**: Import locale languages using lowercase paths:
  ```ts
  import zhCn from '@yh-ui/locale/lang/zh-cn'
  import en from '@yh-ui/locale/lang/en'
  ```

## Agent Workflow

1. Classify the task: Vue app, Nuxt app, AI UI, request/data, flow/workflow, theme/locale, icon, or review.
2. Read `references/source-truth.md` when component/package accuracy matters.
3. Read only the specialized reference needed for the classified task.
4. Apply `references/vue-component-practices.md` for SFC structure, TypeScript, props/emits, slots, accessibility, SSR, and performance.
5. Generate code with real package imports and YH-UI components.
6. Check the result against `references/codegen-rubric.md` before answering.

## Progressive References

Read only the file needed for the task:

- Source-aligned exports and package boundaries: `references/source-truth.md`
- Agent task workflows: `references/agent-workflows.md`
- Vue component-library practices: `references/vue-component-practices.md`
- Component selection: `references/component-map.md`
- Common implementation patterns: `references/usage-patterns.md`
- Frequently used props/events: `references/api-cheatsheet.md`
- Nuxt auto-import and SSR: `references/nuxt.md`
- AI components and AI SDK: `references/ai-components.md`
- Request hooks: `references/request.md`
- Flow editor: `references/flow.md`
- Deep table recipe: `references/recipes-table.md`
- Deep form schema recipe: `references/recipes-form-schema.md`
- Deep AI recipe: `references/recipes-ai.md`
- Deep Flow recipe: `references/recipes-flow.md`
- Deep Theme recipe: `references/recipes-theme.md`
- Deep Icons recipe: `references/recipes-icons.md`
- Code generation acceptance rubric: `references/codegen-rubric.md`
- Evaluation prompts for regression testing: `references/eval-scenarios.md`

## Common Failure Guards

- Do not use old or non-existing APIs such as `createYhTheme` or `createRequestInstance`.
- Locale files use paths like `@yh-ui/locale/lang/zh-cn`.
- Nuxt users should not manually import every component in ordinary pages.
- Flow canvases need an explicit height.
- Prefer `YhConfigProvider` for runtime locale/config boundaries.
- Prefer theme CSS variables such as `var(--yh-color-primary)` in custom styles.
- If unsure whether a component exists, check `references/source-truth.md` before generating code.
