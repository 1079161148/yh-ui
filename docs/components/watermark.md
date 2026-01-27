<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// 1. 强制对齐的文案常量
const TXT = {
  content: '内容',
  size: '字号',
  color: '颜色',
  rotate: '单元旋转',
  globalRotate: '整体旋转',
  height: '高度',
  width: '宽度',
  lineHeight: '行高',
  zIndex: 'z-index',
  gapX: 'X 间距',
  gapY: 'Y 间距',
  weight: '字重',
  style: '风格',
  align: '对齐'
}

const config = reactive({
  content: 'YH-UI\n旗舰水印',
  fontSize: 18,
  color: 'rgba(64, 158, 255, 0.2)',
  fontStyle: 'normal',
  fontWeight: '600',
  rotate: -22,
  globalRotate: 0,
  width: 200,
  height: 140,
  gapX: 80,
  gapY: 80,
  zIndex: 10,
  textAlign: 'center',
  lineHeight: 24
})

const fontConfig = computed(() => ({
  color: config.color,
  fontSize: config.fontSize,
  fontWeight: config.fontWeight,
  fontStyle: config.fontStyle as any,
  textAlign: config.textAlign as any,
  lineHeight: config.lineHeight
}))

// 预览区 HTML
const labPreviewHtml = `
            <div style="padding: 40px;">
              <h3 style="margin: 0 0 20px; font-size: 20px; color: #1f1f1f;">打造极速、现代、旗舰级的 Vue 3 组件库</h3>
              <div style="display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px;">
                <div style="width: 140px; min-width: 140px; background: #fff; padding: 12px; border-radius: 12px; border: 1px solid #f0f0f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); position: relative; z-index: 5; text-align: center;">
                  <div style="position: absolute; top: -8px; right: -8px; background: #409eff; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold; z-index: 6;">z-index: 5</div>
                  <img src="https://avatars.githubusercontent.com/u/1079161148?v=4" style="width: 100%; border-radius: 8px; margin-bottom: 8px;" />
                  <p style="margin: 0; font-size: 12px; color: #666; font-weight: bold;">核心资产保护</p>
                </div>
                <div style="flex: 1; color: #606266; font-size: 14px; line-height: 1.6;">
                  <p>在这里，您可以深度定制水印。当调节 z-index < 5 时，水印文字会隐于蓝色卡片下方，实现页面元素的差异化保护。</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" style="width: 100%; border-radius: 12px; border: 1px solid #eee;" />
            </div>`

