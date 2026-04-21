# Tabs 标签页

`YhTabs` 和 `YhTabPane` 用于将关联内容拆分到多个面板中，支持线形、卡片、边框卡片、分段器风格，以及自定义触发方式、动态增删、延迟渲染和主题变量覆盖。

<script setup lang="ts">
import { ref } from 'vue'

const activeBasic = ref('first')
const activeCard = ref('first')
const activeBorderCard = ref('first')
const activeSegment = ref('first')
const activePosition = ref('first')
const tabPosition = ref<'top' | 'right' | 'bottom' | 'left'>('top')
const activeStretch = ref('first')
const activeEditable = ref('1')
const activeBeforeLeave = ref('first')
const activeLazy = ref('first')
const activeNuxt = ref('first')
const activeIndicator = ref('first')
const activeTrigger = ref('first')

const editableTabs = ref([
  { name: '1', label: '标签 1', content: '标签 1 内容' },
  { name: '2', label: '标签 2', content: '标签 2 内容' }
])
let tabIndex = 2

const handleTabsEdit = (targetName: string, action: 'add' | 'remove') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      name: newTabName,
      label: `标签 ${tabIndex}`,
      content: `标签 ${tabIndex} 内容`
    })
    activeEditable.value = newTabName
  } else {
    const tabs = editableTabs.value
    let activeTab = activeEditable.value
    if (activeTab === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) activeTab = nextTab.name
        }
      })
    }
    activeEditable.value = activeTab
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

const customAddTabs = ref([
  { name: '1', label: '标签 1', content: '标签 1 内容' },
  { name: '2', label: '标签 2', content: '标签 2 内容' }
])
const activeCustomAdd = ref('1')
let customTabIndex = 2

const handleCustomAdd = () => {
  const newTabName = `${++customTabIndex}`
  customAddTabs.value.push({
    name: newTabName,
    label: `标签 ${customTabIndex}`,
    content: `标签 ${customTabIndex} 内容`
  })
  activeCustomAdd.value = newTabName
}

const handleCustomRemove = (name: string | number) => {
  const tabs = customAddTabs.value
  let activeTab = activeCustomAdd.value
  if (activeTab === name) {
    tabs.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) activeTab = nextTab.name
      }
    })
  }
  activeCustomAdd.value = activeTab
  customAddTabs.value = tabs.filter((tab) => tab.name !== name)
}

const beforeLeave = (newName: string | number, oldName: string | number) =>
  window.confirm(`确定要从 ${oldName} 切换到 ${newName} 吗？`)

const tsBasic = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
    <yh-tab-pane name="fourth" label="任务补偿" disabled>任务补偿</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsTrigger = `<template>
  <yh-tabs v-model="activeName" trigger="hover">
    <yh-tab-pane name="first" label="用户管理">鼠标移入即可切换</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsCard = `<template>
  <yh-tabs v-model="activeName" type="card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsBorderCard = `<template>
  <yh-tabs v-model="activeName" type="border-card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsSegment = `<template>
  <yh-tabs v-model="activeName" type="segment">
    <yh-tab-pane name="first" label="日">日视图</yh-tab-pane>
    <yh-tab-pane name="second" label="周">周视图</yh-tab-pane>
    <yh-tab-pane name="third" label="月">月视图</yh-tab-pane>
    <yh-tab-pane name="fourth" label="年">年视图</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsPosition = `<template>
  <yh-radio-group v-model="tabPosition" style="margin-bottom: 16px">
    <yh-radio-button value="top">top</yh-radio-button>
    <yh-radio-button value="right">right</yh-radio-button>
    <yh-radio-button value="bottom">bottom</yh-radio-button>
    <yh-radio-button value="left">left</yh-radio-button>
  </yh-radio-group>

  <yh-tabs v-model="activeName" :tab-position="tabPosition" style="height: 200px">
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
const tabPosition = ref<'top' | 'right' | 'bottom' | 'left'>('top')
<\/script>`

