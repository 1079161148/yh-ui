# Package Size Baseline

This document records the initial package-size baseline used during stable-release preparation.

## Scope

- Metric: total bytes of each package `dist/` directory in the current workspace build.
- Recorded on: 2026-04-21
- Purpose: detect unexpected growth in build artifacts, not to replace bundle-level profiling in consumer apps.

## Baseline

| Package | Dist size (bytes) | Dist size (approx.) |
| --- | ---: | ---: |
| `components` | 9,480,248 | 9.04 MB |
| `locale` | 4,112,802 | 3.92 MB |
| `yh-ui` | 2,054,536 | 1.96 MB |
| `flow` | 926,811 | 905 KB |
| `ai-sdk` | 305,074 | 298 KB |
| `request` | 280,435 | 274 KB |
| `theme` | 209,480 | 205 KB |
| `hooks` | 151,308 | 148 KB |
| `utils` | 32,527 | 31.8 KB |
| `icons` | 30,718 | 30.0 KB |
| `nuxt` | 18,647 | 18.2 KB |

## Guardrail

- Treat sustained growth above roughly 15% in a package `dist/` size as a review trigger.
- For intentional growth, record the reason in the changelog or release notes.
- For consumer-facing regressions, prefer follow-up measurement in:
  - Vite app build output
  - Nuxt app build output
  - component-level perf tests