const getFullLabCode = (isTs: boolean) => {
  const fontObj = JSON.stringify(fontConfig.value, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/\n/g, '\n    ')
  const contentVal = config.content.replace(/\n/g, '\\n')
  
  return `<template>
  <div class="watermark-lab">
    <div class="lab-main">
      <div class="lab-preview-pane">
        <yh-watermark 
          :content="config.content"
          :rotate="config.rotate"
          :global-rotate="config.globalRotate"
          :width="config.width"
          :height="config.height"
          :gap="[config.gapX, config.gapY]"
          :z-index="config.zIndex"
          :font="fontConfig"
        >${labPreviewHtml}
        </yh-watermark>
      </div>

      <div class="lab-control-pane">
        <div class="control-section">
          <label>${TXT.content}</label>
          <yh-input v-model="config.content" />
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.size}</label><yh-input-number v-model="config.fontSize" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.color}</label><yh-color-picker v-model="config.color" show-alpha style="width: 100%" /></div>
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.style}</label><yh-select v-model="config.fontStyle" style="width: 100%"><yh-option value="normal" label="正常" /><yh-option value="italic" label="斜体" /></yh-select></div>
          <div class="control-field"><label>${TXT.align}</label><yh-select v-model="config.textAlign" style="width: 100%"><yh-option value="left" label="左对齐" /><yh-option value="center" label="居中" /><yh-option value="right" label="右对齐" /></yh-select></div>
        </div>
        <div class="control-section"><label>${TXT.weight}</label><yh-input-number v-model="config.fontWeight" :step="100" :min="100" style="width: 100%" /></div>
        <div class="control-section"><label>${TXT.rotate}</label><yh-slider v-model="config.rotate" :min="-180" :max="180" /></div>
        <div class="control-section"><label>${TXT.globalRotate}</label><yh-slider v-model="config.globalRotate" :min="-180" :max="180" /></div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.height}</label><yh-input-number v-model="config.height" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.width}</label><yh-input-number v-model="config.width" style="width: 100%" /></div>
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.lineHeight}</label><yh-input-number v-model="config.lineHeight" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.zIndex}</label><yh-input-number v-model="config.zIndex" style="width: 100%" /></div>
        </div>
        <div class="control-grid">
          <div class="control-field"><label>${TXT.gapX}</label><yh-input-number v-model="config.gapX" style="width: 100%" /></div>
          <div class="control-field"><label>${TXT.gapY}</label><yh-input-number v-model="config.gapY" style="width: 100%" /></div>
        </div>
      </div>
    </div>
  </div>
<\/template>

<script setup${isTs ? ' lang="ts"' : ''}>
import { reactive, computed } from 'vue'

const config = reactive({
  content: '${contentVal}',
  fontSize: ${config.fontSize},
  color: '${config.color}',
  fontStyle: '${config.fontStyle}',
  fontWeight: '${config.fontWeight}',
  textAlign: '${config.textAlign}',
  rotate: ${config.rotate},
  globalRotate: ${config.globalRotate},
  width: ${config.width},
  height: ${config.height},
  gapX: ${config.gapX},
  gapY: ${config.gapY},
  zIndex: ${config.zIndex},
  lineHeight: ${config.lineHeight}
})

const fontConfig = computed(() => (${fontObj}))
<\/script>

<style scoped>
.lab-main { display: flex; border: 1px solid #ebeef5; border-radius: 12px; height: 680px; overflow: hidden; background: #fff; }
.lab-preview-pane { flex: 1; position: relative; overflow: hidden; }
.lab-control-pane { width: 400px; background: #fafafa; padding: 30px; display: flex; flex-direction: column; gap: 24px; border-left: 1px solid #ebeef5; overflow-y: auto; }
.control-section { display: flex; flex-direction: column; gap: 10px; }
.control-grid { display: flex; gap: 16px; width: 100%; }
.control-field { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
label { font-size: 11px; font-weight: 700; color: #a0a0a0; text-transform: uppercase; letter-spacing: 0.5px; }
<\/style>`

}

const generatedTsCode = computed(() => getFullLabCode(true))
const generatedJsCode = computed(() => getFullLabCode(false))

const tsBasicCode = `<template>
  <yh-watermark content="YH-UI">
    <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f5f7fa; color: #909399;">基础部分内容展示</div>
  </yh-watermark>
<\/template>`


const tsFormCode = `<template>
  <yh-watermark content="机密信息 请勿外传" :font="{ color: 'rgba(255, 0, 0, 0.15)' }">
    <div style="padding: 24px; border: 1px solid #ebeef5; border-radius: 8px; background: #fff;">
      <h4 style="margin: 0 0 16px; color: #303133;">员工敏感数据预览</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; color: #606266; font-size: 14px;">
        <div><strong>账户:</strong> user_admin_01</div>
        <div><strong>姓名:</strong> 王晓明</div>
        <div><strong>联系电话:</strong> 138****8888</div>
        <div><strong>当前职级:</strong> P7 - 高级工程师</div>
        <div><strong>薪资绩效:</strong> ¥**,000 (A)</div>
        <div><strong>所属部门:</strong> 前端智能开发部</div>
      </div>
    </div>
  </yh-watermark>
<\/template>`


const fsShow = ref(false)
const tsFSCode = `<template>
  <yh-button type="primary" @click="show = !show">{{ show ? '隐藏' : '开启' }}全屏水印体验</yh-button>
  <yh-watermark v-if="show" full-screen content="YH-UI 全屏模式" :font="{ color: 'rgba(0,0,0,0.1)' }" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>`

</script>

# Watermark 水印

给页面的特定区域添加水印。具有极强的防删除和防篡改能力。

## 基础用法

<DemoBlock :tsCode="tsBasicCode" :jsCode="tsBasicCode">
<yh-watermark content="YH-UI">
<div style="height: 300px; background: #f5f7fa; display: flex; align-items: center; justify-content: center; color: #909399;">基础部分内容展示</div>
</yh-watermark>
</DemoBlock>

