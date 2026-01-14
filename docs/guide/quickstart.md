# 快速开始

本节将介绍如何在项目中使用 YH-UI。

## 完整引入

如果你对打包后的文件大小不是很在乎，使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import YhUI from 'yh-ui'
import 'yh-ui/css'
import App from './App.vue'

const app = createApp(App)
app.use(YhUI)
app.mount('#app')
```

## 按需引入

YH-UI 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<script setup lang="ts">
import { YhButton } from 'yh-ui'
</script>

<template>
  <yh-button type="primary">Hello YH-UI</yh-button>
</template>
```

## 使用 createYhUI

`createYhUI` 方法允许你在安装时传入全局配置：

```ts
// main.ts
import { createApp } from 'vue'
import { createYhUI } from 'yh-ui'
import 'yh-ui/css'
import App from './App.vue'

const app = createApp(App)

const yhUI = createYhUI({
  // 全局组件尺寸
  size: 'default',
  // z-index 基数
  zIndex: 2000,
  // 命名空间
  namespace: 'yh'
})

app.use(yhUI)
app.mount('#app')
```

## 开始使用

现在你可以开始使用 YH-UI 组件了！

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="demo">
    <h1>欢迎使用 YH-UI</h1>
    <p>点击次数: {{ count }}</p>
    <yh-button type="primary" @click="count++">
      点击我
    </yh-button>
    <yh-button @click="count = 0">重置</yh-button>
  </div>
</template>

<style scoped>
.demo {
  padding: 24px;
}

.demo h1 {
  margin-bottom: 16px;
}

.demo p {
  margin-bottom: 16px;
}
</style>
```

## 下一步

- 浏览 [组件文档](/components/button) 了解所有可用组件
- 了解如何 [定制主题](/guide/theming)
- 查看 [设计规范](/guide/design) 了解设计理念
