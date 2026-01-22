# Input 输入框

<script setup lang="ts">
import { ref } from 'vue'

// Demo 状态
const inputBase = ref('')
const inputDisabled = ref('')
const inputClearable = ref('')
const inputPassword = ref('')
const inputIcon1 = ref('')
const inputIcon2 = ref('')
const inputTextarea = ref('')
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
const inputComposite1 = ref('')
const inputComposite2 = ref('')
const inputComposite3 = ref('')
const inputComposite4 = ref('')
const inputLength1 = ref('')
const inputLength2 = ref('')
const inputSizeLarge = ref('')
const inputSizeDefault = ref('')
const inputSizeSmall = ref('')
const inputFormatter = ref('')
const selectValue = ref('1')

const formatNumber = (value: string | number) => {
  if (!value) return ''
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}

// 代码示例
const tsBasic = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">基础输入</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputBase" placeholder="请输入内容" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputBase = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">禁用</span>
      <div class="yh-demo-content">
        <yh-input placeholder="禁用状态" disabled />
      </div>
    </div>
  </div>
</template>`

const jsDisabled = tsDisabled

const tsClearable = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">可清空</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputClearable" placeholder="请输入内容" clearable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputClearable = ref('')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsPassword = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">密码框</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputPassword = ref('')
<\/script>`

const jsPassword = tsPassword.replace('lang="ts"', '')

const tsIcon = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">前置图标</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon1" placeholder="请输入搜索内容" prefix-icon="🔍" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">后置图标</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon2" placeholder="请输入日期" suffix-icon="📅" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputIcon1 = ref('')
const inputIcon2 = ref('')
<\/script>`

const jsIcon = tsIcon.replace('lang="ts"', '')

const tsTextarea = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">文本域</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputTextarea" type="textarea" placeholder="请输入内容" :rows="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputTextarea = ref('')
<\/script>`

const jsTextarea = tsTextarea.replace('lang="ts"', '')

const tsAutosize = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">自动高度</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="自动调整高度" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">限制高度</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="限制 2-4 行" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
<\/script>`

const jsAutosize = tsAutosize.replace('lang="ts"', '')

const tsComposite = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">前置组件</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite1" placeholder="Please input">
          <template #prepend>Http://</template>
        </yh-input>
      </div>
    </div>

    <div class="yh-demo-row">
      <span class="yh-demo-label">后置组件</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite2" placeholder="Please input">
          <template #append>.com</template>
        </yh-input>
      </div>
    </div>

    <div class="yh-demo-row">
      <span class="yh-demo-label">组合选择</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite3" placeholder="Please input">
          <template #prepend>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
          <template #append>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
        </yh-input>
      </div>
    </div>

    <div class="yh-demo-row">
      <span class="yh-demo-label">前后按钮</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite4" placeholder="Please input">
          <template #prepend>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
          <template #append>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
        </yh-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputComposite1 = ref('')
const inputComposite2 = ref('')
const inputComposite3 = ref('')
const inputComposite4 = ref('')
const selectValue = ref('1')
<\/script>`

const jsComposite = tsComposite.replace('lang="ts"', '')

const tsWordLimit = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">文本输入</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength1" placeholder="最多10字符" :maxlength="10" show-word-limit />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">长篇内容</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength2" type="textarea" placeholder="最多100字符" :maxlength="100" show-word-limit :rows="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputLength1 = ref('')
const inputLength2 = ref('')
<\/script>`

const jsWordLimit = tsWordLimit.replace('lang="ts"', '')

const tsSizes = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row yh-demo-row--large">
      <span class="yh-demo-label">大型 - 40px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">默认 - 32px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
      </div>
    </div>
    <div class="yh-demo-row yh-demo-row--small">
      <span class="yh-demo-label">小型 - 24px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputSizeLarge = ref('')
const inputSizeDefault = ref('')
const inputSizeSmall = ref('')
<\/script>`

const jsSizes = tsSizes

