# AiCodeBlock

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <yh-ai-code-block 
    filename="main.ts" 
    language="typescript" 
    :code="exampleCode"
    @copy="onCopy"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const exampleCode = ref("function greeting() {\\n  console.log('Hello World!');\\n}")

const onCopy = (text: string) => {
  console.log('Copied:', text)
}
</${_S}>`

const tsAdvanced = `<${_T}>
  <yh-ai-code-block 
    filename="advanced.ts" 
    language="typescript" 
    :code="advancedCode"
    show-line-numbers
    :highlight-lines="[2, 3]"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const advancedCode = ref(\`function sum(a, b) {
  // These lines will be highlighted
  return a + b;
}\`)
</${_S}>`

const tsInteractions = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Collapsible code block -->
    <yh-ai-code-block 
      filename="collapsible.json" 
      language="json" 
      code='{ "name": "yh-ui", "version": "1.0.0", "description": "Highly extensible AI UI library" }'
      collapsible
      default-collapsed
    />

    <!-- Code block with run button -->
    <yh-ai-code-block 
      filename="script.js" 
      language="javascript" 
      code="console.log('Running AI simulation...');"
      show-run
      @run="onRun"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const onRun = (code: string) => {
  alert('Execute Code: ' + code);
}
</${_S}>`

const exampleCode = ref("function greeting() {\n  console.log('Hello World!');\n}")
const advancedCode = ref(`function sum(a, b) {
  // These lines will be highlighted
  return a + b;
}`)

const onCopy = (text: string) => {
  console.log('Copied:', text)
}

const onRun = (code: string) => {
  alert('Execute Code: ' + code);
}
</script>

An intelligent code snippet component supporting syntax highlighting, clipboard integration, line numbers, and interactive expansions.

## Basic Usage

Display code snippets with filename labels and a one-click copy feature.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-code-block 
    filename="main.ts" 
    language="typescript" 
    :code="exampleCode"
    @copy="onCopy"
  />
</div>
</DemoBlock>

## Line Numbers & Highlighting

Enable line numbers with `show-line-numbers` and highlight specific lines using `highlight-lines` for better explanations.

<DemoBlock title="Line Numbers & Highlighting" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-code-block 
    filename="advanced.ts" 
    language="typescript" 
    :code="advancedCode"
    show-line-numbers
    :highlight-lines="[2, 3]"
  />
</div>
</DemoBlock>

## Interaction & Collapsible

Supports collapsible states (`collapsible`) and a built-in run action (`show-run`).

<DemoBlock title="Interaction & Collapsible" :ts-code="tsInteractions" :js-code="toJs(tsInteractions)">
<div style="background:var(--yh-bg-color-page); padding:16px; display: flex; flex-direction: column; gap: 16px;">
  <yh-ai-code-block 
    filename="collapsible.json" 
    language="json" 
    code='{ "name": "yh-ui", "version": "1.0.0", "description": "Highly extensible AI UI library" }'
    collapsible
    default-collapsed
  />
  <yh-ai-code-block 
    filename="script.js" 
    language="javascript" 
    code="console.log('Running AI simulation...');"
    show-run
    @run="onRun"
  />
</div>
</DemoBlock>

## API

### Props

| Prop Name           | Description                       | Type                 | Default  |
| ------------------- | --------------------------------- | -------------------- | -------- |
| `code`              | Code content string               | `string`             | `''`     |
| `filename`          | Filename to display in header     | `string`             | `''`     |
| `language`          | Programming language identifier   | `string`             | `'text'` |
| `show-line-numbers` | Whether to show line numbers      | `boolean`            | `false`  |
| `highlight-lines`   | List of line numbers to highlight | `number[]`           | `[]`     |
| `collapsible`       | Enable collapsible feature        | `boolean`            | `false`  |
| `default-collapsed` | Initial collapsed state           | `boolean`            | `false`  |
| `show-run`          | Whether to show the run button    | `boolean`            | `false`  |
| `highlight`         | Enable syntax highlighting        | `boolean`            | `true`   |
| `theme-overrides`   | Component-level theme overrides   | `ComponentThemeVars` | —        |

### Events

| Event Name | Description                              | Callback Parameters      |
| ---------- | ---------------------------------------- | ------------------------ |
| `copy`     | Triggered when code is copied            | `(code: string) => void` |
| `run`      | Triggered when the run button is clicked | `(code: string) => void` |

### Slots

| Slot Name | Description                                      |
| --------- | ------------------------------------------------ |
| `default` | Custom internal content                          |
| `actions` | Inject custom interactive buttons in the toolbar |

## Use in Nuxt

Functions smoothly within Vue SSR and Nuxt Server-Side environments combining `highlight.js` natively. Please inspect [Nuxt Usage](/en/guide/nuxt) to unleash seamless isomorphic builds.

**SSR Notes**:

- ✅ Pure static strings generation safely rendered
- ✅ Smooth hydration processes upon browser loads

::: tip SSR Safety
AiCodeBlock securely resolves AST structures inside virtual trees safely.
:::

## Theme Variables

| Variable Name                      | Description                     | Default Value                    |
| ---------------------------------- | ------------------------------- | -------------------------------- |
| `--yh-ai-code-block-bg`            | Code area background color      | `#282c34`                        |
| `--yh-ai-code-block-header-bg`     | Header toolbar background color | `#21252b`                        |
| `--yh-ai-code-block-border-color`  | Border color                    | `#181a1f`                        |
| `--yh-ai-code-block-color`         | Code text color                 | `#abb2bf`                        |
| `--yh-ai-code-block-lang-color`    | Language label text color       | `#828997`                        |
| `--yh-ai-code-block-border-radius` | Code block border radius        | `8px`                            |
| `--yh-ai-code-block-shadow`        | Code block shadow               | `0 4px 12px rgba(0, 0, 0, 0.15)` |
