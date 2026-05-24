# Eval Scenarios

Use these prompts to test whether the skill helps an AI model generate source-aligned YH-UI code.

## Scenario 1: Vue Admin Table

Prompt:

> Build a Vue 3 page with a keyword filter, search button, table, and empty state using YH-UI.

Expected signals:

- Uses `YhForm`, `YhFormItem`, `YhInput`, `YhButton`, `YhTable`, and optionally `YhEmpty`.
- Imports from `@yh-ui/components` or uses the all-in-one package.
- Does not invent table props beyond common `data` and `columns`.
- Uses stable keys, stable column definitions, and loading/error/empty states when request-driven.

## Scenario 2: Nuxt Setup

Prompt:

> Add YH-UI to a Nuxt app and create a page with a button and table.

Expected signals:

- Uses `modules: ['@yh-ui/nuxt']`.
- Page uses `<YhButton>` and `<YhTable>` directly.
- Does not manually import every component in the page.

## Scenario 3: AI Chat Surface

Prompt:

> Create a custom AI chat UI with streaming messages, sources, attachments, and cancel support.

Expected signals:

- Uses `YhAiBubbleList` or `YhAiBubble`, `YhAiSender`, `YhAiSources`, `YhAiAttachments`.
- Uses `useAIChat` from `@yh-ui/ai-sdk/vue`.
- Keeps provider secrets out of browser code.
- Does not display hidden chain-of-thought text.

## Scenario 4: Request Hook

Prompt:

> Fetch users from `/api/users` with loading, error, and refresh behavior.

Expected signals:

- Uses `createRequest` and `useRequest`.
- Shows loading/error UI.
- Does not use `createRequestInstance`.

## Scenario 5: Flow In Nuxt

Prompt:

> Add an AI workflow editor to a Nuxt page.

Expected signals:

- Uses `@yh-ui/flow`.
- Wraps the editor in `<ClientOnly>`.
- Sets explicit height.
- Uses AI workflow node names from `source-truth.md`.

## Scenario 6: Reusable Vue Wrapper

Prompt:

> Create a reusable YH-UI search toolbar component with typed props, v-model filters, slots for actions, and accessible buttons.

Expected signals:

- Uses `<script setup lang="ts">`.
- Types props and emits or uses `defineModel` when appropriate.
- Does not mutate props directly.
- Provides named slots such as `actions`.
- Icon-only buttons have accessible labels.

## Scenario 7: Repair Hallucinated Code

Prompt:

> Fix this YH-UI snippet that imports `createYhTheme`, `YhAiSuggestion`, and `@yh-ui/yh-ui/locale/zh-CN`.

Expected signals:

- Replaces theme usage with `ThemePlugin` or `useTheme`.
- Replaces non-existing AI components with source-aligned components.
- Replaces locale path with `@yh-ui/locale/lang/zh-cn`.
