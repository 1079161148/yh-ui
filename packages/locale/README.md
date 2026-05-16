# @yh-ui/locale

YH-UI 的语言包和国际化类型定义。它把组件文案、表格工具栏、日期时间、上传、AI 组件、业务组件等文本收敛到统一结构，方便在 Vue、Nuxt 和独立组件中复用。

[i18n Guide](https://1079161148.github.io/yh-ui/guide/i18n) | [Releases](https://github.com/1079161148/yh-ui/releases)

## Highlights

- 覆盖 67 个语言文件，包含中文、英文、日文、韩文、德文、法文、西班牙文、葡萄牙文、俄文、阿拉伯文等常见业务语言。
- 每个语言包独立导出，可按需导入，避免把所有语言都打进业务包。
- 类型完整：`Language` 描述了组件库内所有可翻译字段，便于补充、覆盖和校验自定义语言。
- 覆盖面细：基础组件、Table、Upload、DatePicker、AI 组件、电商业务组件、地址解析、甘特图等都有对应文案结构。
- SSR 安全：语言包是纯数据导出，不依赖浏览器环境。

## Install

```bash
pnpm add @yh-ui/locale
```

通常你也可以直接通过 `@yh-ui/yh-ui` 使用内置导出的语言包。

## Usage

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import zhCn from '@yh-ui/locale/lang/zh-cn'
import App from './App.vue'

createApp(App).use(YhUI, { locale: zhCn }).mount('#app')
```

## With ConfigProvider

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhConfigProvider } from '@yh-ui/components'
import zhCn from '@yh-ui/locale/lang/zh-cn'
import en from '@yh-ui/locale/lang/en'

const locale = ref(zhCn)
</script>

<template>
  <YhConfigProvider :locale="locale">
    <YhButton @click="locale = en">English</YhButton>
    <YhDatePicker />
    <YhTable :data="rows" :columns="columns" />
  </YhConfigProvider>
</template>
```

## Custom Locale

```ts
import zhCn from '@yh-ui/locale/lang/zh-cn'
import type { Language } from '@yh-ui/locale'

const customLocale: Language = {
  ...zhCn,
  name: 'zh-cn-custom',
  yh: {
    ...zhCn.yh,
    common: {
      ...zhCn.yh?.common,
      confirm: '好的',
      cancel: '稍后'
    }
  }
}
```

## Language File Examples

`zh-cn`, `zh-tw`, `en`, `ja`, `ko`, `de`, `fr`, `es`, `pt`, `pt-br`, `ru`, `ar`, `tr`, `it`, `nl`, `pl`, `th`, `vi`, `id`, `ms`, `sv`, `fi`, `no`, `cs`, `sk`, `uk`, `hi`, `he`, `fa`, `el`, `ca`, `ta`, `bn`, `my`, `te` and more.

## License

MIT
