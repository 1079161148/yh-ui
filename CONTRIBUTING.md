# Contributing to YH-UI

Thanks for helping improve YH-UI.

This repository is a pnpm monorepo that contains the core component library, hooks, theme system, Nuxt module, docs site, and consumer playgrounds.

## Development Setup

Requirements:

- Node.js 18+
- pnpm 9+

Install dependencies from the repository root:

```bash
pnpm install
```

Useful local commands:

```bash
pnpm dev
pnpm docs:dev
pnpm typecheck
pnpm lint
pnpm test:ci
pnpm test:coverage
pnpm test:perf
pnpm verify:consumer-smoke
pnpm build
pnpm docs:build
```

## Contribution Scope

Typical contribution areas:

- bug fixes
- accessibility improvements
- SSR and hydration fixes
- performance improvements
- docs and examples
- tests and coverage improvements

Before starting larger work, please open an issue or draft pull request so we can align on scope and API direction.

## Pull Request Expectations

Please keep pull requests focused and reviewable.

Before opening a PR, make sure the relevant checks pass locally:

```bash
pnpm typecheck
pnpm lint
pnpm test:ci
```

When your changes affect release confidence, also run:

```bash
pnpm test:coverage
pnpm test:perf
pnpm verify:consumer-smoke
pnpm build
pnpm docs:build
```

## Testing Guidance

For interactive components, prefer coverage that exercises these dimensions when they apply:

- DOM interaction and behavior
- SSR rendering
- hydration
- performance baselines

Please avoid brittle assertions that depend on implementation-only timing or global DOM behavior when a component-level assertion is possible.

## Docs and Examples

If you change public APIs, component behavior, or installation flows, update the relevant docs and examples in the same PR.

Consumer-facing changes should stay compatible with:

- standard Vite + Vue usage
- Nuxt 3 integration through `@yh-ui/nuxt`
- on-demand import and resolver usage where applicable

## Versioning

Do not manually edit package versions unless the change is part of an explicit release task.

## Reporting Bugs

When filing an issue, please include:

- YH-UI version
- Vue and Nuxt versions when relevant
- reproduction steps
- expected behavior
- actual behavior
- minimal reproduction if possible

## Code Style

- Follow the existing project structure and naming.
- Prefer small, targeted changes over broad refactors unless the PR is explicitly for refactoring.
- Preserve backward compatibility unless a breaking change is explicitly approved.

## Community Standards

By participating in this project, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
