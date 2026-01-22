# Message 消息提示

<script setup lang="ts">
import { YhMessage } from '@yh-ui/components/message'

const showMessage = () => {
  YhMessage('这是一条消息提示')
}

const showSuccess = () => {
  YhMessage.success('恭喜你，这是一条成功消息')
}

const showWarning = () => {
  YhMessage.warning('警告哦，这是一条警告消息')
}

const showInfo = () => {
  YhMessage.info('这是一条消息提示')
}

const showError = () => {
  YhMessage.error('错了哦，这是一条错误消息')
}

const showClosable = () => {
  YhMessage({
    message: '这是一条可关闭的消息',
    showClose: true,
    duration: 0
  })
}

const showCenter = () => {
  YhMessage({
    message: '居中的文字',
    center: true
  })
}

const showHtml = () => {
  YhMessage({
    message: '<strong>这是 <i>HTML</i> 消息</strong>',
    dangerouslyUseHTMLString: true
  })
}

const showGrouping = () => {
  YhMessage({
    message: '这是一条相同内容的消息',
    grouping: true,
    type: 'success'
  })
}

const showPlacement = (placement: any) => {
  YhMessage({
    message: '这是一条位置在 ' + placement + ' 的消息',
    placement
  })
}

// 代码示例
const tsBasic = `<template>
  <yh-button @click="showMessage">显示消息</yh-button>
<\/template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showMessage = () => {
  YhMessage('这是一条消息提示')
}
<\/script>`

const jsBasic = `<template>
  <yh-button @click="showMessage">显示消息</yh-button>
<\/template>

<script setup>
import { YhMessage } from 'yh-ui'

const showMessage = () => {
  YhMessage('这是一条消息提示')
}
<\/script>`

const tsTypes = `<template>
  <yh-button type="success" @click="showSuccess">Success</yh-button>
  <yh-button type="warning" @click="showWarning">Warning</yh-button>
  <yh-button type="info" @click="showInfo">Info</yh-button>
  <yh-button type="danger" @click="showError">Error</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showSuccess = () => {
  YhMessage.success('恭喜你，这是一条成功消息')
}

const showWarning = () => {
  YhMessage.warning('警告哦，这是一条警告消息')
}

const showInfo = () => {
  YhMessage.info('这是一条消息提示')
}

const showError = () => {
  YhMessage.error('错了哦，这是一条错误消息')
}
<\/script>`

const jsTypes = `<template>
  <yh-button type="success" @click="showSuccess">Success</yh-button>
  <yh-button type="warning" @click="showWarning">Warning</yh-button>
  <yh-button type="info" @click="showInfo">Info</yh-button>
  <yh-button type="danger" @click="showError">Error</yh-button>
</template>

<script setup>
import { YhMessage } from 'yh-ui'

const showSuccess = () => {
  YhMessage.success('恭喜你，这是一条成功消息')
}

const showWarning = () => {
  YhMessage.warning('警告哦，这是一条警告消息')
}

const showInfo = () => {
  YhMessage.info('这是一条消息提示')
}

const showError = () => {
  YhMessage.error('错了哦，这是一条错误消息')
}
<\/script>`

const tsClosable = `<template>
  <yh-button @click="showClosable">可关闭的消息</yh-button>
<\/template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showClosable = () => {
  YhMessage({
    message: '这是一条可关闭的消息',
    showClose: true,
    duration: 0 // 设为 0 不自动关闭
  })
}
<\/script>`

const jsClosable = `<template>
  <yh-button @click="showClosable">可关闭的消息</yh-button>
<\/template>

<script setup>
import { YhMessage } from 'yh-ui'

const showClosable = () => {
  YhMessage({
    message: '这是一条可关闭的消息',
    showClose: true,
    duration: 0
  })
}
<\/script>`

const tsCenter = `<template>
  <yh-button @click="showCenter">居中消息</yh-button>
<\/template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showCenter = () => {
  YhMessage({
    message: '居中的文字',
    center: true
  })
}
<\/script>`

const jsCenter = `<template>
  <yh-button @click="showCenter">居中消息</yh-button>
<\/template>

<script setup>
import { YhMessage } from 'yh-ui'

const showCenter = () => {
  YhMessage({
    message: '居中的文字',
    center: true
  })
}
<\/script>`

