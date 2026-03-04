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
  { title: '分析需求', content: '正在理解用户提出的代码优化请求...', status: 'success', progress: 25 },
  { title: '搜索上下文', content: '检索项目中相关的模块定义...', status: 'success', progress: 50 },
  { title: '生成方案', content: '正在构建重构建议...', status: 'thinking', progress: 75 },
  { title: '验证方案', status: 'none', progress: 90 }
])
</${_S}>`

const thoughtSteps = ref([
  { title: '分析需求', content: '正在理解用户提出的代码优化请求...', status: 'success', progress: 25 },
  { title: '搜索上下文', content: '检索项目中相关的模块定义...', status: 'success', progress: 50 },
  { title: '生成方案', content: '正在构建重构建议...', status: 'thinking', progress: 75 },
  { title: '验证方案', status: 'none', progress: 90 }
])

const tsAdvanced = `<${_T}>
<yh-ai-thought-chain
  :items="thoughtSteps"
  show-progress
  draggable
  editable
  :markdown="true"
/>
</${_T}>

<${_S} setup lang="ts">
import type { AiThoughtItem } from '@yh-ui/components'
import { ref } from 'vue'

const thoughtSteps = ref<AiThoughtItem[]>([
  {
    title: '解析问题',
    content: '1. 阅读用户需求\\n2. 提取关键约束条件',
    status: 'success',
    expanded: true
  },
  {
    title: '搜索上下文',
    content: '在项目中检索相关模块与依赖关系。',
    status: 'success'
  },
  {
    title: '生成方案',
    content: '根据上下文构造多种备选方案，并对比优缺点。',
    status: 'thinking'
  }
])
</${_S}>`

const tsEvents = `<${_T}>
<yh-ai-thought-chain
  :items="steps"
  editable
  draggable
  @node-click="handleNodeClick"
  @node-delete="handleDelete"
  @node-add="handleAdd"
  @reorder="handleReorder"
/>
</${_T}>

<${_S} setup lang="ts">
import type { AiThoughtItem } from '@yh-ui/components'
import { ref } from 'vue'

const steps = ref<AiThoughtItem[]>([
  { title: 'Step 1', content: '理解问题', status: 'success' },
  { title: 'Step 2', content: '收集上下文', status: 'success' },
  { title: 'Step 3', content: '生成方案', status: 'thinking' }
])

const handleNodeClick = (item: AiThoughtItem, index: number) => {
  console.log('node-click', index, item)
}

const handleDelete = (item: AiThoughtItem, index: number) => {
  steps.value.splice(index, 1)
}

const handleAdd = (index: number) => {
  steps.value.splice(index + 1, 0, {
    title: '新步骤',
    content: '这里是新增的思考步骤。',
    status: 'none'
  })
}

