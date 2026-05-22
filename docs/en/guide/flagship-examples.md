# Flagship Scenarios

YH-UI becomes differentiated when it helps teams ship complete product surfaces, not when it simply lists more components.

The first phase should build recognition around three flagship scenarios. Each one should feel like a real product surface, not a disconnected demo fragment.

## 1. AI Workspace

### Target users

- AI SaaS products
- copilot-style tools
- internal assistants
- multi-panel analysis workspaces

### Capabilities to showcase

- `AiChat`, `AiBubble`, `AiConversations`
- `AiSender`, `AiEditorSender`
- `AiThoughtChain`
- `AiCodeBlock`, `AiCodeEditor`, `AiCodeRunner`
- `AiArtifacts`, `AiAttachments`, `AiSources`
- streaming, queueing, retry, and stateful flows from `@yh-ui/request`

### Minimum product surface

- left conversation list
- central chat surface
- right artifacts / sources / task panel
- top model and workspace switchers
- realistic error, cancel, retry, and source-expansion states

### Current repository status

This scenario has already started landing as the `Workspace` route inside `apps/ai-ops-starter`, rather than living only as a planning note.

The route already includes:

- a left conversation rail
- a central generative surface
- a right reasoning and source column
- prompt shortcuts
- an artifact drawer

That gives YH-UI a real product surface for validating AI-component fixes instead of relying only on isolated docs demos.

### Acceptance focus

- long conversations remain smooth
- keyboard usage remains complete
- code, attachments, sources, and text coexist cleanly
- streaming and failure recovery feel explicit and trustworthy

## 2. Flow Automation Console

### Target users

- automation platforms
- AI agent orchestration tools
- workflow designers
- internal process builders

### Capabilities to showcase

- `@yh-ui/flow`
- nodes, edges, controls, minimap, and background
- auto layout, import/export, screenshots
- AI node configuration panels
- themed sidebars and multi-state tool surfaces

### Minimum product surface

- central canvas
- left node catalog
- right properties / configuration panel
- top run, import, export, and version controls
- viewport controls, zoom, lasso, undo, redo

### Acceptance focus

- large canvases remain fluid
- import/export restores useful state
- selection, connecting, zooming, and dragging remain stable
- node configuration and canvas behavior feel like one product

## 3. Heavy Data Operations Console

### Target users

- ecommerce operations teams
- internal admin consoles
- review and audit systems
- multi-form, permission-heavy products

### Capabilities to showcase

- `YhTable`
- virtual scrolling, column drag, resize, fixed columns
- filtering, sorting, pagination, bulk actions
- import, export, print
- `FilterBar`, `Descriptions`, and business cards

### Minimum product surface

- top filter and toolbar band
- main table with summary information
- drawer / dialog details
- column settings with persisted preferences
- export and print entry points

### Acceptance focus

- stable scrolling at large row counts
- persistent column and filter choices
- trustworthy print and export output
- a clear narrow-viewport strategy, not just desktop screenshots

## Shared standards

| Dimension     | Standard                                                                              |
| ------------- | ------------------------------------------------------------------------------------- |
| Product feel  | Show complete workflows before isolated widgets                                       |
| Verifiability | Every scenario should be eligible for smoke, a11y, and visual regression checks       |
| Reuse         | Layouts and slices from these scenarios should feed starters or blocks                |
| Documentation | Each scenario should document target users, required modules, and acceptance criteria |

## Scope for this phase

The current phase focuses on:

- scenario definition
- scenario landing pages
- information architecture
- component-composition plans
- acceptance standards

It does not require turning all three scenarios into full standalone products immediately, but later starters and showcase entries should orbit these same product surfaces.
