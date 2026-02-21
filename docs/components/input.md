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

// Feature 1: Variant
const inputVariant1 = ref('')
const inputVariant2 = ref('')
const inputVariant3 = ref('')
const inputVariant4 = ref('')

// Feature 2: Loading
const inputLoading = ref('VuePress')
const isLoading = ref(false)
const handleCheckAsync = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 2000)
}

// Feature 3: Status
const inputStatusSuccess = ref('输入正确')
const inputStatusWarning = ref('请注意格式')
const inputStatusError = ref('格式错误')

// Feature 4: SelectOnFocus
const inputSelectFocus = ref('点击选中我')

// Feature 5: ClearOnEscape
const inputEscape = ref('按 Esc 键清空')

// Feature 6: List / prefix suffix string
const inputList = ref('')
const inputPrefixStr = ref('')
const inputSuffixStr = ref('')

// Feature 7: CountConfig
const inputCountConfig = ref('')
const countChinese = (value: string) => {
  let count = 0
  for (const ch of value) {
    count += /[\u4e00-\u9fa5]/.test(ch) ? 2 : 1
  }
  return count
}

// Nuxt 使用示例
const nuxtInput = ref('')

const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <!-- 基础输入框，自动导入 -->
    <yh-input v-model="nuxtInput" placeholder="Nuxt 自动导入" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhInput
