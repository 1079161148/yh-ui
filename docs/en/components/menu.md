<script setup lang="ts">
import { ref, h } from 'vue'
import type { YhMenuItemData } from '@yh-ui/components'

const activeIndex = ref('1')

const handleSelect = (index: string) => {
  console.log('Selected menu:', index)
}

const renderLabel = (option: YhMenuItemData) => {
  if (option.index === '2') {
    return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
      h('span', 'System Messages'),
      h('span', { style: 'font-size: 10px; background: #ff4d4f; color: #fff; padding: 0 4px; border-radius: 4px; line-height: 1.4;' }, 'NEW')
    ])
  }
  return option.label
}

const tsBasic = `<template>
  <yh-menu :default-active="activeIndex" @select="handleSelect">
    <yh-menu-item index="1">
      <yh-icon name="home" />
      <span>Home</span>
    </yh-menu-item>
    <yh-menu-item index="2">
      <yh-icon name="document" />
      <span>Docs</span>
    </yh-menu-item>
    <yh-sub-menu index="3">
      <template #title>
        <yh-icon name="setting" />
        <span>Settings</span>
      </template>
      <yh-menu-item index="3-1">Personal Settings</yh-menu-item>
      <yh-menu-item index="3-2">System Settings</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')

const handleSelect = (index: string) => {
  console.log('Selected menu:', index)
}
<\/script>`

const jsBasic = tsBasic.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsHorizontal = `<template>
  <yh-menu mode="horizontal" :default-active="activeIndex">
    <yh-menu-item index="1">Home</yh-menu-item>
    <yh-menu-item index="2">Products</yh-menu-item>
    <yh-sub-menu index="3">
      <template #title>Solutions</template>
      <yh-menu-item index="3-1">Enterprise</yh-menu-item>
      <yh-menu-item index="3-2">Personal</yh-menu-item>
    </yh-sub-menu>
    <yh-menu-item index="4">About Us</yh-menu-item>
  </yh-menu>
</template>`

const jsHorizontal = tsHorizontal.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsCollapse = `<template>
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <yh-button @click="isCollapse = !isCollapse">
      {{ isCollapse ? 'Expand' : 'Collapse' }}
    </yh-button>
    <yh-menu :collapse="isCollapse" :default-active="activeIndex" :style="{ width: isCollapse ? '80px' : '200px' }">
      <yh-menu-item index="1">
        <yh-icon name="home" />
        <span>Home</span>
      </yh-menu-item>
      <yh-menu-item index="2">
        <yh-icon name="document" />
        <span>Docs</span>
      </yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>
          <yh-icon name="setting" />
          <span>Settings</span>
        </template>
        <yh-menu-item index="3-1">Personal Settings</yh-menu-item>
        <yh-menu-item index="3-2">System Settings</yh-menu-item>
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
    <yh-menu-item-group title="Navigation One">
      <yh-menu-item index="1">Option 1</yh-menu-item>
      <yh-menu-item index="2">Option 2</yh-menu-item>
    </yh-menu-item-group>
    <yh-menu-item-group title="Navigation Two">
      <yh-menu-item index="3">Option 3</yh-menu-item>
      <yh-menu-item index="4">Option 4</yh-menu-item>
    </yh-menu-item-group>
  </yh-menu>
</template>`

const jsGroup = tsGroup.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsDisabled = `<template>
  <yh-menu :default-active="activeIndex">
    <yh-menu-item index="1">Option 1</yh-menu-item>
    <yh-menu-item index="2" disabled>Option 2 (Disabled)</yh-menu-item>
    <yh-sub-menu index="3" disabled>
      <template #title>SubMenu (Disabled)</template>
      <yh-menu-item index="3-1">Option 3-1</yh-menu-item>
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
    <yh-menu-item index="1">Option 1</yh-menu-item>
    <yh-menu-item index="2">Option 2</yh-menu-item>
    <yh-sub-menu index="3">
      <template #title>SubMenu</template>
      <yh-menu-item index="3-1">Option 3-1</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>`

