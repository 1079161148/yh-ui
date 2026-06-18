---
title: AiMermaid
description: AiMermaid renders Mermaid diagrams (flowcharts, sequence diagrams) in AI replies, with image/code view, zoom, download, and copy.
---

# AiMermaid

Renders Mermaid diagrams (flowcharts, sequence diagrams, etc.) in AI messages. Supports image/code view toggle, zoom, download, and copy.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const mermaidCode = ref(`graph TD
  A[Start] --> B{Condition}
  B -->|Yes| C[Execute]
  B -->|No| D[End]
  C --> D`)

const flowchartCode = ref(`graph LR
  X --> Y`)

const forestCode = ref(`graph LR
  Tree --> Leaf
  Leaf --> Soil`)

const sequenceCode = ref(`sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end`)

const ganttCode = ref(`gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d`)

const tsBasic = `<${_T}>
  <yh-ai-mermaid
    header="Basic Flowchart"
    :code="mermaidCode"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const mermaidCode = ref(\`graph TD
  A[Start] --> B{Condition}
  B -->|Yes| C[Execute]
  B -->|No| D[End]
  C --> D\`)
</${_S}>`

const tsSequence = `<${_T}>
  <yh-ai-mermaid
    header="Sequence Diagram"
    :code="code"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end\`)
</${_S}>`

const tsGantt = `<${_T}>
  <yh-ai-mermaid
    header="Gantt Chart"
    :code="code"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`gantt
    title Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Design :2024-03-01, 10d
    Coding :after a1, 20d\`)
</${_S}>`

const tsTheme = `<${_T}>
  <yh-ai-mermaid
    header="Forest Theme"
    :code="code"
    :config="{ theme: 'forest' }"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`graph LR
    A[Forest] --> B[Green]
    B --> C[Nature]\`)
</${_S}>`

const tsActions = `<${_T}>
  <yh-ai-mermaid
    header="Custom Actions"
    :code="code"
    :actions="{ enableZoom: true, enableDownload: true, enableCopy: true }"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const code = ref('graph LR\\nX --> Y')
</${_S}>`

const longFlowchartCode = ref(`graph LR
  Start[Start Process] --> Step1[Step 1: Collect User Requirements and Market Research]
  Step1 --> Step2[Step 2: Solution Design and Technical Feasibility Review]
  Step2 --> Step3[Step 3: Architectural Design and Core Component Module Division]
  Step3 --> Step4[Step 4: Frontend and Backend Coding and Automated Test Writing]
  Step4 --> Step5[Step 5: Integration Testing, Gray Release and Production Deployment]
  Step5 --> End[End Process]`)

const tsLongFlowchart = `<${_T}>
  <yh-ai-mermaid
    header="Long Flowchart Scroll Example"
    :code="code"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`graph LR
  Start[Start Process] --> Step1[Step 1: Collect User Requirements and Market Research]
  Step1 --> Step2[Step 2: Solution Design and Technical Feasibility Review]
  Step2 --> Step3[Step 3: Architectural Design and Core Component Module Division]
  Step3 --> Step4[Step 4: Frontend and Backend Coding and Automated Test Writing]
  Step4 --> Step5[Step 5: Integration Testing, Gray Release and Production Deployment]
  Step5 --> End[End Process]\`)
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsSequence = toJs(tsSequence)
const jsGantt = toJs(tsGantt)
const jsTheme = toJs(tsTheme)
const jsActions = toJs(tsActions)
const jsLongFlowchart = toJs(tsLongFlowchart)
</script>

## Basic Usage

Pass Mermaid code via `code`; use `header` for the title.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="Basic Flowchart"
      :code="mermaidCode"
    />
  </div>
</DemoBlock>

## Diverse Diagrams

AiMermaid fully supports all Mermaid syntax, including Sequence Diagrams, Gantt Charts, Entity Relationship Diagrams, etc.

<DemoBlock title="Sequence Diagram" :ts-code="tsSequence" :js-code="jsSequence">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="Sequence Diagram"
      :code="sequenceCode"
    />
  </div>
</DemoBlock>

<DemoBlock title="Gantt Chart" :ts-code="tsGantt" :js-code="jsGantt">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="Gantt Chart"
      :code="ganttCode"
    />
  </div>
</DemoBlock>

## Custom Configuration

Native Mermaid configurations can be passed via the `config` prop, such as changing the rendering theme. Supports presets like `default`, `forest`, `dark`, and `neutral`.

<DemoBlock title="Custom Theme" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="Forest Theme"
      :code="forestCode"
      :config="{ theme: 'forest' }"
    />
  </div>
</DemoBlock>

## Actions

Zoom, download, and copy are enabled by default; configure via `actions`.

<DemoBlock title="Actions" :ts-code="tsActions" :js-code="jsActions">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="Custom Actions"
      :code="flowchartCode"
      :actions="{ enableZoom: true, enableDownload: true, enableCopy: true }"
    />
  </div>
</DemoBlock>

## Scrolling and Container Overflow

When a flowchart is too long or wide, you can scroll horizontally or vertically to view it. The nodes, edge paths, and labels inside are forced to have `overflow: visible` styling to ensure text is not clipped or truncated at the boundaries.

<DemoBlock title="Long Flowchart Scrolling & Overflow" :ts-code="tsLongFlowchart" :js-code="jsLongFlowchart">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="Long Flowchart Scroll Example"
      :code="longFlowchartCode"
    />
  </div>
</DemoBlock>

## API

### Props

| Property       | Description                                                                                                   | Type                      | Default     |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| code           | Mermaid code                                                                                                  | `string`                  | `''`        |
| header         | Header (string or slot)                                                                                       | `string \| object`        | -           |
| config         | Mermaid config                                                                                                | `MermaidConfig`           | `{}`        |
| actions        | Action bar (zoom/download/copy)                                                                               | `MermaidActions`          | all enabled |
| classNames     | Extra CSS class names per region. Keys: `root` / `header` / `headerContent` / `extra` / `actions` / `content` | `Record<string, string>`  | -           |
| styles         | Inline styles per region. Same keys as `classNames`                                                           | `Record<string, string>`  | -           |
| prefixCls      | Custom BEM root class prefix                                                                                  | `string`                  | -           |
| themeOverrides | Theme overrides                                                                                               | `Record<string, unknown>` | -           |

### Events

| Event              | Description                               |
| ------------------ | ----------------------------------------- |
| render-type-change | Fired when view type (image/code) changes |
| error              | Fired on render error                     |
| ready              | Fired when render is ready                |
