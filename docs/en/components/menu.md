<script setup lang="ts">
import { ref, h } from 'vue'

const activeIndex = ref('1')

const handleSelect = (index: string) => {
  console.log('Selected menu:', index)
}

const renderLabel = (option: any) => {
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

Providing a navigation menu for users, supporting both vertical and horizontal modes.

## Basic Usage

Vertical menu, use `default-active` to set the default active menu item.

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

Switch the collapsed state of the menu via the `collapse` attribute.

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

Set the popper theme via `popper-effect` and adjust the offset via `popper-offset`.

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

Directly generate the menu from array data via the `options` attribute.

<DemoBlock title="Data Driven" :ts-code="tsDataDriven" :js-code="jsDataDriven">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :options="menuOptions" default-active="2-1" />
  </div>
</DemoBlock>

## External Control

Manually control the menu state by calling exposed methods via `ref`.

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

Group menu items using `yh-menu-item-group`.

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

Disable menu items or submenus via the `disabled` attribute.

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

Customize menu colors via `background-color`, `text-color`, and `active-text-color`.

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

Quickly toggle the dark inverted theme via the `inverted` attribute.

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

When the text content of menu items or submenus is too long, an ellipsis will be automatically shown and it will adapt to the layout.

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

Use the `unique-opened` attribute to only keep one submenu expanded at a time.

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

Use `default-openeds` to preset an array of submenu identifiers that need to be expanded initially.

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

Batch deep customization of menu node display content through render functions like `render-label` or slots.

<DemoBlock title="Custom Node" :ts-code="tsCustomNode" :js-code="jsCustomNode">
  <div style="width: 240px; border: 1px solid var(--yh-border-color); border-radius: 8px; overflow: hidden;">
    <yh-menu :render-label="renderLabel">
      <yh-menu-item index="1" label="Home" />
      <yh-menu-item index="2" label="System Messages" />
    </yh-menu>
  </div>
</DemoBlock>

## Use in Nuxt

The `Menu` component supports the `router` attribute and can be used with Nuxt's routing system.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="border-bottom: 1px solid var(--yh-border-color);">
    <yh-menu mode="horizontal" default-active="/" router>
      <yh-menu-item index="/">Home</yh-menu-item>
      <yh-menu-item index="/docs">Docs</yh-menu-item>
      <yh-menu-item index="/about">About</yh-menu-item>
    </yh-menu>
  </div>
  <div style="padding: 10px 0;">
    <p style="color: var(--yh-color-text-secondary); font-size: 13px;">Hint: After setting the router attribute, the menu will automatically activate based on the matching of the current route path and index.</p>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Perfect support for Server-Side Rendering (SSR) with no hydration errors.
- ✅ Supports vue-router integration.
- ✅ Supports collapse animations.
- ✅ Full keyboard navigation support.

## API

### Menu Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Menu mode | `'vertical' \| 'horizontal'` | `'vertical'` |
| default-active | Index of the currently active menu | `string` | `''` |
| default-openeds | Array of indices for currently open sub-menus | `string[]` | `[]` |
| expand-all | Whether to expand all menus | `boolean` | `false` |
| unique-opened | Whether to only keep one submenu expanded | `boolean` | `false` |
| menu-trigger | Sub-menu opening trigger method (valid in Popup mode) | `'hover' \| 'click'` | `'hover'` |
| collapse | Whether to enable collapsed mode (vertical mode only) | `boolean` | `false` |
| collapse-transition | Whether collapse animation is enabled | `boolean` | `true` |
| router | Whether to use vue-router mode | `boolean` | `false` |
| root-indent | Indentation for the first level of the menu, defaults to `indent` | `number` | — |
| render-extra | Batch processing of extra menu part rendering (VNode) | `Function` | — |
| render-icon | Batch processing of menu icon rendering (VNode) | `Function` | — |
| render-label | Batch processing of menu label rendering (VNode) | `Function` | — |
| responsive | Whether to automatically collapse overflowing menus (horizontal mode) | `boolean` | `false` |
| value | Current selected value of the menu (supports `v-model`) | `string \| null` | — |
| options | Menu configuration entries, supports generating menu from data | `MenuItemData[]` | `[]` |
| background-color | Background color | `string` | `''` |
| text-color | Text color | `string` | `''` |
| active-text-color | Active item text color | `string` | `''` |
| ellipsis | Whether to enable ellipsis mode (horizontal mode) | `boolean` | `true` |
| popper-z-index | Z-index for sub-menu popper | `number` | `2000` |
| teleported | Whether to teleport the popup menu to body | `boolean` | `true` |
| gap | Menu item gap | `number` | `4` |
| icon-size | Icon size when menu is not collapsed | `number` | `20` |
| indent | Indentation per menu level | `number` | `32` |
| inverted | Whether to use inverted style (dark background) | `boolean` | `false` |
| key-field | Field name for key in data source | `string` | `'key'` |
| label-field | Field name for label in data source | `string` | `'label'` |
| ellipsis-icon | Custom ellipsis icon (horizontal mode) | `string \| Component` | — |
| popper-offset | Offset for the popper | `number` | `6` |
| popper-effect | Tooltip theme | `'dark' \| 'light'` | `'light'` |
| close-on-click-outside | Whether to collapse menu when clicking outside | `boolean` | `true` |
| popper-class | Custom class for the popup menu | `string` | `''` |
| popper-style | Custom style for the popup menu | `string \| object` | `''` |
| show-timeout | Delay before menu appearance | `number` | `300` |
| hide-timeout | Delay before menu disappearance | `number` | `300` |
| persistent | Whether to keep sub-menu DOM when hidden | `boolean` | `true` |

### MenuItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| index | Unique identifier | `string` | — (Required) |
| label | Display text | `string` | `''` |
| route | vue-router route object | `string \| object` | `''` |
| disabled | Whether disabled | `boolean` | `false` |

### MenuItemGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Group title | `string` | `''` |

### SubMenu Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| index | Unique identifier | `string` | — (Required) |
| label | Display text | `string` | `''` |
| popper-class | Custom class for the popup menu | `string` | `''` |
| disabled | Whether disabled | `boolean` | `false` |
| show-timeout | Delay for expanding/collapsing | `number` | `300` |
| hide-timeout | Delay for collapsing | `number` | `300` |
| popper-offset | Offset for the popper | `number` | `6` |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| select | Callback for menu activation | `(index: string, indexPath: string[], item: MenuItemData \| undefined, routeResult?: Promise<void>)` |
| open | Callback for sub-menu expansion | `(index: string, indexPath: string[])` |
| close | Callback for sub-menu collapse | `(index: string, indexPath: string[])` |
| update:value | Callback when value changes (supports v-model) | `(value: string) => void` |

### Slots

| Slot Name | Description | Component |
| --- | --- | --- |
| default | Menu content | Menu |
| default | Menu item content | MenuItem |
| title | Group title | MenuItemGroup |
| default | Group content | MenuItemGroup |
| title | Sub-menu title | SubMenu |
| default | Sub-menu content | SubMenu |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| open | Expand specified sub-menu | `(index: string) => void` |
| close | Collapse specified sub-menu | `(index: string) => void` |
| activeIndex | Currently active item | `Ref<string>` |
| openedMenus | Currently expanded sub-menus | `Ref<string[]>` |

### MenuItemData

Data structure for `options` prop:

| Prop | Description | Type |
| --- | --- | --- |
| key | Unique identifier (same as index) | `string` |
| index | Unique identifier (same as key) | `string` |
| label | Display text | `string` |
| icon | Icon name | `string` |
| disabled | Whether disabled | `boolean` |
| children | Sub-menu data | `MenuItemData[]` |
| group | Whether it is a group item | `boolean` |

### Theme Variables

All color variables are integrated with the global theme system and support dark mode:

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-menu-bg-color` | `var(--yh-bg-color)` | Menu background color |
| `--yh-menu-text-color` | `var(--yh-text-color-primary)` | Menu text color |
| `--yh-menu-active-text-color` | `var(--yh-color-primary)` | Text color in active state |
| `--yh-menu-hover-bg-color` | `var(--yh-color-primary-light-9)` | Hover background color |
| `--yh-menu-active-bg-color` | `var(--yh-color-primary-light-9)` | Active background color |
| `--yh-menu-border-color` | `var(--yh-border-color-light)` | Menu border color |
| `--yh-menu-item-height` | `50px` | Menu item height |
| `--yh-menu-icon-size` | `18px` | Menu icon size |
| `--yh-menu-base-padding` | `20px` | Menu base padding |
| `--yh-menu-indicator-width` | `3px` | Indicator width |
| `--yh-menu-indicator-color` | `var(--yh-menu-active-text-color)` | Indicator color |

::: tip Inverted Mode
After enabling the `inverted` attribute, the menu automatically switches to a dark theme, using the following override variables:
- `--yh-menu-bg-color`: `var(--yh-bg-color-overlay-dark)`
- `--yh-menu-text-color`: `var(--yh-text-color-secondary)`
- `--yh-menu-hover-bg-color`: `var(--yh-fill-color-dark)`
:::

---

**Note**: The `Menu` component combines the best designs of Element Plus, Ant Design, and Naive UI, supporting rich features like vertical/horizontal modes, collapse, grouping, and vue-router integration.

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
