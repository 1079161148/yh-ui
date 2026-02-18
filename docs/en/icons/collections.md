# Icon Sets

The YH-UI Icon Collection supports over 100 icon sets. Below is a detailed introduction to the most commonly used ones.

## Comparison of Common Icon Sets

| Icon Set | Prefix | Icon Count | Style Characteristics | Recommended Scenarios |
|--------|------|----------|----------|----------|
| Material Design Icons | `mdi` | 7000+ | Material Design style | General applications |
| Element Plus | `ep` | 200+ | Clean and modern | Admin management systems |
| Lucide | `lucide` | 1500+ | Line/Outline style | Modern web applications |
| Tabler Icons | `tabler` | 4600+ | Line/Filled styles | Dashboards/Admin panels |
| Remix Icon | `ri` | 2500+ | Line/Outline style | Mobile apps / Lightweight |
| Heroicons | `heroicons` | 600+ | Line/Filled styles | Tailwind CSS projects |
| Bootstrap Icons | `bi` | 2600+ | Bootstrap style | Bootstrap projects |
| Font Awesome 6 | `fa` | 2000+ | Multiple styles | General purpose |

## Icon Set Details

### Material Design Icons (mdi)

The most popular open-source icon library, offering over 7,000 icons.

<DemoBlock title="Material Design Icons" :ts-code="tsMdi" :js-code="jsMdi">
  <div class="icon-demo">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="mdi:account" :size="24" />
    <Icon icon="mdi:cog" :size="24" />
    <Icon icon="mdi:heart" :size="24" />
    <Icon icon="mdi:star" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Largest variety of icons, covering almost any use case.
- Unified style adhering to Material Design specifications.
- Active community with continuous updates.

### Element Plus (ep)

The official icon set from Element Plus, clean and modern.

<DemoBlock title="Element Plus" :ts-code="tsEp" :js-code="jsEp">
  <div class="icon-demo">
    <Icon icon="ep:search" :size="24" />
    <Icon icon="ep:edit" :size="24" />
    <Icon icon="ep:delete" :size="24" />
    <Icon icon="ep:plus" :size="24" />
    <Icon icon="ep:check" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Perfectly matches the styling of Element Plus components.
- Ideal for back-office management systems.
- Moderate, focused selection of icons.

### Lucide

A modern, clean line-style icon library.

<DemoBlock title="Lucide" :ts-code="tsLucide" :js-code="jsLucide">
  <div class="icon-demo">
    <Icon icon="lucide:home" :size="24" />
    <Icon icon="lucide:settings" :size="24" />
    <Icon icon="lucide:user" :size="24" />
    <Icon icon="lucide:search" :size="24" />
    <Icon icon="lucide:check-circle" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Consistent stroke weight for clean visuals.
- Suitable for modern minimalist projects.
- Supports custom stroke weight adjustments.

### Tabler Icons

A high-quality SVG icon library with over 4,600 icons.

<DemoBlock title="Tabler Icons" :ts-code="tsTabler" :js-code="jsTabler">
  <div class="icon-demo">
    <Icon icon="tabler:home" :size="24" />
    <Icon icon="tabler:user" :size="24" />
    <Icon icon="tabler:settings" :size="24" />
    <Icon icon="tabler:bell" :size="24" />
    <Icon icon="tabler:calendar" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Diverse and experimental icon selection.
- Provides both outline and filled styles for many icons.
- Suitable for all types of web applications.

### Remix Icon

A set of open-source neutral style system symbols elaborately crafted.

<DemoBlock title="Remix Icon" :ts-code="tsRi" :js-code="jsRi">
  <div class="icon-demo">
    <Icon icon="ri:home-line" :size="24" />
    <Icon icon="ri:user-line" :size="24" />
    <Icon icon="ri:settings-3-line" :size="24" />
    <Icon icon="ri:search-line" :size="24" />
    <Icon icon="ri:add-line" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Primarily line-styled.
- Standardized and intuitive icon naming.
- Ideal for projects requiring refined and elegant symbols.

### Heroicons

Official icon library from the creators of Tailwind CSS.

<DemoBlock title="Heroicons" :ts-code="tsHeroicons" :js-code="jsHeroicons">
  <div class="icon-demo">
    <Icon icon="heroicons:home" :size="24" />
    <Icon icon="heroicons:user" :size="24" />
    <Icon icon="heroicons:cog-6-tooth" :size="24" />
    <Icon icon="heroicons:bell" :size="24" />
    <Icon icon="heroicons:plus" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Officially recommended for Tailwind CSS projects.
- Available in both outline and solid styles.
- Professional and clean aesthetic.

### Bootstrap Icons

Official icon library from the Bootstrap team.

<DemoBlock title="Bootstrap Icons" :ts-code="tsBi" :js-code="jsBi">
  <div class="icon-demo">
    <Icon icon="bi:house" :size="24" />
    <Icon icon="bi:person" :size="24" />
    <Icon icon="bi:gear" :size="24" />
    <Icon icon="bi:bell" :size="24" />
    <Icon icon="bi:plus-lg" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Native icons for the Bootstrap ecosystem.
- Consistent with the design language of Bootstrap components.
- Large and well-known library.

### Font Awesome 6

