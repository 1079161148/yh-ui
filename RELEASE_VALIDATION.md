# Release Validation

This document defines the release acceptance flow for YH-UI so new versions do not rely on manual checks.

## Scope

The release pipeline covers four validation areas:

1. Local docs Playground acceptance
2. Remote CodeSandbox acceptance
3. Local StackBlitz project acceptance
4. Version consistency and CDN availability checks

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
pnpm verify:docs-playground
pnpm verify:codesandbox-remote
pnpm verify:release-versions
pnpm verify:published-release
```
