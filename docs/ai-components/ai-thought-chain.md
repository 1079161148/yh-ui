# AiThoughtChain 思维链

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
<yh-ai-thought-chain title="正在分析代码" status="thinking" :content="chainContent" />

<yh-ai-thought-chain title="思考完成" status="complete" content="我思考了 3 秒钟，得出了最佳结果。" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const chainContent = ref("1. 分析抽象语法树\\n2. 寻找冗余变量\\n3. 执行优化建议代码替换")
</${_S}>`

const chainContent = ref("1. 分析抽象语法树\n2. 寻找冗余变量\n3. 执行优化建议代码替换")

const tsTimeline = `<${_T}>
<yh-ai-thought-chain 
  :items="thoughtSteps" 
  :line-gradient="true"
  dot-size="default"
/>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const thoughtSteps = ref([
  { title: '分析需求', content: '正在理解用户提出的代码优化请求...', status: 'success' },
  { title: '搜索上下文', content: '检索项目中相关的模块定义...', status: 'success' },
  { title: '生成方案', content: '正在构建重构建议...', status: 'thinking' },
  { title: '验证方案', status: 'none' }
])
</${_S}>`

const thoughtSteps = ref([
  { title: '分析需求', content: '正在理解用户提出的代码优化请求...', status: 'success' },
  { title: '搜索上下文', content: '检索项目中相关的模块定义...', status: 'success' },
  { title: '生成方案', content: '正在构建重构建议...', status: 'thinking' },
  { title: '验证方案', status: 'none' }
])

</script>

用于展示 AI 模型在推理过程中的多个步骤或复杂的思维路径。支持单节点展示和多节点时间轴展示。

## 基础用法

单节点模式，类似于 `AiThinking`，但带侧边线条，更适合放在长文本中。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-thought-chain title="正在分析代码" status="thinking" :content="chainContent" />
  <yh-ai-thought-chain title="思考完成" status="complete" content="我思考了 3 秒钟，得出了最佳结果。" />
</div>
</DemoBlock>

## 多节点时间轴

通过 `items` 属性传入步骤列表，展示完整的思维链路。

<DemoBlock title="多节点时间轴" :ts-code="tsTimeline" :js-code="toJs(tsTimeline)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain :items="thoughtSteps" :line-gradient="true" />
</div>
</DemoBlock>

## 在 Nuxt 中使用

折叠展开思维链的行为可完美衔接至各种异步流，其客户端状态变更在 Nuxt 的挂载阶段兼容稳定。

有关详细配置和使用方法，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## API

### Props

| 属性名        | 说明                            | 类型                                                                      | 默认值      |
| ------------- | ------------------------------- | ------------------------------------------------------------------------- | ----------- |
| title         | 标题 (单节点模式)               | `string`                                                                  | —           |
| content       | 内容 (单节点模式)               | `string`                                                                  | —           |
| status        | 当前总状态                      | `'thinking' \| 'loading' \| 'success' \| 'complete' \| 'error' \| 'none'` | `'none'`    |
| items         | 思考步骤列表                    | `AiThoughtItem[]`                                                         | `[]`        |
| dot-size      | 节点圆点大小                    | `'small' \| 'default' \| 'large'`                                         | `'default'` |
| line-gradient | 引导线是否显示渐变              | `boolean`                                                                 | `false`     |
| auto-collapse | 状态完成后是否自动收起 (单节点) | `boolean`                                                                 | `false`     |

### AiThoughtItem 结构

| 属性名                | 说明         | 类型              |
| --------------------- | ------------ | ----------------- |
| title                 | 步骤标题     | `string`          |
| content / description | 步骤详细内容 | `string`          |
| status                | 步骤状态     | `AiThoughtStatus` |
| expanded              | 详情是否展开 | `boolean`         |
| icon                  | 覆盖默认图标 | `string`          |

### Slots

| 插槽名  | 说明                   |
| ------- | ---------------------- |
| default | 单节点模式下的内容区域 |

## 主题变量

思维链组件 `YhAiThoughtChain` 深度集成了全球化设计体系：

**AI 思维链局部 CSS 变量指引**

| 变量名                               | 默认值                           |
| ------------------------------------ | -------------------------------- |
| `--yh-ai-thought-chain-line-color`   | `var(--yh-border-color-lighter)` |
| `--yh-ai-thought-chain-active-color` | `var(--yh-color-primary)`        |