const nuxtInput = ref('')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const formatNumber = (value: string | number) => {
  if (!value) return ''
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const parseNumber = (value: string) => {
  return value.replace(/,/g, '')
}

// ── Feature Demo 代码字符串 ──────────────────────────────────

const tsVariant = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <yh-input v-model="v1" placeholder="default（默认带边框）" />
    <yh-input v-model="v2" variant="filled" placeholder="filled（填充色背景）" />
    <yh-input v-model="v3" variant="borderless" placeholder="borderless（无边框）" />
    <yh-input v-model="v4" variant="underlined" placeholder="underlined（下划线）" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
const v4 = ref('')
<\/script>`

const jsVariant = tsVariant.replace('lang="ts"', '')

const tsLoading = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputVal" :loading="isLoading" placeholder="检查用户名..." clearable />
    <yh-button @click="handleCheck">异步校验（模拟 2s）</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('VuePress')
const isLoading = ref(false)
const handleCheck = () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 2000)
}
<\/script>`

const jsLoading = tsLoading.replace('lang="ts"', '')

const tsStatus = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="v1" status="success" placeholder="成功状态" />
    <yh-input v-model="v2" status="warning" placeholder="警告状态" />
    <yh-input v-model="v3" status="error" placeholder="错误状态" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const v1 = ref('输入正确')
const v2 = ref('请注意格式')
const v3 = ref('格式错误')
<\/script>`

const jsStatus = tsStatus.replace('lang="ts"', '')

const tsSelectFocus = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputVal" select-on-focus placeholder="点击输入框自动全选" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('点击选中我')
<\/script>`

const jsSelectFocus = tsSelectFocus.replace('lang="ts"', '')

const tsClearEscape = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputVal" clear-on-escape clearable placeholder="按 Esc 键一键清空" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('按 Esc 键清空')
<\/script>`

const jsClearEscape = tsClearEscape.replace('lang="ts"', '')

const tsListPrefix = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <!-- prefix/suffix 字符串属性 -->
    <yh-input v-model="price" prefix="¥" suffix="元" placeholder="请输入价格" />
    <!-- 原生 datalist 联动 -->
    <yh-input v-model="framework" list="framework-list" placeholder="选择或输入技术栈" />
    <datalist id="framework-list">
      <option value="Vue" />
      <option value="React" />
      <option value="Angular" />
      <option value="Svelte" />
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const price = ref('')
const framework = ref('')
<\/script>`

const jsListPrefix = tsListPrefix.replace('lang="ts"', '')

const tsCountConfig = `<template>
  <div style="max-width: 320px;">
    <yh-input
      v-model="inputVal"
      :maxlength="20"
      show-word-limit
      :count-config="{ calculate: countChinese }"
      placeholder="汉字占 2 字节，英文占 1 字节"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputVal = ref('')

// 汉字算 2 个字节，其他字符算 1 个字节
const countChinese = (value: string) => {
  let count = 0
  for (const ch of value) {
    count += /[\\u4e00-\\u9fa5]/.test(ch) ? 2 : 1
  }
  return count
}
<\/script>`

const jsCountConfig = `<template>
  <div style="max-width: 320px;">
    <yh-input
      v-model="inputVal"
      :maxlength="20"
      show-word-limit
      :count-config="{ calculate: countChinese }"
      placeholder="汉字占 2 字节，英文占 1 字节"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const inputVal = ref('')

const countChinese = (value) => {
  let count = 0
  for (const ch of value) {
    count += /[\\u4e00-\\u9fa5]/.test(ch) ? 2 : 1
  }
  return count
}
<\/script>`

// 代码示例
const tsBasic = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputBase" placeholder="请输入内容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputBase = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="max-width: 320px;">
    <yh-input placeholder="禁用状态" disabled />
  </div>
</template>`

const jsDisabled = tsDisabled

const tsClearable = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputClearable" placeholder="请输入内容" clearable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputClearable = ref('')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsPassword = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputPassword = ref('')
<\/script>`

const jsPassword = tsPassword.replace('lang="ts"', '')

const tsIcon = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputIcon1" placeholder="请输入搜索内容" prefix-icon="🔍" />
    <yh-input v-model="inputIcon2" placeholder="请输入日期" suffix-icon="📅" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputIcon1 = ref('')
const inputIcon2 = ref('')
<\/script>`

const jsIcon = tsIcon.replace('lang="ts"', '')

const tsTextarea = `<template>
  <div style="max-width: 320px;">
    <yh-input v-model="inputTextarea" type="textarea" placeholder="请输入内容" :rows="3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputTextarea = ref('')
<\/script>`

const jsTextarea = tsTextarea.replace('lang="ts"', '')

const tsAutosize = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="自动调整高度" />
    <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="限制 2-4 行" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputAutosize1 = ref('')
const inputAutosize2 = ref('')
<\/script>`

const jsAutosize = tsAutosize.replace('lang="ts"', '')

const tsComposite = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <yh-input v-model="inputComposite1" placeholder="Please input">
      <template #prepend>Http://</template>
    </yh-input>

    <yh-input v-model="inputComposite2" placeholder="Please input">
      <template #append>.com</template>
    </yh-input>

    <yh-input v-model="inputComposite3" placeholder="Please input">
      <template #prepend>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
      <template #append>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
    </yh-input>

    <yh-input v-model="inputComposite4" placeholder="Please input">
      <template #prepend>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
      <template #append>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
    </yh-input>
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
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputLength1" placeholder="最多10字符" :maxlength="10" show-word-limit />
    <yh-input v-model="inputLength2" type="textarea" placeholder="最多100字符" :maxlength="100" show-word-limit :rows="3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputLength1 = ref('')
const inputLength2 = ref('')
<\/script>`

const jsWordLimit = tsWordLimit.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
    <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
    <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
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
  <div style="max-width: 320px;">
    <yh-input v-model="inputFormatter" placeholder="请输入数值" :formatter="formatNumber" :parser="parseNumber" />
    <div class="demo-val-badge">实际内部值: {{ inputFormatter }}</div>
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
  <div style="max-width: 320px;">
    <yh-input v-model="inputBase" placeholder="请输入内容" />
  </div>
</DemoBlock>

## 禁用状态

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 320px;">
    <yh-input v-model="inputDisabled" placeholder="禁用状态" disabled />
  </div>
</DemoBlock>

## 可清空

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 320px;">
    <yh-input v-model="inputClearable" placeholder="可清空" clearable />
  </div>
</DemoBlock>

## 密码框

<DemoBlock title="密码框" :ts-code="tsPassword" :js-code="jsPassword">
  <div style="max-width: 320px;">
    <yh-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password />
  </div>
</DemoBlock>

## 带图标的输入框

<DemoBlock title="带图标" :ts-code="tsIcon" :js-code="jsIcon">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputIcon1" placeholder="请输入搜索内容" prefix-icon="🔍" />
    <yh-input v-model="inputIcon2" placeholder="请输入日期" suffix-icon="📅" />
  </div>
</DemoBlock>

## 文本域

<DemoBlock title="文本域" :ts-code="tsTextarea" :js-code="jsTextarea">
  <div style="max-width: 320px;">
    <yh-input v-model="inputTextarea" type="textarea" placeholder="请输入内容" :rows="3" />
  </div>
</DemoBlock>

## 可自适应文本高度的文本域

<DemoBlock title="自动高度" :ts-code="tsAutosize" :js-code="jsAutosize">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputAutosize1" type="textarea" autosize placeholder="自动调整高度" />
    <yh-input v-model="inputAutosize2" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="限制 2-4 行" />
  </div>
</DemoBlock>

## 复合型输入框

可以在输入框前后添加一个元素，通常是标签或按钮。

<DemoBlock title="复合输入框" :ts-code="tsComposite" :js-code="jsComposite">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
    <yh-input v-model="inputComposite1" placeholder="Please input">
      <template #prepend>Http://</template>
    </yh-input>
    <yh-input v-model="inputComposite2" placeholder="Please input">
      <template #append>.com</template>
    </yh-input>
    <yh-input v-model="inputComposite3" placeholder="Please input">
      <template #prepend>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
      <template #append>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
    </yh-input>
    <yh-input v-model="inputComposite4" placeholder="Please input">
      <template #prepend>
        <yh-button icon="🔍">🔍</yh-button>
      </template>
      <template #append>
        <yh-select v-model="selectValue" placeholder="Select" style="width: 115px">
          <yh-option label="Vue" value="1" />
          <yh-option label="React" value="2" />
          <yh-option label="Node" value="3" />
        </yh-select>
      </template>
    </yh-input>
  </div>
</DemoBlock>

## 输入长度限制

<DemoBlock title="字数限制" :ts-code="tsWordLimit" :js-code="jsWordLimit">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputLength1" placeholder="最多10字符" :maxlength="10" show-word-limit />
    <yh-input v-model="inputLength2" type="textarea" placeholder="最多100字符" :maxlength="100" show-word-limit :rows="3" />
  </div>
</DemoBlock>

## 不同尺寸

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputSizeLarge" size="large" placeholder="Large Size" />
    <yh-input v-model="inputSizeDefault" placeholder="Default Size" />
    <yh-input v-model="inputSizeSmall" size="small" placeholder="Small Size" />
  </div>
</DemoBlock>

## 格式化输入

<DemoBlock title="格式化" :ts-code="tsFormatter" :js-code="jsFormatter">
  <div style="max-width: 320px;">
    <yh-input v-model="inputFormatter" placeholder="请输入数值" :formatter="formatNumber" :parser="parseNumber" />
    <div class="demo-val-badge">实际内部值: {{ inputFormatter }}</div>
  </div>
</DemoBlock>

## 视觉变体

通过 `variant` 属性可以切换四种视觉风格：`default`（带边框）、`filled`（填充色）、`borderless`（无边框）、`underlined`（下划线）。

<DemoBlock title="视觉变体" :ts-code="tsVariant" :js-code="jsVariant">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <yh-input v-model="inputVariant1" placeholder="default（默认带边框）" />
    <yh-input v-model="inputVariant2" variant="filled" placeholder="filled（填充色背景）" />
    <yh-input v-model="inputVariant3" variant="borderless" placeholder="borderless（无边框）" />
    <yh-input v-model="inputVariant4" variant="underlined" placeholder="underlined（下划线）" />
  </div>
</DemoBlock>

## 加载状态

设置 `loading` 属性为 `true` 时，在输入框尾部显示旋转加载图标，常用于异步校验用户名、实时搜索等场景。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputLoading" :loading="isLoading" placeholder="检查用户名..." clearable />
    <yh-button @click="handleCheckAsync">异步校验（模拟 2s）</yh-button>
  </div>
</DemoBlock>

## 独立状态色

通过 `status` 属性可以在不依赖 Form 表单的情况下，直接给输入框赋予 `success`、`warning`、`error` 三种状态反馈色。

<DemoBlock title="独立状态色" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-input v-model="inputStatusSuccess" status="success" placeholder="成功状态" />
    <yh-input v-model="inputStatusWarning" status="warning" placeholder="警告状态" />
    <yh-input v-model="inputStatusError" status="error" placeholder="错误状态" />
  </div>
</DemoBlock>

## 聚焦自选

设置 `select-on-focus` 后，用户鼠标点击或 Tab 键切入输入框时会自动全选内部文字，非常适合数值编辑、表格单元格编辑等场景。

<DemoBlock title="聚焦自选" :ts-code="tsSelectFocus" :js-code="jsSelectFocus">
  <div style="max-width: 320px;">
    <yh-input v-model="inputSelectFocus" select-on-focus placeholder="点击输入框自动全选" />
  </div>
</DemoBlock>

## Esc 键清空

设置 `clear-on-escape` 后，用户按 `Esc` 键时会立即清空输入框内容，配合 `clearable` 使用体验更佳。

<DemoBlock title="Esc 键清空" :ts-code="tsClearEscape" :js-code="jsClearEscape">
  <div style="max-width: 320px;">
    <yh-input v-model="inputEscape" clear-on-escape clearable placeholder="按 Esc 键一键清空" />
  </div>
</DemoBlock>

## 前后缀字符串 / 原生 Datalist

`prefix`/`suffix` 属性支持直接传入字符串（如货币符号、单位），无需写插槽。`list` 属性绑定原生 `<datalist>` 的 id，实现本地联想筛选。

<DemoBlock title="前后缀字符串与 Datalist" :ts-code="tsListPrefix" :js-code="jsListPrefix">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
    <yh-input v-model="inputPrefixStr" prefix="¥" suffix="元" placeholder="请输入价格" />
    <yh-input v-model="inputList" list="framework-datalist" placeholder="选择或输入技术栈" />
    <datalist id="framework-datalist">
      <option value="Vue" />
      <option value="React" />
      <option value="Angular" />
      <option value="Svelte" />
    </datalist>
  </div>
</DemoBlock>

## 自定义字数计算

通过 `count-config` 的 `calculate` 函数可以自定义字数统计逻辑，例如让汉字计 2 字节、英文计 1 字节。

<DemoBlock title="自定义字数计算" :ts-code="tsCountConfig" :js-code="jsCountConfig">
  <div style="max-width: 320px;">
    <yh-input
      v-model="inputCountConfig"
      :maxlength="20"
      show-word-limit
      :count-config="{ calculate: countChinese }"
      placeholder="汉字占 2 字节，英文占 1 字节"
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Input 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-input v-model="nuxtInput" placeholder="Nuxt 自动导入" />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 基础输入、文本域模式完全支持
- ✅ 样式及布局在服务器和浏览器保持一致
- ✅ 动态 ID 生成在 SSR 中是安全的（基于 `useId`）
- ⚠️ `autofocus` 属性仅在客户端激活后生效

::: tip SSR 安全性
Input 组件针对 SSR 进行了优化，特别是 ID 生成机制确保了服务端渲染和客户端激活的一致性，有效避免了属性不匹配错误。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number` | — |
| type | 类型 | `'text' \| 'password' \| 'textarea' \| 'number' \| 'email' \| 'url' \| 'tel' \| 'search'` | `'text'` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 占位文本 | `string` | — |
| variant | 视觉变体 | `'default' \| 'filled' \| 'borderless' \| 'underlined'` | `'default'` |
| status | 独立状态反馈色，不依赖 FormItem | `'' \| 'success' \| 'warning' \| 'error'` | `''` |
| loading | 是否显示加载状态 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| clear-on-escape | 按 Esc 键时是否清空内容 | `boolean` | `false` |
| select-on-focus | 获取焦点时是否自动全选文字 | `boolean` | `false` |
| show-password | 是否显示切换密码图标 | `boolean` | `false` |
| show-word-limit | 是否显示字数统计 | `boolean` | `false` |
| count-config | 自定义字数统计配置 | `{ calculate?: (value: string) => number }` | — |
| maxlength | 最大输入长度 | `number \| string` | — |
| minlength | 最小输入长度 | `number \| string` | — |
| prefix-icon | 前置图标 | `string \| Component` | — |
| suffix-icon | 后置图标 | `string \| Component` | — |
| clear-icon | 清除图标 | `string \| Component` | — |
| prefix | 前置文本（字符串快捷方式，与 #prefix 插槽等效） | `string` | — |
| suffix | 后置文本（字符串快捷方式，与 #suffix 插槽等效） | `string` | — |
| list | 原生 list 属性，绑定 datalist 的 id | `string` | — |
| autofocus | 自动获取焦点 | `boolean` | `false` |
| autocomplete | 原生 autocomplete 属性 | `string` | `'off'` |
| name | 原生 name 属性 | `string` | — |
| form | 原生 form 属性 | `string` | — |
| id | 输入框 id | `string` | — |
| aria-label | 等价于原生 input `aria-label` 属性 | `string` | — |
| tabindex | 输入框的 tabindex | `string \| number` | — |
| validate-event | 输入时是否触发表单的校验 | `boolean` | `true` |
| input-style | input 元素或 textarea 元素的 style | `string \| object` | — |
| label | (已过时) 等价于原生 input `aria-label` 属性，建议使用 aria-label | `string` | — |
| inputmode | 等价于原生 input `inputmode` 属性 | `string` | — |
| model-modifiers | v-model 修饰符 | `object` | — |
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
| loadingIcon | 自定义加载图标 |

### Expose

| 属性/方法名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 输入框 DOM 元素 | `HTMLInputElement \| HTMLTextAreaElement \| undefined` |
| wrapperRef | 包裹元素 DOM | `HTMLElement \| undefined` |
| focus | 使 input 获取焦点 | `() => void` |
| blur | 使 input 失去焦点 | `() => void` |
| select | 选中 input 中的文字 | `() => void` |
| clear | 清空 input 内容 | `() => void` |
| textLength | 当前输入值的显示字数（应用 countConfig 后的结果） | `number` |

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
