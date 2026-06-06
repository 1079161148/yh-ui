# AiThinking 思考中

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
<yh-ai-thinking v-model="expanded" :status="status" :content="content" />

<div style="margin-top: 16px; display: flex; gap: 8px;">
  <yh-button size="small" @click="status = 'start'">开始</yh-button>
  <yh-button size="small" @click="status = 'thinking'">思考中</yh-button>
  <yh-button size="small" @click="status = 'end'">完成</yh-button>
  <yh-button size="small" @click="status = 'error'">错误</yh-button>
</div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const expanded = ref(true)
const status = ref('thinking')
const content = ref('正在调用搜索引擎检索相关资料...\\n已找到 3 篇相关文档。')
</${_S}>`

const expanded = ref(true)
const status = ref('thinking')
const content = ref('正在调用搜索引擎检索相关资料...\n已找到 3 篇相关文档。')

const tsAutoCollapse = `<${_T}>
<yh-ai-thinking status="end" :auto-collapse="true" content="这条思考记录在完成后会自动收起其详情内容。" />
</${_T}>`

</script>

用于展示 AI 模型在生成结果之前的思考或推理状态，支持折叠详情以保持对话页面的整洁。

## 基础用法

通过 `status` 属性控制当前思考的状态。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-thinking v-model="expanded" :status="status" :content="content" />
  <div style="margin-top: 16px; display: flex; gap: 8px;">
    <yh-button size="small" @click="status = 'start'">开始</yh-button>
    <yh-button size="small" @click="status = 'thinking'">思考中</yh-button>
    <yh-button size="small" @click="status = 'end'">完成</yh-button>
    <yh-button size="small" @click="status = 'error'">错误</yh-button>
  </div>
</div>
</DemoBlock>

## 自动收起

设置 `auto-collapse` 为 `true`，当 `status` 变为 `end` 时，组件会自动收起展开的内容。

<DemoBlock title="自动收起" :ts-code="tsAutoCollapse" :js-code="toJs(tsAutoCollapse)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-thinking status="end" :auto-collapse="true" content="这条思考记录在完成后会自动收起其详情内容。" />
</div>
</DemoBlock>

## API

### Props

| 属性名               | 说明               | 类型                                        | 默认值       |
| -------------------- | ------------------ | ------------------------------------------- | ------------ |
| modelValue / v-model | 详情是否展开       | `boolean`                                   | `false`      |
| status               | 思考状态           | `'start' \| 'thinking' \| 'end' \| 'error'` | `'thinking'` |
| title                | 标题文本           | `string`                                    | —            |
| content              | 详情正文           | `string`                                    | —            |
| auto-collapse        | 完成后是否自动收起 | `boolean`                                   | `false`      |

### Slots

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 自定义详情显示内容 |

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4。在 Nuxt 项目中，组件会被自动按需导入。

有关详细配置，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## 主题变量

AiThinking 采用了紧致的布局设计，旨在以最小的空间提供清晰的思维状态。

| 变量名                           | 说明           | 默认值                       |
| -------------------------------- | -------------- | ---------------------------- |
| `--yh-ai-thinking-bg`            | 思考内容背景色 | `var(--yh-fill-color-light)` |
| `--yh-ai-thinking-border-radius` | 圆角大小       | `8px`                        |
| `--yh-ai-thinking-icon-color`    | 状态图标颜色   | `var(--yh-color-primary)`    |
