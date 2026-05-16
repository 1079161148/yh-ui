# Versioning Policy

YH-UI follows semantic versioning so users can predict upgrade risk and maintainers can define release responsibility clearly.

## Version Format

Versions use `MAJOR.MINOR.PATCH`.

| Type  | Example | Meaning                                                |
| ----- | ------- | ------------------------------------------------------ |
| Major | `2.0.0` | Breaking changes that require migration                |
| Minor | `1.1.0` | New features and backward-compatible enhancements      |
| Patch | `1.0.8` | Bug fixes, documentation fixes, internal optimizations |

## Change Types

### Patch

- Component bug fixes.
- Type declaration fixes.
- Documentation corrections.
- Internal optimizations without public API changes.
- Additional tests and validation scripts.

### Minor

- New components, props, events, slots, or composables.
- New public tokens.
- Enhanced docs playground or sandbox.
- New compatibility support such as Nuxt, SSR, or auto imports.

### Major

- Removing or renaming public APIs.
- Changing default behavior in a way that may affect existing apps.
- Removing or renaming public tokens.
- Changing package exports or minimum runtime requirements.

## Release Gates

Before a stable release, run at least:

- Type checking.
- Lint and formatting checks.
- Unit tests and SSR tests.
- Component quality or coverage gates.
- Package build.
- Consumer smoke tests.
- Docs build, docs playground, and sandbox validation.
- Changelog and migration notes.

## Deprecation Process

Avoid immediate API removal. Prefer this process:

1. Mark the API as deprecated in docs and console warnings.
2. Provide replacement APIs and migration examples.
3. Keep it for at least one minor cycle.
4. Remove it in the next major release.

## Pre-Releases

Pre-releases are for validating large changes:

- `alpha`: functionality may still change.
- `beta`: API is mostly stable and needs real project feedback.
- `rc`: release candidate; only blocking fixes should be accepted.

## Changelog Requirements

Every release should include:

- New capabilities.
- Fixed issues.
- Breaking changes.
- Migration notes.
- Validation scope.
- Known risks.