const tsHtml = `<template>
  <yh-button @click="showHtml">使用 HTML 片段</yh-button>
<\/template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showHtml = () => {
  YhMessage({
    message: '<strong>这是 <i>HTML</i> 消息</strong>',
    dangerouslyUseHTMLString: true
  })
}
<\/script>`

const jsHtml = `<template>
  <yh-button @click="showHtml">使用 HTML 片段</yh-button>
<\/template>

<script setup>
import { YhMessage } from 'yh-ui'

const showHtml = () => {
  YhMessage({
    message: '<strong>这是 <i>HTML</i> 消息</strong>',
    dangerouslyUseHTMLString: true
  })
}
<\/script>`

const tsCloseAll = `<template>
  <yh-button @click="showMultiple">显示多条消息</yh-button>
  <yh-button @click="closeAll">关闭所有</yh-button>
<\/template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showMultiple = () => {
  YhMessage.success('消息一')
  YhMessage.warning('消息二')
  YhMessage.error('消息三')
}

const closeAll = () => {
  YhMessage.closeAll()
}
<\/script>`

const jsCloseAll = `<template>
  <yh-button @click="showMultiple">显示多条消息</yh-button>
  <yh-button @click="closeAll">关闭所有</yh-button>
<\/template>

<script setup>
import { YhMessage } from 'yh-ui'

const showMultiple = () => {
  YhMessage.success('消息一')
  YhMessage.warning('消息二')
  YhMessage.error('消息三')
}

const closeAll = () => {
  YhMessage.closeAll()
}
<\/script>`
const tsGrouping = `<template>
  <yh-button @click="showGrouping">分组消息合并</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showGrouping = () => {
  YhMessage({
    message: '这是一条相同内容的消息',
    grouping: true,
    type: 'success'
  })
}
<\/script>`

const jsGrouping = tsGrouping.replace('lang="ts"', '')

const tsPlacement = `<template>
  <yh-button @click="showPlacement('top')">Top</yh-button>
  <yh-button @click="showPlacement('top-left')">Top Left</yh-button>
  <yh-button @click="showPlacement('top-right')">Top Right</yh-button>
  <yh-button @click="showPlacement('bottom')">Bottom</yh-button>
  <yh-button @click="showPlacement('bottom-left')">Bottom Left</yh-button>
  <yh-button @click="showPlacement('bottom-right')">Bottom Right</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'
import type { MessagePlacement } from 'yh-ui'

const showPlacement = (placement: MessagePlacement) => {
  YhMessage({
    message: '这是一条位置在 ' + placement + ' 的消息',
    placement
  })
}
<\/script>`

const jsPlacement = `<template>
  <yh-button @click="showPlacement('top')">Top</yh-button>
  <yh-button @click="showPlacement('top-left')">Top Left</yh-button>
  <yh-button @click="showPlacement('top-right')">Top Right</yh-button>
  <yh-button @click="showPlacement('bottom')">Bottom</yh-button>
  <yh-button @click="showPlacement('bottom-left')">Bottom Left</yh-button>
  <yh-button @click="showPlacement('bottom-right')">Bottom Right</yh-button>
</template>

<script setup>
import { YhMessage } from 'yh-ui'

const showPlacement = (placement) => {
  YhMessage({
    message: '这是一条位置在 ' + placement + ' 的消息',
    placement
  })
}
<\/script>`
</script>

用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-button @click="showMessage">显示消息</yh-button>
</DemoBlock>

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

<DemoBlock title="不同状态" :ts-code="tsTypes" :js-code="jsTypes">
  <div style="display: flex; gap: 12px;">
    <yh-button type="success" @click="showSuccess">Success</yh-button>
    <yh-button type="warning" @click="showWarning">Warning</yh-button>
    <yh-button type="info" @click="showInfo">Info</yh-button>
    <yh-button type="danger" @click="showError">Error</yh-button>
  </div>
</DemoBlock>

## 可关闭

可以添加关闭按钮。默认的 Message 是不可以被人工关闭的，如果需要可手动关闭的 Message，可以使用 `showClose` 属性。同时，设置 `duration` 为 0 可以使消息不自动关闭。

<DemoBlock title="可关闭" :ts-code="tsClosable" :js-code="jsClosable">
  <yh-button @click="showClosable">可关闭的消息</yh-button>
</DemoBlock>

## 文字居中

使用 `center` 属性让文字水平居中。

