<script setup lang="ts">
import { ref } from 'vue'
import { _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const disabled = ref(false)

const tsBasic = `<${_T}>
  <yh-affix :offset="120">
    <yh-button type="primary">Basic Top Affix (120px)</yh-button>
  </yh-affix>
</${_T}>`

const tsBottom = `<${_T}>
  <yh-affix position="bottom" :offset="100">
    <yh-button type="success">Smart Bottom Affix (100px)</yh-button>
  </yh-affix>
</${_T}>`

const tsTeleport = `<${_T}>
  <div style="transform: scale(0.9); padding: 40px; border: 1px dashed #ccc; border-radius: 8px;">
    <yh-affix :offset="200" teleported>
      <yh-button type="warning">Teleport Fix Positioning</yh-button>
    </yh-affix>
    <p style="margin-top: 100px; font-size: 13px; color: #666;">
      This container has a CSS transform (scale: 0.9). Normal affix would misalign, but this component handles it perfectly via Teleport.
    </p>
  </div>
</${_T}>`

const tsScoped = `<${_T}>
  <yh-affix :offset="250">
    <template #default="{ fixed }">
      <yh-button :type="fixed ? 'danger' : 'primary'">
        {{ fixed ? 'Affixed' : 'Free' }}
      </yh-button>
    </template>
  </yh-affix>
</${_T}>`

const tsDisabled = `<${_T}>
  <yh-button @click="disabled = !disabled" style="margin-bottom: 30px;">
    {{ disabled ? 'Enable' : 'Disable' }} Affix
  </yh-button>
  <yh-affix :offset="300" :disabled="disabled">
    <yh-button type="info">Toggleable Affix</yh-button>
  </yh-affix>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const disabled = ref(false)
</${_S}>`

const tsNuxt = `<${_T}>
  <yh-affix :offset="140" teleported>
    <yh-button type="success">Nuxt SSR Compatible (140px)</yh-button>
  </yh-affix>
  <p style="margin-top: 10px; font-size: 13px; color: #666;">
    In Nuxt environments, enabling teleported ensures the most robust positioning behavior.
  </p>
</${_T}>`

const jsBasic = tsBasic
const jsBottom = tsBottom
const jsTeleport = tsTeleport
const jsScoped = tsScoped
const jsDisabled = tsDisabled.replace('lang="ts"', '').replace('const disabled = ref(false)', 'const disabled = ref(false)')
const jsNuxt = tsNuxt
</script>

# Affix (Next-Gen)

A high-performance affix component based on physics engine algorithms and native browser observers. Surpasses industry standards in both functionality and performance.

## Performance Architecture (Surpassing Engine)

YhAffix employs a dual-layer observation system:
- **IntersectionObserver**: The engine automatically monitors the distance between the element and the trigger zone. When the element is more than 500px away from the viewport trigger point, all high-frequency calculations are automatically cut off, achieving extreme power efficiency.
- **ResizeObserver**: Deeply observes size changes across three parties — the placeholder, the content, and the target container — ensuring zero jitter during async content loading.

---

## Basic Usage

Set the offset and enjoy instant snap-to feedback.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
<div style="padding: 10px 0;">
  <yh-affix :offset="120">
    <yh-button type="primary">Basic Top Affix (120px)</yh-button>
  </yh-affix>
</div>
</DemoBlock>

## Smart Bottom Affix

In `position="bottom"` mode, the component automatically detects the viewport bottom.

<DemoBlock title="Bottom Affix" :ts-code="tsBottom" :js-code="jsBottom">
<div style="padding: 100px 0; text-align: center;">
  <p style="margin-bottom: 20px; color: var(--yh-color-text-secondary);">Scroll to see the 100px offset bottom affix</p>
  <yh-affix position="bottom" :offset="100">
    <yh-button type="success">Smart Bottom Affix (100px)</yh-button>
  </yh-affix>
  <div style="height: 1200px;"></div>
</div>
</DemoBlock>

## Teleport Positioning

**Core Breakthrough**: For the issue where traditional `fixed` positioning fails inside parent containers with `transform`, `filter`, or `perspective` properties, YhAffix supports the `teleported` prop. It teleports the rendered node to `body` and maintains perfect visual alignment through coordinate projection algorithms.

<DemoBlock title="Teleport" :ts-code="tsTeleport" :js-code="jsTeleport">
<div style="transform: scale(0.9); padding: 40px; border: 1px dashed var(--yh-border-color); border-radius: 8px;">
  <yh-affix :offset="200" teleported>
    <yh-button type="warning">Teleport Fix Positioning</yh-button>
  </yh-affix>
  <p style="margin-top: 100px; font-size: 13px; color: var(--yh-color-text-secondary);">
    This container has a CSS transform (scale: 0.9). Normal affix would misalign, but this component handles it perfectly via Teleport.
  </p>
</div>
</DemoBlock>

## Scoped Slot

Supports real-time access to the fixed state via scoped slots, enabling more complex UI interaction logic.

<DemoBlock title="Scoped Slot" :ts-code="tsScoped" :js-code="jsScoped">
<div style="padding: 10px 0;">
  <yh-affix :offset="250">
    <template #default="{ fixed }">
      <yh-button :type="fixed ? 'danger' : 'primary'">
        {{ fixed ? 'Affixed' : 'Free' }}
      </yh-button>
    </template>
  </yh-affix>
</div>
</DemoBlock>

## Dynamic Disable

Use the `disabled` prop to toggle the state, suitable for permission control or complex dynamic interaction scenarios.

<DemoBlock title="Dynamic Disable" :ts-code="tsDisabled" :js-code="jsDisabled">
<div style="padding: 20px 0;">
  <yh-button @click="disabled = !disabled" style="margin-bottom: 30px;">
    {{ disabled ? 'Enable' : 'Disable' }} Affix
  </yh-button>
  <yh-affix :offset="300" :disabled="disabled">
    <yh-button type="info">Toggleable Affix</yh-button>
  </yh-affix>
</div>
</DemoBlock>

## Use in Nuxt

`YhAffix` fully supports Nuxt 3/4 SSR rendering. Since affixing depends on browser window coordinates, the component has already handled client-side activation logic internally, so you can use it with confidence.

**Best Practice**: In Nuxt projects, pages are usually nested within `NuxtLayout` or various levels of complex animation components. It is recommended to enable the `teleported` prop, which ensures the affix element is hoisted to the root node in the DOM tree, avoiding any intermediate-level style interference.

<DemoBlock title="Nuxt SSR Support" :ts-code="tsNuxt" :js-code="jsNuxt">
<div id="nuxt-demo-wrapper" style="padding: 10px 0;">
  <yh-affix :offset="140" teleported>
    <yh-button type="success">Nuxt SSR Compatible (140px)</yh-button>
  </yh-affix>
  <p style="font-size: 13px; color: var(--yh-color-text-secondary); margin-top: 10px;">
    In Nuxt environments, enabling teleported ensures the most robust positioning behavior.
  </p>
</div>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset | Offset distance to trigger fixing | `number` | `0` |
| position | Affix position | `'top' \| 'bottom'` | `'top'` |
| target | Target container selector. Affixing stops outside this container | `string` | — |
| z-index | Z-index when fixed | `number` | `100` |
| teleported | Whether to teleport to a specified node for rendering, solving parent transform positioning issues | `boolean` | `false` |
| append-to | Target container node for teleport, used with `teleported` | `string \| HTMLElement` | `'body'` |
| disabled | Whether to disable the component | `boolean` | `false` |
| affix-style | Extra styles passed to the fixed container | `CSSProperties` | `{}` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered when the fixed state changes | `(fixed: boolean)` |
| scroll | Triggered in real-time while scrolling | `(payload: { scrollTop: number, fixed: boolean })` |

### Slots

| Slot Name | Description | Scope Parameters |
| --- | --- | --- |
| default | Content slot to be fixed | `{ fixed: boolean }` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| update | Manually trigger position calculation and state update | `() => void` |
| fixed | Whether currently in the fixed state | `Ref<boolean>` |
| scrollTop | Current vertical scroll distance of the scroll container | `Ref<number>` |

### Theme Variables (CSS Variables)

All color variables are integrated with the global theme system, automatically supporting dark mode:

| Variable | Default | Description |
| --- | --- | --- |
| `--yh-affix-z-index` | `100` | Default z-index in fixed state |
| `--yh-affix-bg-color` | `var(--yh-bg-color-overlay)` | Affix content background color |
| `--yh-affix-shadow` | `var(--yh-shadow-md)` | Shadow effect in fixed state |
| `--yh-affix-transition-duration` | `var(--yh-transition-duration)` | Animation duration when entering fixed state |
| `--yh-affix-transition-timing` | `var(--yh-transition-timing)` | Animation easing curve |
