# Flagship Examples

YH-UI's differentiated value is not only individual components. It is the production-grade experience created by combining AI, Flow, Table, theme, request, and business components. Flagship examples should demonstrate that complete experience.

## AI Workspace

Goal: show a complete AI-native product loop.

Recommended building blocks:

- `AiChat` / `AiBubble` / `AiBubbleList`
- `AiSender` / `AiEditorSender`
- `AiThoughtChain`
- `AiCodeBlock` / `AiCodeEditor` / `AiCodeRunner`
- `AiArtifacts`
- `AiSources` / `AiAttachments`
- SSE and queue capabilities from `@yh-ui/request`

Acceptance focus:

- Streaming response, cancel, retry, and error recovery.
- Code, charts, attachments, and source citations can coexist.
- Long conversations keep scrolling performance and keyboard usability.

## Flow Automation

Goal: show visual workflow, AI node, and data-flow editing capabilities.

Recommended building blocks:

- `@yh-ui/flow`
- Flow nodes, edges, controls, minimap, and background
- Auto layout, import/export, and screenshot capture
- AI workflow node configuration panel

Acceptance focus:

- Dragging, zooming, connecting, selecting, and viewport controls remain stable.
- JSON import/export can restore graph and viewport state.
- Large canvases remain interactive.

## Heavy Data Table

Goal: show top-tier productivity for management systems and operations dashboards.

Recommended building blocks:

- `YhTable`
- Virtual scrolling
- Column drag, column resize, fixed columns
- Selection, sorting, filtering, pagination
- Import, export, print
- `FilterBar` / `Pagination` / `Descriptions`

Acceptance focus:

- Scrolling remains stable with large datasets.
- Column settings and user choices can be persisted.
- Exported and printed output matches the visible data.

## Publishing Standard

Flagship examples must pass:

```bash
pnpm verify:visual-regression
pnpm verify:a11y
pnpm verify:consumer-smoke
```

Each example needs desktop and mobile coverage, and should demonstrate real interaction rather than static UI only.
