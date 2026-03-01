# AiArtifacts 智能组件

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const visible = ref(false)
const artifactData = {
  id: 'artifact-1',
  title: '控制台原型预览',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>初始草图</h1><p>这是基础布局...</p>', description: '初始版本' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">视觉强化版</h1><p>适配了主题色...</p>', description: '样式优化' }
  ]
}

const visible2 = ref(false)
const codeData = {
  id: 'code-1',
  title: 'demo.ts',
  type: 'code',
  versions: [
    { version: '1', content: 'const a = 1;\nconsole.log(a);', description: 'Basic logic' }
  ]
}

const tsBasic = `<${_T}>
  <yh-button @click="visible = true">打开 Artifacts</yh-button>
  <yh-ai-artifacts 
    v-model:visible="visible"
    :data="artifactData"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visible = ref(false);
const artifactData: ArtifactData = {
  id: 'artifact-1',
  title: '控制台原型预览',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>初始草图</h1><p>这是基础布局...</p>', description: '初始版本' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">视觉强化版</h1><p>适配了主题色...</p>', description: '样式优化' }
  ]
};
</${_S}>`

const tsVersional = `<${_T}>
  <yh-ai-artifacts 
    v-model:visible="visible"
    :data="artifactData"
    @version-change="onVersionChange"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData, ArtifactVersion } from '@yh-ui/components';

const visible = ref(false);
const artifactData: ArtifactData = {
  id: 'artifact-1',
  title: '控制台原型预览',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>初始草图</h1><p>基础布局...</p>', description: '初始版本' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">视觉强化版</h1><p>适配主题色...</p>', description: '样式优化' }
  ]
};

const onVersionChange = (v: ArtifactVersion) => {
  console.log('切换版本:', v.version);
};
</${_S}>`

const tsModes = `<${_T}>
  <yh-button @click="visible2 = true">查看源码模式</yh-button>
  <yh-ai-artifacts 
    v-model:visible="visible2"
    mode="code"
    :data="codeData"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visible2 = ref(false);
const codeData: ArtifactData = {
  id: 'code-1',
  title: 'demo.ts',
  type: 'code',
  versions: [
    { version: '1', content: 'const a = 1;\\nconsole.log(a);', description: '示例代码' }
  ]
};
</${_S}>`

const tsInline = `<${_T}>
  <yh-ai-artifacts 
    visible
    mode="inline"
    :data="artifactData"
    :theme-overrides="{
      bgColors: { overlay: '#f8f9fa' }
    }"
  />
</${_T}>

<${_S} setup lang="ts">
import type { ArtifactData } from '@yh-ui/components';

const artifactData: ArtifactData = {
  id: 'artifact-1',
  title: '行内组件预览',
  type: 'html',
  versions: [
    { version: '1', content: '<h3>这是一个嵌入式预览</h3><p>它直接展示在页面流中。</p>' }
  ]
};
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsVersional = toJs(tsVersional)
const jsModes = toJs(tsModes)
const jsInline = toJs(tsInline)
</script>

`AiArtifacts` 是一个沉浸式的侧边渲染面板，专门用于展示 AI 生成的复杂内容，如 HTML 页面、React/Vue 原型、长代码模块或结构化文档。

## 基础用法

通过 `v-model:visible` 控制显示隐藏，并传入 `data` 结构描述内容及其版本。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 400px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visible = true">打开 Artifacts</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visible"
       :data="artifactData"
    />
  </div>
</DemoBlock>

## 多版本支持

Artifact 允许用户在不同的迭代版本之间自由切换，通过 `versions` 数组提供历史记录。您可以通过 `version-change` 事件监听用户的切换行为。

<DemoBlock title="版本切换" :ts-code="tsVersional" :js-code="jsVersional">
  <div style="padding: 16px; background: var(--yh-bg-color-page); border-radius: 8px;">
     提示：在侧边面板顶部点击 v1/v2 即可体验版本切换。
  </div>
</DemoBlock>

## 渲染模式

支持 `preview` (实时渲染) 和 `code` (源码高亮) 模式。目前预览模式支持标准的 HTML 结构沙盒。

<DemoBlock title="源码模式" :ts-code="tsModes" :js-code="jsModes">
  <div style="height: 300px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visible2 = true">查看示例代码</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visible2"
       mode="code"
       :data="codeData"
    />
  </div>
</DemoBlock>

## 行内展示模式

通过设置 `mode="inline"`，组件将不再作为固定侧边栏出现，而是作为普通的块级元素嵌入在页面流或对话气泡中。

<DemoBlock title="行内模式与主题自定义" :ts-code="tsInline" :js-code="jsInline">
  <yh-ai-artifacts 
    visible
    mode="inline"
    :data="artifactData"
    :theme-overrides="{
      bgColor: '#f8f9fa'
    }"
  />
</DemoBlock>

## API

### Props

| 属性名           | 说明         | 类型                              | 默认值      |
| ---------------- | ------------ | --------------------------------- | ----------- |
| `visible`        | 是否可见     | `boolean`                         | `false`     |
| `data`           | 数据结构     | `ArtifactData`                    | —           |
| `width`          | 面板宽度     | `string \| number`                | `'50%'`     |
| `mode`           | 初始模式     | `'preview' \| 'code' \| 'inline'` | `'preview'` |
| `themeOverrides` | 主题变量覆盖 | `ComponentThemeVars`              | —           |

### ArtifactData

| 属性名     | 说明        | 类型                                                 |
| ---------- | ----------- | ---------------------------------------------------- |
| `id`       | 唯一标识    | `string`                                             |
| `title`    | 标题/文件名 | `string`                                             |
| `type`     | 类型        | `'code' \| 'html' \| 'markdown' \| 'vue' \| 'react'` |
| `versions` | 版本列表    | `ArtifactVersion[]`                                  |

### ArtifactVersion

| 属性名        | 说明       | 类型               |
| ------------- | ---------- | ------------------ |
| `version`     | 版本号     | `string \| number` |
| `content`     | 源代码内容 | `string`           |
| `description` | 更改说明   | `string`           |

### Events

| 事件名           | 说明           | 回调参数                       |
| ---------------- | -------------- | ------------------------------ |
| `version-change` | 切换版本时触发 | `(v: ArtifactVersion) => void` |
| `close`          | 关闭面板时触发 | —                              |
