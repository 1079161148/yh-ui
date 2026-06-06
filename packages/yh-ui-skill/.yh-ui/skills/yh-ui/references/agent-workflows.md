# Agent Workflows

Use this file to route an AI coding task before writing code. Load only the workflow that matches the user request.

## Vue Component Page

1. Use `@yh-ui/yh-ui` for full-app setup or `@yh-ui/components` for local imports.
2. Choose components from `component-map.md`.
3. Apply `vue-component-practices.md` for SFC structure, typed props/emits, slots, accessibility, and performance.
4. Use `@yh-ui/components/style.css` only for component-only examples.
5. Use theme variables in custom CSS.
6. Avoid inventing app state libraries unless the user asks.

## Nuxt Page

1. Use `@yh-ui/nuxt` in `nuxt.config.ts`.
2. Do not import every component inside pages when Nuxt auto-import is enabled.
3. Apply Vue SSR and hydration rules from `vue-component-practices.md`.
4. Use `<ClientOnly>` for flow editors or browser-heavy AI rendering.
5. Use server routes for AI provider secrets and private APIs.

## AI Product UI

1. Decide whether the user wants a complete chat app or composable parts.
2. Use `YhAiChat` for a complete surface; otherwise compose `YhAiBubbleList`, `YhAiBubble`, `YhAiSender`, `YhAiSources`, `YhAiAttachments`, and `YhAiActionGroup`.
3. Use `@yh-ui/ai-sdk/vue` for Vue chat state.
4. Keep provider keys server-side.
5. Show tool or reasoning progress as UI state, not hidden chain-of-thought text.

## Request/Data Task

1. Use `createRequest` for clients.
2. Use `useRequest` for component request state.
3. Use `useSSE`, `useAIStream`, GraphQL, queue, or WebSocket helpers only when the task calls for them.
4. Put auth and cross-cutting behavior in interceptors.
5. Keep loading, error, retry, and empty states visible in UI examples.

## Flow/Workflow Task

1. Use `@yh-ui/flow`.
2. Always set an explicit canvas height.
3. Use `Flow`, `Minimap`, `Controls`, and `FlowBackground` for ordinary canvases.
4. Use BPMN exports for BPMN diagrams and AI workflow exports for agent/workflow diagrams.
5. In Nuxt, wrap flow canvases in `<ClientOnly>`.

## Review Or Repair Task

1. Compare imports and component names against `source-truth.md`.
2. Look for stale APIs: `createYhTheme`, `createRequestInstance`, and `@yh-ui/yh-ui/locale/zh-CN`.
3. Check SFC, reactivity, props/emits, slot, accessibility, and SSR issues against `vue-component-practices.md`.
4. Check whether Nuxt examples unnecessarily import components.
5. Check whether AI examples expose provider keys in browser code.
6. Check whether flow examples have an explicit height.
