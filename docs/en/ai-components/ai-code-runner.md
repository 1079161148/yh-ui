# AiCodeRunner WebContainer Runner

<script setup lang="ts">
import { ref } from 'vue'
import { YhAiCodeRunner } from '@yh-ui/components'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const code = ref(`// Welcome to AiCodeRunner
console.log('Hello from WebContainer!')
console.log('Current time:', new Date().toISOString())

const result = Array.from({ length: 5 }, (_, i) => i * 2)
console.log('Result:', result)
`)

const tsBasic = `<${_T}>
  <yh-ai-code-runner :code="code" :height="240" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`// Welcome to AiCodeRunner
console.log('Hello from WebContainer!')
console.log('Current time:', new Date().toISOString())

const result = Array.from({ length: 5 }, (_, i) => i * 2)
console.log('Result:', result)
\`)
</${_S}>`

const tsAutoRun = `<${_T}>
  <yh-ai-code-runner :code="code" :height="200" autorun />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref("console.log('Auto running...')")
</${_S}>`
</script>

The `AiCodeRunner` component encapsulates **@webcontainer/api**, providing a powerful sandbox for running a Node.js environment directly in the browser. It is typically used for real-time previews of AI-generated code, logic validation, and interactive tutorials.

## Basic Usage

Pass a `code` string to execute it in the terminal. The component automatically handles the initialization of the WebContainer.

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-ai-code-runner :code="code" :height="240" />
</DemoBlock>

## Auto Run

Set `autorun` to `true` to automatically re-execute whenever the `code` changes.

<DemoBlock :ts-code="tsAutoRun" :js-code="toJs(tsAutoRun)">
  <yh-ai-code-runner :code="code" :height="200" autorun />
</DemoBlock>

## API

### Props

| Property       | Description                                                     | Type                 | Default        |
| -------------- | --------------------------------------------------------------- | -------------------- | -------------- |
| code           | Code string to execute                                          | `string`             | `''`           |
| language       | Programming language (primarily supports javascript/typescript) | `string`             | `'javascript'` |
| height         | Height of the terminal display area                             | `string \| number`   | `200`          |
| autorun        | Whether to execute automatically when code changes              | `boolean`            | `false`        |
| themeOverrides | Theme override variables                                        | `ComponentThemeVars` | `undefined`    |

### Events

| Event Name | Description                                          | Parameters                         |
| ---------- | ---------------------------------------------------- | ---------------------------------- |
| run        | Triggered when code execution starts                 | `(code: string) => void`           |
| stop       | Triggered when execution is manually stopped         | `() => void`                       |
| output     | Triggered when there is new terminal output          | `(data: string) => void`           |
| error      | Triggered when an error occurs during execution      | `(error: string) => void`          |
| ready      | Triggered when the WebContainer environment is ready | `(instance: WebContainer) => void` |

### Methods

| Method Name | Description                        | Parameters   |
| ----------- | ---------------------------------- | ------------ |
| run         | Manually trigger code execution    | `() => void` |
| stop        | Stop the currently running process | `() => void` |
| reset       | Reset the WebContainer instance    | `() => void` |
| clear       | Clear the terminal output          | `() => void` |

::: tip Environment Requirements
WebContainer relies on `SharedArrayBuffer`. Ensure your server is configured with the necessary security headers (Cross-Origin Isolation):

1. `Cross-Origin-Opener-Policy: same-origin`
2. `Cross-Origin-Embedder-Policy: require-corp`
   :::
