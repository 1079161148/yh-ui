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

const exampleCode = ref("function greeting() {\n  console.log('Hello World!');\n}")

const onCopy = (text: string) => {
  console.log('Copied:', text)
}
</script>

An intelligent code snippet syntax component packed with highlight themes and easy duplication.

## Basic Usage

Display codes with their labeled filenames along with copy tools.

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

## Use in Nuxt

Functions smoothly within Vue SSR and Nuxt Server-Side environments combining `highlight.js` natively. Please inspect [Nuxt Usage](/en/guide/nuxt) to unleash seamless isomorphic builds.

**SSR Notes**:

- ✅ Pure static strings generation safely rendered
- ✅ Smooth hydration processes upon browser loads

::: tip SSR Safety
AiCodeBlock securely resolves AST structures inside virtual trees safely.
:::

## API

### Props

| Name     | Description               | Type     | Default  |
| -------- | ------------------------- | -------- | -------- |
| code     | Text content to highlight | `string` | `''`     |
| filename | Top bar title name        | `string` | `''`     |
| language | Parsing language          | `string` | `'text'` |

### Events

| Name | Description                          | Parameter                |
| ---- | ------------------------------------ | ------------------------ |
| copy | Emitted when clipboard is successful | `(code: string) => void` |

### Slots

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| default | Manually inject code tags                          |
| actions | Inject more features like "Open in Editor" buttons |

## Theme Variables

| Variable Name                      | Description                         | Default Value                    |
| ---------------------------------- | ----------------------------------- | -------------------------------- |
| `--yh-ai-code-block-bg`            | Code area background color          | `#282c34`                        |
| `--yh-ai-code-block-header-bg`     | Top header toolbar background color | `#21252b`                        |
| `--yh-ai-code-block-border-color`  | Border color                        | `#181a1f`                        |
| `--yh-ai-code-block-color`         | Code text color                     | `#abb2bf`                        |
| `--yh-ai-code-block-lang-color`    | Language label text color           | `#828997`                        |
| `--yh-ai-code-block-border-radius` | Code block border radius            | `8px`                            |
| `--yh-ai-code-block-shadow`        | Code block shadow                   | `0 4px 12px rgba(0, 0, 0, 0.15)` |
