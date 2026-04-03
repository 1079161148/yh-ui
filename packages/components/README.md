# @yh-ui/components

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="120" height="120" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI 核心组件库</h3>

<p align="center">
  基于 Vue 3.5+ 的企业级 UI 组件集合 · 77+ 组件（含 16 个 AI 组件）· 完整 TypeScript · 原生 Tree-shaking
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/components">
    <img src="https://img.shields.io/npm/v/@yh-ui/components.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/components">
    <img src="https://img.shields.io/npm/dm/@yh-ui/components.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/components.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- 🧩 **77+ 企业级组件** — 覆盖基础 UI、数据展示、表单交互、反馈提示、布局、高级业务等全场景
- 🤖 **16 个 AI 组件** — 业内首创完整 AI UI 套件（聊天气泡、发送器、思维链、文件卡片等）
- 📊 **工业级 Table** — 虚拟滚动、列拖拽、多选、排序过滤、打印/导出 CSV/XLSX/PDF，媲美 vxe-table
- 🔒 **完整 TypeScript** — 全量类型定义，精确的 props/emits/slots 类型推导
- ⚡ **极致轻量** — 原生 ES Module，按需导入，完美 Tree-shaking
- 🌐 **SSR 完全兼容** — Nuxt 3 生产级验证，所有组件 SSR/Hydration 安全
- 🎨 **主题响应** — 自动响应 `@yh-ui/theme` 的主题变量，支持运行时切换
- ♿ **无障碍访问** — 关键组件通过 WCAG 2.1 AA 验证

---

## 📦 安装

```bash
# 推荐：安装主包（含样式）
pnpm add @yh-ui/yh-ui

# 或单独安装组件包（需自行引入依赖）
pnpm add @yh-ui/components
```

---

## 🔨 使用方式

### 方式一：全量引入（推荐新手）

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

const app = createApp(App)
app.use(YhUI)
app.mount('#app')
```

### 方式二：按需导入（推荐生产）

```vue
<script setup lang="ts">
import { YhButton, YhInput, YhTable, YhForm, YhFormItem } from '@yh-ui/components'
</script>

<template>
  <YhButton type="primary" size="large" :loading="submitting" @click="submit"> 提交 </YhButton>
</template>
```

### 方式三：自动导入（零配置，极致 DX）

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { YhUIResolver } from '@yh-ui/components/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [YhUIResolver()]
    })
  ]
})
```

`YhUIResolver()` 默认自动引入组件 CSS，纯 CSS 项目可直接使用，无需额外安装 Sass。

---

## 📚 组件目录

### 🏗 基础组件

| 组件               | 说明                             |
| ------------------ | -------------------------------- |
| `YhButton`         | 按钮（支持 loading、图标、组等） |
| `YhIcon`           | 图标（整合 Iconify，20w+ 图标）  |
| `YhLink`           | 链接                             |
| `YhScrollbar`      | 自定义美化滚动条                 |
| `YhConfigProvider` | 全局配置提供者                   |

### 📝 表单组件

| 组件                                         | 说明                               |
| -------------------------------------------- | ---------------------------------- |
| `YhForm` / `YhFormItem`                      | 表单容器（支持 async-validator）   |
| `YhFormSchema`                               | JSON Schema 动态表单生成器         |
| `YhInput`                                    | 输入框（支持插槽、字数统计、密码） |
| `YhInputNumber`                              | 数字输入框                         |
| `YhInputTag`                                 | 标签输入框                         |
| `YhSelect` / `YhOption`                      | 下拉选择（支持虚拟滚动）           |
| `YhCascader`                                 | 级联选择                           |
| `YhCheckbox` / `YhCheckboxGroup`             | 复选框                             |
| `YhRadio` / `YhRadioGroup` / `YhRadioButton` | 单选框                             |
| `YhSwitch`                                   | 开关                               |
| `YhSlider`                                   | 滑块                               |
| `YhRate`                                     | 评分                               |
| `YhDatePicker`                               | 日期选择器                         |
| `YhTimePicker`                               | 时间选择器                         |
| `YhColorPicker`                              | 颜色选择器                         |
| `YhUpload`                                   | 文件上传                           |
| `YhTransfer`                                 | 穿梭框                             |
| `YhTreeSelect`                               | 树形选择器                         |

### 📊 数据展示

| 组件             | 说明                                 |
| ---------------- | ------------------------------------ |
| `YhTable`        | 工业级表格（虚拟滚动 / 拖拽 / 导出） |
| `YhTree`         | 树形控件（虚拟滚动、拖拽排序）       |
| `YhList`         | 列表                                 |
| `YhCard`         | 卡片                                 |
| `YhBadge`        | 徽标                                 |
| `YhTag`          | 标签                                 |
| `YhAvatar`       | 头像                                 |
| `YhImage`        | 图片（懒加载、预览）                 |
| `YhCalendar`     | 日历                                 |
| `YhStatistic`    | 数据统计展示                         |
| `YhTimeline`     | 时间轴                               |
| `YhDescriptions` | 描述列表                             |
| `YhChart`        | 图表（封装 ECharts）                 |
| `YhGantt`        | 甘特图（工业级项目管理）             |

### 💬 反馈组件

| 组件             | 说明       |
| ---------------- | ---------- |
| `YhMessage`      | 全局提示   |
| `YhNotification` | 通知消息   |
| `YhAlert`        | 警告提示   |
| `YhDialog`       | 对话框     |
| `YhDrawer`       | 抽屉       |
| `YhPopover`      | 气泡卡片   |
| `YhTooltip`      | 文字提示   |
| `YhPopconfirm`   | 气泡确认框 |
| `YhLoading`      | 加载中     |
| `YhProgress`     | 进度条     |
| `YhSkeleton`     | 骨架屏     |

### 📐 布局组件

| 组件                                           | 说明       |
| ---------------------------------------------- | ---------- |
| `YhRow` / `YhCol`                              | 栅格布局   |
| `YhDivider`                                    | 分割线     |
| `YhSpace`                                      | 间距       |
| `YhContainer`                                  | 布局容器   |
| `YhAside` / `YhHeader` / `YhMain` / `YhFooter` | 布局子组件 |

### 🧭 导航组件

| 组件           | 说明     |
| -------------- | -------- |
| `YhMenu`       | 导航菜单 |
| `YhTabs`       | 标签页   |
| `YhBreadcrumb` | 面包屑   |
| `YhPagination` | 分页     |
| `YhSteps`      | 步骤条   |
| `YhDropdown`   | 下拉菜单 |

### 🤖 AI 组件（独家特性）

| 组件               | 说明                                    |
| ------------------ | --------------------------------------- |
| `YhAiBubble`       | AI 对话气泡（Markdown 渲染 + 流式打字） |
| `YhAiSender`       | 智能输入发送器（支持附件、快捷指令）    |
| `YhAiWelcome`      | AI 欢迎界面                             |
| `YhAiThoughtChain` | 思维链展示                              |
| `YhAiSuggestion`   | 智能推荐提示                            |
| `YhAiFileCard`     | 文件消息卡片                            |
| `YhAiImageCard`    | 图片消息卡片                            |
| `YhAiProvider`     | AI 上下文提供者                         |
| `YhAiChatWindow`   | 完整聊天窗口（开箱即用）                |
| ...                | 共 16 个 AI 组件                        |

---

## 🔗 相关资源

- [📖 官方文档](https://1079161148.github.io/yh-ui/)
- [🚀 快速开始](https://1079161148.github.io/yh-ui/guide/quickstart)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)
- [📝 更新日志](https://github.com/1079161148/yh-ui/blob/main/CHANGELOG.md)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