const tsFormatter = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">金额限制</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputFormatter" placeholder="请输入数值" :formatter="formatNumber" :parser="parseNumber" />
        <div style="width: 100%; margin-top: 4px;">
           <div class="demo-val-badge">实际内部值: {{ inputFormatter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputFormatter = ref('')

const formatNumber = (value: string | number) => {
  if (!value) return ''
  return String(value).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}
<\/script>`

const jsFormatter = tsFormatter.replace('lang="ts"', '')
</script>

通过鼠标或键盘输入内容，是最基础的表单域包装。

## 基础用法

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">基础输入</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputBase" placeholder="请输入内容" />
      </div>
    </div>
  </div>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">禁用</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputDisabled" placeholder="禁用状态" disabled />
      </div>
    </div>
  </div>
</DemoBlock>

## 可清空

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">可清空</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputClearable" placeholder="可清空" clearable />
      </div>
    </div>
  </div>
</DemoBlock>

## 密码框

<DemoBlock title="密码框" :ts-code="tsPassword" :js-code="jsPassword">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">查看密码</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password />
      </div>
    </div>
  </div>
</DemoBlock>

## 带图标的输入框

<DemoBlock title="带图标" :ts-code="tsIcon" :js-code="jsIcon">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">前置图标</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon1" placeholder="请输入搜索内容" prefix-icon="🔍" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">后置图标</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputIcon2" placeholder="请输入日期" suffix-icon="📅" />
      </div>
    </div>
  </div>
</DemoBlock>

## 文本域

<DemoBlock title="文本域" :ts-code="tsTextarea" :js-code="jsTextarea">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">文本域</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputTextarea" type="textarea" placeholder="请输入内容" :rows="3" />
      </div>
    </div>
  </div>
</DemoBlock>

## 可自适应文本高度的文本域

<DemoBlock title="自动高度" :ts-code="tsAutosize" :js-code="jsAutosize">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">自动高度</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="自动调整高度" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">限制高度</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="限制 2-4 行" />
      </div>
    </div>
  </div>
</DemoBlock>

## 复合型输入框

可以在输入框前后添加一个元素，通常是标签或按钮。

<DemoBlock title="复合输入框" :ts-code="tsComposite" :js-code="jsComposite">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">前置组件</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite1" placeholder="Please input">
          <template #prepend>Http://</template>
        </yh-input>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">后置组件</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite2" placeholder="Please input">
          <template #append>.com</template>
        </yh-input>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">组合选择</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite3" placeholder="Please input">
          <template #prepend>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
          <template #append>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
        </yh-input>
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">前后按钮</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputComposite4" placeholder="Please input">
          <template #prepend>
            <yh-button icon="🔍">🔍</yh-button>
          </template>
          <template #append>
            <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
              <yh-option label="Restaurant" value="1" />
              <yh-option label="Order No." value="2" />
              <yh-option label="Tel" value="3" />
            </yh-select>
          </template>
        </yh-input>
      </div>
    </div>
  </div>
</DemoBlock>

## 输入长度限制

<DemoBlock title="字数限制" :ts-code="tsWordLimit" :js-code="jsWordLimit">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">文本输入</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength1" placeholder="最多10字符" :maxlength="10" show-word-limit />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">长篇内容</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputLength2" type="textarea" placeholder="最多100字符" :maxlength="100" show-word-limit :rows="3" />
      </div>
    </div>
  </div>
</DemoBlock>

## 不同尺寸

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row yh-demo-row--large">
      <span class="yh-demo-label">大型 - 40px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">默认 - 32px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
      </div>
    </div>
    <div class="yh-demo-row yh-demo-row--small">
      <span class="yh-demo-label">小型 - 24px</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
      </div>
    </div>
  </div>
</DemoBlock>

## 格式化输入

<DemoBlock title="格式化" :ts-code="tsFormatter" :js-code="jsFormatter">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">金额限制</span>
      <div class="yh-demo-content">
        <yh-input v-model="inputFormatter" placeholder="请输入数值" :formatter="formatNumber" :parser="parseNumber" />
        <div style="width: 100%; margin-top: 4px;">
          <div class="demo-val-badge">实际内部值: {{ inputFormatter }}</div>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number` | — |
| type | 类型 | `'text' \| 'password' \| 'textarea' \| 'number' \| 'email' \| 'url' \| 'tel' \| 'search'` | `'text'` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 占位文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| show-password | 是否显示切换密码图标 | `boolean` | `false` |
| show-word-limit | 是否显示字数统计 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number \| string` | — |
| minlength | 最小输入长度 | `number \| string` | — |
| prefix-icon | 前置图标 | `string \| Component` | — |
| suffix-icon | 后置图标 | `string \| Component` | — |
| clear-icon | 清除图标 | `string \| Component` | — |
| autofocus | 自动获取焦点 | `boolean` | `false` |
| autocomplete | 原生 autocomplete 属性 | `string` | `'off'` |
| name | 原生 name 属性 | `string` | — |
| form | 原生 form 属性 | `string` | — |
| id | 输入框 id | `string` | — |
| tabindex | 输入框 tabindex | `string \| number` | — |
| validate-event | 输入时是否触发表单验证 | `boolean` | `true` |
| input-style | 输入框行内样式 | `object` | — |
| formatter | 格式化函数（用于显示） | `(value: string \| number) => string` | — |
| parser | 解析函数（用于更新值） | `(value: string) => string` | — |
| rows | 文本域行数 (type="textarea" 时有效) | `number` | `2` |
| autosize | 自适应文本高度 (type="textarea" 时有效) | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| resize | 是否允许调整大小 (type="textarea" 时有效) | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新时触发 | `(value: string) => void` |
| input | 在 Input 值改变时触发 | `(value: string) => void` |
| change | 在 Input 失去焦点或用户按下回车时触发 | `(value: string) => void` |
| focus | 在 Input 获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 在 Input 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 在点击清空按钮时触发 | `() => void` |
| keydown | 按下键盘时触发 | `(event: KeyboardEvent) => void` |
| keyup | 释放键盘时触发 | `(event: KeyboardEvent) => void` |
| compositionstart | 输入法开始输入时触发 | `(event: CompositionEvent) => void` |
| compositionupdate | 输入法输入过程中触发 | `(event: CompositionEvent) => void` |
| compositionend | 输入法输入结束时触发 | `(event: CompositionEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容（复合输入框） |
| append | 输入框后置内容（复合输入框） |
| clearIcon | 自定义清除图标 |

### Expose

| 属性/方法名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 输入框 DOM 元素 | `HTMLInputElement \| HTMLTextAreaElement \| undefined` |
| wrapperRef | 包裹元素 DOM | `HTMLElement \| undefined` |
| focus | 使 input 获取焦点 | `() => void` |
| blur | 使 input 失去焦点 | `() => void` |
| select | 选中 input 中的文字 | `() => void` |
| clear | 清空 input 内容 | `() => void` |

## 主题变量

Input 组件使用以下 CSS 变量，你可以通过覆盖这些变量来自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-input-height` | 输入框高度 | `var(--yh-component-size-default)` |
| `--yh-input-font-size` | 字体大小 | `var(--yh-font-size-base)` |
| `--yh-input-padding` | 输入框内边距 | `0 var(--yh-spacing-md)` |
| `--yh-input-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-input-hover-border-color` | 悬停边框色 | `var(--yh-border-color-hover)` |
| `--yh-input-focus-border-color` | 聚焦边框色 | `var(--yh-color-primary)` |
| `--yh-input-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
