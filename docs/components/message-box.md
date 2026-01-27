<script setup lang="ts">
import { h, ref } from 'vue'
import { YhMessageBox } from '@yh-ui/components'

// --- 演示逻辑 (供页面交互使用) ---

const openAlert = () => {
  YhMessageBox.alert('这是一条基础的消息提示内容。', '系统提示')
}

const openConfirm = () => {
  YhMessageBox.confirm(
    '执行此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
}

const openPrompt = () => {
  YhMessageBox.prompt('请输入邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确',
  })
}

const openVNode = () => {
  YhMessageBox({
    title: '消息',
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

const openHTML = () => {
  YhMessageBox.alert(
    '<strong>这是 <i>HTML</i> 片段</strong>',
    'HTML 内容',
    {
      dangerouslyUseHTMLString: true,
    }
  )
}

const openCenter = () => {
  YhMessageBox.confirm(
    '此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
}

const openDraggable = () => {
  YhMessageBox.alert('内容可以自由拖拽', '提示', {
    draggable: true,
  })
}

const openBeforeClose = () => {
  YhMessageBox.confirm('提交请求大约需要 2 秒。', '异步拦截', {
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmLoading = true
        setTimeout(() => {
          done()
          instance.confirmLoading = false
        }, 2000)
      } else {
        done()
      }
    },
  })
}

const openNuxt = () => {
  YhMessageBox.alert('Nuxt 3 自动导入成功！', 'SSR 兼容')
}

const openSuccess = () => {
  YhMessageBox.confirm('订单已成功提交。', '成功', {
    confirmButtonText: '查看详情',
    iconType: 'success',
  })
}

const openWarning = () => {
  YhMessageBox.confirm('检测到异常登录，请确认是否为您本人操作。', '安全警告', {
    confirmButtonText: '是',
    cancelButtonText: '不是',
    iconType: 'warning',
  })
}

const openError = () => {
  YhMessageBox.alert('系统发生预期外的运行错误，请刷新重试。', '系统错误', {
    confirmButtonText: '联系客服',
    iconType: 'error',
  })
}

const openInfo = () => {
  YhMessageBox.alert('当前服务器正在进行例行维护。', '提示', {
    iconType: 'info',
  })
}

const openLoading = () => {
  YhMessageBox.confirm('提交操作可能需要较长时间。', '加载状态', {
    confirmButtonText: '立即提交',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmLoading = true
        // 模拟 API 请求
        setTimeout(() => {
          done()
          instance.confirmLoading = false
        }, 3000)
      } else {
        done()
      }
    }
  })
}

const openSetDefaults = () => {
  YhMessageBox.setDefaults({
    glass: true,
    center: true,
    confirmButtonText: '收到',
  })
  YhMessageBox.alert(
    '由于全局配置已更改，此弹窗已自动应用为 <span style="color: #00d2ff; font-weight: bold;">亚克力效果</span> 且文字 <span style="color: #00ff9d; font-weight: bold;">居中对齐</span>。', 
    '全局配置生效',
    { dangerouslyUseHTMLString: true }
  )
}

// --- 代码片段定义 (严格 1:1 对齐演示逻辑) ---

const tsAlert = `<template>
  <yh-button type="primary" @click="open">消息提示</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.alert('这是一条基础的消息提示内容。', '系统提示')
}
<\/script>`

const tsConfirm = `<template>
  <yh-button type="primary" @click="open">确认对话框</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.confirm(
    '执行此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
}
<\/script>`

const tsPrompt = `<template>
  <yh-button type="primary" @click="open">提交内容</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.prompt('请输入邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /[\\w!#$%&'*+/=?^_\`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_\`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/,
    inputErrorMessage: '邮箱格式不正确',
  })
}
<\/script>`

const tsVNode = `<template>
  <yh-button type="primary" @click="open">VNode 渲染</yh-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox({
    title: '消息',
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
<\/script>`

const tsHTML = `<template>
  <yh-button type="primary" @click="open">HTML 渲染</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.alert(
    '<strong>这是 <i>HTML</i> 片段</strong>',
    'HTML 内容',
    {
      dangerouslyUseHTMLString: true,
    }
  )
}
<\/script>`

const tsCenter = `<template>
  <yh-button type="primary" @click="open">居中布局</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.confirm(
    '此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
}
<\/script>`

const tsDraggable = `<template>
  <yh-button type="primary" @click="open">拖拽弹窗</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.alert('内容可以自由拖拽', '提示', {
    draggable: true,
  })
}
<\/script>`

