# Community Feedback Loop

The quality of an open-source UI library comes from continuous feedback. YH-UI connects Issues, Discussions, PRs, documentation, and release notes into one loop so problems can be seen, classified, fixed, and reviewed.

## Feedback Channels

| Channel            | Use Case                                                  |
| ------------------ | --------------------------------------------------------- |
| GitHub Issues      | Bugs, feature requests, docs issues, compatibility issues |
| GitHub Discussions | Design proposals, usage patterns, architecture discussion |
| Pull Requests      | Fixes, documentation, new features                        |
| Changelog          | Release notes, migration hints, risk notes                |

## Issue Template

A high-quality issue should include:

- Type: bug, feature, docs, question.
- YH-UI version, Vue version, build tool, browser or Node version.
- Minimal reproduction link or code snippet.
- Actual behavior and expected behavior.
- Screenshots, console errors, or build logs.
- Whether you are willing to submit a PR.

## Priority Levels

| Priority | Criteria                                                                     |
| -------- | ---------------------------------------------------------------------------- |
| P0       | Build failure, SSR crash, core component unavailable, security issue         |
| P1       | Severe behavior bug in high-usage components, data loss, breaking regression |
| P2       | Confirmed bug, compatibility issue, important UX problem                     |
| P3       | Documentation improvement, low-frequency scenario, enhancement request       |

## Process

1. Triage: confirm reproduction, add labels and priority.
2. Design: discuss APIs, visual changes, and breaking changes before implementation.
3. Implement: keep PRs focused and add tests or docs.
4. Verify: run related unit tests, build, docs playground, or consumer smoke.
5. Release: add changelog entries and migration notes when needed.
6. Review: decide whether new tests, docs, or lint rules are needed to prevent recurrence.

## PR Requirements

- Explain why the change is needed, what changed, and how it was verified.
- Include required tests or documentation.
- Avoid unrelated formatting.
- Public API changes must describe compatibility impact.
- Visual changes should include screenshots or playground links.

## Maintainer Response Goals

| Type                       | Initial Response Target |
| -------------------------- | ----------------------- |
| Security or blocking issue | Within 24 hours         |
| Reproducible bug           | Within 3 business days  |
| Feature request            | Within 7 business days  |
| Documentation issue        | Within 7 business days  |

These are collaboration goals, not a strict SLA. Maintainers prioritize issues with higher impact.

## Closing Conditions

An issue may be closed when:

- It has been fixed and released or merged.
- It lacks reproduction and has no follow-up for a long time.
- It does not match project goals.
- It duplicates an existing issue.

When closing, explain the reason and link alternatives or related issues when possible.