const tsIndicator = `<template>
  <yh-tabs v-model="activeName" active-color="#10b981" inactive-color="#9ca3af">
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsStretch = `<template>
  <yh-tabs v-model="activeName" stretch>
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsEditable = `<template>
  <yh-tabs v-model="activeName" type="card" editable @tab-remove="handleRemove" @tab-add="handleAdd">
    <yh-tab-pane v-for="item in editableTabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string>('1')
const editableTabs = ref([
  { name: '1', label: '标签 1', content: '标签 1 内容' },
  { name: '2', label: '标签 2', content: '标签 2 内容' }
])
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  editableTabs.value.push({
    name: newTabName,
    label: \`标签 \${tabIndex}\`,
    content: \`标签 \${tabIndex} 内容\`
  })
  activeName.value = newTabName
}

const handleRemove = (name: string | number) => {
  const tabs = editableTabs.value
  let activeTab = activeName.value
  if (activeTab === name) {
    tabs.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) activeTab = nextTab.name
      }
    })
  }
  activeName.value = activeTab
  editableTabs.value = tabs.filter((tab) => tab.name !== name)
}
<\/script>`

const tsCustomAdd = `<template>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleAdd">添加标签</yh-button>
  </div>
  <yh-tabs v-model="activeName" type="card" closable :addable="false" @tab-remove="handleRemove">
    <yh-tab-pane v-for="item in tabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  { name: '1', label: '标签 1', content: '标签 1 内容' },
  { name: '2', label: '标签 2', content: '标签 2 内容' }
])
const activeName = ref<string>('1')
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  tabs.value.push({
    name: newTabName,
    label: \`标签 \${tabIndex}\`,
    content: \`标签 \${tabIndex} 内容\`
  })
  activeName.value = newTabName
}

const handleRemove = (name: string | number) => {
  const tabList = tabs.value
  let activeTab = activeName.value
  if (activeTab === name) {
    tabList.forEach((tab, index) => {
      if (tab.name === name) {
        const nextTab = tabList[index + 1] || tabList[index - 1]
        if (nextTab) activeTab = nextTab.name
      }
    })
  }
  activeName.value = activeTab
  tabs.value = tabList.filter((tab) => tab.name !== name)
}
<\/script>`

const tsBeforeLeave = `<template>
  <yh-tabs v-model="activeName" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string>('first')
const beforeLeave = (newName: string | number, oldName: string | number) => {
  return window.confirm(\`确定要从 \${oldName} 切换到 \${newName} 吗？\`)
}
<\/script>`

