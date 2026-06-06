# AiCodeRunner WebContainer 运行器

<script setup lang="ts">
import { ref } from 'vue'
import { YhAiCodeRunner } from '@yh-ui/components'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const basicCode = ref(`// Welcome to AiCodeRunner
console.log('Hello from WebContainer!')
console.log('Current time:', new Date().toISOString())

const result = Array.from({ length: 5 }, (_, i) => i * 2)
console.log('Result:', result)
`)

const autoRunCode = ref("console.log('Auto running...')")

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

`AiCodeRunner` 组件封装了 **@webcontainer/api**，提供了一个在浏览器中运行 Node.js 环境的强大沙箱。它通常用于 AI 生成代码后的实时预览、逻辑验证以及交互式教程。

## 基础用法

传入 `code` 字符串即可在终端中执行。组件会自动处理 WebContainer 的初始化。

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-ai-code-runner :code="basicCode" :height="240" />
</DemoBlock>

## 自动运行

设置 `autorun` 为 `true`，当 `code` 发生变化时将自动重新执行。

<DemoBlock :ts-code="tsAutoRun" :js-code="toJs(tsAutoRun)">
  <yh-ai-code-runner :code="autoRunCode" :height="200" autorun />
</DemoBlock>

## API

### Props

| 属性名         | 说明                                           | 类型                 | 默认值         |
| -------------- | ---------------------------------------------- | -------------------- | -------------- |
| code           | 要执行的代码字符串                             | `string`             | `''`           |
| language       | 代码语言（目前主要支持 javascript/typescript） | `string`             | `'javascript'` |
| height         | 终端显示区域高度                               | `string \| number`   | `200`          |
| autorun        | 代码变化时是否自动执行                         | `boolean`            | `false`        |
| themeOverrides | 主题覆盖变量                                   | `ComponentThemeVars` | `undefined`    |

### Events

| 事件名 | 说明                              | 参数                               |
| ------ | --------------------------------- | ---------------------------------- |
| run    | 开始执行代码时触发                | `(code: string) => void`           |
| stop   | 手动停止执行时触发                | `() => void`                       |
| output | 终端有新输出时触发                | `(data: string) => void`           |
| error  | 执行过程中出现错误时触发          | `(error: string) => void`          |
| ready  | WebContainer 环境初始化就绪时触发 | `(instance: WebContainer) => void` |

### Methods

| 方法名 | 说明                   | 参数         |
| ------ | ---------------------- | ------------ |
| run    | 手动触发代码运行       | `() => void` |
| stop   | 停止当前正在运行的进程 | `() => void` |
| reset  | 重置 WebContainer 实例 | `() => void` |
| clear  | 清空终端输出内容       | `() => void` |

::: tip 环境要求
WebContainer 依赖 `SharedArrayBuffer`。请确保您的服务器配置了必要的安全头（Cross-Origin Isolation）：

1. `Cross-Origin-Opener-Policy: same-origin`
2. `Cross-Origin-Embedder-Policy: require-corp`
   :::