const jsCustomColor = tsCustomColor.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsInverted = `<template>
  <div style="width: 240px; border-radius: 8px; overflow: hidden;">
    <yh-menu inverted :default-active="activeIndex">
      <yh-menu-item index="1">
        <yh-icon name="home" />
        <span>Home</span>
      </yh-menu-item>
      <yh-menu-item index="2">
        <yh-icon name="document" />
        <span>Docs</span>
      </yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>
          <yh-icon name="setting" />
          <span>Settings</span>
        </template>
        <yh-menu-item index="3-1">Personal Settings</yh-menu-item>
        <yh-menu-item index="3-2">System Settings</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>`

const jsInverted = tsInverted.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsLongText = `<template>
  <yh-menu style="width: 200px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu-item index="1" label="Lights out, everything changes" />
    <yh-sub-menu index="2" label="This is your own quiet moment">
      <yh-menu-item index="2-1" label="Listen to your inner voice" />
    </yh-sub-menu>
    <yh-menu-item index="3" label="Darkness like a giant stone" />
  </yh-menu>
</template>`

const jsLongText = tsLongText.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsAccordion = `<template>
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu unique-opened>
      <yh-sub-menu index="1">
        <template #title>Menu One</template>
        <yh-menu-item index="1-1">Option 1-1</yh-menu-item>
        <yh-menu-item index="1-2">Option 1-2</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="2">
        <template #title>Menu Two</template>
        <yh-menu-item index="2-1">Option 2-1</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="3">
        <template #title>Menu Three</template>
        <yh-menu-item index="3-1">Option 3-1</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>`

const jsAccordion = tsAccordion.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsExpanded = `<template>
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu :default-openeds="['1', '2']">
      <yh-sub-menu index="1">
        <template #title>Default Expanded One</template>
        <yh-menu-item index="1-1">Child Item</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="2">
        <template #title>Default Expanded Two</template>
        <yh-menu-item index="2-1">Child Item</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</template>`

const jsExpanded = tsExpanded.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsCustomNode = `<template>
  <yh-menu :render-label="renderLabel">
    <yh-menu-item index="1" label="Home" />
    <yh-menu-item index="2" label="System Messages" />
  </yh-menu>
</template>

<script setup>
import { h } from 'vue'

const renderLabel = (option) => {
  if (option.index === '2') {
    return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
      h('span', 'System Messages'),
      h('span', { style: 'font-size: 10px; background: #ff4d4f; color: #fff; padding: 0 4px; border-radius: 4px; line-height: 1.4;' }, 'NEW')
    ])
  }
  return option.label
}
<\/script>`

const jsCustomNode = tsCustomNode.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsNuxt = `<template>
  <yh-menu mode="horizontal" :default-active="route.path" router>
    <yh-menu-item index="/">Home</yh-menu-item>
    <yh-menu-item index="/docs">Docs</yh-menu-item>
    <yh-menu-item index="/about">About</yh-menu-item>
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
  { key: '1', label: 'Home', icon: 'home' },
  {
    key: '2',
    label: 'Solutions',
    icon: 'app-store',
    children: [
      { key: '2-1', label: 'Enterprise' },
      { key: '2-2', label: 'Personal', disabled: true }
    ]
  },
  { key: '3', label: 'About Us', group: true, children: [
    { key: '3-1', label: 'Contact Us' }
  ]}
]

const handleSelect = (index: string) => {
  console.log('Selected:', index)
}
<\/script>`

const jsDataDriven = tsDataDriven.replace(/lang="ts"/g, '').replace(/: string/g, '')

