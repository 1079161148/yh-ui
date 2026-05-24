# YH-UI Skill Eval Record: 2026-05-16

## Scope

This record evaluates the current skill package against `references/eval-scenarios.md`.

No external model provider credentials are available in this workspace, so this run is a local rubric-based evaluation of the skill package and generated references. It records expected model behavior, likely failure modes, and follow-up optimizations.

## Result Summary

| Scenario                 | Local skill support | Expected model risk                                | Follow-up                                                |
| ------------------------ | ------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| Vue Admin Table          | Strong              | Medium: may omit loading/error/empty states        | Added `recipes-table.md` and rubric checks               |
| Nuxt Setup               | Strong              | Low: may manually import components                | Nuxt reference already warns against manual page imports |
| AI Chat Surface          | Strong              | Medium: may invent source/attachment props         | Added `recipes-ai.md` and generated API highlights       |
| Request Hook             | Good                | Low: may use stale factory names                   | `request.md` and forbidden API checks cover this         |
| Flow In Nuxt             | Strong              | Medium: may omit height or `<ClientOnly>`          | Added `recipes-flow.md` and rubric checks                |
| Reusable Vue Wrapper     | Good                | Medium: may mutate props or skip accessible labels | Added `vue-component-practices.md`                       |
| Repair Hallucinated Code | Strong              | Low                                                | Forbidden patterns and repair workflow cover this        |

## Failure Examples To Watch

- `YhDataTable`, `YhAiSuggestion`, or other invented components.
- `createYhTheme` instead of `ThemePlugin` or `useTheme`.
- `createRequestInstance` instead of `createRequest`.
- Nuxt pages manually importing many components despite `@yh-ui/nuxt`.
- Flow examples without explicit height.
- AI examples using `VITE_OPENAI_API_KEY` in client code.
- Schema forms mutating props directly or skipping typed `v-model`.

## Optimizations Applied

- Generated `source-truth.md` and `api-cheatsheet.md` from source.
- Upgraded generation to TypeScript AST extraction for exported props/emits, typed `defineEmits`, interface slots/exposes, and `defineExpose(expose)` patterns.
- Added deep recipes for `YhTable`, `YhFormSchema`, `YhAi*`, and `Flow`.
- Added `llms.txt` and `llms-full.txt` for retrieval-oriented AI tools.
- Expanded verification so generated source truth must cover source-exported `Yh*` components.

## Next Real Model Run

Run each prompt in `references/eval-scenarios.md` against target tools such as ChatGPT, Claude, Cursor, and Codex with this skill attached. Record:

- Whether package imports are correct.
- Whether component names exist in `source-truth.md`.
- Whether generated code passes the `codegen-rubric.md`.
- Any hallucinated props/events/slots.
- Any missing Vue best-practice behaviors.