The world's most popular icon set and toolkit.

<DemoBlock title="Font Awesome 6" :ts-code="tsFa" :js-code="jsFa">
  <div class="icon-demo">
    <Icon icon="fa:home" :size="24" />
    <Icon icon="fa:user" :size="24" />
    <Icon icon="fa:cog" :size="24" />
    <Icon icon="fa:bell" :size="24" />
    <Icon icon="fa:plus" :size="24" />
  </div>
</DemoBlock>

**Features**:
- Long-standing history and massive ecosystem.
- Both Free and Pro versions available.
- Supports multiple styles including Solid, Regular, and Brands.

## Selection Tips

### By Project Type

| Project Type | Recommended Icon Sets |
|----------|------------|
| Admin Systems | `ep` + `mdi` |
| Modern Web Apps | `lucide` + `tabler` |
| Mobile Apps | `ri` + `heroicons` |
| Tailwind Projects | `heroicons` |
| Bootstrap Projects | `bi` |
| General / Not Sure | `mdi` (Most comprehensive) |

### By Style

| Style | Recommended Icon Sets |
|------|------------|
| Material Design | `mdi` |
| Clean and Modern | `ep`, `lucide` |
| Outline/Line Style | `lucide`, `ri`, `tabler` |
| Filled/Solid Style | `mdi`, `heroicons`, `tabler` |
| Bootstrap Style | `bi`, `fa` |

## Icon Set Prefix Mappings

```typescript
// Common prefix aliases
const PREFIX_ALIAS = {
  // Material Design Icons
  'mdi': 'mdi',
  
  // Element Plus
  'ep': 'ep',
  'element-plus': 'ep',
  
  // Lucide
  'lucide': 'lucide',
  
  // Tabler
  'tabler': 'tabler',
  
  // Remix Icon
  'ri': 'ri',
  'remix': 'ri',
  
  // Heroicons
  'heroicons': 'heroicons',
  'hero': 'heroicons',
  
  // Bootstrap
  'bi': 'bi',
  'bootstrap': 'bi',
  
  // Font Awesome
  'fa': 'fa',
  'font-awesome': 'fa',
  
  // Carbon
  'carbon': 'carbon',
  
  // Ant Design
  'antd': 'antd',
  'ant-design': 'antd'
}
```

## Online Resources

- [Iconify Icon Library](https://icon-sets.iconify.design/) - Browse and search all available icons.
- [Icônes](https://icones.js.org/) - A clean icon browser with preview support.
- [Material Design Icons](https://pictogrammers.com/library/mdi/) - Official MDI icon library.
- [Heroicons](https://heroicons.com/) - Official Heroicons website.
- [Lucide](https://lucide.dev/) - Official Lucide icon library.

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// Material Design Icons
const tsMdi = `<template>
  <Icon icon="mdi:home" />
  <Icon icon="mdi:account" />
  <Icon icon="mdi:cog" />
  <Icon icon="mdi:heart" />
  <Icon icon="mdi:star" />
</template>`
const jsMdi = tsMdi

// Element Plus
const tsEp = `<template>
  <Icon icon="ep:search" />
  <Icon icon="ep:edit" />
  <Icon icon="ep:delete" />
  <Icon icon="ep:plus" />
  <Icon icon="ep:check" />
</template>`
const jsEp = tsEp

// Lucide
const tsLucide = `<template>
  <Icon icon="lucide:home" />
  <Icon icon="lucide:settings" />
  <Icon icon="lucide:user" />
  <Icon icon="lucide:search" />
  <Icon icon="lucide:check-circle" />
</template>`
const jsLucide = tsLucide

// Tabler Icons
const tsTabler = `<template>
  <Icon icon="tabler:home" />
  <Icon icon="tabler:user" />
  <Icon icon="tabler:settings" />
  <Icon icon="tabler:bell" />
  <Icon icon="tabler:calendar" />
</template>`
const jsTabler = tsTabler

// Remix Icon
const tsRi = `<template>
  <Icon icon="ri:home-line" />
  <Icon icon="ri:user-line" />
  <Icon icon="ri:settings-3-line" />
  <Icon icon="ri:search-line" />
  <Icon icon="ri:add-line" />
</template>`
const jsRi = tsRi

// Heroicons
const tsHeroicons = `<template>
  <Icon icon="heroicons:home" />
  <Icon icon="heroicons:user" />
  <Icon icon="heroicons:cog-6-tooth" />
  <Icon icon="heroicons:bell" />
  <Icon icon="heroicons:plus" />
</template>`
const jsHeroicons = tsHeroicons

// Bootstrap Icons
const tsBi = `<template>
  <Icon icon="bi:house" />
  <Icon icon="bi:person" />
  <Icon icon="bi:gear" />
  <Icon icon="bi:bell" />
  <Icon icon="bi:plus-lg" />
</template>`
const jsBi = tsBi

// Font Awesome
const tsFa = `<template>
  <Icon icon="fa:home" />
  <Icon icon="fa:user" />
  <Icon icon="fa:cog" />
  <Icon icon="fa:bell" />
  <Icon icon="fa:plus" />
</template>`
const jsFa = tsFa
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 24px;
  color: var(--yh-text-color-primary);
}
</style>
