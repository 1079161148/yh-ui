<script setup lang="ts">
import { ref, h } from 'vue'

const activeIndex = ref('1')

const handleSelect = (index: string) => {
  console.log('选中菜单:', index)
}

const renderLabel = (option: any) => {
  if (option.index === '2') {
    return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
      h('span', '系统消息'),
      h('span', { style: 'font-size: 10px; background: #ff4d4f; color: #fff; padding: 0 4px; border-radius: 4px; line-height: 1.4;' }, 'NEW')
    ])
  }
  return option.label
}

const tsBasic = `<template>
  <yh-menu :default-active="activeIndex" @select="handleSelect">
    <yh-menu-item index="1">
      <yh-icon name="home" />
      <span>首页</span>
    </yh-menu-item>
    <yh-menu-item index="2">
      <yh-icon name="document" />
      <span>文档</span>
    </yh-menu-item>
    <yh-sub-menu index="3">
      <template #title>
        <yh-icon name="setting" />
        <span>设置</span>
      </template>
      <yh-menu-item index="3-1">个人设置</yh-menu-item>
      <yh-menu-item index="3-2">系统设置</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')

const handleSelect = (index: string) => {
  console.log('选中菜单:', index)
}
<\/script>`

const jsBasic = tsBasic.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsHorizontal = `<template>
  <yh-menu mode="horizontal" :default-active="activeIndex">
    <yh-menu-item index="1">首页</yh-menu-item>
    <yh-menu-item index="2">产品</yh-menu-item>
    <yh-sub-menu index="3">
      <template #title>解决方案</template>
      <yh-menu-item index="3-1">企业版</yh-menu-item>
      <yh-menu-item index="3-2">个人版</yh-menu-item>
    </yh-sub-menu>
    <yh-menu-item index="4">关于我们</yh-menu-item>
  </yh-menu>
</template>`

const jsHorizontal = tsHorizontal.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsCollapse = `<template>
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <yh-button @click="isCollapse = !isCollapse">
      {{ isCollapse ? '展开' : '折叠' }}
    </yh-button>
    <yh-menu :collapse="isCollapse" :default-active="activeIndex" :style="{ width: isCollapse ? '80px' : '200px' }">
      <yh-menu-item index="1">
        <yh-icon name="home" />
        <span>首页</span>
      </yh-menu-item>
      <yh-menu-item index="2">
        <yh-icon name="document" />
        <span>文档</span>
      </yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>
          <yh-icon name="setting" />
          <span>设置</span>
        </template>
        <yh-menu-item index="3-1">个人设置</yh-menu-item>
        <yh-menu-item index="3-2">系统设置</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const isCollapse = ref(false)
const activeIndex = ref('1')
<\/script>`

const jsCollapse = tsCollapse.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsGroup = `<template>
  <yh-menu :default-active="activeIndex">
    <yh-menu-item-group title="导航一">
      <yh-menu-item index="1">选项1</yh-menu-item>
      <yh-menu-item index="2">选项2</yh-menu-item>
    </yh-menu-item-group>
    <yh-menu-item-group title="导航二">
      <yh-menu-item index="3">选项3</yh-menu-item>
      <yh-menu-item index="4">选项4</yh-menu-item>
    </yh-menu-item-group>
  </yh-menu>
</template>`

const jsGroup = tsGroup.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsDisabled = `<template>
  <yh-menu :default-active="activeIndex">
    <yh-menu-item index="1">选项1</yh-menu-item>
    <yh-menu-item index="2" disabled>选项2（禁用）</yh-menu-item>
    <yh-sub-menu index="3" disabled>
      <template #title>子菜单（禁用）</template>
      <yh-menu-item index="3-1">选项3-1</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>`

const jsDisabled = tsDisabled.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsCustomColor = `<template>
  <yh-menu
    :default-active="activeIndex"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409eff"
  >
    <yh-menu-item index="1">选项1</yh-menu-item>
    <yh-menu-item index="2">选项2</yh-menu-item>
    <yh-sub-menu index="3">
      <template #title>子菜单</template>
      <yh-menu-item index="3-1">选项3-1</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>`

