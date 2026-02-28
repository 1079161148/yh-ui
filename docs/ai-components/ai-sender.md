# AiSender 智能输入

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <yh-ai-sender v-model="value" @send="onSend" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const onSend = (v: string) => {
  alert('你想发送：' + v)
}
</${_S}>`

const value = ref('')
const onSend = (v: string) => {
  alert('你想发送：' + v)
}

const tsLoading = `<${_T}>
  <yh-ai-sender v-model="value2" :loading="true" placeholder="AI 正在思考中..." />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value2 = ref('')
</${_S}>`

const value2 = ref('')

const tsAdvanced = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- 限制字数与清除按钮 -->
    <yh-ai-sender 
      v-model="valLimit" 
      :max-length="200" 
      show-word-limit 
      clearable 
      placeholder="输入一些内容，试试限制和清空..." 
    />

    <!-- 支持前缀后缀的高级多模态输入框组合 -->
    <yh-ai-sender v-model="valMulti" placeholder="询问任何问题...">
      <template #prefix>
        <yh-button text size="small">
          <yh-icon name="yh-icon-paperclip" style="margin-right: 4px;" /> 添加附件
        </yh-button>
      </template>
      <template #actions>
        <yh-button text circle>
          <yh-icon name="yh-icon-microphone" />
        </yh-button>
      </template>
    </yh-ai-sender>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const valLimit = ref('这是一些默认的高价值内容！')
const valMulti = ref('')
</${_S}>`

const tsSlot = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="valSlot" placeholder="询问任何问题...">
      <template #submit="{ disabled, loading, submit }">
        <yh-button 
          circle 
          type="success" 
          :disabled="disabled"
          :loading="loading"
          @click="submit">
          <template #icon>
            <yh-icon name="check-circle" />
          </template>
        </yh-button>
      </template>
    </yh-ai-sender>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const valSlot = ref('')
</${_S}>`

const valLimit = ref('这是一些默认的高价值内容！')
const valMulti = ref('')
const valSlot = ref('')
</script>

支持多行自适应的智能输入框，内衬发送图标。

## 基础用法

可以支持按下回车键（Enter）自动提交！

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value" @send="onSend" />
  </div>
</DemoBlock>

## 加载状态

结合 `:loading` 使用表示正在回复禁止输入的情况。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value2" :loading="true" placeholder="AI 正在思考中..." />
  </div>
</DemoBlock>

## 进阶与多模态扩展

提供了诸如字数限制 `max-length`，自动计数 `show-word-limit`，一键重置 `clearable` 等高阶能力。
通过插入 `prefix` / `actions`，还能极其轻松地实现文件上传、语音识别的高级智能组件拼装容器！

<DemoBlock title="进阶模态" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:16px; display: flex; flex-direction: column; gap: 16px;">
<!-- 限制字数与清除按钮 -->
<yh-ai-sender 
  v-model="valLimit" 
  :max-length="200" 
  show-word-limit 
  clearable 
  placeholder="输入一些内容，试试限制和清空..." 
/>
<!-- 支持前缀后缀的高级多模态输入框组合 -->
<yh-ai-sender v-model="valMulti" placeholder="询问任何问题...">
  <template #prefix>
    <yh-button text size="small">
      <yh-icon name="paperclip" style="margin-right: 4px;" /> 添加附件
    </yh-button>
  </template>
  <template #actions>
    <yh-button text circle>
      <yh-icon name="microphone" />
    </yh-button>
  </template>
</yh-ai-sender>
</div>
</DemoBlock>

## 完全自定义发送槽

您可以通过 `#submit` 插槽完全接管发出请求区域的视图逻辑。本例中将用成功的勾号替换原有的发送箭头。

<div class="demo-box">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="valSlot" placeholder="询问任何问题...">
      <template #submit="{ disabled, loading, submit }">
        <yh-button 
          circle 
          type="success" 
          :disabled="disabled"
          :loading="loading"
          @click="submit">
          <template #icon>
            <yh-icon name="check-circle" />
          </template>
        </yh-button>
      </template>
    </yh-ai-sender>
  </div>
</div>

## 在 Nuxt 中使用

该组件全面支持 Nuxt 3/4 SSR 渲染。在 Nuxt 项目中组件会自动按需导入，无需手动注册。可以完美嵌入各类现代框架工程中。

有关详细配置和使用方法，请阅读 [Nuxt 集成文档](/guide/nuxt)。

**SSR 注意事项**：

- ✅ Props 属性状态安全同步
- ✅ v-model 完美支持双向绑定同构
- ✅ Slots 的客户端与服务端结构一致

::: tip SSR 安全性
AiSender 输入组件经过精心设计，高度可依赖。
:::

## API

### Props

| 属性名               | 说明                     | 类型      | 默认值                |
| -------------------- | ------------------------ | --------- | --------------------- |
| modelValue / v-model | 输入内容绑定值           | `string`  | `''`                  |
| placeholder          | 占位文本                 | `string`  | `'Send a message...'` |
| loading              | 是否在等待AI响应         | `boolean` | `false`               |
| disabled             | 是否禁用                 | `boolean` | `false`               |
| maxLength            | 原生 maxlength 输入限制  | `number`  | —                     |
| clearable            | 是否展示清空一键按钮     | `boolean` | `false`               |
| showWordLimit        | 是否展示底部字数统计数字 | `boolean` | `false`               |

### Events

| 事件名            | 说明                                | 回调参数                  |
| ----------------- | ----------------------------------- | ------------------------- |
| update:modelValue | 内容改变触发                        | `(value: string) => void` |
| change            | 输入框内容改变时                    | `(value: string) => void` |
| send              | 按下发送按钮或者回车时              | `(value: string) => void` |
| clear             | 点击 clearable 按钮重置文本框时触发 | `() => void`              |

### Slots

| 插槽名  | 说明                                                                                    |
| ------- | --------------------------------------------------------------------------------------- |
| prefix  | 输入框内部左上的内容前缀                                                                |
| suffix  | 输入框内部与发送按钮之间的后缀拓展区（上传、录音等）                                    |
| actions | 发送按钮外层的包裹自定义插槽区                                                          |
| submit  | 替换默认的发送图标与按钮整体，向外暴露 `disabled`, `loading` 状态以及 `submit` 发送函数 |

| 变量名                              | 说明           | 默认值                                               |
| ----------------------------------- | -------------- | ---------------------------------------------------- |
| `--yh-ai-sender-bg`                 | 输入框背景色   | `var(--yh-bg-color-overlay)`                         |
| `--yh-ai-sender-border-color`       | 输入框边框颜色 | `var(--yh-border-color)`                             |
| `--yh-ai-sender-focus-border-color` | 聚焦时边框颜色 | `var(--yh-color-primary)`                            |
| `--yh-ai-sender-border-radius`      | 输入框圆角大小 | `16px`                                               |
| `--yh-ai-sender-shadow`             | 输入框阴影     | `0 4px 16px rgba(0, 0, 0, 0.08)`                     |
| `--yh-ai-sender-focus-shadow`       | 聚焦时阴影     | `0 6px 20px rgba(var(--yh-color-primary-rgb), 0.15)` |
