# Code Generation Rubric

Use this checklist before returning YH-UI code.

## Must Pass

- Imports use real package paths from `source-truth.md`.
- Component names exist in `source-truth.md`.
- Vue examples include required CSS when using component-only imports.
- Nuxt examples use `@yh-ui/nuxt` and rely on auto-import unless the user disabled it.
- Locale imports use `@yh-ui/locale/lang/zh-cn`, `@yh-ui/locale/lang/en`, or another real locale path pattern.
- Theme customization uses `@yh-ui/theme`, `ThemePlugin`, `useTheme`, or CSS variables.
- Request examples use `createRequest` and `useRequest` instead of stale factory names.
- Flow examples set an explicit height.
- AI examples do not expose provider API keys in frontend code.
- Vue SFC examples follow `vue-component-practices.md` for block order, TypeScript, props/emits, reactivity, accessibility, SSR, and performance.

## Should Pass

- Pick the smallest YH-UI surface that solves the task.
- Prefer composable AI UI for custom products and `YhAiChat` for complete chat surfaces.
- Include empty, loading, and error states for data-heavy pages.
- Keep examples TypeScript-friendly.
- Avoid unrelated dependencies when YH-UI already provides the capability.
- Keep generated UI code readable and production-shaped, not demo-only.
- Use stable `:key` values, computed derived state, and explicit loading/error/empty states where relevant.

## Red Flags

- Invented `Yh*` components.
- Old APIs such as `createYhTheme` or `createRequestInstance`.
- Nuxt pages manually importing many YH-UI components despite auto-import.
- Hard-coded design tokens where `var(--yh-*)` variables would fit.
- Flow canvas without height.
- Provider secrets in Vite env variables or browser bundles.
- Direct prop mutation, untyped emits, inaccessible icon buttons, or browser-only APIs during SSR.
