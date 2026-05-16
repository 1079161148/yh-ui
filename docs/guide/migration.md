# 迁移指南

本文面向准备从旧版本 YH-UI、其他 Vue 组件库或自研组件迁移到 YH-UI 的团队。建议先在一个业务模块中完成试点，再逐步扩大到全站。

## 迁移前评估

迁移前先建立清单：

- 当前使用的组件、二次封装和全局样式覆盖。
- 主题变量、品牌色、暗色模式和字体设置。
- 表单校验、弹层、消息、通知、表格和上传等高频能力。
- Nuxt、SSR、自动导入、按需引入、打包体积等工程约束。
- 仍在使用但缺少 owner 的历史页面。

## 安装与基础替换

安装依赖：

```bash
pnpm add @yh-ui/yh-ui
```

在应用入口引入：

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

createApp(App).use(YhUI).mount('#app')
```

Nuxt 项目优先使用 YH-UI Nuxt 模块，避免手动维护服务端和客户端两套注册逻辑。

## 推荐迁移顺序

1. 基础样式和 Token：先接入 `@yh-ui/yh-ui/css`，恢复品牌色、字体、圆角、暗色模式。
2. 低风险展示组件：Button、Icon、Tag、Badge、Card、Alert。
3. 表单控件：Input、Select、DatePicker、Checkbox、Radio、Form。
4. 弹层反馈：Message、Notification、Dialog、Drawer、Tooltip、Popover。
5. 复杂业务组件：Table、Upload、Tree、Transfer、Flow、AI Components。
6. 删除旧组件适配层和无用样式覆盖。

## 从其他组件库迁移

### 命名差异

YH-UI 组件使用 `Yh` 前缀和 kebab-case 标签：

```vue
<yh-button type="primary">保存</yh-button>
<yh-input v-model="keyword" clearable />
```

如果项目已有自研封装，建议先保留业务组件名，在内部替换为 YH-UI，减少一次性改动面。

### 主题差异

不要直接复制旧组件库的 class 覆盖。优先映射为 YH-UI Token：

```css
:root {
  --yh-color-primary: var(--brand-primary);
  --yh-radius-base: 6px;
  --yh-font-family: var(--app-font-family);
}
```

### 表单差异

迁移表单时先确认：

- `v-model` 字段名和初始值是否一致。
- 校验触发时机是否需要从 `change` 调整为 `blur` 或手动触发。
- 错误信息是否仍出现在字段附近。
- 禁用态、只读态、清空按钮和前后缀插槽是否完整迁移。

## 发布策略

推荐使用灰度迁移：

- 每次只迁移一个业务域或一组组件。
- 为迁移模块建立视觉截图或 Playwright smoke。
- 在 Storybook、docs playground 或内部页面中保留对照示例。
- 遇到 API 缺口时优先通过业务封装适配，再评估是否向 YH-UI 提交能力。

## 验收清单

- `pnpm typecheck` 通过。
- `pnpm lint` 通过。
- 关键页面 SSR 或 Nuxt 预览通过。
- 表单提交、弹层关闭、消息通知、路由切换、暗色模式均已验证。
- 迁移模块不再依赖旧组件库样式。

## 相关文档

- [快速开始](/guide/quickstart)
- [主题定制](/guide/theming)
- [最佳实践](/guide/best-practices)
