# 在 Nuxt 中使用 YH-UI

本指南将帮助您在 Nuxt 3/4 项目中集成和使用 YH-UI 组件库。

## 安装

### 1. 安装依赖

```bash
pnpm add @yh-ui/nuxt

# 或使用 npm  
npm install @yh-ui/nuxt

# 或使用 yarn
yarn add @yh-ui/nuxt
```

### 2. 注册模块

在 `nuxt.config.ts` 中添加 `@yh-ui/nuxt` 模块：

```typescript
export default defineNuxtConfig({
  modules: [
    '@yh-ui/nuxt'
  ]
})
```

就这么简单！所有组件和 Composables 都会自动导入。

## 配置选项

您可以通过 `yhUI` 配置键来自定义模块行为：

```typescript
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  
  yhUI: {
    // 是否自动导入样式（默认: true）
    importStyle: true
  }
})
```

### 可用配置

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `importStyle` | `boolean` | `true` | 是否自动导入组件样式 |

## 自动导入

### 组件自动导入

所有 `Yh` 开头的组件都会自动导入，无需手动注册：

```vue
<template>
  <div>
    <!-- 直接使用，无需导入 -->
    <YhButton type="primary">点击我</YhButton>
    <YhInput v-model="value" placeholder="输入内容" />
    <YhSelect v-model="selected">
      <YhOption label="选项1" value="1" />
      <YhOption label="选项2" value="2" />
    </YhSelect>
  </div>
</template>

<script setup>
// 无需导入组件
const value = ref('')
const selected = ref('')
</script>
```

### Composables 自动导入

常用的 Hooks 也会自动导入：

```vue
<script setup>
// 直接使用，无需导入
const ns = useNamespace('my-component')
const id = useId()
const { nextZIndex } = useZIndex()

// 生成 BEM 类名
const className = computed(() => ns.b())  // 'yh-my-component'
const blockClass = computed(() => ns.b('header'))  // 'yh-my-component-header'
</script>
```

**可用的 Composables**:
- `useNamespace` - BEM 类名生成
- `useId` - 唯一 ID 生成
- `useZIndex` - z-index 管理
- `useLocale` - 国际化
- `useFormItem` - 表单项集成
- `useGlobalNamespace` - 全局命名空间

### 全局方法自动导入

Message 和 Notification 方法也会自动导入：

```vue
<script setup>
const showSuccess = () => {
  // 直接使用，无需导入
  YhMessage.success('操作成功！')
}

const showNotification = () => {
  YhNotification({
    title: '通知标题',
    message: '这是通知内容',
    type: 'success'
  })
}
</script>
```

## SSR 支持

YH-UI 完全支持 Server-Side Rendering (SSR)，所有组件都经过了 SSR 兼容性测试。

### SSR 安全性

#### ✅ 完全 SSR 安全的功能

- 所有基础组件渲染
- Props 和事件绑定
- 样式应用
- BEM 类名生成
- ID 生成（使用 Vue 3.5 原生 `useId`）
- z-index 管理（应用级隔离）

#### 🔒 客户端限制的功能

以下功能仅在客户端环境生效，SSR 阶段会被安全忽略：

- DOM 操作（如 `focus()`, `blur()`）
- 浏览器事件监听（如 `resize`, `scroll`）
- `window` 或 `document` 访问

### Hydration 一致性

YH-UI 确保服务端和客户端渲染的 HTML 结构完全一致，避免 Hydration Mismatch 错误。

#### 内部机制

1. **ID 生成**: 使用 Vue 3.5+ 原生 `useId()` API
2. **Z-Index 管理**: 每个 SSR 请求拥有独立的计数器
3. **DOM 访问保护**: 所有 DOM 操作都包裹在 `onMounted` 中

### 最佳实践

#### 1. 避免在 setup 中直接访问 DOM

```vue
<script setup>
// ❌ 错误：SSR 时 window 不存在
const width = window.innerWidth

// ✅ 正确：在 onMounted 中访问
const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

#### 2. 使用 isClient / isServer 检查

```vue
<script setup>
import { isClient } from '@yh-ui/utils'

// ✅ 正确：条件执行
if (isClient) {
  // 客户端专用逻辑
  console.log('Running in browser')
}
</script>
```

#### 3. 异步数据获取

```vue
<script setup>
// ✅ 推荐：使用 Nuxt 的数据获取方法
const { data } = await useFetch('/api/data')
</script>
```

## 完整示例

### 基础页面

```vue
<!-- pages/index.vue -->
<template>
  <div class="container">
    <h1>YH-UI + Nuxt 示例</h1>
    
    <!-- 表单 -->
    <YhForm :model="form" label-width="100px">
      <YhFormItem label="用户名">
        <YhInput v-model="form.username" placeholder="请输入用户名" />
      </YhFormItem>
      
      <YhFormItem label="密码">
        <YhInput
          v-model="form.password"
          type="password"
          show-password
          placeholder="请输入密码"
        />
      </YhFormItem>
      
      <YhFormItem label="类型">
        <YhSelect v-model="form.type" placeholder="请选择">
          <YhOption label="类型1" value="1" />
          <YhOption label="类型2" value="2" />
          <YhOption label="类型3" value="3" />
        </YhSelect>
      </YhFormItem>
      
      <YhFormItem>
        <YhButton type="primary" @click="handleSubmit">
          提交
        </YhButton>
        <YhButton @click="handleReset">
          重置
        </YhButton>
      </YhFormItem>
    </YhForm>
  </div>