<DemoBlock title="文字居中" :ts-code="tsCenter" :js-code="jsCenter">
  <yh-button @click="showCenter">居中消息</yh-button>
</DemoBlock>

## 使用 HTML 片段

设置 `dangerouslyUseHTMLString` 为 true 可以使 message 属性被当作 HTML 片段处理。

::: warning 警告
`message` 属性虽然支持传入 HTML 片段，但是动态渲染任意 HTML 是非常危险的。请确保 message 的内容是可信的，**永远不要**将用户提交的内容赋值给 message 属性。
:::

<DemoBlock title="使用 HTML 片段" :ts-code="tsHtml" :js-code="jsHtml">
  <yh-button @click="showHtml">使用 HTML 片段</yh-button>
</DemoBlock>

## 分组合并

设置 `grouping` 为 true，内容相同的 `message` 将被合并。

<DemoBlock title="分组合并" :ts-code="tsGrouping" :js-code="jsGrouping">
  <yh-button @click="showGrouping">分组消息合并</yh-button>
</DemoBlock>

## 展示位置

设置 `placement` 属性可以控制消息出现的位置。

<DemoBlock title="展示位置" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button @click="showPlacement('top')">Top</yh-button>
    <yh-button @click="showPlacement('top-left')">Top Left</yh-button>
    <yh-button @click="showPlacement('top-right')">Top Right</yh-button>
    <yh-button @click="showPlacement('bottom')">Bottom</yh-button>
    <yh-button @click="showPlacement('bottom-left')">Bottom Left</yh-button>
    <yh-button @click="showPlacement('bottom-right')">Bottom Right</yh-button>
  </div>
</DemoBlock>

## 调用方式

YhMessage 支持多种调用方式，可以根据项目需求选择合适的方式。

### 组合式 API（推荐）

在 `<script setup>` 中直接导入使用：

```vue
<template>
  <yh-button @click="showMessage">显示消息</yh-button>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const showMessage = () => {
  YhMessage.success('这是一条成功消息')
}
</script>
```

### 选项式 API

YH-UI 为 `app.config.globalProperties` 添加了全局方法 `$message`，在选项式 API 中可以使用 `this.$message` 调用：

```vue
<template>
  <yh-button @click="showMessage">显示消息</yh-button>
</template>

<script>
export default {
  methods: {
    showMessage() {
      this.$message.success('这是一条成功消息')
    }
  }
}
</script>
```

### 单独引用

```typescript
import { YhMessage } from 'yh-ui'
```

## API

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| YhMessage | 显示消息 | `options \| string` |
| YhMessage.success | 显示成功消息 | `options \| string` |
| YhMessage.warning | 显示警告消息 | `options \| string` |
| YhMessage.info | 显示信息消息 | `options \| string` |
| YhMessage.error | 显示错误消息 | `options \| string` |
| YhMessage.closeAll | 关闭所有消息 | — |

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息内容 | `string \| VNode` | — |
| type | 消息类型 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
| icon | 自定义图标 | `string \| VNode` | — |
| show-close | 是否显示关闭按钮 | `boolean` | `false` |
| duration | 显示时间（毫秒），设为 0 不自动关闭 | `number` | `3000` |
| offset | 距离顶部的偏移量（px） | `number` | `64` |
| dangerously-use-html-string | 是否将 message 作为 HTML 片段处理 | `boolean` | `false` |
| center | 是否居中显示 | `boolean` | `false` |
| on-close | 关闭时的回调函数 | `() => void` | — |
| z-index | z-index 层级 | `number` | — |
| custom-class | 自定义类名 | `string` | — |
| grouping | 是否支持分组合并 | `boolean` | `false` |
| placement | 消息展示位置 | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 消息内容（当 message 属性不满足需求时使用） |
| icon | 自定义图标内容 |

### Expose

调用 `YhMessage` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| close | 关闭当前 Message | `() => void` |
| visible | 当前消息是否可见 | `Ref<boolean>` |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-message-bg-color` | 背景颜色 | `var(--yh-bg-color-overlay)` |
| `--yh-message-border-color` | 边框颜色 | `var(--yh-border-color-lighter)` |
| `--yh-message-shadow` | 消息框阴影 | `var(--yh-box-shadow-light)` |
| `--yh-message-text-color` | 文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-message-close-color` | 关闭按钮颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-message-close-hover-color` | 关闭按钮悬停颜色 | `var(--yh-text-color-regular)` |