const tsBeforeClose = `<template>
  <yh-button type="primary" @click="open">异步拦截</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.confirm('提交请求大约需要 2 秒。', '异步拦截', {
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmLoading = true
        setTimeout(() => {
          done()
          instance.confirmLoading = false
        }, 2000)
      } else {
        done()
      }
    },
  })
}
<\/script>`

const tsNuxt = `<template>
  <yh-button type="primary" @click="open">Nuxt 自动导入</yh-button>
</template>

<script setup lang="ts">
// 在 Nuxt 项目中，YhMessageBox 会被自动导入
const open = () => {
  YhMessageBox.alert('Nuxt 3 自动导入成功！', 'SSR 兼容')
}
<\/script>`

const tsSuccess = `<template>
  <yh-button type="success" @click="open">成功状态</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.confirm('订单已成功提交。', '成功', {
    confirmButtonText: '查看详情',
    iconType: 'success',
  })
}
<\/script>`

const tsWarning = `<template>
  <yh-button type="warning" @click="open">警告状态</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.confirm('检测到异常登录，请确认是否为您本人操作。', '安全警告', {
    confirmButtonText: '是',
    cancelButtonText: '不是',
    iconType: 'warning',
  })
}
<\/script>`

const tsError = `<template>
  <yh-button type="danger" @click="open">错误状态</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.alert('系统发生预期外的运行错误，请刷新重试。', '系统错误', {
    confirmButtonText: '联系客服',
    iconType: 'error',
  })
}
<\/script>`

const tsInfo = `<template>
  <yh-button type="primary" @click="open">信息状态</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.alert('当前服务器正在进行例行维护。', '提示', {
    iconType: 'info',
  })
}
<\/script>`

const tsSetDefaults = `<template>
  <yh-button type="primary" @click="open">应用全局亚克力配置</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  // 设置全局默认配置
  YhMessageBox.setDefaults({
    glass: true,
    center: true,
    confirmButtonText: '收到',
  })
  
  // 后续调用将自动应用上述配置
  YhMessageBox.alert(
    '由于全局配置已更改，此弹窗已自动应用为 <span style="color: #00d2ff; font-weight: bold;">亚克力效果</span> 且文字 <span style="color: #00ff9d; font-weight: bold;">居中对齐</span>。', 
    '全局配置生效',
    { dangerouslyUseHTMLString: true }
  )
}
<\/script>`

