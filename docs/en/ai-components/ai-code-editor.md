# AiCodeEditor Monaco Editor

<script setup lang="ts">
import { ref, watch } from 'vue'
import { YhAiCodeEditor } from '@yh-ui/components'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

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

`AiCodeEditor` is a high-performance code editor component based on **Monaco Editor**. It retains the VS Code-level editing experience and is perfectly integrated into source code editing scenarios in AI dialogue flows. It supports multi-language syntax highlighting, autocompletion, and multiple themes.

## Basic Usage

Use `v-model` for two-way binding, and control the size via `height`.

<DemoBlock :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-ai-code-editor v-model="basicCode" language="typescript" :height="300" />
  </div>
</DemoBlock>

## Language Switching & Readonly

Supports dynamic `language` switching and `readonly` mode.

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

| Property             | Description                                              | Type                                             | Default        |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------ | -------------- |
| v-model / modelValue | Code content                                             | `string`                                         | `''`           |
| initialValue         | Initial code (priority over modelValue for first screen) | `string`                                         | `undefined`    |
| language             | Programming language                                     | `string`                                         | `'javascript'` |
| readonly             | Whether it is read-only                                  | `boolean`                                        | `false`        |
| theme                | Editor theme                                             | `'vs' \| 'vs-dark' \| 'hc-black'`                | `'vs-dark'`    |
| height               | Editor height                                            | `string \| number`                               | `300`          |
| minimap              | Whether to show Minimap                                  | `boolean`                                        | `false`        |
| wordWrap             | Auto word wrap                                           | `'on' \| 'off' \| 'wordWrapColumn' \| 'bounded'` | `'on'`         |
| fontSize             | Font size                                                | `number`                                         | `14`           |
| tabSize              | Tab width                                                | `number`                                         | `2`            |
| autofocus            | Auto focus on mount                                      | `boolean`                                        | `true`         |
| themeOverrides       | Theme override variables                                 | `ComponentThemeVars`                             | `undefined`    |

### Events

| Event Name        | Description                         | Parameters                |
| ----------------- | ----------------------------------- | ------------------------- |
| update:modelValue | Triggered when code content changes | `(value: string) => void` |
| change            | Triggered when code content changes | `(value: string) => void` |
| mount             | Triggered when editor is mounted    | `() => void`              |
| dispose           | Triggered when editor is disposed   | `() => void`              |

### Methods

| Method Name | Description                | Parameters                    |
| ----------- | -------------------------- | ----------------------------- |
| getEditor   | Get Monaco editor instance | `() => IStandaloneCodeEditor` |
| focus       | Set focus to the editor    | `() => void`                  |
| setValue    | Set code content manually  | `(value: string) => void`     |
| getValue    | Get current code content   | `() => string`                |
