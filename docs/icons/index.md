# 图标集合

YH-UI Icons 现在同时支持两种用法：保留原有 `Icon` / `YhIcon` 的 Iconify 字符串写法，也新增了现代组件库风格的独立图标组件。你可以像使用普通 Vue 组件一样导入并渲染每一个图标。

## 基础用法

<DemoBlock title="组件式图标" :ts-code="componentTsCode" :js-code="componentTsCode">
  <div class="icon-row">
    <Search :size="24" />
    <Edit :size="24" />
    <Delete :size="24" />
    <HomeFilled :size="24" />
    <Setting :size="24" />
  </div>
</DemoBlock>

## Iconify 兼容用法

原有功能保持不变。需要跨图标集时，继续使用 `Icon` 并传入 `prefix:name`。

<DemoBlock title="Iconify 字符串图标" :ts-code="iconifyTsCode" :js-code="iconifyTsCode">
  <div class="icon-row">
    <Icon icon="mdi:home" :size="24" />
    <Icon icon="ep:search" :size="24" />
    <Icon icon="lucide:check" :size="24" />
    <Icon icon="tabler:user" :size="24" />
    <Icon icon="ri:settings" :size="24" />
  </div>
</DemoBlock>

## 图标列表

点击图标卡片可复制导入语句和模板用法。

<div class="icon-toolbar">
  <input v-model="keyword" class="icon-search" placeholder="搜索图标名称，例如 Search、Delete、Arrow" />
  <select v-model="activeCategory" class="icon-select">
    <option value="all">全部分类</option>
    <option v-for="category in categories" :key="category" :value="category">{{ categoryLabels[category] || category }}</option>
  </select>
</div>

<div class="icon-count">共 {{ filteredIcons.length }} 个组件图标</div>

<div class="icon-grid">
  <button
    v-for="item in filteredIcons"
    :key="item.name"
    type="button"
    class="icon-card"
    @click="copyIcon(item.name)"
  >
    <component :is="iconComponents[item.name]" :size="28" />
    <span>{{ item.name }}</span>
  </button>
</div>

<p v-if="copiedName" class="copy-tip">已复制 {{ copiedName }} 的使用代码</p>

## 按需导入

```vue
<script setup lang="ts">
import { Search, Edit, Delete } from '@yh-ui/icons'
</script>

<template>
  <Search />
  <Edit :size="20" color="var(--yh-color-primary)" />
  <Delete />
</template>
```

## 全局注册

如果希望在业务模板里直接使用所有图标组件，可以在应用入口注册：

```ts
import { createApp } from 'vue'
import * as Icons from '@yh-ui/icons'
import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(Icons.iconComponents)) {
  app.component(key, component)
}

app.mount('#app')
```

## API

所有独立图标组件都支持与 `YhIcon` 一致的视觉属性：

| 属性     | 说明         | 类型               | 默认值      |
| -------- | ------------ | ------------------ | ----------- |
| `size`   | 图标尺寸     | `number \| string` | `undefined` |
| `color`  | 图标颜色     | `string`           | `undefined` |
| `spin`   | 是否旋转     | `boolean`          | `false`     |
| `rotate` | 静态旋转角度 | `number`           | `0`         |

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Delete,
  Edit,
  HomeFilled,
  Icon,
  Search,
  Setting,
  iconComponentMeta,
  iconComponents
} from '@yh-ui/icons'
import type { IconComponentName } from '@yh-ui/icons'

const componentTsCode = `<script setup lang="ts">
import { Search, Edit, Delete, HomeFilled, Setting } from '@yh-ui/icons'
<\/script>

<template>
  <Search :size="24" />
  <Edit :size="24" />
  <Delete :size="24" />
  <HomeFilled :size="24" />
  <Setting :size="24" />
</template>`

const iconifyTsCode = `<script setup lang="ts">
import { Icon } from '@yh-ui/icons'
<\/script>

<template>
  <Icon icon="mdi:home" :size="24" />
  <Icon icon="ep:search" :size="24" />
  <Icon icon="lucide:check" :size="24" />
  <Icon icon="tabler:user" :size="24" />
  <Icon icon="ri:settings" :size="24" />
</template>`

const keyword = ref('')
const activeCategory = ref('all')
const copiedName = ref('')

const categoryLabels: Record<string, string> = {
  arrow: '方向',
  business: '业务',
  communication: '通讯',
  data: '数据',
  device: '设备',
  edit: '编辑',
  feedback: '反馈',
  file: '文件',
  food: '食品',
  map: '地图',
  media: '媒体',
  object: '对象',
  system: '系统',
  time: '时间',
  user: '用户',
  weather: '天气',
  brand: '品牌'
}

const categories = computed(() =>
  Array.from(new Set(iconComponentMeta.map((item) => item.category))).sort()
)

const filteredIcons = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()
  return iconComponentMeta.filter((item) => {
    const matchesKeyword =
      !normalizedKeyword ||
      item.name.toLowerCase().includes(normalizedKeyword) ||
      item.icon.toLowerCase().includes(normalizedKeyword)
    const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value
    return matchesKeyword && matchesCategory
  })
})

async function copyIcon(name: IconComponentName) {
  const code = `import { ${name} } from '@yh-ui/icons'\\n\\n<${name} />`
  copiedName.value = name

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Browser permission policies may block clipboard access in previews.
    }
  }

  window.setTimeout(() => {
    if (copiedName.value === name) copiedName.value = ''
  }, 1600)
}
</script>

<style scoped>
.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  color: var(--yh-text-color-primary);
}

.icon-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px;
  gap: 12px;
  margin: 16px 0;
}

.icon-search,
.icon-select {
  height: 36px;
  border: 1px solid var(--yh-border-color);
  border-radius: 6px;
  padding: 0 12px;
  background: var(--yh-bg-color);
  color: var(--yh-text-color-primary);
  font: inherit;
}

.icon-count {
  margin: 8px 0 12px;
  color: var(--yh-text-color-secondary);
  font-size: 14px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  border-top: 1px solid var(--yh-border-color-lighter);
  border-left: 1px solid var(--yh-border-color-lighter);
}

.icon-card {
  min-height: 96px;
  border: 0;
  border-right: 1px solid var(--yh-border-color-lighter);
  border-bottom: 1px solid var(--yh-border-color-lighter);
  background: var(--yh-bg-color);
  color: var(--yh-text-color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition:
    color var(--yh-transition-duration, 0.2s),
    background-color var(--yh-transition-duration, 0.2s);
}

.icon-card:hover {
  color: var(--yh-color-primary);
  background: var(--yh-fill-color-light);
}

.icon-card span {
  max-width: 100%;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}

.copy-tip {
  position: sticky;
  bottom: 16px;
  width: fit-content;
  margin: 16px auto 0;
  padding: 8px 14px;
  border-radius: 6px;
  background: var(--yh-color-primary);
  color: #fff;
  box-shadow: var(--yh-shadow-base);
}

@media (max-width: 640px) {
  .icon-toolbar {
    grid-template-columns: 1fr;
  }

  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  }
}
</style>
