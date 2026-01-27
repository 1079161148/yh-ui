<style>
/* 自定义主题必须使用全局样式，因为 Popper 是 Teleport 到 body 的 */
.yh-tooltip__popper.is-customized {
  background: linear-gradient(90deg, #95d475 0%, #b3e19d 100%) !important;
  color: #303133 !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(149, 212, 117, 0.4);
}
/* 同步箭头背景 */
.yh-tooltip__popper.is-customized .yh-tooltip__arrow {
  background: inherit !important;
  border: none !important;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const customContentStyle = { 
  backgroundColor: '#fdf6ec', 
  color: '#e6a23c', 
  border: '1px solid #faecd8' 
}
const customArrowStyle = { 
  backgroundColor: '#fdf6ec' 
}

const tsBasic = '<template>\n' +
`  <div class="tooltip-base-box">
    <div class="row center">
      <yh-tooltip content="Top Start prompts info" placement="top-start">
        <yh-button>top-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top Center prompts info" placement="top">
        <yh-button>top</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top End prompts info" placement="top-end">
        <yh-button>top-end</yh-button>
      </yh-tooltip>
    </div>
    <div class="row">
      <div class="col">
        <yh-tooltip content="Left Start prompts info" placement="left-start">
          <yh-button>left-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left Center prompts info" placement="left">
          <yh-button>left</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left End prompts info" placement="left-end">
          <yh-button>left-end</yh-button>
        </yh-tooltip>
      </div>
      <div class="col">
        <yh-tooltip content="Right Start prompts info" placement="right-start">
          <yh-button>right-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right Center prompts info" placement="right">
          <yh-button>right</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right End prompts info" placement="right-end">
          <yh-button>right-end</yh-button>
        </yh-tooltip>
      </div>
    </div>
    <div class="row center">
      <yh-tooltip content="Bottom Start prompts info" placement="bottom-start">
        <yh-button>bottom-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom Center prompts info" placement="bottom">
        <yh-button>bottom</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom End prompts info" placement="bottom-end">
        <yh-button>bottom-end</yh-button>
      </yh-tooltip>
    </div>
  </div>
` + '\n</template>'

const tsEffect = '<template>\n' +
`  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Dark Theme" effect="dark">
      <yh-button>深色模式 (默认)</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Light Theme" effect="light">
      <yh-button>浅色模式</yh-button>
    </yh-tooltip>
  </div>
` + '\n</template>'

const tsCustomStyle = '<template>\n' +
`  <div style="display: flex; gap: 16px; padding: 20px 0;">
    <yh-tooltip 
      content="这是一个固定宽度且可滚动的 Tooltip，当内容非常多的时候，它会自动出现滚动条。" 
      :width="200" 
      :max-height="80"
      scrollable
    >
      <yh-button>固定宽度/滚动</yh-button>
    </yh-tooltip>
    <yh-tooltip 
      content="自定义样式内容" 
      :content-style="{ backgroundColor: '#fdf6ec', color: '#e6a23c', border: '1px solid #faecd8' }"
      :arrow-style="{ backgroundColor: '#fdf6ec' }"
    >
      <yh-button>自定义样式</yh-button>
    </yh-tooltip>
  </div>
` + '\n</template>'

const tsHtml = '<template>\n' +
`  <yh-tooltip 
    content="<span>The content can be <strong style='color: #409eff'>HTML</strong></span>" 
    raw-content
  >
    <yh-button>hover me</yh-button>
  </yh-tooltip>
` + '\n</template>'

const tsTrigger = '<template>\n' +
`  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Hovered" trigger="hover">
      <yh-button>悬停</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Clicked" trigger="click">
      <yh-button>点击</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Right Clicked" trigger="contextmenu" placement="right">
      <yh-button>右键触发</yh-button>
    </yh-tooltip>
  </div>
` + '\n</template>'

const tsFollow = '<template>\n' +
`  <yh-tooltip content="Shadow following..." follow-cursor>
    <div class="follow-box">体验鼠标跟随效果</div>
  </yh-tooltip>
` + '\n</template>'

const tsInteractive = '<template>\n' +
`  <div style="padding: 20px 0;">
    <yh-tooltip interactive placement="top">
      <yh-button type="primary">交互提示</yh-button>
      <template #content>
        <div style="padding: 4px">
          <div style="margin-bottom: 8px">在此处进行交互：</div>
          <yh-button size="small" type="primary">确认操作</yh-button>
        </div>
      </template>
    </yh-tooltip>
  </div>
` + '\n</template>'

const tsNuxt = '<template>\n' +
`  <yh-tooltip content="Nuxt 3 Auto Import">
    <yh-button>Nuxt 3 自动导入演示</yh-button>
  </yh-tooltip>
` + '\n</template>'

const tsInput = '<template>\n' +
`  <yh-tooltip content="聚焦输入框以查看提示" trigger="focus">
    <input 
      type="text" 
      placeholder="在此输入空格测试..." 
      style="padding: 8px 12px; border: 1px solid #dcdfe6; border-radius: 4px; outline: none;"
    />
  </yh-tooltip>
` + '\n</template>'

const tsCustomTheme = `\x3ctemplate>
  \x3cyh-tooltip content="Bottom center" effect="customized" placement="bottom">
    \x3cyh-button class="custom-theme-btn">Customized theme\x3c/yh-button>
  \x3c/yh-tooltip>
\x3c/template>

\x3cstyle>
.yh-tooltip__popper.is-customized {
  background: linear-gradient(90deg, #95d475 0%, #b3e19d 100%) !important;
  color: #303133 !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(149, 212, 117, 0.4);
}
/* 同步箭头背景 */
.yh-tooltip__popper.is-customized .yh-tooltip__arrow {
  background: inherit !important;
  border: none !important;
}
\x3c/style>`

const tsOuterLink = '<template>\n' +
`  <yh-tooltip interactive placement="top">
    <yh-button>查看项目源码</yh-button>
    <template #content>
      <div style="padding: 4px">
        <span>更多详情请点击 </span>
        <a href="https://github.com/1079161148/yh-ui" target="_blank" style="color: #409eff; text-decoration: none; font-weight: bold;">GitHub 仓库</a>
      </div>
    </template>
  </yh-tooltip>
` + '\n</template>'

const jsBasic = tsBasic
const jsEffect = tsEffect
const jsCustomStyle = tsCustomStyle
const jsHtml = tsHtml
const jsTrigger = tsTrigger
const jsFollow = tsFollow
const jsInteractive = tsInteractive
const jsNuxt = tsNuxt
const jsInput = tsInput
const jsCustomTheme = tsCustomTheme.replace('lang="ts"', '')
const jsOuterLink = tsOuterLink
</script>

<style scoped>
.tooltip-base-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
  gap: 10px;
}
.tooltip-base-box .col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tooltip-base-box .row:not(:first-child) {
  margin-top: 10px;
}
.follow-box {
  width: 100%;
  height: 100px;
  border: 2px dashed #409eff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(64,158,255,0.05);
  color: #409eff;
  cursor: crosshair;
}

/* 自定义主题样式实现 */
.custom-theme-btn {
  background: #f0f9eb !important;
  border-color: #e1f3d8 !important;
  color: #67c23a !important;
}
</style>

# Tooltip 文字提示

极轻量、高性能的文字提示组件。基于业内顶级的 [Floating UI](https://floating-ui.com/) 定位引擎驱动。

## 基础用法

提供 12 个方向的弹出位置，通过 `placement` 属性配置。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="tooltip-base-box">
    <div class="row center">
      <yh-tooltip content="Top Start prompts info" placement="top-start">
        <yh-button>top-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top Center prompts info" placement="top">
        <yh-button>top</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Top End prompts info" placement="top-end">
        <yh-button>top-end</yh-button>
      </yh-tooltip>
    </div>
    <div class="row" style="margin: 20px 0">
      <div class="col">
        <yh-tooltip content="Left Start prompts info" placement="left-start">
          <yh-button>left-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left Center prompts info" placement="left">
          <yh-button>left</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Left End prompts info" placement="left-end">
          <yh-button>left-end</yh-button>
        </yh-tooltip>
      </div>
      <div class="col">
        <yh-tooltip content="Right Start prompts info" placement="right-start">
          <yh-button>right-start</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right Center prompts info" placement="right">
          <yh-button>right</yh-button>
        </yh-tooltip>
        <yh-tooltip content="Right End prompts info" placement="right-end">
          <yh-button>right-end</yh-button>
        </yh-tooltip>
      </div>
    </div>
    <div class="row center">
      <yh-tooltip content="Bottom Start prompts info" placement="bottom-start">
        <yh-button>bottom-start</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom Center prompts info" placement="bottom">
        <yh-button>bottom</yh-button>
      </yh-tooltip>
      <yh-tooltip content="Bottom End prompts info" placement="bottom-end">
        <yh-button>bottom-end</yh-button>
      </yh-tooltip>
    </div>
  </div>
</DemoBlock>

## 多种主题

除了内置的 `dark` / `light` 主题外，你还可以通过自定义 `effect` 的值来轻松定义专属主题样式。

<DemoBlock title="主题风格" :ts-code="tsEffect" :js-code="jsEffect">
  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Dark Theme" effect="dark">
      <yh-button>深色模式 (默认)</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Light Theme" effect="light">
      <yh-button>浅色模式</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

### 自定义主题

通过设置 `effect="customized"` 并编写对应的 CSS，可以获得极致的视觉效果。

<DemoBlock title="自定义主题" :ts-code="tsCustomTheme" :js-code="jsCustomTheme">
  <div style="padding: 10px 0;">
    <yh-tooltip content="Bottom center" effect="customized" placement="bottom">
      <yh-button class="custom-theme-btn">Customized theme</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

## 尺寸与样式

支持自定义宽度、最大高度，并支持长内容滚动。

<DemoBlock title="尺寸与自由样式" :ts-code="tsCustomStyle" :js-code="jsCustomStyle">
  <div style="display: flex; gap: 16px; padding: 20px 0;">
    <yh-tooltip content="这是一个固定宽度且可滚动的 Tooltip，当内容非常多的时候，它会自动出现滚动条，从而保证布局的整洁性。" :width="200" :max-height="80" scrollable>
      <yh-button>固定宽度/滚动</yh-button>
    </yh-tooltip>
    <yh-tooltip content="自定义样式内容" :content-style="{ backgroundColor: '#fdf6ec', color: '#e6a23c', border: '1px solid #faecd8' }" :arrow-style="{ backgroundColor: '#fdf6ec' }">
      <yh-button>自定义样式</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

## 显示 HTML 内容

内容属性可以设置为 HTML 字符串，通过 `raw-content` 开启。

<DemoBlock title="HTML 渲染" :ts-code="tsHtml" :js-code="jsHtml">
  <yh-tooltip content="<span>The content can be <strong style='color: #409eff'>HTML</strong></span>" raw-content>
    <yh-button>hover me</yh-button>
  </yh-tooltip>
</DemoBlock>

## 触发行为

支持悬停、点击、焦点以及右键菜单触发，默认为 `hover`。

<DemoBlock title="触发方式" :ts-code="tsTrigger" :js-code="jsTrigger">
  <div style="display: flex; gap: 16px">
    <yh-tooltip content="Hovered" trigger="hover">
      <yh-button>悬停</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Clicked" trigger="click">
      <yh-button>点击</yh-button>
    </yh-tooltip>
    <yh-tooltip content="Right Clicked" trigger="contextmenu" placement="right">
      <yh-button>右键触发</yh-button>
    </yh-tooltip>
  </div>
</DemoBlock>

## 高级特性

### 鼠标跟随 (Follow Cursor)

<DemoBlock title="鼠标跟随" :ts-code="tsFollow" :js-code="jsFollow">
  <yh-tooltip content="Shadow following..." follow-cursor>
    <div class="follow-box">体验鼠标跟随效果</div>
  </yh-tooltip>
</DemoBlock>

### 内容交互 (Interactive)

<DemoBlock title="允许交互" :ts-code="tsInteractive" :js-code="jsInteractive">
  <div style="padding: 20px 0;">
    <yh-tooltip interactive placement="top">
      <yh-button type="primary">交互提示</yh-button>
      <template #content>
        <div style="padding: 4px">
          <div style="margin-bottom: 8px">在此处进行交互：</div>
          <yh-button size="small" type="primary">确认操作</yh-button>
        </div>
      </template>
    </yh-tooltip>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

YH-UI 完美兼容 Nuxt 3。你可以直接在组件中使用，无需手动导入。

<DemoBlock title="Nuxt 3 支持" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-tooltip content="Nuxt 3 Auto Import">
    <yh-button>Nuxt 3 自动导入演示</yh-button>
  </yh-tooltip>
</DemoBlock>

## FAQ

### 如何在嵌套了 Tooltip 的情况下允许输入框输入空格？

当 Tooltip 包含一个输入框时，在 YH-UI 中，我们确保了交互逻辑不会干扰正常的输入行为。你可以直接在触发层嵌套输入框，空格键将正常工作。

<DemoBlock title="嵌套输入框示例" :ts-code="tsInput" :js-code="jsInput">
  <div style="padding: 10px 0;">
    <yh-tooltip content="聚焦输入框以查看提示" trigger="focus">
      <input 
        type="text" 
        placeholder="在此输入空格测试..." 
        style="padding: 8px 12px; border: 1px solid #dcdfe6; border-radius: 4px; outline: none; width: 100%; max-width: 300px;"
      />
    </yh-tooltip>
  </div>
</DemoBlock>

### 如何在 Tooltip 中使用跳转链接？

你可以通过 `content` 插槽在 Tooltip 内部嵌入复杂的交互元素。请确保开启了 `interactive` 属性。

<DemoBlock title="嵌入外部链接" :ts-code="tsOuterLink" :js-code="jsOuterLink">
  <div style="padding: 10px 0;">
    <yh-tooltip interactive placement="top">
      <yh-button>查看项目源码</yh-button>
      <template #content>
        <div style="padding: 4px">
          <span>更多详情请点击 </span>
          <a href="https://github.com/1079161148/yh-ui" target="_blank" style="color: #409eff; text-decoration: none; font-weight: bold;">GitHub 仓库</a>
        </div>
      </template>
    </yh-tooltip>
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 显示文字内容 | `string` | - |
| placement | 弹出位置 | `TooltipPlacement` | `'top'` |
| trigger | 触发方式 | `TooltipTrigger \| TooltipTrigger[]` | `'hover'` |
| disabled | 是否禁用 | `boolean` | `false` |
| effect | 主题风格 | `string` | `'dark'` |
| offset | 偏移量 [横向, 纵向] | `[number, number]` | `[0, 8]` |
| show-after | 出现延迟 (ms) | `number` | `0` |
| hide-after | 消失延迟 (ms) | `number` | `200` |
| show-arrow | 是否显示小三角 | `boolean` | `true` |
| interactive | 是否允许鼠标进入提示框 | `boolean` | `true` |
| visible | 手动控制可见性 | `boolean \| null` | `null` |
| raw-content | 是否渲染 HTML 字符串 | `boolean` | `false` |
| follow-cursor | 是否跟随鼠标移动 | `boolean` | `false` |
| persistent | 隐藏时是否销毁 DOM | `boolean` | `true` |
| width | 弹出层宽度 | `string \| number` | `'auto'` |
| max-height | 最大高度 | `string \| number` | `'none'` |
| scrollable | 内容是否可滚动 | `boolean` | `false` |
| popper-class | 弹出层自定义类名 | `string` | - |
| popper-style | 弹出层自定义样式 | `object` | - |
| content-class | 内容层自定义类名 | `string` | - |
| content-style | 内容层自定义样式 | `object` | - |
| arrow-class | 箭头自定义类名 | `string` | - |
| arrow-style | 箭头自定义样式 | `object` | - |
| arrow-wrapper-class | 箭头容器自定义类名 | `string` | - |
| arrow-wrapper-style | 箭头容器自定义样式 | `object` | - |
| z-index | 层级 | `number` | `2000` |
| transition | 动画名称 | `string` | `'yh-tooltip-fade'` |
| teleported | 是否挂载至 body | `boolean` | `true` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| content | 自定义内容 (覆盖 content 属性) |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| show | 提示框显示时触发 | - |
| hide | 提示框隐藏时触发 | - |
| update:visible | 状态改变时触发 | `(visible: boolean)` |

### 主题变量 (CSS Variables)

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-z-index-tooltip` | Tooltip 层级 | `2004` |
| `--yh-font-size-sm` | 文字大小 | `13px` |
| `--yh-radius-md` | 圆角 | `8px` |
| `--yh-duration-slow` |动画持续时间 | `0.25s` |
| `--yh-shadow-xl` | 阴影效果 | (YH-UI 预设阴影) |
