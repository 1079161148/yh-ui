---
title: AiMermaid 流程图
description: AiMermaid 基于 Mermaid 的流程图/时序图等展示组件，支持代码与图形双视图、缩放、下载、复制等操作。
---

# AiMermaid 流程图

用于在 AI 回复中渲染 Mermaid 图表（流程图、时序图等），支持图像/代码视图切换与缩放、下载、复制。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const mermaidCode = ref(`graph TD
  A[开始] --> B{判断}
  B -->|是| C[执行]
  B -->|否| D[结束]
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
    header="基础流程图"
    :code="mermaidCode"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const mermaidCode = ref(\`graph TD
  A[开始] --> B{判断}
  B -->|是| C[执行]
  B -->|否| D[结束]
  C --> D\`)
</${_S}>`

const tsSequence = `<${_T}>
  <yh-ai-mermaid
    header="时序图 (Sequence Diagram)"
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
    header="甘特图 (Gantt Chart)"
    :code="code"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`gantt
    title 项目开发计划
    dateFormat YYYY-MM-DD
    section 开发
    设计 :2024-03-01, 10d
    编码 :after a1, 20d\`)
</${_S}>`

const tsTheme = `<${_T}>
  <yh-ai-mermaid
    header="森林主题 (Forest Theme)"
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
    header="自定义操作"
    :code="code"
    :actions="{ enableZoom: true, enableDownload: true, enableCopy: true }"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const code = ref('graph LR\\nX --> Y')
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsSequence = toJs(tsSequence)
const jsGantt = toJs(tsGantt)
const jsTheme = toJs(tsTheme)
const jsActions = toJs(tsActions)
</script>

## 基础用法

通过 `code` 传入 Mermaid 代码，`header` 可设置标题。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="基础流程图"
      :code="mermaidCode"
    />
  </div>
</DemoBlock>

## 多样化图表

AiMermaid 完美支持 Mermaid 的所有语法，包括时序图、甘特图、实体关系图等。

<DemoBlock title="时序图" :ts-code="tsSequence" :js-code="jsSequence">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="时序图 (Sequence Diagram)"
      :code="sequenceCode"
    />
  </div>
</DemoBlock>

<DemoBlock title="甘特图" :ts-code="tsGantt" :js-code="jsGantt">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="甘特图 (Gantt Chart)"
      :code="ganttCode"
    />
  </div>
</DemoBlock>

## 自定义配置

可以通过 `config` 属性传入 Mermaid 的原生配置，例如修改渲染主题。支持 `default`, `forest`, `dark`, `neutral` 等预设。

<DemoBlock title="自定义主题" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="森林模式 (Forest Theme)"
      :code="forestCode"
      :config="{ theme: 'forest' }"
    />
  </div>
</DemoBlock>

## 操作栏

默认提供缩放、下载、复制；可通过 `actions` 配置开关。

<DemoBlock title="操作栏" :ts-code="tsActions" :js-code="jsActions">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-ai-mermaid
      header="自定义操作"
      :code="flowchartCode"
      :actions="{ enableZoom: true, enableDownload: true, enableCopy: true }"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性           | 说明                         | 类型                      | 默认值   |
| -------------- | ---------------------------- | ------------------------- | -------- |
| code           | Mermaid 代码                 | `string`                  | `''`     |
| header         | 顶部标题（字符串或插槽）     | `string \| object`        | -        |
| config         | Mermaid 配置                 | `MermaidConfig`           | `{}`     |
| actions        | 操作栏配置（缩放/下载/复制） | `MermaidActions`          | 默认全开 |
| themeOverrides | 主题覆盖                     | `Record<string, unknown>` | -        |

### Events

| 事件名             | 说明                             |
| ------------------ | -------------------------------- |
| render-type-change | 视图类型（image/code）切换时触发 |
| error              | 渲染错误时触发                   |
| ready              | 渲染就绪时触发                   |