const handleReorder = (items: AiThoughtItem[]) => {
  steps.value = items
}
</${_S}>`

</script>

用于展示 AI 模型在推理过程中的多个步骤或复杂的思维路径。支持 **单节点展示** 和 **多节点时间轴展示**，并内置拖拽排序、节点进度、Markdown 渲染等「第一阶段」全部能力。

## 基础用法

单节点模式，类似于 `AiThinking`，但带侧边线条，更适合放在长文本中。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-thought-chain title="正在分析代码" status="thinking" :content="chainContent" />
  <yh-ai-thought-chain title="思考完成" status="complete" content="我思考了 3 秒钟，得出了最佳结果。" />
</div>
</DemoBlock>

## 多节点时间轴与进度 (Smooth Animation)

当传入 `items` 列表时，组件会切换为时间轴模式，并按顺序展示每个思考步骤。你可以为每个节点传入 `status` 与 `progress`，自动计算整体进度。

> [!TIP]
> **丝滑交互**：组件内置了基于 CSS Grid 的平滑展开/收起动画。当点击节点切换展开状态时，内容区域会以自然的方式滑动显隐，拒绝生硬跳变。

<DemoBlock title="多节点时间轴" :ts-code="tsTimeline" :js-code="toJs(tsTimeline)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain :items="thoughtSteps" :line-gradient="true" show-progress />
</div>
</DemoBlock>

## 可拖拽与可编辑节点

通过 `draggable` 与 `editable` 属性，你可以让时间轴中的每个节点支持 **拖拽排序**、**删除节点** 与 **插入新节点**。节点内容默认支持 Markdown 渲染，便于展示更复杂的说明文本。

<DemoBlock title="可编辑思维链" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain
    :items="thoughtSteps"
    show-progress
    draggable
    editable
  />
</div>
</DemoBlock>

## 事件与交互

在启用编辑、拖拽等能力后，你可以通过事件回调感知用户操作，并更新外部状态：

<DemoBlock title="交互事件" :ts-code="tsEvents" :js-code="toJs(tsEvents)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain
    :items="thoughtSteps"
    editable
    draggable
  />
</div>
</DemoBlock>

## API

### Props

| 属性名          | 说明                                                                 | 类型                                                                      | 默认值      |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| title           | 标题（单节点模式）                                                   | `string`                                                                  | —           |
| content         | 内容（单节点模式）                                                   | `string`                                                                  | —           |
| status          | 当前总状态（兼容单节点模式与多节点整体状态）                         | `'thinking' \| 'loading' \| 'success' \| 'complete' \| 'error' \| 'none'` | `'none'`    |
| items           | 思考步骤列表，提供后将启用多节点时间轴模式                           | `AiThoughtItem[]`                                                         | `[]`        |
| autoCollapse    | 当整体状态变为完成时是否自动收起单节点模式内容                       | `boolean`                                                                 | `true`      |
| dot-size        | 节点圆点大小                                                         | `'small' \| 'default' \| 'large'`                                         | `'default'` |
| line-gradient   | 引导线是否显示渐变                                                   | `boolean`                                                                 | `false`     |
| show-progress   | 是否在顶部展示整体进度条                                             | `boolean`                                                                 | `false`     |
| draggable       | 是否启用拖拽排序                                                     | `boolean`                                                                 | `false`     |
| editable        | 是否启用节点操作（添加 / 删除），通常与 `draggable` 搭配使用         | `boolean`                                                                 | `false`     |
| markdown        | 是否使用 Markdown 渲染节点内容（`content` / `description` 字段）     | `boolean`                                                                 | `true`      |
| theme-overrides | 实例级主题覆盖，复用全局 `@yh-ui/theme` 的 `ComponentThemeVars` 定义 | `ComponentThemeVars`                                                      | —           |

### AiThoughtItem 结构

| 属性名                | 说明                         | 类型                      |
| --------------------- | ---------------------------- | ------------------------- |
| title                 | 步骤标题                     | `string`                  |
| content / description | 步骤详细内容                 | `string`                  |
| status                | 步骤状态                     | `AiThoughtStatus`         |
| expanded              | 详情是否默认展开             | `boolean`                 |
| icon                  | 覆盖默认状态图标名称         | `string`                  |
| id                    | 节点唯一标识，用于拖拽排序等 | `string`                  |
| extra                 | 额外业务数据                 | `Record<string, unknown>` |
| progress              | 当前步骤进度百分比 `0-100`   | `number`                  |
| clickable             | 该节点内容是否可点击触发事件 | `boolean`                 |

### 事件（Emits）

| 事件名       | 说明                         | 回调参数                               |
| ------------ | ---------------------------- | -------------------------------------- |
| update:items | 节点列表发生变化时触发       | `(items: AiThoughtItem[])`             |
| node-click   | 用户点击某个节点内容时触发   | `(item: AiThoughtItem, index: number)` |
| node-delete  | 点击删除按钮时触发           | `(item: AiThoughtItem, index: number)` |
| node-add     | 点击新增按钮时触发           | `(index: number)`                      |
| reorder      | 拖拽完成并重新排序节点后触发 | `(items: AiThoughtItem[])`             |

### Slots

| 插槽名  | 说明                         |
| ------- | ---------------------------- |
| default | 单节点模式下的内容区域自定义 |

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4。在 Nuxt 项目中，组件会被自动按需导入。

有关详细配置，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## 主题变量

思维链组件 `YhAiThoughtChain` 深度集成了全球化设计体系。

| 变量名                                 | 说明             | 默认值                           |
| -------------------------------------- | ---------------- | -------------------------------- |
| `--yh-ai-thought-chain-line-color`     | 引导线颜色       | `var(--yh-border-color-lighter)` |
| `--yh-ai-thought-chain-active-color`   | 活跃状态时的颜色 | `var(--yh-color-primary)`        |
| `--yh-ai-thought-chain-content-bg`     | 内容区域背景色   | `var(--yh-fill-color-light)`     |
| `--yh-ai-thought-chain-content-radius` | 内容区域圆角     | `8px`                            |
