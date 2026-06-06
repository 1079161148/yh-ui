# Transfer 穿梭框

`YhTransfer` 用于在两个列表之间移动数据项，适合权限分配、角色绑定和双栏选择等场景。

<script setup lang="ts">
import { ref } from 'vue'
import type { TransferData } from '@yh-ui/components'

const scriptClose = '</' + 'script>'

const basicValue = ref([2, 4])
const basicData: TransferData[] = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' }
]

const filterValue = ref<number[]>([])
const filterMethod = (query: string, item: TransferData) =>
  item.label.toLowerCase().includes(query.toLowerCase())

const aliasValue = ref([102])
const aliasData = [
  { id: 101, name: '研发部' },
  { id: 102, name: '市场部' },
  { id: 103, name: '人事部', unavailable: true },
  { id: 104, name: '财务部' }
]

const slotValue = ref<number[]>([])

const virtualValue = ref<number[]>([])
const virtualData: TransferData[] = Array.from({ length: 300 }).map((_, index) => ({
  key: index + 1,
  label: `Option ${index + 1}`,
  disabled: index % 6 === 0
}))

const tsBasic = [
  `<template>`,
  `  <yh-transfer v-model="value" :data="data" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([2, 4])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'California' },`,
  `  { key: 2, label: 'Illinois' },`,
  `  { key: 3, label: 'Maryland', disabled: true },`,
  `  { key: 4, label: 'Texas' }`,
  `]`,
  scriptClose
].join('\n')

const tsFilter = [
  `<template>`,
  `  <yh-transfer`,
  `    v-model="value"`,
  `    :data="data"`,
  `    filterable`,
  `    filter-placeholder="请输入关键字"`,
  `    :filter-method="filterMethod"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'California' },`,
  `  { key: 2, label: 'Illinois' },`,
  `  { key: 3, label: 'Maryland' }`,
  `]`,
  ``,
  `const filterMethod = (query: string, item: TransferData) =>`,
  `  item.label.toLowerCase().includes(query.toLowerCase())`,
  scriptClose
].join('\n')

