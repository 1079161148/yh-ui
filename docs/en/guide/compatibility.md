# Compatibility and Support Boundaries

This page defines the support contract YH-UI currently makes in public so adopters can quickly decide whether the library fits their stack.

## Runtime support matrix

| Item | Supported | Notes |
| --- | --- | --- |
| Vue | `>= 3.5.0` | Current component and Nuxt SSR support depends on Vue 3.5 features such as `useId` |
| Node.js | `>= 18.12.0` | Current LTS is recommended |
| pnpm | `>= 9` | Repository development and CI are standardized on pnpm 9 |
| Nuxt | `>= 3.11.0` or `^4.0.0-rc.1` | Supported through the `@yh-ui/nuxt` module |
| Vite | `6.x` baseline validated | The repository consumer smoke flow covers a clean Vite + Vue app |

## Browser support

YH-UI targets modern browsers only and does not support Internet Explorer.

| Browser | Minimum version |
| --- | --- |
| Chrome | `>= 87` |
| Edge | `>= 88` |
| Firefox | `>= 78` |
| Safari | `>= 14` |

## SSR support expectations

### Explicitly supported

- Using `@yh-ui/nuxt` for component auto-import and style injection in Nuxt 3 / 4
- Server rendering of standard form, display, feedback, and navigation components
- Hydration consistency backed by stable IDs and request-scoped z-index isolation
- Clean consumer smoke scenarios for both Vite + Vue and Nuxt SSR

### Use with care

- Features that depend on browser-native APIs are expected to degrade safely during SSR and resume on the client
- Animation, measurement, scrolling, dragging, and Canvas-heavy experiences are covered as far as practical, but app code should still avoid direct `window`, `document`, or layout reads inside `setup`
- `flow`, advanced visualization, and online-editor capabilities should be evaluated as dedicated integrations rather than treated as zero-risk first-wave SSR surfaces

### Outside the support promise

- Internet Explorer compatibility
- Vue versions below 3.5
- Node versions below 18
- custom third-party build pipelines not covered by docs, tests, or consumer smoke validation

## Open-source stability note

The repository already maintains the following validation baseline:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test:ci`
- `pnpm test:coverage`
- `pnpm test:perf`
- `pnpm build`
- `pnpm docs:build`
- `pnpm verify:consumer-smoke`

That makes the project suitable for public `0.x / beta / rc` releases today. A "stable" promise release should still be gated by the repository root checklist in `STABLE_RELEASE_BLOCKERS.md`.

## Package-size baseline

The first recorded package-size baseline lives in [PACKAGE_SIZE_BASELINE.md](https://github.com/1079161148/yh-ui/blob/main/PACKAGE_SIZE_BASELINE.md).

Refresh it whenever:

- a large dependency is introduced
- an entire component family is added
- release prep shows meaningful build-size growth

