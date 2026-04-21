# Release Validation

This document defines the release acceptance flow for YH-UI so new versions do not rely on manual checks.

## Scope

The release pipeline covers four validation areas:

1. Local docs Playground acceptance
2. Remote CodeSandbox acceptance
3. Local StackBlitz project acceptance
4. Local consumer smoke validation for Vite and Nuxt example apps
5. Version consistency and CDN availability checks

## Local Pre-release Flow

Run these commands from the repo root before creating or pushing a release tag:

```bash
pnpm version:patch
pnpm verify:release
pnpm verify:codesandbox-remote
pnpm release
```

`pnpm verify:release` now includes:

- workspace package build
- docs public package sync
- release version consistency checks
- local Vite and Nuxt consumer smoke validation
- docs site build
- local StackBlitz project validation
- docs Playground validation

## Publish Flow

After packages are published to npm, run:

```bash
pnpm wait:published-packages
pnpm verify:published-release
```

`pnpm verify:published-release` checks:

- every workspace package version is visible on npm
- jsDelivr asset availability for published package entry files
- unpkg asset availability for published package entry files

## CI / Release Workflow

The GitHub release workflow is expected to enforce this sequence:

1. Run `pnpm verify:release`
2. Run `pnpm verify:codesandbox-remote`
3. Publish workspace packages
4. Wait for npm visibility
5. Run `pnpm verify:published-release`
6. Create or update the GitHub release
7. Deploy docs

## Commands

```bash
pnpm verify:stackblitz-local
pnpm verify:consumer-smoke
pnpm verify:docs-playground
pnpm verify:codesandbox-remote
pnpm verify:release-versions
pnpm verify:published-release
```

## Maintainer Checklist

Use this as the shortest release playbook until a dedicated release handbook is added.

For the final `1.0.0-rc.x` / `1.0.0` go-no-go gate, use [RELEASE_CANDIDATE_GATE.md](C:\Users\1\.codex\worktrees\f2c3\YH-UI\RELEASE_CANDIDATE_GATE.md).

### Pre-release

1. Confirm `CHANGELOG.md` includes the version you are about to publish, or a clearly labeled release-train summary that covers it.
2. Run the full local release gate:
   `pnpm typecheck`
   `pnpm lint`
   `pnpm test:ci`
   `pnpm test:coverage`
   `pnpm test:perf`
   `pnpm build`
   `pnpm docs:build`
   `pnpm verify:consumer-smoke`
3. Run `pnpm verify:release`.
4. If the release includes demo or CDN-sensitive changes, also run `pnpm verify:codesandbox-remote`.

### Publish

1. Bump versions with `pnpm version:patch`, `pnpm version:minor`, or `pnpm version:major`.
2. Create the tagged release with `pnpm release`, or let the GitHub release workflow run the same sequence.
3. Publish workspace packages with the release workflow or `pnpm publish:all`.

### Post-publish

1. Run `pnpm wait:published-packages`.
2. Run `pnpm verify:published-release`.
3. Confirm docs deployment and consumer smoke remain green on the released artifacts.