## 业务场景：表单数据保护

在处理包含姓名、薪资等机密信息的表单时，水印是关键的安全防线。

<DemoBlock :tsCode="tsFormCode" :jsCode="tsFormCode">
<yh-watermark content="机密信息 请勿外传" :font="{ color: 'rgba(255, 0, 0, 0.15)' }">
<div style="padding: 24px; border: 1px solid var(--yh-border-color-lighter, #ebeef5); border-radius: 8px; background: #fff;">
<h4 style="margin: 0 0 16px; color: var(--yh-text-color-primary, #303133);">员工敏感数据预览</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; color: var(--yh-text-color-regular, #606266); font-size: 14px;">
<div><strong>账户:</strong> user_admin_01</div>
<div><strong>姓名:</strong> 王晓明</div>
<div><strong>联系电话:</strong> 138****8888</div>
<div><strong>当前职级:</strong> P7 - 高级工程师</div>
<div><strong>薪资绩效:</strong> ¥**,000 (A)</div>
<div><strong>所属部门:</strong> 前端智能开发部</div>
</div>
</div>
</yh-watermark>
</DemoBlock>

## 全屏水印

<DemoBlock :tsCode="tsFSCode" :jsCode="tsFSCode">
<yh-button type="primary" @click="fsShow = !fsShow">{{ fsShow ? '隐藏' : '开启' }}全屏水印体验</yh-button>
<yh-watermark v-if="fsShow" full-screen content="YH-UI 全屏模式" :font="{ color: 'rgba(0,0,0,0.1)' }" />
</DemoBlock>

## 交互式自定义配置

通过下方的实验室，您可以实时探索高级配置。

<DemoBlock :tsCode="generatedTsCode" :jsCode="generatedJsCode">
<div class="watermark-lab-wrapper">
<div class="lab-main">
<div class="lab-preview-pane">
<yh-watermark v-bind="config" :gap="[config.gapX, config.gapY]" :offset="[config.offsetX, config.offsetY]" :font="fontConfig">
<div class="preview-scroll-area">
<div class="preview-content-box" v-html="labPreviewHtml"></div>
</div>
</yh-watermark>
</div>
<div class="lab-control-pane">
<div class="control-scroll-area">
<div class="control-section"><label>{{ TXT.content }}</label><yh-input v-model="config.content" placeholder="输入水印内容" /></div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.size }}</label><yh-input-number v-model="config.fontSize" :min="10" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.color }}</label><yh-color-picker v-model="config.color" show-alpha style="width: 100%" /></div>
</div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.style }}</label><yh-select v-model="config.fontStyle" style="width: 100%"><yh-option value="normal" label="正常" /><yh-option value="italic" label="斜体" /></yh-select></div>
<div class="control-field"><label>{{ TXT.align }}</label><yh-select v-model="config.textAlign" style="width: 100%"><yh-option value="left" label="左对齐" /><yh-option value="center" label="居中" /><yh-option value="right" label="右对齐" /></yh-select></div>
</div>
<div class="control-section"><label>{{ TXT.weight }}</label><yh-input-number v-model="config.fontWeight" :step="100" :min="100" style="width: 100%" /></div>
<div class="control-section"><label>{{ TXT.rotate }}</label><yh-slider v-model="config.rotate" :min="-180" :max="180" /></div>
<div class="control-section"><label>{{ TXT.globalRotate }}</label><yh-slider v-model="config.globalRotate" :min="-180" :max="180" /></div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.height }}</label><yh-input-number v-model="config.height" :min="10" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.width }}</label><yh-input-number v-model="config.width" :min="10" style="width: 100%" /></div>
</div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.lineHeight }}</label><yh-input-number v-model="config.lineHeight" :min="0" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.zIndex }}</label><yh-input-number v-model="config.zIndex" :min="0" style="width: 100%" /></div>
</div>
<div class="control-grid">
<div class="control-field"><label>{{ TXT.gapX }}</label><yh-input-number v-model="config.gapX" style="width: 100%" /></div>
<div class="control-field"><label>{{ TXT.gapY }}</label><yh-input-number v-model="config.gapY" style="width: 100%" /></div>
</div>
</div>
</div>
</div>
</div>
</DemoBlock>