const jsCustomColor = tsCustomColor.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsInverted = `<template>
  <div style="width: 240px; border-radius: 8px; overflow: hidden;">
    <yh-menu inverted :default-active="activeIndex">
      <yh-menu-item index="1">
        <yh-icon name="home" />
        <span>首页</span>
      </yh-menu-item>
      <yh-menu-item index="2">
        <yh-icon name="document" />
        <span>文档</span>
      </yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>
          <yh-icon name="setting" />
          <span>设置</span>
        </template>
        <yh-menu-item index="3-1">个人设置</yh-menu-item>
        <yh-menu-item index="3-2">系统设置</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>`

const jsInverted = tsInverted.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsLongText = `<template>
  <yh-menu style="width: 200px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu-item index="1" label="电灯熄灭 物换星移 泥牛入海" />
    <yh-sub-menu index="2" label="这是属于你一个人的 寂静时刻">
      <yh-menu-item index="2-1" label="听一听内心的声音" />
    </yh-sub-menu>
    <yh-menu-item index="3" label="黑暗好像 一颗巨石 沉入大海" />
  </yh-menu>
</template>`

const jsLongText = tsLongText.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsAccordion = `<template>
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu unique-opened>
      <yh-sub-menu index="1">
        <template #title>菜单一</template>
        <yh-menu-item index="1-1">选项 1-1</yh-menu-item>
        <yh-menu-item index="1-2">选项 1-2</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="2">
        <template #title>菜单二</template>
        <yh-menu-item index="2-1">选项 2-1</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="3">
        <template #title>菜单三</template>
        <yh-menu-item index="3-1">选项 3-1</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>`

const jsAccordion = tsAccordion.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsExpanded = `<template>
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu :default-openeds="['1', '2']">
      <yh-sub-menu index="1">
        <template #title>默认展开一</template>
        <yh-menu-item index="1-1">子项</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="2">
        <template #title>默认展开二</template>
        <yh-menu-item index="2-1">子项</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>`

const jsExpanded = tsExpanded.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsCustomNode = `<template>
  <yh-menu :render-label="renderLabel">
    <yh-menu-item index="1" label="首页" />
    <yh-menu-item index="2" label="系统消息" />
  </yh-menu>
</template>

<script setup>
import { h } from 'vue'

const renderLabel = (option) => {
  if (option.index === '2') {
    return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
      h('span', '系统消息'),
      h('span', { style: 'font-size: 10px; background: #ff4d4f; color: #fff; padding: 0 4px; border-radius: 4px; line-height: 1.4;' }, 'NEW')
    ])
  }
  return option.label
}
<\/script>`

const jsCustomNode = tsCustomNode.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsNuxt = `<template>
  <yh-menu mode="horizontal" :default-active="route.path" router>
    <yh-menu-item index="/">首页</yh-menu-item>
    <yh-menu-item index="/docs">文档</yh-menu-item>
    <yh-menu-item index="/about">关于</yh-menu-item>
  </yh-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
<\/script>`

const jsNuxt = tsNuxt.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsDataDriven = `<template>
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :options="menuOptions" default-active="2-1" @select="handleSelect" />
  </div>
</template>

<script setup lang="ts">
const menuOptions = [
  { key: '1', label: '首页', icon: 'home' },
  { 
    key: '2', 
    label: '解决方案', 
    icon: 'app-store',
    children: [
      { key: '2-1', label: '企业版' },
      { key: '2-2', label: '个人版', disabled: true }
    ]
  },
  { key: '3', label: '关于我们', group: true, children: [
    { key: '3-1', label: '联系方式' }
  ]}
]

const handleSelect = (index: string) => {
  console.log('选中:', index)
}
<\/script>`

const jsDataDriven = tsDataDriven.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsMethods = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 8px;">
      <yh-button size="small" @click="menuRef?.open('3')">展开设置</yh-button>
      <yh-button size="small" @click="menuRef?.close('3')">收起设置</yh-button>
    </div>
    <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
      <yh-menu ref="menuRef" default-active="1">
        <yh-menu-item index="1">首页</yh-menu-item>
        <yh-sub-menu index="3">
          <template #title>设置</template>
          <yh-menu-item index="3-1">个人中心</yh-menu-item>
        </yh-sub-menu>
      </yh-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuRef = ref()
