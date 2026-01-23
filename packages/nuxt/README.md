# @yh-ui/nuxt

YH-UI 的 Nuxt 模块，提供开箱即用的 SSR 支持和组件自动导入。

## 特性

✅ **完整的 SSR 支持** - 解决了 Hydration Mismatch 问题  
✅ **组件自动导入** - 无需手动注册组件  
✅ **Composables 自动导入** - 直接使用 `useNamespace`、`useId` 等  
✅ **样式自动注入** - 自动加载主题样式  
✅ **TypeScript 支持** - 完整的类型提示  
✅ **Nuxt 3 & 4 兼容** - 支持最新的 Nuxt 4.x

## 安装

```bash
pnpm add @yh-ui/nuxt
```

## 快速开始

### 1. 注册模块

在 `nuxt.config.ts` 中添加模块：

```typescript
export default defineNuxtConfig({
  modules: [
    '@yh-ui/nuxt'
  ],
  
  // 可选配置
  yhUI: {
    importStyle: true  // 是否自动导入样式，默认为 true
  }
})
```

### 2. 直接使用组件

组件会自动导入，无需手动注册：

```vue
<template>
  <div>
    <YhButton type="primary">Click Me</YhButton>
    <YhInput v-model="value" placeholder="Enter text" />
  </div>
</template>

<script setup>
const value = ref('')
</script>
```

### 3. 使用 Composables

Hooks 也会自动导入：

```vue
<script setup>
// 直接使用，无需导入
const ns = useNamespace('my-component')
const id = useId()
const { nextZIndex } = useZIndex()
</script>
```

### 4. 使用全局方法

```vue
<script setup>
// Message 和 Notification 自动导入
const showMessage = () => {
  YhMessage.success('操作成功！')
}

const showNotification = () => {
  YhNotification({
    title: '提示',
    message: '这是一条通知消息'
  })
}
</script>
```

## SSR 注意事项

本模块已经处理了以下 SSR 相关问题：

1. **ID 生成** - 使用 Vue 3.5 原生 `useId()`，确保服务端和客户端生成的 ID 一致
2. **Z-Index 管理** - 通过 provide/inject 为每个请求提供独立的计数器
3. **DOM 访问** - 所有 DOM 操作都已经用 `isClient` 保护

## 自动导入的组件

以下组件可以直接使用，无需导入：

- `YhButton`
- `YhInput` / `YhInputNumber` / `YhInputTag`
- `YhCheckbox` / `YhCheckboxGroup`
- `YhRadio` / `YhRadioGroup` / `YhRadioButton`
- `YhSelect` / `YhOption`
- `YhCascader` / `YhCascaderPanel`
- `YhSwitch` / `YhRate` / `YhSlider`
- `YhTimeSelect` / `YhTransfer` / `YhTreeSelect`
- `YhForm` / `YhFormItem` / `YhFormSchema`
- `YhRow` / `YhCol`
- `YhCard` / `YhBadge` / `YhDivider` / `YhTag`
- `YhIcon`
- `YhConfigProvider`

## 自动导入的 Composables

- `useNamespace` - BEM 类名生成
- `useId` - 唯一 ID 生成
- `useZIndex` - Z-Index 管理
- `useLocale` - 国际化
- `useFormItem` - 表单项集成
- `useGlobalNamespace` - 全局命名空间

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `importStyle` | `boolean` | `true` | 是否自动导入样式文件 |

## 兼容性

- Nuxt: `^3.0.0` 或 `^4.0.0-rc.1`
- Vue: `^3.5.0`
- Node.js: `>=18.0.0`

## 示例项目

查看 [playground](../../playground-nuxt) 目录获取完整示例。

## License

MIT