const tsAlias = [
  `<template>`,
  `  <yh-transfer`,
  `    v-model="value"`,
  `    :data="data"`,
  `    :props="{ key: 'id', label: 'name', disabled: 'unavailable' }"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  ``,
  `const value = ref([102])`,
  `const data = [`,
  `  { id: 101, name: '研发部' },`,
  `  { id: 102, name: '市场部' },`,
  `  { id: 103, name: '人事部', unavailable: true },`,
  `  { id: 104, name: '财务部' }`,
  `]`,
  scriptClose
].join('\n')

const tsSlots = [
  `<template>`,
  `  <yh-transfer v-model="value" :data="data">`,
  `    <template #default="{ option }">`,
  `      <span>{{ option.key }} - {{ option.label }}</span>`,
  `    </template>`,
  `    <template #left-footer>`,
  `      <div style="padding: 8px; text-align: center;">源列表底部</div>`,
  `    </template>`,
  `    <template #right-footer>`,
  `      <div style="padding: 8px; text-align: center;">目标列表底部</div>`,
  `    </template>`,
  `  </yh-transfer>`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'Option 1' },`,
  `  { key: 2, label: 'Option 2' }`,
  `]`,
  scriptClose
].join('\n')

const tsVirtual = [
  `<template>`,
  `  <yh-transfer`,
  `    v-model="value"`,
  `    :data="data"`,
  `    virtual`,
  `    :height="320"`,
  `    :item-height="40"`,
  `  />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([])`,
  `const data: TransferData[] = Array.from({ length: 300 }).map((_, index) => ({`,
  `  key: index + 1,`,
  `  label: 'Option ' + (index + 1),`,
  `  disabled: index % 6 === 0`,
  `}))`,
  scriptClose
].join('\n')

const tsNuxt = [
  `<template>`,
  `  <yh-transfer v-model="value" :data="data" />`,
  `</template>`,
  ``,
  `<script setup lang="ts">`,
  `import { ref } from 'vue'`,
  `import type { TransferData } from '@yh-ui/components'`,
  ``,
  `const value = ref([2])`,
  `const data: TransferData[] = [`,
  `  { key: 1, label: 'Nuxt 2' },`,
  `  { key: 2, label: 'Nuxt 3' },`,
  `  { key: 3, label: 'Nuxt 4' }`,
  `]`,
  scriptClose
].join('\n')
</script>

## 基础用法

<DemoBlock title="基础用法" :ts-code="tsBasic">
  <yh-transfer v-model="basicValue" :data="basicData" />
</DemoBlock>

## 过滤

启用 `filterable` 后可在左右面板顶部显示搜索框，并通过 `filter-method` 自定义匹配逻辑。

<DemoBlock title="过滤" :ts-code="tsFilter">
  <yh-transfer
    v-model="filterValue"
    :data="basicData"
    filterable
    filter-placeholder="请输入关键字"
    :filter-method="filterMethod"
  />
</DemoBlock>

## 字段映射

当业务数据字段名不是默认的 `key`、`label`、`disabled` 时，可通过 `props` 指定别名映射。

<DemoBlock title="字段映射" :ts-code="tsAlias">
  <yh-transfer
    v-model="aliasValue"
    :data="aliasData"
    :props="{ key: 'id', label: 'name', disabled: 'unavailable' }"
  />
</DemoBlock>

## 自定义内容与底部插槽

可通过默认项插槽以及左右面板的 header / empty / footer 插槽扩展业务内容与操作区。已声明的 `render-content` 属性当前未被运行时模板消费。

<DemoBlock title="自定义内容与底部插槽" :ts-code="tsSlots">
  <yh-transfer v-model="slotValue" :data="basicData">
    <template #default="{ option }">
      <span>{{ option.key }} - {{ option.label }}</span>
    </template>
    <template #left-footer>
      <div style="padding: 8px; text-align: center;">源列表底部</div>
    </template>
    <template #right-footer>
      <div style="padding: 8px; text-align: center;">目标列表底部</div>
    </template>
  </yh-transfer>
</DemoBlock>

## 虚拟滚动

当候选项较多时，可启用 `virtual`，并结合 `height` 与 `item-height` 控制面板渲染窗口。

<DemoBlock title="虚拟滚动" :ts-code="tsVirtual">
  <yh-transfer
    v-model="virtualValue"
    :data="virtualData"
    virtual
    :height="320"
    :item-height="40"
  />
</DemoBlock>

## 在 Nuxt 中使用

启用 YH-UI Nuxt 模块后，可直接在页面与组件中使用 `YhTransfer`。列表数据、默认选中值和自定义标题可参与 SSR 首屏渲染；用户勾选、搜索和移动按钮等交互会在客户端 hydration 后继续生效。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt">
  <yh-transfer v-model="basicValue" :data="basicData" />
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 右侧目标列表中已选项的 key 集合 | `TransferKey[]` | `[]` |
| `data` | 数据源 | `TransferData[]` | `[]` |
| `filterable` | 是否开启过滤 | `boolean` | `false` |
| `filter-method` | 自定义过滤方法 | `(query: string, item: TransferData) => boolean` | `undefined` |
| `filter-placeholder` | 搜索框占位文案；未传入时回退到 locale | `string` | `undefined` |
| `target-order` | 右侧列表排列策略 | `'original' \| 'push' \| 'unshift'` | `'original'` |
| `titles` | 左右列表标题数组 | `string[]` | `[]` |
| `button-texts` | 中间操作按钮文案数组 | `string[]` | `[]` |
| `render-content` | 已声明的自定义列表项渲染函数。当前仅透传到面板 props，面板模板未消费该配置 | `(h, data) => VNode \| string` | `undefined` |
| `left-default-checked` | 左侧面板初始勾选项 | `TransferKey[]` | `[]` |
| `right-default-checked` | 右侧面板初始勾选项 | `TransferKey[]` | `[]` |
| `props` | 数据字段别名映射 | `{ key?: string; label?: string; disabled?: string }` | `undefined` |
| `disabled` | 是否禁用整个组件 | `boolean` | `false` |
| `size` | 组件尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| `validate-event` | 兼容性保留属性。当前 Transfer 实现未消费该配置来触发表单校验事件 | `boolean` | `true` |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` |
| `item-height` | 虚拟滚动单项高度 | `number` | `40` |
| `height` | 面板高度 | `number` | `280` |
| `left-title` | 左侧面板标题 | `string` | `undefined` |
| `right-title` | 右侧面板标题 | `string` | `undefined` |
| `show-all-checkbox` | 已声明的全选入口显示属性。当前面板头部仍会渲染全选入口，不受该值控制 | `boolean` | `true` |
| `empty-text` | 两侧统一空状态文案 | `string` | `undefined` |
| `left-empty-text` | 左侧面板空状态文案 | `string` | `undefined` |
| `right-empty-text` | 右侧面板空状态文案 | `string` | `undefined` |
| `theme-overrides` | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 目标列表 key 集合变化时触发 | `(value: TransferKey[])` |
| `change` | 数据从左向右或从右向左移动后触发 | `(value: TransferKey[], direction: 'left' \| 'right', movedKeys: TransferKey[])` |
| `left-check-change` | 左侧面板勾选变化时触发 | `(value: TransferKey[], movedKeys?: TransferKey[])` |
| `right-check-change` | 右侧面板勾选变化时触发 | `(value: TransferKey[], movedKeys?: TransferKey[])` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义列表项内容 | `{ option: TransferData }` |
| `buttons` | 自定义中间操作按钮区域 | `{ moveToLeft: () => void; moveToRight: () => void; leftChecked: TransferKey[]; rightChecked: TransferKey[] }` |
| `left-header` | 左侧面板头部内容 | `-` |
| `right-header` | 右侧面板头部内容 | `-` |
| `left-empty` | 左侧面板空状态内容 | `-` |
| `right-empty` | 右侧面板空状态内容 | `-` |
| `left-footer` | 左侧面板底部内容 | `-` |
| `right-footer` | 右侧面板底部内容 | `-` |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `clearLeftChecked` | 清空左侧面板勾选状态 | `() => void` |
| `clearRightChecked` | 清空右侧面板勾选状态 | `() => void` |
| `leftPanel` | 左侧面板实例引用 | `Ref<TransferPanelExpose \| undefined>` |
| `rightPanel` | 右侧面板实例引用 | `Ref<TransferPanelExpose \| undefined>` |

### 主题变量

`YhTransfer` 支持 `themeOverrides`，但当前未定义组件专属 CSS 变量，主要消费全局主题令牌与表单/文本色板。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhTransferProps` | `YhTransfer` props 类型 |
| `YhTransferEmits` | `YhTransfer` emits 类型 |
| `YhTransferExpose` | `YhTransfer` expose 类型 |
| `YhTransferPanelExpose` | 面板 expose 类型 |
| `YhTransferInstance` | 穿梭框实例类型 |
| `YhTransferPanelInstance` | 面板实例类型 |
| `TransferData` | 数据项类型 |
| `TransferKey` | 数据 key 类型 |
| `TransferDirection` | 移动方向类型 |
| `TransferSize` | 尺寸类型 |
| `TransferPropsAlias` | 字段映射配置类型 |
| `TransferFilterMethod` | 过滤方法类型 |
| `TransferRenderContent` | 自定义渲染函数类型 |
