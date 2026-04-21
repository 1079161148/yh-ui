# Stable Release Blockers

This checklist tracks the shortest path from "publicly usable" to a release that can honestly be described as stable.

## Current Recommendation

- Suitable for public `0.x` / `beta` / `rc` iteration.
- Not yet suitable for a "stable" promise release until the sequence below is completed.

## Shortest Closing Sequence

### Step 1. Restore release-history trust

- [x] Synchronize `CHANGELOG.md` with the current published line through `v0.1.56`.
- [x] Make sure each future release is either:
  - added explicitly to `CHANGELOG.md`, or
  - covered by a clearly labeled aggregated release-train entry.
- Exit condition:
  `CHANGELOG.md` is no longer behind the published package versions.

### Step 2. Freeze a stable-release baseline in CI

- [x] Local verification completed on 2026-04-21:
  - [x] `pnpm typecheck`
  - [x] `pnpm lint`
  - [x] `pnpm test:ci`
  - [x] `pnpm test:coverage`
  - [x] `pnpm test:perf`
  - [x] `pnpm build`
  - [x] `pnpm docs:build`
  - [x] `pnpm verify:consumer-smoke`
- [ ] Mirror the same sequence in CI on current mainline code.
- [ ] Preserve CI logs and artifacts as the initial stable-release baseline.
- Exit condition:
  the same gate is green locally and in CI, with artifacts retained.

### Step 3. Publish maintainer-facing release procedure

- [x] Add a concise maintainer release checklist to the repo docs.
- [x] Cover three phases:
  - pre-release checks
  - publish steps
  - post-publish verification
- [x] Link the checklist from `RELEASE_VALIDATION.md`.
- Exit condition:
  a maintainer can run a release without relying on tribal knowledge.

### Step 4. Finish public contribution intake

- [x] Community health files added:
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CODE_OF_CONDUCT.md`
- [x] Add issue templates for:
  - bug reports
  - feature requests
- [x] Add branch-push validation with the same baseline quality gates as PR validation, or enforce branch protection so all merges go through PR checks.
- Exit condition:
  external users have a clean path to report issues, and mainline quality gates cannot be bypassed casually.

### Step 5. Publish support boundaries

- [x] Document supported Node versions.
- [x] Document supported Vue versions.
- [x] Document SSR support expectations.
- [x] Document browser support expectations.
- [x] Capture a package-size baseline and define acceptable drift.
- Exit condition:
  consumers can tell whether YH-UI fits their stack before adoption.

## Highest-Impact Technical Fixes Already Completed

- [x] Move DOM-dependent package tests out of the `packages-node` Vitest project into a dedicated `packages-dom` project.
- [x] Restore a fully green `pnpm test:ci`.
      Verified on 2026-04-21 after the Vitest project split and scroll-related test stabilization.
- [x] Add a dedicated perf job instead of folding perf checks into ordinary test runs.
- [x] Run consumer smoke tests in clean example apps:
  - Vite + Vue
  - Nuxt 3 SSR
  - on-demand import / resolver flow
  - full plugin install flow
- [x] Eliminate the Nuxt SSR style warning in the local consumer smoke flow.
- [x] Reach `pnpm lint` = 0 warnings / 0 errors on current local mainline.

## Exit Criteria For Stable

- `CHANGELOG.md` and version history are trustworthy.
- `pnpm typecheck`, `pnpm lint`, `pnpm test:ci`, `pnpm test:coverage`, `pnpm test:perf`, `pnpm build`, `pnpm docs:build`, and `pnpm verify:consumer-smoke` all pass on current mainline code locally and in CI.
- Release workflow passes without manual patching.
- Public contribution and security process files are present.
- Public support boundaries are documented.
- At least one clean Vite app and one clean Nuxt app install and render YH-UI successfully.
