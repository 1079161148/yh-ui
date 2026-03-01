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

const tsAdvanced = `<${_T}>
  <!-- 显示行号并高亮第 2、3 行 -->
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
  // 这两行将被高亮
  return a + b;
}\`)
</${_S}>`

const tsInteractions = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- 可折叠代码块 -->
    <yh-ai-code-block 
      filename="collapsible.json" 
      language="json" 
      code='{ "name": "yh-ui", "version": "1.0.0", "description": "Highly extensible AI UI library" }'
      collapsible
      default-collapsed
    />

    <!-- 带运行按钮的代码块 -->
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
  alert('执行代码: ' + code);
}
</${_S}>`

const exampleCode = ref("function greeting() {\n  console.log('Hello World!');\n}")
const advancedCode = ref(`function sum(a, b) {
  // 这两行将被高亮
  return a + b;
}`)

const onCopy = (text: string) => {
  console.log('已复制：', text)
}

const onRun = (code: string) => {
  alert('执行代码: ' + code);
}
</script>

支持代码高亮、自动复制、行号显示及交互扩展的智能代码展示组件。

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

## 行号与高亮

通过 `show-line-numbers` 开启行号，`highlight-lines` 传入数组实现特定行高亮，常用于代码讲解。

<DemoBlock title="行号与高亮" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
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

## 交互与折叠

支持可折叠状态 (`collapsible`) 以及内置的运行按钮 (`show-run`)。

<DemoBlock title="交互与折叠" :ts-code="tsInteractions" :js-code="toJs(tsInteractions)">
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

| 属性名              | 说明                       | 类型                 | 默认值   |
| ------------------- | -------------------------- | -------------------- | -------- |
| `code`              | 代码内容字符串             | `string`             | `''`     |
| `filename`          | 代码头部文件名表示         | `string`             | `''`     |
| `language`          | 语言标识                   | `string`             | `'text'` |
| `show-line-numbers` | 是否显示行号               | `boolean`            | `false`  |
| `highlight-lines`   | 需要高亮的行号列表         | `number[]`           | `[]`     |
| `collapsible`       | 是否开启折叠功能           | `boolean`            | `false`  |
| `default-collapsed` | 默认是否折叠               | `boolean`            | `false`  |
| `show-run`          | 是否显示运行按钮           | `boolean`            | `false`  |
| `highlight`         | 是否开启语法高亮           | `boolean`            | `true`   |
| `theme-overrides`   | 组件级别的主题定制覆盖变量 | `ComponentThemeVars` | —        |

### Events

| 事件名 | 说明               | 回调参数                 |
| ------ | ------------------ | ------------------------ |
| `copy` | 复制代码时触发     | `(code: string) => void` |
| `run`  | 点击运行按钮时触发 | `(code: string) => void` |

### Slots

| 插槽名    | 说明                               |
| --------- | ---------------------------------- |
| `default` | 自定义内部展现内容                 |
| `actions` | 在工具栏右侧自定义添加操作按钮区域 |

## 在 Nuxt 中使用

能够在 Nuxt 以及服务端同构渲染中保持与 highlight.js 计算高亮样式的兼容合并，提供顺畅的一键复制体验并开箱即用地支持 Vite 热更新词法高亮。详见 [Nuxt 集成文档](/guide/nuxt)。

**SSR 注意事项**：

- ✅ highlighter 纯净提取支持
- ✅ v-html 挂载无闪烁 (No hydration mismatches)

::: tip SSR 安全性
AiCodeBlock 首屏骨架在同构环境中无忧渲染。
:::

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
