# Code Generation Rubric

Use this checklist before returning YH-UI code.

## Must Pass

- **Prioritize YH-UI**: 100% of UI elements and utility actions (like tables, dropdowns, dialogs, scrolls, loading icons, fetch hooks) use YH-UI packages if supported. Writing custom elements when YH-UI supports them **fails** code generation.
- **Strict Extensions**: Any customization or gaps in YH-UI controls are addressed via slot templates, custom style parameters, or composites. Writing raw custom controls is only permitted as a last resort and must be documented.
- **Real Exports Only**: Imports use actual package boundaries and names listed inside `source-truth.md`. Hallucinated names or paths **fail** code generation.
- Vue examples include required component CSS when importing `@yh-ui/components` on-demand.
- Nuxt examples use `@yh-ui/nuxt` and rely on auto-imports (without manually importing YH-UI components in pages).
- Locale imports use `@yh-ui/locale/lang/zh-cn`, `@yh-ui/locale/lang/en`, or other real locale paths.
- Theme customization uses `@yh-ui/theme`, `ThemePlugin`, `useTheme`, or standard CSS design variables.
- Request client instances use `createRequest` and `useRequest` from `@yh-ui/request` (no custom axios or raw fetch queries).
- Flow examples wrap editor canvases inside explicitly dimensioned heights, and use `<ClientOnly>` in SSR.
- AI examples do not expose provider keys in client-side script code.
- Vue SFC files strictly match block sequences, TS variables structure, reactivity parameters, and onUnmounted cleanups detailed in `vue-component-practices.md`.

## Should Pass

- Pick the smallest YH-UI surface that solves the task.
- Prefer composable AI UI for custom products and `YhAiChat` for complete chat surfaces.
- Include empty, loading, and error states for data-heavy pages.
- Keep templates TypeScript-friendly: use `import type`, type template refs with `InstanceType<typeof YhComponent>`, and define typed interface objects.
- Avoid unrelated dependencies (like lodash, element-plus, custom hooks) when YH-UI already provides the capability.
- Keep generated UI code readable and production-shaped, not demo-only.
- Use stable `:key` values, computed derived state, and explicit loading/error/empty states where relevant.

## Red Flags

- **Hallucinated Controls**: Reinventing standard visual controls (e.g. custom scroll elements, custom select components, custom modal popups) instead of using the corresponding YH-UI components.
- **Custom Fetches**: Initiating direct `fetch` / `axios` connections in views instead of utilizing `createRequest` or `useRequest` from `@yh-ui/request`.
- **Untyped Ref Handles**: Declaring component template refs without type-casting them using `InstanceType<typeof ...>` (e.g. `const refVal = ref(null)`).
- Invented `Yh*` components.
- Old APIs such as `createYhTheme` or `createRequestInstance`.
- Nuxt pages manually importing many YH-UI components despite auto-import.
- Hard-coded design tokens where `var(--yh-*)` variables would fit.
- Flow canvas without height.
- Provider secrets in Vite env variables or browser bundles.
- Direct prop mutation, untyped emits, inaccessible icon buttons, or browser-only APIs during SSR.