<style scoped>
.watermark-lab-wrapper { margin: -24px -24px 0 -24px; }
.lab-main { display: flex; height: 680px; border: 1px solid var(--yh-border-color-light, #ebeef5); border-radius: 12px; overflow: hidden; }
@media (max-width: 1200px) { .lab-main { flex-direction: column; height: auto; } }
.lab-preview-pane { flex: 1; background: #fff; position: relative; border-right: 1px solid var(--yh-border-color-extra-light, #f2f6fc); overflow: hidden; }
.preview-scroll-area { height: 100%; overflow-y: auto; scrollbar-width: none; }
.preview-scroll-area::-webkit-scrollbar { display: none; }
.lab-control-pane { width: 400px; background: #fafafa; overflow: hidden; border-left: 1px solid #ebeef5; }
@media (max-width: 1200px) { .lab-control-pane { width: 100%; border-top: 1px solid #f2f6fc; } }
.control-scroll-area { height: 100%; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px; scrollbar-width: none; }
.control-scroll-area::-webkit-scrollbar { display: none; }
.control-section { display: flex; flex-direction: column; gap: 10px; }
.control-grid { display: flex; gap: 16px; width: 100%; }
.control-field { flex: 1; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
label { font-size: 11px; font-weight: 700; color: #a0a0a0; text-transform: uppercase; letter-spacing: 0.5px; }
</style>

## 在 Nuxt 中使用

由于水印组件依赖于 DOM 操作和 Canvas 渲染，在 Nuxt 3 等 SSR 环境中，请务必使用 `<ClientOnly>` 标签包裹组件。

```vue
<template>
  <ClientOnly>
    <yh-watermark content="YH-UI Nuxt 驱动">
      <div style="height: 300px;">内容区</div>
    </yh-watermark>
  </ClientOnly>
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 水印每个单元的宽度 | `number` | `120` |
| height | 水印每个单元的高度 | `number` | `64` |
| rotate | 单元格旋转角度 | `number` | `-22` |
| globalRotate | 整体旋转角度 | `number` | `0` |
| zIndex | 水印层级 | `number` | `9` |
| image | 图片源，设置后 content 将失效 | `string` | - |
| content | 水印文字内容，支持多行 | `string \| string[]` | `'YH-UI'` |
| font | 字体样式设置对象 | `Font` | 见下文 |
| gap | 水印之间的间距 [x, y] | `[number, number]` | `[100, 100]` |
| offset | 水印距离容器起始点的偏移 [x, y] | `[number, number]` | `[0, 0]` |
| fullScreen | 是否将水印挂载到 body 下全屏展示 | `boolean` | `false` |
| antiTamper | 是否开启防篡改模式（监控 DOM 变更并强制恢复） | `boolean` | `true` |

#### Font 对象说明

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 文字颜色 | `string` | `'rgba(0,0,0,0.15)'` |
| fontSize | 字体大小 | `number \| string` | `16` |
| fontWeight | 字重 | `string \| number` | `'normal'` |
| fontFamily | 字体库 | `string` | `'sans-serif'` |
| fontStyle | 字体样式 | `'normal' \| 'italic' \| 'oblique'` | `'normal'` |
| textAlign | 文本对齐方式 | `'start' \| 'end' \| 'left' \| 'right' \| 'center'` | `'center'` |
| lineHeight | 行高 | `number` | `22` |

### Events

本项目 Watermark 水印组件暂无对外抛出的事件。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 水印覆盖的内容区域 |

### Expose

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| renderWatermark | 强制重新渲染水印（在容器大小动态变化但未触发监听时使用） | `() => void` |

## 主题变量 (CSS Variables)

组件使用 CSS 变量来定义基础样式，您可以在本地或全局进行覆盖。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-watermark-container-position` | 包裹容器的定位方式 | `relative` |
| `--yh-watermark-width` | 组件宽度 | `100%` |
| `--yh-watermark-height` | 组件高度 | `100%` |
| `--yh-watermark-fullscreen-z-index` | 全屏模式下的强制层级 | `9999` |