</template>

<script setup lang="ts">
// 组件和方法都是自动导入的

const form = reactive({
  username: '',
  password: '',
  type: ''
})

const handleSubmit = () => {
  YhMessage.success('提交成功！')
}

const handleReset = () => {
  form.username = ''
  form.password = ''
  form.type = ''
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}
</style>
```

### 带数据获取的页面

```vue
<!-- pages/users.vue -->
<template>
  <div class="user-list">
    <YhCard v-for="user in users" :key="user.id" class="user-card">
      <template #header>
        <div class="card-header">
          <span>{{ user.name }}</span>
          <YhTag :type="user.status">{{ user.status }}</YhTag>
        </div>
      </template>
      
      <div class="user-info">
        <p>邮箱: {{ user.email }}</p>
        <p>电话: {{ user.phone }}</p>
      </div>
      
      <template #footer>
        <YhButton type="primary" size="small" @click="editUser(user)">
          编辑
        </YhButton>
        <YhButton type="danger" size="small" @click="deleteUser(user.id)">
          删除
        </YhButton>
      </template>
    </YhCard>
  </div>
</template>

<script setup lang="ts">
// 使用 Nuxt 的数据获取 (SSR 友好)
const { data: users } = await useFetch('/api/users')

const editUser = (user) => {
  YhNotification({
    title: '编辑用户',
    message: `正在编辑用户: ${user.name}`,
    type: 'info'
  })
}

const deleteUser = async (userid) => {
  try {
    await $fetch(`/api/users/${id}`, { method: 'DELETE' })
    YhMessage.success('删除成功')
  } catch (error) {
    YhMessage.error('删除失败')
  }
}
</script>

<style scoped>
.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

## 主题定制

### 全局配置

使用 `ConfigProvider` 组件进行全局配置：

```vue
<!-- app.vue -->
<template>
  <YhConfigProvider :theme="theme" :locale="locale" size="default">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </YhConfigProvider>
</template>

<script setup lang="ts">
const theme = ref({
  primaryColor: '#6366f1',
  borderRadius: '8px'
})

const locale = ref('zh-CN')
</script>
```

### CSS 变量覆盖

在全局样式中覆盖 CSS 变量：

```css
/* assets/css/main.css */
:root {
  /* 主色调 */
  --yh-color-primary: #6366f1;
  --yh-color-success: #10b981;
  --yh-color-warning: #f59e0b;
  --yh-color-danger: #ef4444;
  
  /* 圆角 */
  --yh-border-radius-base: 8px;
  
  /* 字体 */
  --yh-font-family: 'Inter', sans-serif;
}
```

## 性能优化

### Tree Shaking

YH-UI 支持 Tree Shaking，未使用的组件不会被打包：

```vue
<template>
  <!-- 只使用 Button，其他组件不会被打包 -->
  <YhButton>Click Me</YhButton>
</template>
```

### 按需加载

对于大型组件（如 Table、Transfer），考虑在需要时动态导入：

```vue
<script setup>
// 动态导入（虽然组件已自动导入，但可以用于代码分割）
const showTree = ref(false)

const loadTreeSelect = async () => {
  showTree.value = true
}
</script>

<template>
  <div>
    <YhButton @click="loadTreeSelect">加载树选择器</YhButton>
    <YhTreeSelect v-if="showTree" v-model="value" :data="treeData" />
  </div>
</template>
```

## 类型支持

YH-UI 提供完整的 TypeScript 类型定义，享受类型提示和自动完成：

```vue
<script setup lang="ts">
import type { FormInstance } from '@yh-ui/components'

const formRef = ref<FormInstance>()

const validate = async () => {
  try {
    await formRef.value?.validate()
    // 验证通过
  } catch (error) {
    // 验证失败
  }
}
</script>

<template>
  <YhForm ref="formRef" :model="form">
    <!-- ... -->
  </YhForm>
</template>
```

## 常见问题

### 1. 组件未自动导入？

确保已正确安装并注册 `@yh-ui/nuxt` 模块：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']  // 确保此行存在
})
```

### 2. 样式未加载？

检查配置中是否启用了样式导入：

```typescript
export default defineNuxtConfig({
  yhUI: {
    importStyle: true  // 确保为 true
  }
})
```

### 3. Hydration Mismatch 错误？

这通常是由于在 `setup` 中直接访问 `window` 或 `document` 导致的。请使用 `onMounted`:

```vue
<script setup>
// ❌ 错误
const width = ref(window.innerWidth)

// ✅ 正确
const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

### 4. 如何禁用某个组件的自动导入？

目前所有组件都会自动导入。如果需要精细控制，可以手动导入：

```vue
<script setup>
import { YhButton } from '@yh-ui/components'
// 显式导入会覆盖自动导入
</script>
```

## 获取帮助

- [GitHub Issues](https://github.com/1079161148/yh-ui/issues)
- [文档](https://yh-ui.example.com)
- [更新日志](https://github.com/1079161148/yh-ui/blob/main/CHANGELOG.md)

## 相关链接

- [Nuxt 官方文档](https://nuxtjs.org.cn)
- [Vue 3 文档](https://cn.vuejs.org)
- [YH-UI 组件文档](/)