const tsMethods = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 8px;">
      <yh-button size="small" @click="menuRef?.open('3')">Expand Settings</yh-button>
      <yh-button size="small" @click="menuRef?.close('3')">Collapse Settings</yh-button>
    </div>
    <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
      <yh-menu ref="menuRef" default-active="1">
        <yh-menu-item index="1">Home</yh-menu-item>
        <yh-sub-menu index="3">
          <template #title>Settings</template>
          <yh-menu-item index="3-1">Personal Center</yh-menu-item>
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
      <template #title>Dark Popper</template>
      <yh-menu-item index="1-1">Content One</yh-menu-item>
      <yh-menu-item index="1-2">Content Two</yh-menu-item>
    </yh-sub-menu>
    <yh-sub-menu index="2" popper-class="custom-popper">
      <template #title>Offset 12px</template>
      <yh-menu-item index="2-1">Content</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</template>`

const jsPopper = tsPopper.replace(/lang="ts"/g, '').replace(/: string/g, '')

const isCollapse = ref(false)
const menuRef = ref()
const menuOptions = [
  { key: '1', label: 'Home', icon: 'home' },
  {
    key: '2',
    label: 'Solutions',
    icon: 'app-store',
    children: [
      { key: '2-1', label: 'Enterprise' },
      { key: '2-2', label: 'Personal', disabled: true }
    ]
  },
  { key: '3', label: 'About Us', group: true, children: [
    { key: '3-1', label: 'Contact Us' }
  ]}
]
</script>

# Menu

Provides navigation menus for application structure and routing. It supports vertical and horizontal layouts, collapsible behavior, data-driven rendering, and component-level theme overrides.

## Basic Usage

Use `default-active` to set the initially active menu item.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :default-active="activeIndex" @select="handleSelect">
      <yh-menu-item index="1">
        <yh-icon name="home" />
        <span>Home</span>
      </yh-menu-item>
      <yh-menu-item index="2">
        <yh-icon name="document" />
        <span>Docs</span>
      </yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>
          <yh-icon name="setting" />
          <span>Settings</span>
        </template>
        <yh-menu-item index="3-1">Personal Settings</yh-menu-item>
        <yh-menu-item index="3-2">System Settings</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</DemoBlock>

## Horizontal Menu

Set `mode="horizontal"` to create a horizontal navigation menu.

<DemoBlock title="Horizontal Menu" :ts-code="tsHorizontal" :js-code="jsHorizontal">
  <div style="border-bottom: 1px solid var(--yh-border-color);">
    <yh-menu mode="horizontal" :default-active="activeIndex">
      <yh-menu-item index="1">Home</yh-menu-item>
      <yh-menu-item index="2">Products</yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>Solutions</template>
        <yh-menu-item index="3-1">Enterprise</yh-menu-item>
        <yh-menu-item index="3-2">Personal</yh-menu-item>
      </yh-sub-menu>
      <yh-menu-item index="4">About Us</yh-menu-item>
    </yh-menu>
  </div>
</DemoBlock>

## Collapsed Menu

Set `collapse` to switch a vertical menu into collapsed mode.

<DemoBlock title="Collapsed Menu" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <yh-button @click="isCollapse = !isCollapse">
      {{ isCollapse ? 'Expand' : 'Collapse' }}
    </yh-button>
    <div style="border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
      <yh-menu :collapse="isCollapse" :default-active="activeIndex" :style="{ width: isCollapse ? '80px' : '200px' }">
        <yh-menu-item index="1">
          <yh-icon name="home" />
          <span>Home</span>
        </yh-menu-item>
        <yh-menu-item index="2">
          <yh-icon name="document" />
          <span>Docs</span>
        </yh-menu-item>
        <yh-sub-menu index="3">
          <template #title>
            <yh-icon name="setting" />
            <span>Settings</span>
          </template>
          <yh-menu-item index="3-1">Personal Settings</yh-menu-item>
          <yh-menu-item index="3-2">System Settings</yh-menu-item>
        </yh-sub-menu>
      </yh-menu>
    </div>
  </div>
</DemoBlock>

## Popper Customization

Set `popper-effect`, `popper-offset`, or `popper-class` to customize popup submenu overlays.

<DemoBlock title="Popper Customization" :ts-code="tsPopper" :js-code="jsPopper">
  <yh-menu mode="horizontal" popper-effect="dark" :popper-offset="12">
    <yh-sub-menu index="1">
      <template #title>Dark Popper</template>
      <yh-menu-item index="1-1">Content One</yh-menu-item>
      <yh-menu-item index="1-2">Content Two</yh-menu-item>
    </yh-sub-menu>
    <yh-sub-menu index="2" popper-class="custom-popper">
      <template #title>Offset 12px</template>
      <yh-menu-item index="2-1">Content</yh-menu-item>
    </yh-sub-menu>
  </yh-menu>
</DemoBlock>

## Data Driven

Use the `options` prop to generate the menu from data.

<DemoBlock title="Data Driven" :ts-code="tsDataDriven" :js-code="jsDataDriven">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :options="menuOptions" default-active="2-1" />
  </div>
</DemoBlock>

## External Control

Call the exposed `open` and `close` methods through a `ref` to control submenu state manually.

<DemoBlock title="External Control" :ts-code="tsMethods" :js-code="jsMethods">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 8px;">
      <yh-button size="small" @click="menuRef?.open('3')">Expand Settings</yh-button>
      <yh-button size="small" @click="menuRef?.close('3')">Collapse Settings</yh-button>
    </div>
    <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
      <yh-menu ref="menuRef" default-active="1">
        <yh-menu-item index="1">Home</yh-menu-item>
        <yh-sub-menu index="3">
          <template #title>Settings</template>
          <yh-menu-item index="3-1">Personal Center</yh-menu-item>
        </yh-sub-menu>
      </yh-menu>
    </div>
  </div>
</DemoBlock>

## Menu Grouping

Use `yh-menu-item-group` to group related items.

<DemoBlock title="Menu Grouping" :ts-code="tsGroup" :js-code="jsGroup">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :default-active="activeIndex">
      <yh-menu-item-group title="Navigation One">
        <yh-menu-item index="1">Option 1</yh-menu-item>
        <yh-menu-item index="2">Option 2</yh-menu-item>
      </yh-menu-item-group>
      <yh-menu-item-group title="Navigation Two">
        <yh-menu-item index="3">Option 3</yh-menu-item>
        <yh-menu-item index="4">Option 4</yh-menu-item>
      </yh-menu-item-group>
    </yh-menu>
  </div>
</DemoBlock>

## Disabled Menu

Set `disabled` on menu items or submenus to prevent interaction.

<DemoBlock title="Disabled Menu" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :default-active="activeIndex">
      <yh-menu-item index="1">Option 1</yh-menu-item>
      <yh-menu-item index="2" disabled>Option 2 (Disabled)</yh-menu-item>
      <yh-sub-menu index="3" disabled>
        <template #title>SubMenu (Disabled)</template>
        <yh-menu-item index="3-1">Option 3-1</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</DemoBlock>

## Custom Colors

Use `background-color`, `text-color`, and `active-text-color` for simple visual overrides.

<DemoBlock title="Custom Colors" :ts-code="tsCustomColor" :js-code="jsCustomColor">
  <div style="width: 240px; border-radius: 8px; overflow: hidden;">
    <yh-menu :default-active="activeIndex" background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff">
      <yh-menu-item index="1">Option 1</yh-menu-item>
      <yh-menu-item index="2">Option 2</yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>SubMenu</template>
        <yh-menu-item index="3-1">Option 3-1</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</DemoBlock>

## Inverted Style

Set `inverted` to use the built-in dark style preset.

<DemoBlock title="Inverted Style" :ts-code="tsInverted" :js-code="jsInverted">
  <div style="width: 240px; border-radius: 8px; overflow: hidden;">
    <yh-menu inverted :default-active="activeIndex">
      <yh-menu-item index="1">
        <yh-icon name="home" />
        <span>Home</span>
      </yh-menu-item>
      <yh-menu-item index="2">
        <yh-icon name="document" />
        <span>Docs</span>
      </yh-menu-item>
      <yh-sub-menu index="3">
        <template #title>
          <yh-icon name="setting" />
          <span>Settings</span>
        </template>
        <yh-menu-item index="3-1">Personal Settings</yh-menu-item>
        <yh-menu-item index="3-2">System Settings</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</DemoBlock>

## Long Menu Content

When menu labels are long, the component can truncate and adapt them to the current layout.

<DemoBlock title="Long Menu Content" :ts-code="tsLongText" :js-code="jsLongText">
  <yh-menu style="width: 200px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-menu-item index="1" label="Lights out, everything changes" />
    <yh-sub-menu index="2" label="This is your own quiet moment">
      <yh-menu-item index="2-1" label="Listen to your inner voice" />
    </yh-sub-menu>
    <yh-menu-item index="3" label="Darkness like a giant stone" />
  </yh-menu>
</DemoBlock>

## Accordion

Set `unique-opened` to keep only one submenu expanded at a time.

<DemoBlock title="Accordion" :ts-code="tsAccordion" :js-code="jsAccordion">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu unique-opened>
      <yh-sub-menu index="1">
        <template #title>Menu One</template>
        <yh-menu-item index="1-1">Option 1-1</yh-menu-item>
        <yh-menu-item index="1-2">Option 1-2</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="2">
        <template #title>Menu Two</template>
        <yh-menu-item index="2-1">Option 2-1</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="3">
        <template #title>Menu Three</template>
        <yh-menu-item index="3-1">Option 3-1</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</DemoBlock>

## Expand Selected Group

Use `default-openeds` to define which submenus are expanded on initial render.

<DemoBlock title="Expand Selected Group" :ts-code="tsExpanded" :js-code="jsExpanded">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :default-openeds="['1', '2']">
      <yh-sub-menu index="1">
        <template #title>Default Expanded One</template>
        <yh-menu-item index="1-1">Child Item</yh-menu-item>
      </yh-sub-menu>
      <yh-sub-menu index="2">
        <template #title>Default Expanded Two</template>
        <yh-menu-item index="2-1">Child Item</yh-menu-item>
      </yh-sub-menu>
    </yh-menu>
  </div>
</DemoBlock>

## Custom Node

Use `render-label`, `render-icon`, or `render-extra` for data-driven custom rendering.

<DemoBlock title="Custom Node" :ts-code="tsCustomNode" :js-code="jsCustomNode">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :render-label="renderLabel">
      <yh-menu-item index="1" label="Home" />
      <yh-menu-item index="2" label="System Messages" />
    </yh-menu>
  </div>
</DemoBlock>

## Use in Nuxt

`YhMenu` works in Nuxt 3 after the YH-UI Nuxt module is registered. When `router` is enabled, use it in client-side routing flows driven by the current route.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="border-bottom: 1px solid var(--yh-border-color);">
    <yh-menu mode="horizontal" default-active="/" router>
      <yh-menu-item index="/">Home</yh-menu-item>
      <yh-menu-item index="/docs">Docs</yh-menu-item>
      <yh-menu-item index="/about">About</yh-menu-item>
    </yh-menu>
  </div>
  <div style="padding: 10px 0;">
    <p style="color: var(--yh-color-text-secondary); font-size: 13px;">Hint: after enabling `router`, the menu highlights items based on the current route path and the item `index`.</p>
  </div>
</DemoBlock>

**SSR Notes**

- Server-rendered menu structure stays aligned with the hydrated client tree.
- Router integration works with Nuxt navigation after hydration.
- Collapsed and expanded states stay stable during hydration.

## API

### Props

#### Menu

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Menu layout mode. | `YhMenuMode` | `'vertical'` |
| default-active | Initially active menu index. | `string` | `''` |
| default-openeds | Initially opened submenu indices. | `string[]` | `[]` |
| unique-opened | Whether only one submenu stays expanded at a time. | `boolean` | `false` |
| menu-trigger | Trigger used to open popup submenus. | `YhMenuTrigger` | `'hover'` |
| collapse | Whether vertical mode uses collapsed navigation. | `boolean` | `false` |
| collapse-transition | Whether collapse transition is enabled. | `boolean` | `true` |
| router | Whether menu selection is driven by `vue-router`. | `boolean` | `false` |
| background-color | Background color override. | `string` | `''` |
| text-color | Text color override. | `string` | `''` |
| active-text-color | Active text color override. | `string` | `''` |
| ellipsis | Whether long labels in horizontal mode collapse into an overflow menu. | `boolean` | `true` |
| popper-z-index | Z-index used by popup submenus. | `number` | `2000` |
| teleported | Whether popup submenus are teleported to `body`. | `boolean` | `true` |
| gap | Gap between menu items. | `number` | `4` |
| ellipsis-icon | Custom overflow icon used in horizontal ellipsis mode. | `string \| Component` | `''` |
| popper-offset | Popup submenu offset. | `number` | `6` |
| popper-effect | Popup theme style. | `'dark' \| 'light'` | `'light'` |
| close-on-click-outside | Whether popup menus close when clicking outside. | `boolean` | `true` |
| popper-class | Custom class applied to popup submenus. | `string` | `''` |
| popper-style | Custom inline style applied to popup submenus. | `StyleValue` | `''` |
| show-timeout | Delay before a submenu opens. | `number` | `300` |
| hide-timeout | Delay before a submenu closes. | `number` | `300` |
| persistent | Whether popup submenu DOM stays mounted while hidden. | `boolean` | `true` |
| icon-size | Icon size when the menu is not collapsed. | `number` | `20` |
| indent | Indentation size added per menu level. | `number` | `32` |
| root-indent | First-level indentation. Falls back to `indent` when not provided. | `number` | `undefined` |
| expand-all | Whether all submenus are expanded by default. | `boolean` | `false` |
| render-extra | Render function used to inject extra node content for each option. | `(option: YhMenuItemData) => VNodeChild` | `undefined` |
| render-icon | Render function used to customize option icons. | `(option: YhMenuItemData) => VNodeChild` | `undefined` |
| render-label | Render function used to customize option labels. | `(option: YhMenuItemData) => VNodeChild` | `undefined` |
| responsive | Whether horizontal mode automatically collects overflowing items. | `boolean` | `false` |
| value | Current selected value, used with `v-model:value`. | `string \| null` | `undefined` |
| options | Data-driven menu configuration. | `YhMenuItemData[]` | `[]` |
| inverted | Whether to use the built-in inverted style. | `boolean` | `false` |
| key-field | Field name used as the key in data-driven mode. | `string` | `'key'` |
| label-field | Field name used as the label in data-driven mode. | `string` | `'label'` |
| theme-overrides | Component-level theme overrides for `YhMenu`. | `ComponentThemeVars` | `undefined` |

#### Menu Item

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| index | Unique menu item identifier. | `string` | Required |
| route | Route record or path used in router mode. | `string \| object` | `''` |
| disabled | Whether the item is disabled. | `boolean` | `false` |
| label | Display text used by data-driven rendering or fallback display. | `string` | `''` |

#### Menu Item Group

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Group title text. | `string` | `''` |

#### Sub Menu

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| index | Unique submenu identifier. | `string` | Required |
| popper-class | Custom class applied to the submenu popup. | `string` | `undefined` |
| disabled | Whether the submenu is disabled. | `boolean` | `false` |
| show-timeout | Delay before the submenu opens. Overrides the parent value when provided. | `number` | `undefined` |
| hide-timeout | Delay before the submenu closes. Overrides the parent value when provided. | `number` | `undefined` |
| popper-offset | Popup offset. Overrides the parent value when provided. | `number` | `undefined` |
| label | Display text used by data-driven rendering or fallback display. | `string` | `''` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| update:value | Triggered when the selected value changes. | `(value: string) => void` |
| select | Triggered when a menu item is selected. | `(index: string, indexPath: string[], item: YhMenuItemData \| undefined, routeResult?: Promise<void>) => void` |
| open | Triggered when a submenu opens. | `(index: string, indexPath: string[]) => void` |
| close | Triggered when a submenu closes. | `(index: string, indexPath: string[]) => void` |

### Slots

#### Menu

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Menu content. | - |

#### Menu Item

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Menu item content. | - |

#### Menu Item Group

| Slot Name | Description | Parameters |
| --- | --- | --- |
| title | Group title content. | - |
| default | Group content. | - |

#### Sub Menu

| Slot Name | Description | Parameters |
| --- | --- | --- |
| title | Submenu title content. | - |
| default | Submenu content. | - |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| open | Expands the specified submenu. | `(index: string) => void` |
| close | Collapses the specified submenu. | `(index: string) => void` |
| activeIndex | Currently active menu index. | `Ref<string>` |
| openedMenus | Currently opened submenu indices. | `Ref<string[]>` |

### Menu Item Data

Data structure used by the `options` prop:

| Prop | Description | Type |
| --- | --- | --- |
| key | Unique identifier, usually the same as `index`. | `string` |
| index | Alternative key field used by some data sources. | `string` |
| label | Display text. | `string` |
| icon | Icon name. | `string` |
| disabled | Whether the node is disabled. | `boolean` |
| children | Child menu options. | `YhMenuItemData[]` |
| group | Whether the node represents a grouped block. | `boolean` |

## Theme Variables

`YhMenu` supports `themeOverrides`. The runtime consumes the following component variables:

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-menu-bg-color` | `var(--yh-bg-color)` | Menu background color. |
| `--yh-menu-text-color` | `var(--yh-text-color-primary)` | Menu text color. |
| `--yh-menu-active-text-color` | `var(--yh-color-primary)` | Active item text color. |
| `--yh-menu-hover-bg-color` | `var(--yh-color-primary-light-9)` | Hover background color. |
| `--yh-menu-active-bg-color` | `var(--yh-color-primary-light-9)` | Active item background color. |
| `--yh-menu-border-color` | `var(--yh-border-color-light)` | Menu border color. |
| `--yh-menu-item-height` | `50px` | Menu item height. |
| `--yh-menu-icon-size` | `18px` | Menu icon size. |
| `--yh-menu-base-padding` | `20px` | Base left and right padding. |
| `--yh-menu-indicator-width` | `3px` | Active indicator width. |
| `--yh-menu-indicator-color` | `var(--yh-menu-active-text-color)` | Active indicator color. |

