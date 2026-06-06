# @yh-ui/icons

YH-UI 的 Iconify 图标集成包。它提供 Vue 图标组件、图标名称解析、预设别名和图标集合配置，既可以直接运行时渲染 Iconify 图标，也可以配合 `unplugin-icons` 做编译时按需加载。

[Iconify](https://icon-sets.iconify.design/) | [Documentation](https://1079161148.github.io/yh-ui/icons/)

## Highlights

- Iconify 生态：可使用 `mdi:home`、`ep:search`、`lucide:check` 等 Iconify 命名。
- Vue 组件：从 `@yh-ui/icons/vue` 导入 `Icon` 或 `YhIcon`，传入 `icon` / `name` 即可渲染。
- 预设别名：常用操作、状态、方向和文件图标提供简短名称，适合业务界面快速落地。
- 类型和工具：导出图标类型、集合信息、`parseIconName`、`iconExists`、`getIconData` 等工具。
- 轻量集成：包本身依赖 `@iconify/vue`，需要极致体积时可再接入 `unplugin-icons`。

## Install

```bash
pnpm add @yh-ui/icons @iconify/vue
```

## Runtime Usage

```vue
<script setup lang="ts">
import { Icon } from '@yh-ui/icons/vue'
</script>

<template>
  <Icon icon="mdi:home" :size="24" />
  <Icon icon="lucide:search" color="#409eff" />
  <Icon icon="loading" spin />
</template>
```

## With unplugin-icons

```bash
pnpm add -D unplugin-icons @iconify/json
```

```ts
import Icons from 'unplugin-icons/vite'

export default {
  plugins: [
    Icons({
      compiler: 'vue3',
      autoInstall: true
    })
  ]
}
```

## Useful Exports

```ts
import {
  AVAILABLE_COLLECTIONS,
  RECOMMENDED_COLLECTIONS,
  iconExists,
  parseIconName
} from '@yh-ui/icons'
```

## License

MIT
