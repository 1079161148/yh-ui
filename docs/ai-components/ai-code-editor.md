# AiCodeEditor Monaco 编辑器

<script setup lang="ts">
import { ref, watch } from 'vue'
import { YhAiCodeEditor } from '@yh-ui/components'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const basicCode = ref(`// Welcome to AiCodeEditor
function greet(name: string) {
  return \`Hello, \${name}!\`
}

console.log(greet('YH-UI'))
`)

const langSamples = {
  javascript: 'function hello() {\n  console.log("Hello JS");\n}',
  typescript: 'interface User {\n  name: string;\n  id: number;\n}\n\nconst user: User = { name: "YH-UI", id: 1 };',
  css: '.yh-ai-code-editor {\n  border: 1px solid var(--yh-primary-color);\n  border-radius: 8px;\n}',
  html: '<div class="yh-container">\n  <h1>Hello YH-UI</h1>\n  <p>Modern Vue 3 UI Library</p>\n</div>'
}

const demoLang = ref('typescript')
const langCode = ref(langSamples.typescript)

watch(demoLang, (newLang) => {
  if (langSamples[newLang]) {
    langCode.value = langSamples[newLang]
  }
}, { immediate: true })

const tsBasic = `<${_T}>
  <div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-code-editor v-model="code" language="typescript" :height="300" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const code = ref(\`// Welcome to AiCodeEditor
function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`
}

console.log(greet('YH-UI'))
\`)
</${_S}>`

const tsLang = `<${_T}>
  <yh-space direction="vertical" fill>
    <yh-radio-group v-model="demoLang" size="small">
      <yh-radio-button value="javascript">JS</yh-radio-button>
      <yh-radio-button value="typescript">TS</yh-radio-button>
      <yh-radio-button value="css">CSS</yh-radio-button>
      <yh-radio-button value="html">HTML</yh-radio-button>
    </yh-radio-group>
    <div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
      <yh-ai-code-editor 
        v-model="langCode" 
        :language="demoLang" 
        :height="200"
        :minimap="false"
      />
    </div>
  </yh-space>
</${_T}>

<${_S} setup lang="ts">
import { ref, watch } from 'vue'

const langSamples = {
  javascript: 'function hello() {\\n  console.log("Hello JS");\\n}',
  typescript: 'interface User {\\n  name: string;\\n  id: number;\\n}\\n\\nconst user: User = { name: "YH-UI", id: 1 };',
  css: '.yh-ai-code-editor {\\n  border: 1px solid var(--yh-primary-color);\\n  border-radius: 8px;\\n}',
  html: '<div class="yh-container">\\n  <h1>Hello YH-UI</h1>\\n  <p>Modern Vue 3 UI Library</p>\\n</div>'
}

const demoLang = ref('typescript')
const langCode = ref(langSamples.typescript)

watch(demoLang, (newLang) => {
  if (langSamples[newLang]) {
    langCode.value = langSamples[newLang]
  }
}, { immediate: true })
</${_S}>`
</script>

`AiCodeEditor` 是一个基于 **Monaco Editor** 封装的高性能代码编辑器组件。它保留了 VS Code 级别的编辑体验，完美集成于 AI 对话流程中的源码编辑场景。支持多语言语法高亮、自动补全及多种主题。

## 基础用法

使用 `v-model` 进行双向绑定，支持通过 `height` 控制尺寸。

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-code-editor v-model="basicCode" language="typescript" :height="300" />
  </div>
</DemoBlock>

## 切换语言与只读

支持动态切换 `language` 和设置 `readonly` 模式。

<DemoBlock :ts-code="tsLang" :js-code="toJs(tsLang)">
  <yh-space direction="vertical" fill>
    <yh-radio-group v-model="demoLang" size="small">
      <yh-radio-button value="javascript">JS</yh-radio-button>
      <yh-radio-button value="typescript">TS</yh-radio-button>
      <yh-radio-button value="css">CSS</yh-radio-button>
      <yh-radio-button value="html">HTML</yh-radio-button>
    </yh-radio-group>
    <div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
      <yh-ai-code-editor 
        v-model="langCode" 
        :language="demoLang" 
        :height="200"
        :minimap="false"
      />
    </div>
  </yh-space>
</DemoBlock>

## API

### Props

| 属性名               | 说明                                   | 类型                                             | 默认值         |
| -------------------- | -------------------------------------- | ------------------------------------------------ | -------------- |
| v-model / modelValue | 代码内容                               | `string`                                         | `''`           |
| initialValue         | 初始代码（优先于 modelValue 用于首屏） | `string`                                         | `undefined`    |
| language             | 代码语言                               | `string`                                         | `'javascript'` |
| readonly             | 是否只读                               | `boolean`                                        | `false`        |
| theme                | 编辑器主题                             | `'vs' \| 'vs-dark' \| 'hc-black'`                | `'vs-dark'`    |
| height               | 编辑器高度                             | `string \| number`                               | `300`          |
| minimap              | 是否显示 Minimap                       | `boolean`                                        | `false`        |
| wordWrap             | 自动换行                               | `'on' \| 'off' \| 'wordWrapColumn' \| 'bounded'` | `'on'`         |
| fontSize             | 字体大小                               | `number`                                         | `14`           |
| tabSize              | 制表符宽度                             | `number`                                         | `2`            |
| autofocus            | 自动聚焦                               | `boolean`                                        | `true`         |
| themeOverrides       | 主题覆盖变量                           | `ComponentThemeVars`                             | `undefined`    |

### Events

| 事件名            | 说明                 | 参数                      |
| ----------------- | -------------------- | ------------------------- |
| update:modelValue | 代码内容变化时触发   | `(value: string) => void` |
| change            | 代码内容变化时触发   | `(value: string) => void` |
| mount             | 编辑器挂载完成时触发 | `() => void`              |
| dispose           | 编辑器销毁时触发     | `() => void`              |

### Methods

| 方法名    | 说明                 | 参数                          |
| --------- | -------------------- | ----------------------------- |
| getEditor | 获取 Monaco 实例对象 | `() => IStandaloneCodeEditor` |
| focus     | 使编辑器获得焦点     | `() => void`                  |
| setValue  | 手动设置代码内容     | `(value: string) => void`     |
| getValue  | 获取当前代码内容     | `() => string`                |