### Type Exports

| Name | Description |
| --- | --- |
| `YhMenuProps` | Menu component props type |
| `YhMenuEmits` | Menu component emits type |
| `YhMenuSlots` | Menu component slots type |
| `YhMenuExpose` | Menu component expose type |
| `YhMenuMode` | Menu mode union |
| `YhMenuTrigger` | Submenu trigger union |
| `YhMenuItemData` | Menu data type |
| `YhMenuItemProps` | Menu item props type |
| `YhMenuItemGroupProps` | Menu item group props type |
| `YhSubMenuProps` | Submenu props type |
| `YhMenuInstance` | Menu component instance type |
| `YhMenuItemInstance` | Menu item instance type |
| `YhMenuItemGroupInstance` | Menu item group instance type |
| `YhSubMenuInstance` | Submenu instance type |

::: tip Inverted Mode
After enabling `inverted`, the menu switches to a darker visual scheme and reuses the same variables with different values.

- `--yh-menu-bg-color`: `var(--yh-bg-color-overlay-dark)`
- `--yh-menu-text-color`: `var(--yh-text-color-secondary)`
- `--yh-menu-hover-bg-color`: `var(--yh-fill-color-dark)`
:::

<style>
/* Patch for alignment in VitePress documentation environment */
.vp-doc .yh-menu,
.vp-doc .yh-menu li {
  list-style: none !important;
  margin: 0 !important;
}
.vp-doc .yh-menu li::before {
  display: none !important;
}
</style>
