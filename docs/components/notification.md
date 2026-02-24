# Notification 通知

<script setup lang="ts">
import { YhNotification } from '@yh-ui/components/notification'

const showBasic = () => {
  YhNotification({
    title: '标题',
    message: '这是一条通知消息'
  })
}

const showSuccess = () => {
  YhNotification.success('成功', '恭喜你，这是一条成功消息')
}

// Nuxt Demo
const onNuxtNotify = () => {
  YhNotification({ title: 'Nuxt', message: '自动导入已就绪' })
}
const onNuxtSuccess = () => {
  YhNotification.success('SSR', '环境自适应已完成')
}

const showWarning = () => {
  YhNotification.warning('警告', '这是一条警告消息')
}

const showInfo = () => {
  YhNotification.info('消息', '这是一条消息提示')
}

const showError = () => {
  YhNotification.error('错误', '这是一条错误消息')
}

const showTopRight = () => {
  YhNotification({
    title: '右上角',
    message: '这是一条通知消息',
    position: 'top-right'
  })
}

const showTopLeft = () => {
  YhNotification({
    title: '左上角',
    message: '这是一条通知消息',
    position: 'top-left'
  })
}

const showBottomRight = () => {
  YhNotification({
    title: '右下角',
    message: '这是一条通知消息',
    position: 'bottom-right'
  })
}

const showBottomLeft = () => {
  YhNotification({
    title: '左下角',
    message: '这是一条通知消息',
    position: 'bottom-left'
  })
}

const showNoAutoClose = () => {
  YhNotification({
    title: '不自动关闭',
    message: '这条通知不会自动关闭',
    duration: 0
  })
}

const showHtml = () => {
  YhNotification({
    title: 'HTML 内容',
    message: '<strong>这是 <i>HTML</i> 内容</strong>',
    dangerouslyUseHTMLString: true
  })
}

const showHideClose = () => {
  YhNotification({
    title: '隐藏关闭按钮',
    message: '这条通知没有关闭按钮',
    showClose: false
  })
}

const showTopCenter = () => {
  YhNotification({
    title: '顶部居中',
    message: '这是一条通知消息',
    position: 'top-center'
  })
}

const showBottomCenter = () => {
  YhNotification({
    title: '底部居中',
    message: '这是一条通知消息',
    position: 'bottom-center'
  })
}

const showMaxLimit = () => {
  YhNotification({
    title: '限制数量',
    message: '最多显示 3 个通知',
    position: 'top-right',
    max: 3
  })
}

// 引入 h 函数用于创建 VNode
import { h, ref } from 'vue'
import { YhSwitch } from '@yh-ui/components/switch'

// VNode 作为 message
const showVNodeMessage = () => {
  YhNotification({
    title: 'Use Vnode',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}

// 函数形式的 message（动态 props）
const checked = ref(false)
const showDynamicMessage = () => {
  YhNotification({
    title: 'Use Vnode',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(YhSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean) => {
          checked.value = val
        }
      }),
    duration: 0
  })
}