const tsLazy = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="即时加载">即时渲染内容</yh-tab-pane>
    <yh-tab-pane name="second" label="延迟加载" lazy>首次激活后才渲染内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const tsNuxt = `<template>
  <YhTabs v-model="active">
    <YhTabPane name="1" label="标签 1">内容 1</YhTabPane>
    <YhTabPane name="2" label="标签 2">内容 2</YhTabPane>
  </YhTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<string>('1')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '').replace('<string>', '')
const jsTrigger = tsTrigger.replace('lang="ts"', '').replace('<string>', '')
const jsCard = tsCard.replace('lang="ts"', '').replace('<string>', '')
const jsBorderCard = tsBorderCard.replace('lang="ts"', '').replace('<string>', '')
const jsSegment = tsSegment.replace('lang="ts"', '').replace('<string>', '')
const jsPosition = tsPosition.replace('lang="ts"', '').replace('<string>', '').replace(": 'top' | 'right' | 'bottom' | 'left'", '')
const jsIndicator = tsIndicator.replace('lang="ts"', '').replace('<string>', '')
const jsStretch = tsStretch.replace('lang="ts"', '').replace('<string>', '')
const jsEditable = tsEditable.replace('lang="ts"', '').replace('<string>', '')
const jsCustomAdd = tsCustomAdd.replace('lang="ts"', '').replace('<string>', '')
const jsBeforeLeave = tsBeforeLeave.replace('lang="ts"', '').replace('<string>', '')
const jsLazy = tsLazy.replace('lang="ts"', '').replace('<string>', '')
const jsNuxt = tsNuxt.replace('lang="ts"', '').replace('<string>', '')
</script>

将关联内容拆分到不同面板中，通过标签进行切换。

## 基础用法

通过 `v-model` 绑定当前激活的标签名。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-tabs v-model="activeBasic">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
    <yh-tab-pane name="fourth" label="任务补偿" disabled>任务补偿</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 触发方式

使用 `trigger="hover"` 可以改为悬停切换。

<DemoBlock title="触发方式" :ts-code="tsTrigger" :js-code="jsTrigger">
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="用户管理">鼠标移入即可切换</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 卡片风格

`type="card"` 和 `type="border-card"` 提供不同的卡片式标签导航效果。

<DemoBlock title="卡片风格" :ts-code="tsCard" :js-code="jsCard">
  <yh-tabs v-model="activeCard" type="card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

<DemoBlock title="边框卡片" :ts-code="tsBorderCard" :js-code="jsBorderCard">
  <yh-tabs v-model="activeBorderCard" type="border-card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 分段器风格

`type="segment"` 会将标签渲染成分段控制器样式。

<DemoBlock title="分段器风格" :ts-code="tsSegment" :js-code="jsSegment">
  <yh-tabs v-model="activeSegment" type="segment">
    <yh-tab-pane name="first" label="日">日视图</yh-tab-pane>
    <yh-tab-pane name="second" label="周">周视图</yh-tab-pane>
    <yh-tab-pane name="third" label="月">月视图</yh-tab-pane>
    <yh-tab-pane name="fourth" label="年">年视图</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 标签位置

通过 `tab-position` 将导航放到上、右、下、左任意位置。

<DemoBlock title="标签位置" :ts-code="tsPosition" :js-code="jsPosition">
  <yh-radio-group v-model="tabPosition" style="margin-bottom: 16px">
    <yh-radio-button value="top">top</yh-radio-button>
    <yh-radio-button value="right">right</yh-radio-button>
    <yh-radio-button value="bottom">bottom</yh-radio-button>
    <yh-radio-button value="left">left</yh-radio-button>
  </yh-radio-group>

  <yh-tabs v-model="activePosition" :tab-position="tabPosition" style="height: 200px">
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 指示器与撑满

使用 `active-color`、`inactive-color`、`indicator-width`、`indicator-height` 自定义线形指示器；使用 `stretch` 让标签撑满可用宽度。

<DemoBlock title="自定义指示器" :ts-code="tsIndicator" :js-code="jsIndicator">
  <yh-tabs v-model="activeIndicator" active-color="#10b981" inactive-color="#9ca3af">
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

<DemoBlock title="撑满布局" :ts-code="tsStretch" :js-code="jsStretch">
  <yh-tabs v-model="activeStretch" stretch>
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 可编辑标签

使用 `editable`，或者组合 `closable` 与 `addable`，可以实现动态增删标签。

<DemoBlock title="可编辑标签" :ts-code="tsEditable" :js-code="jsEditable">
  <yh-tabs v-model="activeEditable" type="card" editable @tab-remove="(name) => handleTabsEdit(name, 'remove')" @tab-add="() => handleTabsEdit('', 'add')">
    <yh-tab-pane v-for="item in editableTabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

<DemoBlock title="自定义添加触发器" :ts-code="tsCustomAdd" :js-code="jsCustomAdd">
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleCustomAdd">添加标签</yh-button>
  </div>
  <yh-tabs v-model="activeCustomAdd" type="card" closable :addable="false" @tab-remove="handleCustomRemove">
    <yh-tab-pane v-for="item in customAddTabs" :key="item.name" :name="item.name" :label="item.label">
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 切换前钩子

`before-leave` 可以通过返回 `false` 或拒绝 Promise 来阻止切换。

<DemoBlock title="切换前钩子" :ts-code="tsBeforeLeave" :js-code="jsBeforeLeave">
  <yh-tabs v-model="activeBeforeLeave" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 延迟渲染

在 `YhTabPane` 上设置 `lazy` 后，内容会在首次激活后才渲染。

<DemoBlock title="延迟渲染" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-tabs v-model="activeLazy">
    <yh-tab-pane name="first" label="即时加载">即时渲染内容</yh-tab-pane>
    <yh-tab-pane name="second" label="延迟加载" lazy>首次激活后才渲染内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 在 Nuxt 中使用

安装 `@yh-ui/nuxt` 后，可以在 Nuxt 3/4 中直接使用 `YhTabs` 和 `YhTabPane`。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tabs v-model="activeNuxt">
    <yh-tab-pane name="first" label="标签 1">内容 1</yh-tab-pane>
    <yh-tab-pane name="second" label="标签 2">内容 2</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 当前激活的标签名 | `string \| number` | `''` |
| `type` | 标签风格 | `'line' \| 'card' \| 'border-card' \| 'segment'` | `'line'` |
| `tab-position` | 导航位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `draggable` | 为拖拽排序预留的声明属性，当前实现尚未消费。 | `boolean` | `false` |
| `closable` | 是否显示关闭按钮 | `boolean` | `false` |
| `addable` | 是否显示内置添加按钮 | `boolean` | `false` |
| `editable` | 等同于同时开启添加与关闭操作 | `boolean` | `false` |
| `before-leave` | 切换前钩子 | `(newName: string \| number, oldName: string \| number) => boolean \| Promise<boolean>` | `undefined` |
| `stretch` | 是否撑满可用宽度 | `boolean` | `false` |
| `nav-class` | 导航容器附加类名 | `string` | `''` |
| `content-class` | 内容区域附加类名 | `string` | `''` |
| `indicator-width` | 自定义指示器宽度 | `string` | `''` |
| `indicator-height` | 自定义指示器高度 | `string` | `''` |
| `active-color` | 激活态文字与指示器颜色 | `string` | `''` |
| `inactive-color` | 未激活态文字颜色 | `string` | `''` |
| `trigger` | 切换触发方式 | `'click' \| 'hover'` | `'click'` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### Tabs Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 激活标签变化时触发 | `(name: string \| number) => void` |
| `tab-click` | 点击标签头时触发 | `(pane: YhTabPaneConfig, ev: Event) => void` |
| `tab-change` | 激活标签变化后触发 | `(name: string \| number) => void` |
| `tab-remove` | 请求关闭标签时触发 | `(name: string \| number) => void` |
| `tab-add` | 请求添加标签时触发 | `() => void` |
| `tab-drag-end` | 为拖拽排序预留的声明事件，当前实现尚未触发。 | `(names: (string \| number)[]) => void` |

### Tabs Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `default` | `YhTabs` 内部渲染的标签面板 | - |
| `label` | 自定义标签头内容。`pane.name` 在注册后会统一为 `string`。 | `{ pane: YhTabPaneConfig }` |
| `add-icon` | 自定义添加按钮图标 | - |

### Tabs Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `addTab` | 触发添加标签流程 | `() => void` |
| `setActiveTab` | 按名称激活指定标签 | `(name: string \| number) => void` |
| `activeTab` | 当前激活标签的响应式引用。 | `Ref<string \| number>` |

### TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 唯一标签名 | `string \| number` | 必填 |
| `label` | 标签标题文本 | `string` | `''` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `closable` | 是否允许该面板被关闭 | `boolean` | `undefined` |
| `lazy` | 是否首次激活后才渲染内容 | `boolean` | `false` |
| `icon` | 标签前置图标类名 | `string` | `''` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### TabPane Events

当前组件未暴露组件事件。

### TabPane Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容 | - |

### TabPane Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 类型 | 说明 |
| --- | --- |
| `YhTabsProps` | Tabs Props 类型 |
| `YhTabsEmits` | Tabs Emits 类型 |
| `YhTabsSlots` | Tabs Slots 类型 |
| `YhTabsExpose` | Tabs Expose 类型 |
| `YhTabsType` | 标签风格联合类型 |
| `YhTabsPosition` | 标签位置联合类型 |
| `YhTabPaneConfig` | 注册到 Tabs 的面板配置类型 |
| `YhTabPaneProps` | TabPane Props 类型 |
| `YhTabPaneSlots` | TabPane Slots 类型 |
| `YhTabsInstance` | Tabs 实例类型 |
| `YhTabPaneInstance` | TabPane 实例类型 |

### `YhTabPaneConfig` 对象定义

`YhTabs` 在内部注册和事件回调中使用的面板配置类型如下。需要注意的是，源码会在注册时将 `name` 统一转换为 `string`。

```ts
interface YhTabPaneConfig {
  name: string
  label: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
  icon?: string
}
```

### 主题变量

`YhTabs` 和 `YhTabPane` 支持 `themeOverrides`，并在样式中消费以下专属 CSS 变量。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-tabs-header-height` | 标签导航高度 | `40px` |
| `--yh-tabs-active-color` | 激活态文字与指示器颜色 | `var(--yh-color-primary)` |
| `--yh-tabs-text-color` | 默认标签文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-tabs-disabled-color` | 禁用标签文字颜色 | `var(--yh-text-color-disabled)` |
| `--yh-tabs-border-color` | 边框颜色 | `var(--yh-border-color-light)` |
| `--yh-tabs-indicator-width` | 线形指示器默认宽度 | `40px` |
| `--yh-tabs-indicator-height` | 垂直布局指示器默认高度 | `20px` |
