# AiCodeBlock 智能代码块

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
  console.log('已复制：', text)
}
</${_S}>`

const exampleCode = ref("function greeting() {\n  console.log('Hello World!');\n}")

const onCopy = (text: string) => {
  console.log('已复制：', text)
}
</script>

支持代码高亮与自动复制的智能代码展示组件。

## 基础用法

提供了代码的文件名信息以及一键复制功能。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-code-block 
    filename="main.ts" 
    language="typescript" 
    :code="exampleCode"
    @copy="onCopy"
  />
</div>
</DemoBlock>

## 在 Nuxt 中使用

能够在 Nuxt 以及服务端同构渲染中保持与 highlight.js 计算高亮样式的兼容合并，提供顺畅的一键复制体验并开箱即用地支持 Vite 热更新词法高亮。详见 [Nuxt 集成文档](/guide/nuxt)。

**SSR 注意事项**：

- ✅ highlighter 纯净提取支持
- ✅ v-html 挂载无闪烁 (No hydration mismatches)

::: tip SSR 安全性
AiCodeBlock 首屏骨架在同构环境中无忧渲染。
:::

## API

### Props

| 属性名   | 说明               | 类型     | 默认值   |
| -------- | ------------------ | -------- | -------- |
| code     | 代码内容字符串     | `string` | `''`     |
| filename | 代码头部文件名表示 | `string` | `''`     |
| language | 语言               | `string` | `'text'` |

### Events

| 事件名 | 说明       | 回调参数                 |
| ------ | ---------- | ------------------------ |
| copy   | 复制时触发 | `(code: string) => void` |

### Slots

| 插槽名  | 说明                                       |
| ------- | ------------------------------------------ |
| default | 手动写代码内容                             |
| actions | 添加其他操作按钮，例如『在编辑器中打开』等 |

## 主题变量

| 变量名                             | 说明             | 默认值                           |
| ---------------------------------- | ---------------- | -------------------------------- |
| `--yh-ai-code-block-bg`            | 代码区域背景色   | `#282c34`                        |
| `--yh-ai-code-block-header-bg`     | 顶部工具栏背景色 | `#21252b`                        |
| `--yh-ai-code-block-border-color`  | 边框颜色         | `#181a1f`                        |
| `--yh-ai-code-block-color`         | 代码文字颜色     | `#abb2bf`                        |
| `--yh-ai-code-block-lang-color`    | 语言标识文字颜色 | `#828997`                        |
| `--yh-ai-code-block-border-radius` | 代码块圆角大小   | `8px`                            |
| `--yh-ai-code-block-shadow`        | 代码块阴影       | `0 4px 12px rgba(0, 0, 0, 0.15)` |
