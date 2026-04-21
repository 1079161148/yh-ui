# Release Candidate Gate

This is the shortest release-candidate gate YH-UI should pass before any `1.0.0-rc.x` or `1.0.0` release is cut.

## Goal

Convert "the repo looks stable" into a repeatable, reviewable release decision.

## Required Inputs

- `CHANGELOG.md` is up to date for the release being prepared.
- `PACKAGE_SIZE_BASELINE.md` exists and any meaningful drift is explained.
- The target commit is already on `main`, or is the exact release candidate commit to be tagged.

## RC Gate

Run these commands from the repo root in this exact order:

```bash
pnpm typecheck
pnpm lint
pnpm test:ci
pnpm test:coverage
pnpm test:perf
pnpm build
pnpm docs:build
pnpm verify:consumer-smoke
pnpm verify:release
pnpm verify:codesandbox-remote
```

## Pass Criteria

All of the following must be true:

- Every command above exits successfully.
- CI has a matching green baseline on the same mainline code.
- CI artifacts/logs for the release candidate are preserved.
- Vite and Nuxt consumer smoke checks both pass.
- No known release-blocking warning remains in the Nuxt integration path.
- Any package-size increase above the current baseline guardrail is explained in release notes or changelog.

## 1.0-Specific Bar

For `1.0.0`, do not rely on "it passed locally once".

Require:

- one fresh local pass
- one fresh CI pass
- publish workflow confidence without manual patching
- trustworthy changelog coverage for the public release line

## Decision

### Okay to cut `1.0.0-rc.x`

- The RC gate is green locally.
- CI is green or queued on the same commit.
- Remaining issues are low-risk and clearly documented.

### Okay to cut `1.0.0`

- The RC gate is green locally and in CI on the same code.
- No P0 release blocker remains in `STABLE_RELEASE_BLOCKERS.md`.
- The team is comfortable making a stable support promise for the documented runtime matrix.