const toJs = (code: string) => code
  .replace(/setup lang="ts"/g, 'setup')
  .replace(/lang="ts"/g, '')
  .replace(/:\s*[A-Z][a-zA-Z<>| | \[]+/g, '')
  .replace(/<[A-Z][a-zA-Z<>| ]+>/g, '')
  .replace(/as\s+[A-Z][a-zA-Z<>| ]+/g, '')

// 代码示例
const tsBasic = `<template>
  <yh-button @click="showNotification">显示通知</yh-button>
</template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showNotification = () => {
  YhNotification({
    title: '标题',
    message: '这是一条通知消息'
  })
}
<\/script>`

const jsBasic = toJs(tsBasic)

const tsTypes = `<template>
  <yh-button type="success" @click="showSuccess">Success</yh-button>
  <yh-button type="warning" @click="showWarning">Warning</yh-button>
  <yh-button type="info" @click="showInfo">Info</yh-button>
  <yh-button type="danger" @click="showError">Error</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showSuccess = () => {
  YhNotification.success('成功', '恭喜你，这是一条成功消息')
}

const showWarning = () => {
  YhNotification.warning('警告', '这是一条警告消息')
}

const showInfo = () => {
  YhNotification.info('消息', '这是一条消息提示')
}

const showError = () => {
  YhNotification.error('错误', '这是一条错误消息')
}
<\/script>`

const jsTypes = toJs(tsTypes)

const tsPosition = `<template>
  <yh-button @click="showTopLeft">左上</yh-button>
  <yh-button @click="showTopRight">右上</yh-button>
  <yh-button @click="showBottomLeft">左下</yh-button>
  <yh-button @click="showBottomRight">右下</yh-button>
  <yh-button @click="showBottomCenter">下</yh-button>
  <yh-button @click="showTopCenter">上</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showTopRight = () => {
  YhNotification({
    title: '右上角',
    message: '这是一条通知消息',
    position: 'top-right'
  })
}

const showTopLeft = () => {
  YhNotification({
    title: '左上角',
    message: '这是一条通知消息',
    position: 'top-left'
  })
}

const showTopCenter = () => {
  YhNotification({
    title: '顶部居中',
    message: '这是一条通知消息',
    position: 'top-center'
  })
}

const showBottomRight = () => {
  YhNotification({
    title: '右下角',
    message: '这是一条通知消息',
    position: 'bottom-right'
  })
}

const showBottomLeft = () => {
  YhNotification({
    title: '左下角',
    message: '这是一条通知消息',
    position: 'bottom-left'
  })
}

const showBottomCenter = () => {
  YhNotification({
    title: '底部居中',
    message: '这是一条通知消息',
    position: 'bottom-center'
  })
}
<\/script>`

const jsPosition = toJs(tsPosition)

const tsDuration = `<template>
  <yh-button @click="showNotification">不自动关闭</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showNotification = () => {
  YhNotification({
    title: '不自动关闭',
    message: '这条通知不会自动关闭',
    duration: 0 // 设为 0 不自动关闭
  })
}
<\/script>`

const jsDuration = toJs(tsDuration)

const tsHtml = `<template>
  <yh-button @click="showHtml">使用 HTML 片段</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showHtml = () => {
  YhNotification({
    title: 'HTML 内容',
    message: '<strong>这是 <i>HTML</i> 内容</strong>',
    dangerouslyUseHTMLString: true
  })
}
<\/script>`

const jsHtml = toJs(tsHtml)

const tsHideClose = `<template>
  <yh-button @click="showNotification">隐藏关闭按钮</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showNotification = () => {
  YhNotification({
    title: '隐藏关闭按钮',
    message: '这条通知没有关闭按钮',
    showClose: false
  })
}
<\/script>`

const jsHideClose = toJs(tsHideClose)

const tsMaxLimit = `<template>
  <yh-button type="success" @click="showMaxLimit">最多允许 3 个通知</yh-button>
<\/template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showMaxLimit = () => {
  YhNotification({
    title: '限制数量',
    message: '最多显示 3 个通知',
    position: 'top-right',
    max: 3
  })
}
<\/script>`

const jsMaxLimit = toJs(tsMaxLimit)

const tsVNodeMessage = `<template>
  <yh-button @click="open">Common VNode</yh-button>
  <yh-button @click="open1">Dynamic props</yh-button>
<\/template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { YhNotification } from '@yh-ui/yh-ui'
import { YhSwitch } from '@yh-ui/yh-ui'

const open = () => {
  YhNotification({
    title: 'Use Vnode',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

const open1 = () => {
  const checked = ref<boolean | string | number>(false)
  YhNotification({
    title: 'Use Vnode',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(YhSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean | string | number) => {
          checked.value = val
        },
      }),
    duration: 0
  })
}
<\/script>`

const jsVNodeMessage = toJs(tsVNodeMessage)

// Nuxt 使用示例
// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; gap: 12px;">
    <!-- 在 Nuxt 中直接调用即可，组件自动导入 -->
    <yh-button @click="onNotify">基础通知</yh-button>
    
    <yh-button type="success" @click="onSuccess">成功通知</yh-button>
  </div>
</template>

<script setup lang="ts">
// 在 Nuxt 中 YhNotification 会被自动导入
const onNotify = () => {
  YhNotification({ 
    title: 'Nuxt', 
    message: '自动导入已就绪' 
  })
}

const onSuccess = () => {
  YhNotification.success('SSR', '环境自适应已完成')
}
<\/script>`

const jsNuxt = toJs(tsNuxt)
</script>

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

通知组件适合用于系统级通知的被动提醒。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-button @click="showBasic">显示通知</yh-button>
</DemoBlock>

## 不同状态

用来显示「成功、警告、消息、错误」类的系统通知。

<DemoBlock title="不同状态" :ts-code="tsTypes" :js-code="jsTypes">
  <div class="yh-demo-flex">
    <yh-button type="success" @click="showSuccess">Success</yh-button>
    <yh-button type="warning" @click="showWarning">Warning</yh-button>
    <yh-button type="info" @click="showInfo">Info</yh-button>
    <yh-button type="danger" @click="showError">Error</yh-button>
  </div>
</DemoBlock>

## 自定义弹出位置

使用 `position` 属性可以设置通知弹出的位置。

<DemoBlock title="自定义弹出位置" :ts-code="tsPosition" :js-code="jsPosition">
  <div class="yh-demo-flex">
    <yh-button @click="showTopLeft">左上</yh-button>
    <yh-button @click="showTopRight">右上</yh-button>
    <yh-button @click="showBottomLeft">左下</yh-button>
    <yh-button @click="showBottomRight">右下</yh-button>
    <yh-button @click="showBottomCenter">下</yh-button>
    <yh-button @click="showTopCenter">上</yh-button>
  </div>
</DemoBlock>

## 自定义时长

设置 `duration` 属性为 0 可以让通知不自动关闭。

<DemoBlock title="自定义时长" :ts-code="tsDuration" :js-code="jsDuration">
  <yh-button @click="showNoAutoClose">不自动关闭</yh-button>
</DemoBlock>

## 使用 HTML 片段

设置 `dangerouslyUseHTMLString` 为 true 可以使 message 属性被当作 HTML 片段处理。

::: warning 警告
`message` 属性虽然支持传入 HTML 片段，但是动态渲染任意 HTML 是非常危险的。请确保 message 的内容是可信的，**永远不要**将用户提交的内容赋值给 message 属性。
:::

<DemoBlock title="使用 HTML 片段" :ts-code="tsHtml" :js-code="jsHtml">
  <yh-button @click="showHtml">使用 HTML 片段</yh-button>
</DemoBlock>

## 隐藏关闭按钮

设置 `showClose` 为 false 可以隐藏关闭按钮。

<DemoBlock title="隐藏关闭按钮" :ts-code="tsHideClose" :js-code="jsHideClose">
  <yh-button @click="showHideClose">隐藏关闭按钮</yh-button>
</DemoBlock>

## 限制数量

使用 `max` 属性可以限制同一位置最多显示的通知数量。当超过限制时，会自动关闭最早的通知。

<DemoBlock title="限制数量" :ts-code="tsMaxLimit" :js-code="jsMaxLimit">
  <yh-button type="success" @click="showMaxLimit">最多允许 3 个通知</yh-button>
</DemoBlock>

## 函数形式的 message <Badge type="tip" text="2.8.0" />

`message` 可以是 VNode，支持返回值为 VNode 的函数。

::: warning 警告
`message` 属性虽然支持传入 HTML 片段，但是动态渲染任意 HTML 是非常危险的，因为很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
:::

<DemoBlock title="函数形式的 message" :ts-code="tsVNodeMessage" :js-code="jsVNodeMessage">
  <div class="yh-demo-flex">
    <yh-button @click="showVNodeMessage">Common VNode</yh-button>
    <yh-button @click="showDynamicMessage">Dynamic props</yh-button>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Notification 组件与 Nuxt 3/4 深度集成。作为指令式组件，它会自动识别服务端/客户端环境，确保通知弹窗仅在客户端浏览器中执行，避免 SSR 阶段的报错。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="onNuxtNotify">基础通知</yh-button>
    <yh-button type="success" @click="onNuxtSuccess">成功通知</yh-button>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ **安全环境识别**：函数内部已封装环境检测，在 Nuxt 的 `setup` 或生命周期中调用是安全的
- ✅ **自动导入**：在 Nuxt 项目中，`YhNotification` 函数会被自动扫描并导入，无需额外手动 `import`
- ✅ **样式预加载**：组件样式会随 Nuxt 页面渲染自动注入，确保弹出时的视觉效果符合预期
- ⚠️ **服务端限制**：在 `useAsyncData` 或服务端 Middleware 中调用此函数不会有任何视觉输出（因为没有 DOM）
- 💡 **全局方法**：Nuxt 插件会自动将 `$notify` 挂载到全局，你也可以在选项式组件中通过 `this.$notify` 调用

::: tip 错误日志集成
结合 Nuxt 的 `app:error` 钩子，你可以使用 `YhNotification.error` 来捕获并展示全局未处理的运行时错误。
:::

## 调用方式

YhNotification 支持多种调用方式，可以根据项目需求选择合适的方式。

### 组合式 API（推荐）

在 `<script setup>` 中直接导入使用：

```vue
<template>
  <yh-button @click="showNotification">显示通知</yh-button>
</template>

<script setup lang="ts">
import { YhNotification } from '@yh-ui/yh-ui'

const showNotification = () => {
  YhNotification.success('成功', '这是一条成功消息')
}
</script>
```

### 选项式 API

YH-UI 为 `app.config.globalProperties` 添加了全局方法 `$notify`，在选项式 API 中可以使用 `this.$notify` 调用：

```vue
<template>
  <yh-button @click="showNotification">显示通知</yh-button>
</template>

<script>
export default {
  methods: {
    showNotification() {
      this.$notify.success('成功', '操作成功！')
    }
  }
}
</script>
```

### 单独引用

```typescript
import { YhNotification } from '@yh-ui/yh-ui'
```

## API

### 方法

| 方法名                    | 说明         | 参数                          |
| ------------------------- | ------------ | ----------------------------- |
| `YhNotification`          | 显示通知     | `options`                     |
| `YhNotification.success`  | 显示成功通知 | `(title, message \| options)` |
| `YhNotification.warning`  | 显示警告通知 | `(title, message \| options)` |
| `YhNotification.info`     | 显示信息通知 | `(title, message \| options)` |
| `YhNotification.error`    | 显示错误通知 | `(title, message \| options)` |
| `YhNotification.closeAll` | 关闭所有通知 | —                             |

### Props

| 属性名                     | 说明                                | 类型                                                                                              | 默认值        |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `title`                    | 标题                                | `string`                                                                                          | —             |
| `message`                  | 通知内容                            | `string \| VNode \| (() => VNode)`                                                                | —             |
| `type`                     | 通知类型                            | `'success' \| 'warning' \| 'info' \| 'error'`                                                     | —             |
| `icon`                     | 自定义图标                          | `string \| VNode`                                                                                 | —             |
| `showClose`                | 是否显示关闭按钮                    | `boolean`                                                                                         | `true`        |
| `duration`                 | 显示时间（毫秒），设为 0 不自动关闭 | `number`                                                                                          | `4500`        |
| `offset`                   | 距离窗口边缘的偏移量（px）          | `number`                                                                                          | `16`          |
| `position`                 | 弹出位置                            | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` |
| `dangerouslyUseHTMLString` | 是否将 message 作为 HTML 片段处理   | `boolean`                                                                                         | `false`       |
| `onClose`                  | 关闭时的回调函数                    | `() => void`                                                                                      | —             |
| `onClick`                  | 点击通知时的回调函数                | `() => void`                                                                                      | —             |
| `zIndex`                   | z-index 层级                        | `number`                                                                                          | —             |
| `customClass`              | 自定义类名                          | `string`                                                                                          | —             |
| `max`                      | 同一位置最多显示的通知数量          | `number`                                                                                          | —             |

### 返回值

调用 `YhNotification` 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。

| 方法    | 说明                  |
| ------- | --------------------- |
| `close` | 关闭当前 Notification |

```typescript
const handler = YhNotification.success('成功', '消息内容')

// 手动关闭
handler.close()
```

### Slots

| 插槽名    | 说明           |
| --------- | -------------- |
| `default` | 自定义内容区域 |
| `icon`    | 自定义图标区域 |

### Expose

| 名称      | 说明         | 类型           |
| --------- | ------------ | -------------- |
| `visible` | 通知可见状态 | `Ref<boolean>` |
| `close`   | 关闭当前通知 | `() => void`   |

### 主题变量

Notification 组件使用以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

| 变量名                                | 说明             | 默认值                           |
| ------------------------------------- | ---------------- | -------------------------------- |
| `--yh-notification-bg-color`          | 背景颜色         | `var(--yh-color-bg-elevated)`    |
| `--yh-notification-border-color`      | 边框颜色         | `var(--yh-border-color-light)`   |
| `--yh-notification-shadow`            | 阴影             | `var(--yh-box-shadow-small)`     |
| `--yh-notification-title-color`       | 标题颜色         | `var(--yh-color-text-primary)`   |
| `--yh-notification-text-color`        | 内容文字颜色     | `var(--yh-color-text-secondary)` |
| `--yh-notification-close-color`       | 关闭按钮颜色     | `var(--yh-color-text-secondary)` |
| `--yh-notification-close-hover-color` | 关闭按钮悬浮颜色 | `var(--yh-color-text-primary)`   |
| `--yh-notification-icon-size`         | 图标大小         | `24px`                           |
| `--yh-notification-width`             | 通知宽度         | `330px`                          |
| `--yh-notification-padding`           | 内边距           | `20px`                           |
| `--yh-notification-radius`            | 圆角大小         | `var(--yh-border-radius-base)`   |