const tsLoading = `<template>
  <yh-button type="primary" @click="open">加载状态</yh-button>
</template>

<script setup lang="ts">
import { YhMessageBox } from 'yh-ui'

const open = () => {
  YhMessageBox.confirm('提交操作可能需要较长时间。', '加载状态', {
    confirmButtonText: '立即提交',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        // 开启确认按钮 loading
        instance.confirmLoading = true
        
        // 模拟 API 异步请求
        setTimeout(() => {
          done()
          // 逻辑完成后关闭 loading (或者在 done 内部处理)
          instance.confirmLoading = false
        }, 3000)
      } else {
        done()
      }
    }
  })
}
<\/script>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
</script>

# MessageBox 消息弹框

模拟系统原生体验的消息对话框，集成了 YH-UI 标志性的亚克力视觉语言、GPU 加速拖拽交互以及严谨的业务生命周期控制。

## 基础用法

提供了 `alert`、`confirm` 和 `prompt` 三种最常用的交互模式。

<DemoBlock title="消息提示" :ts-code="tsAlert" :js-code="toJs(tsAlert)">
  <yh-button type="primary" @click="openAlert">消息提示</yh-button>
</DemoBlock>

<DemoBlock title="确认对话框" :ts-code="tsConfirm" :js-code="toJs(tsConfirm)">
  <yh-button type="primary" @click="openConfirm">确认对话框</yh-button>
</DemoBlock>

<DemoBlock title="提交内容" :ts-code="tsPrompt" :js-code="toJs(tsPrompt)">
  <yh-button type="primary" @click="openPrompt">提交内容</yh-button>
</DemoBlock>

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

<DemoBlock title="成功状态" :ts-code="tsSuccess" :js-code="toJs(tsSuccess)">
  <yh-button type="success" @click="openSuccess">成功状态</yh-button>
</DemoBlock>

<DemoBlock title="警告状态" :ts-code="tsWarning" :js-code="toJs(tsWarning)">
  <yh-button type="warning" @click="openWarning">警告状态</yh-button>
</DemoBlock>

<DemoBlock title="错误状态" :ts-code="tsError" :js-code="toJs(tsError)">
  <yh-button type="danger" @click="openError">错误状态</yh-button>
</DemoBlock>

<DemoBlock title="信息状态" :ts-code="tsInfo" :js-code="toJs(tsInfo)">
  <yh-button type="primary" @click="openInfo">信息状态</yh-button>
</DemoBlock>

## 自定义内容

`message` 属性支持传入 HTML 字符串或 VNode。

<DemoBlock title="VNode 渲染" :ts-code="tsVNode" :js-code="toJs(tsVNode)">
  <yh-button type="primary" @click="openVNode">VNode 渲染</yh-button>
</DemoBlock>

<DemoBlock title="使用 HTML 片段" :ts-code="tsHTML" :js-code="toJs(tsHTML)">
  <yh-button type="primary" @click="openHTML">HTML 渲染</yh-button>
</DemoBlock>

::: warning 警告
`dangerouslyUseHTMLString` 属性虽然方便，但容易导致 XSS 攻击。请确保 message 的内容是可信的，**永远不要**将用户提交的内容赋值给 message 属性。
:::

## 视觉与布局

YH-UI 旗舰级特性，提供磨砂玻璃质感、拖拽定位以及全方位的中轴对齐。

<DemoBlock title="居中布局" :ts-code="tsCenter" :js-code="toJs(tsCenter)">
  <yh-button type="primary" @click="openCenter">居中布局</yh-button>
</DemoBlock>

<DemoBlock title="可拖拽" :ts-code="tsDraggable" :js-code="toJs(tsDraggable)">
  <yh-button type="primary" @click="openDraggable">拖拽弹窗</yh-button>
</DemoBlock>

## 异步关闭拦截

通过 `beforeClose` 钩子可以精准拦截退出动作。常用于处理异步接口逻辑，并由组件自动维护确认按钮的加载状态。

<DemoBlock title="异步拦截" :ts-code="tsBeforeClose" :js-code="toJs(tsBeforeClose)">
  <yh-button type="primary" @click="openBeforeClose">异步拦截</yh-button>
</DemoBlock>

## 加载状态

通过 `confirmButtonLoading` 属性或在 `beforeClose` 钩子中手动操作 `instance.confirmLoading = true`，可以直接在确认按钮上显示加载动画。组件会自动处理按钮的禁用逻辑。

<DemoBlock title="异步加载演示" :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <yh-button type="primary" @click="openLoading">加载状态</yh-button>
</DemoBlock>

## 全局默认配置

如果应用中大部分弹窗具有一致的视觉偏好（如全量开启亚克力特效），可以通过 `setDefaults` 一键启用全局配置，避免重复传参。

<DemoBlock title="全局配置演示" :ts-code="tsSetDefaults" :js-code="toJs(tsSetDefaults)">
  <yh-button type="primary" @click="openSetDefaults">应用全局亚克力配置</yh-button>
</DemoBlock>

## 在 Nuxt 中使用

`YhMessageBox` 已全面适配 Nuxt 3/4。作为一个指令式调用的组件，它在 SSR（服务端渲染）时会自动检测运行环境，确保弹窗逻辑仅在客户端执行。

<DemoBlock title="Nuxt 中使用演示" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-button type="primary" @click="openNuxt">Nuxt 自动导入</yh-button>
</DemoBlock>

**注意事项**：

- ✅ **全自动导入**：在 Nuxt 项目中，`YhMessageBox` 及其别名函数会自动映射，无需手动显式 `import`。
- ✅ **SSR 安全**：函数内部已封装 `process.client` 检测，可放心在生命周期或方法中调用。
- 💡 **样式同步**：组件样式会通过 Nuxt 插件自动注入，确保首屏激活后视觉风格的连续性。

::: tip 生产实践
在 Nuxt 生态中，推荐在 `defineNuxtComponent` 或 `setup` 逻辑中使用 `YhMessageBox` 进行业务拦截，配合 `useFetch` 的拦截器可以实现极佳的全局错误提示体验。
:::

## 全局方法

如果你完整引入了 YH-UI，它会为 `app.config.globalProperties` 添加如下全局方法：`$msgbox`、`$alert`、`$confirm` 和 `$prompt`。 因此在 Vue 实例中可以采用本页面中的方式来调用 `MessageBox`。

- `$msgbox(options)`
- `$alert(message, title, options)` 或 `$alert(message, options)`
- `$confirm(message, title, options)` 或 `$confirm(message, options)`
- `$prompt(message, title, options)` 或 `$prompt(message, options)`

## 应用程序上下文继承

现在 `MessageBox` 接受构造器的 `context` 作为第二个 (如果你正在使用消息框变量的话) 参数。 这个参数允许你将当前应用的上下文注入到消息中，这将允许你继承应用程序的所有属性。

```ts
import { getCurrentInstance } from 'vue'
import { YhMessageBox } from 'yh-ui'

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!
// 你可以像这样传递参数：
YhMessageBox({}, appContext)
// 或者正在使用不同的调用方式
YhMessageBox.alert('Hello world!', 'Title', {}, appContext)
```

## API

### 方法

| 方法名 | 说明 | 参数类型 | 返回值 |
| --- | --- | --- | --- |
| `alert` | 弹出消息提示框 | `(message, title?, options?, appContext?)` | `Promise<void>` |
| `confirm` | 弹出操作确认框 | `(message, title?, options?, appContext?)` | `Promise<MessageBoxAction>` |
| `prompt` | 弹出内容输入框 | `(message, title?, options?, appContext?)` | `Promise<{ value, action }>` |
| `setDefaults` | 修改全局默认配置项 | `(defaults: MessageBoxOptions)` | — |

### MessageBoxOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `提示` |
| message | 内容 | `string \| VNode \| (() => VNode)` | — |
| type | 弹窗类型 | `'alert' \| 'confirm' \| 'prompt'` | — |
| iconType | 状态图标类型 | `'success' \| 'warning' \| 'info' \| 'error'` | — |
| icon | 自定义图标 | `string \| Component \| VNode` | — |
| width | 弹窗宽度 | `string \| number` | `420` |
| dangerouslyUseHTMLString | 是否将 message 渲染为 HTML | `boolean` | `false` |
| showClose | 是否显示右上角关闭按钮 | `boolean` | `true` |
| showConfirmButton | 是否显示确认按钮 | `boolean` | `true` |
| showCancelButton | 是否显示取消按钮 | `boolean` | `true` |
| confirmButtonText | 确认按钮文案 | `string` | `确定` |
| cancelButtonText | 取消按钮文案 | `string` | `取消` |
| closeOnClickModal | 点击遮罩层是否关闭 | `boolean` | `true` |
| closeOnPressEscape | 按下 ESC 是否关闭 | `boolean` | `true` |
| lockScroll | 是否锁定滚动条 | `boolean` | `true` |
| glass | 是否开启亚克力玻璃模式 | `boolean` | `false` |
| center | 是否将内容居中排列 | `boolean` | `false` |
| roundButton | 是否采用圆角按钮 | `boolean` | `false` |
| draggable | 是否支持拖拽弹窗 | `boolean` | `false` |
| draggableBoundary | 是否防止拖拽超出可视区域 | `boolean` | `true` |
| customClass | 自定义类名 | `string` | — |
| inputPlaceholder | 输入框占位符 (仅 prompt) | `string` | — |
| inputValue | 输入框初始值 (仅 prompt) | `string` | — |
| inputPattern | 输入框校验正则表达式 (仅 prompt) | `RegExp` | — |
| inputValidator | 输入框自定义校验函数 (仅 prompt) | `(value: string) => boolean \| string` | — |
| inputErrorMessage | 校验错误提示 (仅 prompt) | `string` | — |
| beforeClose | 关闭前的钩子 | `(action, instance, done) => void` | — |
| callback | 关闭后的回调 | `(action, instance) => void` | — |
| appContext | 应用上下文 (Vue Context) | `AppContext` | — |
| autofocus | 是否在打开时自动获取焦点 | `boolean` | `true` |
| appendTo | 设置组件的根元素 | `string \| HTMLElement` | `document.body` |
| confirmButtonLoading | 确认按钮是否显示加载中状态 | `boolean` | `false` |
| cancelButtonLoading | 取消按钮是否显示加载中状态 | `boolean` | `false` |
| loadingIcon | 自定义加载图标 | `string \| Component \| VNode` | — |

### MessageBoxInstance (instance in beforeClose)

| 属性/方法 | 说明 | 类型 |
| --- | --- | --- |
| `confirmLoading` | 确认按钮的加载状态 | `boolean` |
| `cancelLoading` | 取消按钮的加载状态 | `boolean` |
| `open` | 打开弹窗 | `(options: MessageBoxOptions) => void` |
| `close` | 关闭弹窗 | `() => void` |

### 主题变量 (CSS Variables)

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-scrollbar-width` | 当前系统的滚动条宽度 (自动注入) | — |
| `--yh-bg-color-overlay` | 弹窗背景色 | `var(--yh-bg-color-overlay)` |
| `--yh-text-color-primary` | 标题颜色 | `var(--yh-text-color-primary)` |