<\/script>`

const jsMethods = tsMethods.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsPopper = `<template>
  <yh-menu mode="horizontal" popper-effect="dark" :popper-offset="12">
    <yh-sub-menu index="1">
      <template #title>深色弹出层</template>
      <yh-menu-item index="1-1">内容一</yh-menu-item>
      <yh-menu-item index="1-2">内容二</yh-menu-item>
    </yh-sub-menu>
    <yh-sub-menu index="2" popper-class="custom-popper">
      <template #title>偏移 12px</template>
      <yh-menu-item index="2-1">内容</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>`

const jsPopper = tsPopper.replace(/lang="ts"/g, '').replace(/: string/g, '')

const isCollapse = ref(false)
const menuRef = ref()
const menuOptions = [
  { key: '1', label: '首页', icon: 'home' },
  { 
    key: '2', 
    label: '解决方案', 
    icon: 'app-store',
    children: [
      { key: '2-1', label: '企业版' },
      { key: '2-2', label: '个人版', disabled: true }
    ]
  },
  { key: '3', label: '关于我们', group: true, children: [
    { key: '3-1', label: '联系方式' }
  ]}
]
</script>

# Menu 菜单

为用户提供导航菜单，支持垂直和水平两种模式。

## 基础用法

垂直菜单，通过 `default-active` 设置默认激活的菜单项。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :default-active="activeIndex" @select="handleSelect">
<yh-menu-item index="1">
<yh-icon name="home" />
<span>首页</span>
</yh-menu-item>
<yh-menu-item index="2">
<yh-icon name="document" />
<span>文档</span>
</yh-menu-item>
<yh-sub-menu index="3">
<template #title>
<yh-icon name="setting" />
<span>设置</span>
</template>
<yh-menu-item index="3-1">个人设置</yh-menu-item>
<yh-menu-item index="3-2">系统设置</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</DemoBlock>

## 水平菜单

设置 `mode="horizontal"` 创建水平导航菜单。

<DemoBlock title="水平菜单" :ts-code="tsHorizontal" :js-code="jsHorizontal">
<div style="border-bottom: 1px solid var(--yh-border-color);">
<yh-menu mode="horizontal" :default-active="activeIndex">
<yh-menu-item index="1">首页</yh-menu-item>
<yh-menu-item index="2">产品</yh-menu-item>
<yh-sub-menu index="3">
<template #title>解决方案</template>
<yh-menu-item index="3-1">企业版</yh-menu-item>
<yh-menu-item index="3-2">个人版</yh-menu-item>
</yh-sub-menu>
<yh-menu-item index="4">关于我们</yh-menu-item>
</yh-menu>
</div>
</DemoBlock>

## 折叠菜单

通过 `collapse` 属性可以切换菜单的折叠状态。

<DemoBlock title="折叠菜单" :ts-code="tsCollapse" :js-code="jsCollapse">
<div style="display: flex; gap: 16px; align-items: flex-start;">
<yh-button @click="isCollapse = !isCollapse">
{{ isCollapse ? '展开' : '折叠' }}
</yh-button>
<div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :collapse="isCollapse" :default-active="activeIndex" :style="{ width: isCollapse ? '80px' : '200px' }">
<yh-menu-item index="1">
<yh-icon name="home" />
<span>首页</span>
</yh-menu-item>
<yh-menu-item index="2">
<yh-icon name="document" />
<span>文档</span>
</yh-menu-item>
<yh-sub-menu index="3">
<template #title>
<yh-icon name="setting" />
<span>设置</span>
</template>
<yh-menu-item index="3-1">个人设置</yh-menu-item>
<yh-menu-item index="3-2">系统设置</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</div>
</DemoBlock>

## 弹出层定制

通过 `popper-effect` 设置弹出层主题，`popper-offset` 调整偏移量。

<DemoBlock title="弹出层定制" :ts-code="tsPopper" :js-code="jsPopper">
<yh-menu mode="horizontal" popper-effect="dark" :popper-offset="12">
<yh-sub-menu index="1">
<template #title>深色弹出层</template>
<yh-menu-item index="1-1">内容一</yh-menu-item>
<yh-menu-item index="1-2">内容二</yh-menu-item>
</yh-sub-menu>
<yh-sub-menu index="2" popper-class="custom-popper">
<template #title>偏移 12px</template>
<yh-menu-item index="2-1">内容</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</DemoBlock>

## 数据驱动

通过 `options` 属性可以根据数组数据直接生成菜单。

<DemoBlock title="数据驱动" :ts-code="tsDataDriven" :js-code="jsDataDriven">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :options="menuOptions" default-active="2-1" />
</div>
</DemoBlock>

## 外部控制

通过 `ref` 调用组件暴露的方法来手动控制菜单状态。

<DemoBlock title="外部控制" :ts-code="tsMethods" :js-code="jsMethods">
<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="display: flex; gap: 8px;">
<yh-button size="small" @click="menuRef?.open('3')">展开设置</yh-button>
<yh-button size="small" @click="menuRef?.close('3')">收起设置</yh-button>
</div>
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu ref="menuRef" default-active="1">
<yh-menu-item index="1">首页</yh-menu-item>
<yh-sub-menu index="3">
<template #title>设置</template>
<yh-menu-item index="3-1">个人中心</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</div>
</DemoBlock>

## 菜单分组

使用 `yh-menu-item-group` 对菜单项进行分组。

<DemoBlock title="菜单分组" :ts-code="tsGroup" :js-code="jsGroup">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :default-active="activeIndex">
<yh-menu-item-group title="导航一">
<yh-menu-item index="1">选项1</yh-menu-item>
<yh-menu-item index="2">选项2</yh-menu-item>
</yh-menu-item-group>
<yh-menu-item-group title="导航二">
<yh-menu-item index="3">选项3</yh-menu-item>
<yh-menu-item index="4">选项4</yh-menu-item>
</yh-menu-item-group>
</yh-menu>
</div>
</DemoBlock>

## 禁用菜单

通过 `disabled` 属性禁用菜单项或子菜单。

<DemoBlock title="禁用菜单" :ts-code="tsDisabled" :js-code="jsDisabled">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :default-active="activeIndex">
<yh-menu-item index="1">选项1</yh-menu-item>
<yh-menu-item index="2" disabled>选项2（禁用）</yh-menu-item>
<yh-sub-menu index="3" disabled>
<template #title>子菜单（禁用）</template>
<yh-menu-item index="3-1">选项3-1</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</DemoBlock>

## 自定义颜色

通过 `background-color`、`text-color`、`active-text-color` 自定义菜单颜色。

<DemoBlock title="自定义颜色" :ts-code="tsCustomColor" :js-code="jsCustomColor">
<div style="width: 240px; border-radius: 8px; overflow: hidden;">
<yh-menu :default-active="activeIndex" background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff">
<yh-menu-item index="1">选项1</yh-menu-item>
<yh-menu-item index="2">选项2</yh-menu-item>
<yh-sub-menu index="3">
<template #title>子菜单</template>
<yh-menu-item index="3-1">选项3-1</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</DemoBlock>

## Inverted 样式

通过 `inverted` 属性可以快速开启深色反转主题。

<DemoBlock title="Inverted 样式" :ts-code="tsInverted" :js-code="jsInverted">
<div style="width: 240px; border-radius: 8px; overflow: hidden;">
<yh-menu inverted :default-active="activeIndex">
<yh-menu-item index="1">
<yh-icon name="home" />
<span>首页</span>
</yh-menu-item>
<yh-menu-item index="2">
<yh-icon name="document" />
<span>文档</span>
</yh-menu-item>
<yh-sub-menu index="3">
<template #title>
<yh-icon name="setting" />
<span>设置</span>
</template>
<yh-menu-item index="3-1">个人设置</yh-menu-item>
<yh-menu-item index="3-2">系统设置</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</DemoBlock>

## 菜单内容很长

当菜单项或子菜单的文字内容过长时，会自动显示省略号并适应布局。

<DemoBlock title="菜单内容很长" :ts-code="tsLongText" :js-code="jsLongText">
<yh-menu style="width: 200px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
<yh-menu-item index="1" label="电灯熄灭 物换星移 泥牛入海" />
<yh-sub-menu index="2" label="这是属于你一个人的 寂静时刻">
<yh-menu-item index="2-1" label="听一听内心的声音" />
</yh-sub-menu>
<yh-menu-item index="3" label="黑暗好像 一颗巨石 沉入大海" />
</yh-menu>
</DemoBlock>

## 手风琴

通过 `unique-opened` 属性可以使菜单每次只展开一个子菜单。

<DemoBlock title="手风琴" :ts-code="tsAccordion" :js-code="jsAccordion">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu unique-opened>
<yh-sub-menu index="1">
<template #title>菜单一</template>
<yh-menu-item index="1-1">选项 1-1</yh-menu-item>
<yh-menu-item index="1-2">选项 1-2</yh-menu-item>
</yh-sub-menu>
<yh-sub-menu index="2">
<template #title>菜单二</template>
<yh-menu-item index="2-1">选项 2-1</yh-menu-item>
</yh-sub-menu>
<yh-sub-menu index="3">
<template #title>菜单三</template>
<yh-menu-item index="3-1">选项 3-1</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</DemoBlock>

## 展开选中的组

使用 `default-openeds` 可以预置需要初始展开的子菜单标识数组。

<DemoBlock title="展开选中的组" :ts-code="tsExpanded" :js-code="jsExpanded">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :default-openeds="['1', '2']">
<yh-sub-menu index="1">
<template #title>默认展开一</template>
<yh-menu-item index="1-1">子项</yh-menu-item>
</yh-sub-menu>
<yh-sub-menu index="2">
<template #title>默认展开二</template>
<yh-menu-item index="2-1">子项</yh-menu-item>
</yh-sub-menu>
</yh-menu>
</div>
</DemoBlock>

## 自定义节点

通过 `render-label` 等渲染函数或插槽，可以批量深度定制菜单节点的显示内容。

<DemoBlock title="自定义节点" :ts-code="tsCustomNode" :js-code="jsCustomNode">
<div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
<yh-menu :render-label="renderLabel">
<yh-menu-item index="1" label="首页" />
<yh-menu-item index="2" label="系统消息" />
</yh-menu>
</div>
</DemoBlock>

## 在 Nuxt 中使用

`Menu` 组件支持 `router` 属性，可以配合 Nuxt 的路由系统使用。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
<div style="border-bottom: 1px solid var(--yh-border-color);">
<yh-menu mode="horizontal" default-active="/" router>
<yh-menu-item index="/">首页</yh-menu-item>
<yh-menu-item index="/docs">文档</yh-menu-item>
<yh-menu-item index="/about">关于</yh-menu-item>
</yh-menu>
</div>
<div style="padding: 10px 0;">
<p style="color: var(--yh-color-text-secondary); font-size: 13px;">提示：设置 router 属性后，菜单将根据当前路由路径与 index 进行自动匹配激活。</p>
</div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 完美支持服务端渲染 (SSR)，无水合错误
- ✅ 支持 vue-router 集成
- ✅ 支持折叠动画
- ✅ 完整的键盘导航支持

## API

### Menu Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 菜单模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| default-active | 当前激活菜单的 index | `string` | `''` |
| default-openeds | 当前打开的 sub-menu 的 index 数组 | `string[]` | `[]` |
| expand-all | 是否展开全部菜单 | `boolean` | `false` |
| unique-opened | 是否只保持一个子菜单展开 | `boolean` | `false` |
| menu-trigger | 子菜单打开触发方式 (Popup 模式有效) | `'hover' \| 'click'` | `'hover'` |
| collapse | 是否开启折叠模式（仅 vertical 模式） | `boolean` | `false` |
| collapse-transition | 折叠动画是否开启 | `boolean` | `true` |
| router | 是否启用 vue-router 模式 | `boolean` | `false` |
| root-indent | 菜单第一级的缩进，缺省时使用 `indent` | `number` | — |
| render-extra | 批量处理菜单额外部分渲染 (VNode) | `Function` | — |
| render-icon | 批量处理菜单图标渲染 (VNode) | `Function` | — |
| render-label | 批量处理菜单标签渲染 (VNode) | `Function` | — |
| responsive | 是否自动收起溢出的菜单 (水平模式) | `boolean` | `false` |
| value | 菜单当前的选中值 (支持 `v-model`) | `string \| null` | — |
| options | 菜单配置项，支持从数据驱动生成菜单 | `MenuItemData[]` | `[]` |
| background-color | 背景色 | `string` | `''` |
| text-color | 文字颜色 | `string` | `''` |
| active-text-color | 激活项文字颜色 | `string` | `''` |
| ellipsis | 是否开启省略模式（水平模式下） | `boolean` | `true` |
| popper-z-index | 子菜单弹出层层级 | `number` | `2000` |
| teleported | 是否将弹出菜单挂载至 body | `boolean` | `true` |
| gap | 菜单项间距 | `number` | `4` |
| icon-size | 菜单未折叠时图标的大小 | `number` | `20` |
| indent | 菜单每级的缩进 | `number` | `32` |
| inverted | 是否使用反转样式 (深色背景) | `boolean` | `false` |
| key-field | 数据源中 key 的字段名 | `string` | `'key'` |
| label-field | 数据源中 label 的字段名 | `string` | `'label'` |
| ellipsis-icon | 自定义省略图标 (水平模式) | `string \| Component` | — |
| popper-offset | 弹出层的偏移量 | `number` | `6` |
| popper-effect | Tooltip 主题 | `'dark' \| 'light'` | `'light'` |
| close-on-click-outside | 单击外部时是否折叠菜单 | `boolean` | `true` |
| popper-class | 弹出菜单的自定义类名 | `string` | `''` |
| popper-style | 弹出菜单的自定义样式 | `string \| object` | `''` |
| show-timeout | 菜单出现前的延迟 | `number` | `300` |
| hide-timeout | 菜单消失前的延迟 | `number` | `300` |
| persistent | 隐藏时是否保留子菜单 DOM | `boolean` | `true` |

### MenuItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index | 唯一标识 | `string` | — (必填) |
| label | 显示文本 | `string` | `''` |
| route | vue-router 路由对象 | `string \| object` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |

### MenuItemGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | `''` |

### SubMenu Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index | 唯一标识 | `string` | — (必填) |
| label | 显示文本 | `string` | `''` |
| popper-class | 弹出菜单的自定义类名 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-timeout | 展开收起的延时 | `number` | `300` |
| hide-timeout | 收起的延时 | `number` | `300` |
| popper-offset | 弹出层偏移量 | `number` | `6` |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 菜单激活回调 | `(index: string, indexPath: string[], item: MenuItemData \| undefined, routeResult?: Promise<void>)` |
| open | 子菜单展开回调 | `(index: string, indexPath: string[])` |
| close | 子菜单收起回调 | `(index: string, indexPath: string[])` |
| update:value | value 改变时的回调 (支持 v-model) | `(value: string) => void` |

### Slots

| 插槽名 | 说明 | 组件 |
| --- | --- | --- |
| default | 菜单内容 | Menu |
| default | 菜单项内容 | MenuItem |
| title | 分组标题 | MenuItemGroup |
| default | 分组内容 | MenuItemGroup |
| title | 子菜单标题 | SubMenu |
| default | 子菜单内容 | SubMenu |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| open | 展开指定子菜单 | `(index: string) => void` |
| close | 收起指定子菜单 | `(index: string) => void` |
| activeIndex | 当前激活项 | `Ref<string>` |
| openedMenus | 当前展开的子菜单 | `Ref<string[]>` |

### MenuItemData

这是用于 `options` 属性的数据结构：

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 (同 index) | `string` |
| index | 唯一标识 (同 key) | `string` |
| label | 显示文本 | `string` |
| icon | 图标名称 | `string` |
| disabled | 是否禁用 | `boolean` |
| children | 子菜单数据 | `MenuItemData[]` |
| group | 是否为分组项 | `boolean` |

### 主题变量 (CSS Variables)

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| `--yh-menu-bg-color` | `#ffffff` | 菜单背景色 |
| `--yh-menu-text-color` | `#303133` | 菜单文字颜色 |
| `--yh-menu-active-text-color` | `#409eff` | 激活状态文字颜色 |
| `--yh-menu-hover-bg-color` | `#ecf5ff` | 悬停背景色 |
| `--yh-menu-active-bg-color` | `#ecf5ff` | 激活背景色 |
| `--yh-menu-indicator-width` | `3px` | 指示条宽度 |
| `--yh-menu-indicator-color` | `var(--yh-menu-active-text-color)` | 指示条颜色 |

---

**提示**: `Menu` 组件融合了 Element Plus、Ant Design 和 Naive UI 的优秀设计，支持垂直/水平模式、折叠、分组、vue-router 集成等丰富功能。

<style>
/* 针对 VitePress 文档环境的对齐补丁 */
.vp-doc .yh-menu,
.vp-doc .yh-menu li {
  list-style: none !important;
  margin: 0 !important;
}
.vp-doc .yh-menu li::before {
  display: none !important;
}
</style>
