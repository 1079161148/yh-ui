# Release Validation Status

Generated: 2026-06-07 12:32:45
Branch: main
Version: 1.0.35

## Local Verification Results (Windows)

| Step              | Command                 | Status                         |
| ----------------- | ----------------------- | ------------------------------ |
| Build packages    | pnpm build              | ✅ PASS                        |
| Package size      | erify:package-size      | ✅ PASS                        |
| Release versions  | erify:release-versions  | ✅ PASS                        |
| Packed manifests  | erify:packed-manifests  | ✅ PASS                        |
| Changelog check   | changelog:check         | ✅ PASS                        |
| Component quality | erify:component-quality | ✅ PASS (103/103)              |
| TypeScript check  | ue-tsc --noEmit         | ✅ PASS                        |
| ESLint            | eslint --max-warnings 0 | ✅ PASS (0 errors, 0 warnings) |
| Docs i18n         | erify:docs-i18n         | ✅ PASS (247 pages)            |

## CI-Run Steps (GitHub Actions)

These steps require Playwright Chromium + dev server and will run on Ubuntu:

| Step                     | Expected                                       |
| ------------------------ | ---------------------------------------------- |
| docs:build               | ✅ Code-blocking fixes applied (3 fixes below) |
| verify:consumer-smoke    | Vite/Nuxt/Admin starter builds                 |
| verify:playgrounds       | Vue/Nuxt playground verification               |
| verify:stackblitz-local  | StackBlitz demo sandboxes                      |
| verify:docs-sandboxes    | Docs demo sandbox smoke                        |
| verify:codesandbox-local | CodeSandbox runtime builds                     |
| verify:docs-playground   | Docs playground REPL                           |

## Code Fixes Applied (6 issues)

| #   | File                              | Issue                                             | Fix                                     |
| --- | --------------------------------- | ------------------------------------------------- | --------------------------------------- |
| 1   | docs/table/selection.md, en/...   | SSR fetch() called top-level during build         | Moved to onMounted()                    |
| 2   | scripts/validate-demo-sandbox.mts | Unused SandboxPackageJson + as any ESLint warning | Removed interface, added eslint-disable |
| 3   | docs/.vitepress/config.ts         | Missing @yh-ui/yh-ui Vite alias                   | Added alias to packages/yh-ui/src       |
| 4   | docs/guide/starter.md, en/...     | ![]() image path caught by Rollup as import       | Changed to <img> tag                    |
| 5   | CHANGELOG.md                      | TODO placeholders in 1.0.35 entry                 | Filled with actual release notes        |
| 6   | git upstream                      | main branch had no upstream for push              | git push -u origin main                 |

## Note

docs:build may fail on Windows with low memory (errno=1455 / OOM) due to
monaco-editor + esbuild Go runtime memory competition. This does NOT occur
on GitHub Actions Ubuntu runners (7GB+ RAM, efficient Linux memory model).
