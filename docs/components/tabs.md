# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。融合了 Element Plus、Naive UI、Ant Design 各家之长，并首创了 Segment 分段器风格与切换钩子。

<script setup lang="ts">
import { ref } from 'vue'

// 每个 demo 使用独立的变量，避免互相影响
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

// 动态标签数据
const editableTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
let tabIndex = 2

const handleTabsEdit = (targetName: string, action: 'add' | 'remove') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      name: newTabName,
      label: `New Tab ${tabIndex}`,
      content: `New Tab ${tabIndex} Content`
    })
    activeEditable.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeTab = activeEditable.value
    if (activeTab === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeTab = nextTab.name
          }
        }
      })
    }
    activeEditable.value = activeTab
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

// 自定义添加触发器示例
const customAddTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
const activeCustomAdd = ref('1')
let customTabIndex = 2
const customTabsRef = ref<InstanceType<typeof import('@yh-ui/components').YhTabs> | null>(null)

const handleCustomAdd = () => {
  const newTabName = `${++customTabIndex}`
  customAddTabs.value.push({
    name: newTabName,
    label: `Tab ${customTabIndex}`,
    content: `Tab ${customTabIndex} Content`
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

const beforeLeave = (newName: string | number, oldName: string | number) => {
  return window.confirm(`确定要从 ${oldName} 切换到 ${newName} 吗？`)
}

// TS 版本示例代码
const tsBasic = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
    <yh-tab-pane name="fourth" label="定时任务补偿" disabled>定时任务补偿</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsBasic = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
    <yh-tab-pane name="fourth" label="定时任务补偿" disabled>定时任务补偿</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
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

const jsCard = `<template>
  <yh-tabs v-model="activeName" type="card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
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

const jsBorderCard = `<template>
  <yh-tabs v-model="activeName" type="border-card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
<\/script>`

const tsSegment = `<template>
  <yh-tabs v-model="activeName" type="segment">
    <yh-tab-pane name="first" label="日">日视图内容</yh-tab-pane>
    <yh-tab-pane name="second" label="周">周视图内容</yh-tab-pane>
    <yh-tab-pane name="third" label="月">月视图内容</yh-tab-pane>
    <yh-tab-pane name="fourth" label="年">年视图内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsSegment = `<template>
  <yh-tabs v-model="activeName" type="segment">
    <yh-tab-pane name="first" label="日">日视图内容</yh-tab-pane>
    <yh-tab-pane name="second" label="周">周视图内容</yh-tab-pane>
    <yh-tab-pane name="third" label="月">月视图内容</yh-tab-pane>
    <yh-tab-pane name="fourth" label="年">年视图内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
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

const jsPosition = `<template>
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

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
const tabPosition = ref('top')
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

const jsStretch = `<template>
  <yh-tabs v-model="activeName" stretch>
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
<\/script>`

const tsEditable = `<template>
  <yh-tabs 
    v-model="activeName" 
    type="card" 
    editable
    @tab-remove="handleRemove"
    @tab-add="handleAdd"
  >
    <yh-tab-pane 
      v-for="item in editableTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  name: string
  label: string
  content: string
}

const activeName = ref<string>('1')
const editableTabs = ref<Tab[]>([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  editableTabs.value.push({
    name: newTabName,
    label: \`New Tab \${tabIndex}\`,
    content: \`New Tab \${tabIndex} Content\`
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

const jsEditable = `<template>
  <yh-tabs 
    v-model="activeName" 
    type="card" 
    editable
    @tab-remove="handleRemove"
    @tab-add="handleAdd"
  >
    <yh-tab-pane 
      v-for="item in editableTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeName = ref('1')
const editableTabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  editableTabs.value.push({
    name: newTabName,
    label: \`New Tab \${tabIndex}\`,
    content: \`New Tab \${tabIndex} Content\`
  })
  activeName.value = newTabName
}

const handleRemove = (name) => {
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

const tsBeforeLeave = `<template>
  <yh-tabs v-model="activeName" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string>('first')

const beforeLeave = (newName: string | number, oldName: string | number): boolean => {
  return window.confirm(\`确定要从 \${oldName} 切换到 \${newName} 吗？\`)
}
<\/script>`

const jsBeforeLeave = `<template>
  <yh-tabs v-model="activeName" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeName = ref('first')

const beforeLeave = (newName, oldName) => {
  return window.confirm(\`确定要从 \${oldName} 切换到 \${newName} 吗？\`)
}
<\/script>`

const tsLazy = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="即时加载">即时加载的内容</yh-tab-pane>
    <yh-tab-pane name="second" label="延迟加载" lazy>延迟加载的内容（首次激活后才渲染）</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsLazy = `<template>
  <yh-tabs v-model="activeName">
    <yh-tab-pane name="first" label="即时加载">即时加载的内容</yh-tab-pane>
    <yh-tab-pane name="second" label="延迟加载" lazy>延迟加载的内容（首次激活后才渲染）</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
<\/script>`

const tsNuxt = `<template>
  <!-- 直接使用，支持自动导入 -->
  <YhTabs v-model="active">
    <YhTabPane name="1" label="Tab 1">Content 1</YhTabPane>
    <YhTabPane name="2" label="Tab 2">Content 2</YhTabPane>
  </YhTabs>
</template>

<script setup lang="ts">
const active = ref<string>('1')
<\/script>`

const jsNuxt = `<template>
  <!-- 直接使用，支持自动导入 -->
  <YhTabs v-model="active">
    <YhTabPane name="1" label="Tab 1">Content 1</YhTabPane>
    <YhTabPane name="2" label="Tab 2">Content 2</YhTabPane>
  </YhTabs>
</template>

<script setup>
const active = ref('1')
<\/script>`

const tsIndicator = `<template>
  <!-- 默认指示器为短样式(40px)，居中显示 -->
  <!-- 使用 indicator-width="auto" 可让指示器铺满标签宽度 -->
  <yh-tabs 
    v-model="activeName"
    active-color="#10b981"
    inactive-color="#9ca3af"
  >
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref<string>('first')
<\/script>`

const jsIndicator = `<template>
  <!-- 默认指示器为短样式(40px)，居中显示 -->
  <!-- 使用 indicator-width="auto" 可让指示器铺满标签宽度 -->
  <yh-tabs 
    v-model="activeName"
    active-color="#10b981"
    inactive-color="#9ca3af"
  >
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
<\/script>`

const tsTrigger = `<template>
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeTrigger = ref<string>('first')
<\/script>`

const jsTrigger = `<template>
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeTrigger = ref('first')
<\/script>`

const tsCustomAdd = `<template>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleAdd">添加标签页</yh-button>
  </div>
  <yh-tabs 
    ref="tabsRef"
    v-model="activeName" 
    type="card" 
    closable
    :addable="false"
    @tab-remove="handleRemove"
  >
    <yh-tab-pane 
      v-for="item in tabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  name: string
  label: string
  content: string
}

const tabs = ref<Tab[]>([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
const activeName = ref<string>('1')
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  tabs.value.push({
    name: newTabName,
    label: \`Tab \${tabIndex}\`,
    content: \`Tab \${tabIndex} Content\`
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

const jsCustomAdd = `<template>
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleAdd">添加标签页</yh-button>
  </div>
  <yh-tabs 
    ref="tabsRef"
    v-model="activeName" 
    type="card" 
    closable
    :addable="false"
    @tab-remove="handleRemove"
  >
    <yh-tab-pane 
      v-for="item in tabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ref([
  { name: '1', label: 'Tab 1', content: 'Tab 1 Content' },
  { name: '2', label: 'Tab 2', content: 'Tab 2 Content' }
])
const activeName = ref('1')
let tabIndex = 2

const handleAdd = () => {
  const newTabName = \`\${++tabIndex}\`
  tabs.value.push({
    name: newTabName,
    label: \`Tab \${tabIndex}\`,
    content: \`Tab \${tabIndex} Content\`
  })
  activeName.value = newTabName
}

const handleRemove = (name) => {
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
</script>

## 基础用法

基础的、简洁的标签页。通过 `v-model` 绑定当前激活的标签名。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-tabs v-model="activeBasic">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
    <yh-tab-pane name="fourth" label="定时任务补偿" disabled>定时任务补偿</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 触发器自定义

通过 `trigger` 属性指定标签切换的触发方式。可选值：`click`（默认）、`hover`。

<DemoBlock title="触发器自定义" :ts-code="tsTrigger" :js-code="jsTrigger">
  <yh-tabs v-model="activeTrigger" trigger="hover">
    <yh-tab-pane name="first" label="用户管理">鼠标移入标签即可切换</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 卡片风格

设置 `type="card"` 可以使标签改变为标签卡片样式。

<DemoBlock title="卡片风格" :ts-code="tsCard" :js-code="jsCard">
  <yh-tabs v-model="activeCard" type="card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 带边框卡片

设置 `type="border-card"` 呈现带边框的卡片样式。

<DemoBlock title="带边框卡片" :ts-code="tsBorderCard" :js-code="jsBorderCard">
  <yh-tabs v-model="activeBorderCard" type="border-card">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 分段器风格

设置 `type="segment"` 呈现 iOS 风格的分段器效果，适合用于视图切换。

<DemoBlock title="分段器风格" :ts-code="tsSegment" :js-code="jsSegment">
  <yh-tabs v-model="activeSegment" type="segment">
    <yh-tab-pane name="first" label="日">日视图内容</yh-tab-pane>
    <yh-tab-pane name="second" label="周">周视图内容</yh-tab-pane>
    <yh-tab-pane name="third" label="月">月视图内容</yh-tab-pane>
    <yh-tab-pane name="fourth" label="年">年视图内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 标签位置

通过 `tab-position` 设置标签的位置。可选值：`top`、`right`、`bottom`、`left`。

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

## 自定义指示器样式

默认指示器为短样式（40px）居中显示。通过 `indicator-width`、`indicator-height` 控制指示器尺寸，设置为 `auto` 可让指示器铺满标签。通过 `active-color`、`inactive-color` 自定义颜色。

<DemoBlock title="自定义指示器样式" :ts-code="tsIndicator" :js-code="jsIndicator">
  <yh-tabs 
    v-model="activeIndicator"
    active-color="#10b981"
    inactive-color="#9ca3af"
  >
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 标签撑满

设置 `stretch` 可以使标签撑满容器宽度。

<DemoBlock title="标签撑满" :ts-code="tsStretch" :js-code="jsStretch">
  <yh-tabs v-model="activeStretch" stretch>
    <yh-tab-pane name="first" label="用户管理">用户管理内容</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理内容</yh-tab-pane>
    <yh-tab-pane name="third" label="角色管理">角色管理内容</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 动态增减标签

设置 `editable`（等同于 `closable + addable`）使标签可动态增减。

<DemoBlock title="动态增减标签" :ts-code="tsEditable" :js-code="jsEditable">
  <yh-tabs 
    v-model="activeEditable" 
    type="card" 
    editable
    @tab-remove="(name) => handleTabsEdit(name, 'remove')"
    @tab-add="() => handleTabsEdit('', 'add')"
  >
    <yh-tab-pane 
      v-for="item in editableTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 自定义添加触发器

通过外部按钮触发添加标签页，而不使用组件内置的 + 按钮。设置 `:addable="false"` 隐藏内置按钮，然后自行调用添加逻辑。

<DemoBlock title="自定义添加触发器" :ts-code="tsCustomAdd" :js-code="jsCustomAdd">
  <div style="margin-bottom: 16px">
    <yh-button size="small" @click="handleCustomAdd">添加标签页</yh-button>
  </div>
  <yh-tabs 
    ref="customTabsRef"
    v-model="activeCustomAdd" 
    type="card" 
    closable
    :addable="false"
    @tab-remove="handleCustomRemove"
  >
    <yh-tab-pane 
      v-for="item in customAddTabs" 
      :key="item.name" 
      :name="item.name" 
      :label="item.label"
    >
      {{ item.content }}
    </yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 切换前钩子

通过 `before-leave` 钩子函数控制标签切换。返回 `false` 或 `Promise.reject` 可阻止切换。

<DemoBlock title="切换前钩子" :ts-code="tsBeforeLeave" :js-code="jsBeforeLeave">
  <yh-tabs v-model="activeBeforeLeave" :before-leave="beforeLeave">
    <yh-tab-pane name="first" label="用户管理">用户管理</yh-tab-pane>
    <yh-tab-pane name="second" label="配置管理">配置管理</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 延迟渲染

设置 `lazy` 可以延迟渲染标签内容，只有在首次激活时才会渲染。

<DemoBlock title="延迟渲染" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-tabs v-model="activeLazy">
    <yh-tab-pane name="first" label="即时加载">即时加载的内容</yh-tab-pane>
    <yh-tab-pane name="second" label="延迟加载" lazy>延迟加载的内容（首次激活后才渲染）</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## 在 Nuxt 中使用

组件已完美适配 Nuxt 3，支持自动导入与 SSR。

<DemoBlock title="Nuxt 适配" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tabs v-model="activeNuxt">
    <yh-tab-pane name="first" label="Tab 1">Content 1</yh-tab-pane>
    <yh-tab-pane name="second" label="Tab 2">Content 2</yh-tab-pane>
  </yh-tabs>
</DemoBlock>

## API

### Tabs Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值，当前激活的标签名 | `string \| number` | `''` |
| type | 标签类型 | `'line' \| 'card' \| 'border-card' \| 'segment'` | `'line'` |
| tab-position | 标签位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| closable | 是否可关闭 | `boolean` | `false` |
| addable | 是否可新增 | `boolean` | `false` |
| editable | 是否可编辑（同时可关闭和新增） | `boolean` | `false` |
| draggable | 是否可拖拽排序 | `boolean` | `false` |
| before-leave | 切换前钩子，返回 false 可阻止切换 | `(newName, oldName) => boolean \| Promise<boolean>` | — |
| stretch | 标签是否撑满容器 | `boolean` | `false` |
| nav-class | 标签栏自定义类名 | `string` | `''` |
| content-class | 内容区自定义类名 | `string` | `''` |
| indicator-width | 指示器宽度（水平方向为长度，垂直方向为粗细），设为 `auto` 可铺满标签 | `string` | `''`（CSS 变量默认 `40px`） |
| indicator-height | 指示器高度（垂直方向为长度，水平方向为粗细），设为 `auto` 可铺满标签 | `string` | `''`（CSS 变量默认 `20px`） |
| active-color | 选中态颜色（文字和指示器） | `string` | `''` |
| inactive-color | 未选中态颜色 | `string` | `''` |
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |

### Tabs Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| tab-click | 点击标签时触发 | `(pane: TabPaneConfig, ev: Event) => void` |
| tab-change | 激活标签改变时触发 | `(name: string \| number) => void` |
| tab-remove | 点击关闭按钮时触发 | `(name: string \| number) => void` |
| tab-add | 点击新增按钮时触发 | `() => void` |
| tab-drag-end | 拖拽结束时触发 | `(names: (string \| number)[]) => void` |

### Tabs Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | TabPane 内容 | — |
| label | 自定义标签标题 | `{ pane: TabPaneConfig }` |
| add-icon | 自定义新增按钮图标 | — |

### Tabs Exposes

通过 `ref` 可以获取 Tabs 实例并调用以下方法：

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| addTab | 触发添加标签页事件（需配合 `@tab-add` 使用） | `() => void` |
| setActiveTab | 激活指定标签 | `(name: string \| number) => void` |
| activeTab | 当前激活的标签名（响应式） | `Ref<string \| number>` |

### TabPane Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识（必填） | `string \| number` | — |
| label | 标签标题 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| closable | 是否可关闭（覆盖 Tabs 的设置） | `boolean` | `undefined` |
| lazy | 是否延迟渲染（首次激活后渲染） | `boolean` | `false` |
| icon | 图标类名 | `string` | `''` |

### TabPane Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 标签内容 | — |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-tabs-header-height` | 标签栏高度 | `40px` |
| `--yh-tabs-active-color` | 激活态颜色 | `var(--yh-color-primary)` |
| `--yh-tabs-text-color` | 文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-tabs-disabled-color` | 禁用态颜色 | `var(--yh-text-color-disabled)` |
| `--yh-tabs-border-color` | 边框颜色 | `var(--yh-border-color-light)` |
| `--yh-tabs-indicator-width` | 指示器宽度（水平布局） | `40px` |
| `--yh-tabs-indicator-height` | 指示器高度（垂直布局） | `20px` |
