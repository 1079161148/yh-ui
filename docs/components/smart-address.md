<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const addressBasic = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})

const addressSelect = ref({
  name: '',
  phone: '',
  province: '广东省',
  city: '深圳市',
  district: '南山区',
  street: '',
  detail: ''
})

const addressCascader = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})

const addressCustom = ref({
  name: '',
  phone: '',
  province: '440000', // 使用 Code 值
  city: '440300',
  district: '440305',
  street: '',
  detail: ''
})

const addressPlacement = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})

const regionOptionsCode = [
  {
    name: '广东省',
    code: '440000',
    items: [
      {
        name: '深圳市',
        code: '440300',
        items: [
          { name: '南山区', code: '440305' },
          { name: '福田区', code: '440304' }
        ]
      }
    ]
  }
]

const regionOptions = [
  {
    label: '广东省',
    value: '广东省',
    children: [
      {
        label: '深圳市',
        value: '深圳市',
        children: [
          { label: '南山区', value: '南山区' },
          { label: '福田区', value: '福田区' }
        ]
      },
      {
        label: '广州市',
        value: '广州市',
        children: [
          { label: '天河区', value: '天河区' },
          { label: '海珠区', value: '海珠区' }
        ]
      }
    ]
  },
  {
    label: '浙江省',
    value: '浙江省',
    children: [
      {
        label: '杭州市',
        value: '杭州市',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '余杭区', value: '余杭区' }
        ]
      }
    ]
  }
]

// ─── 基础用法 (输入框) ──────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="address" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsBasic = toJs(tsBasic)

// ─── 下拉框模式 ────────────────────────────────────────────────────────────────
const tsSelect = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="address"
      region-type="select"
      :region-options="regionOptions"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// 假设这些是从后端接口拉取的省市区树形数据配置
const regionOptions = [
  {
    label: '广东省', value: '广东省',
    children: [
      {
        label: '深圳市', value: '深圳市',
        children: [
          { label: '南山区', value: '南山区' },
          { label: '福田区', value: '福田区' }
        ]
      },
      {
        label: '广州市', value: '广州市',
        children: [
          { label: '天河区', value: '天河区' },
          { label: '海珠区', value: '海珠区' }
        ]
      }
    ]
  },
  {
    label: '浙江省', value: '浙江省',
    children: [
      {
        label: '杭州市', value: '杭州市',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '余杭区', value: '余杭区' }
        ]
      }
    ]
  }
]

const address = ref({
  name: '',
  phone: '',
  province: '广东省',
  city: '深圳市',
  district: '南山区',
  street: '',
  detail: ''
})
</${_S}>`
const jsSelect = toJs(tsSelect)

// ─── 级联组件模式 ──────────────────────────────────────────────────────────────
const tsCascader = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="address"
      region-type="cascader"
      :region-options="regionOptions"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const regionOptions = [
  {
    label: '广东省', value: '广东省',
    children: [
      {
        label: '深圳市', value: '深圳市',
        children: [
          { label: '南山区', value: '南山区' },
          { label: '福田区', value: '福田区' }
        ]
      },
      {
        label: '广州市', value: '广州市',
        children: [
          { label: '天河区', value: '天河区' },
          { label: '海珠区', value: '海珠区' }
        ]
      }
    ]
  },
  {
    label: '浙江省', value: '浙江省',
    children: [
      {
        label: '杭州市', value: '杭州市',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '余杭区', value: '余杭区' }
        ]
      }
    ]
  }
]

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsCascader = toJs(tsCascader)

const tsNuxt = `<${_T}>
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="address" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsNuxt = toJs(tsNuxt)

const tsCustom = `<${_T}>
  <div style="max-width: 700px; height: 650px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="address"
      region-type="select"
      :region-options="regionOptions"
      label-field="name"
      value-field="code"
      children-field="items"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// 后端返回的自定义字段数据源，value 为行政区划代码
const regionOptions = [
  {
    name: '广东省',
    code: '440000',
    items: [
      {
        name: '深圳市',
        code: '440300',
        items: [
          { name: '南山区', code: '440305' },
          { name: '福田区', code: '440304' }
        ]
      }
    ]
  }
]

const address = ref({
  name: '',
  phone: '',
  province: '440000',
  city: '440300',
  district: '440305',
  street: '',
  detail: ''
})
</${_S}>`
const jsCustom = toJs(tsCustom)

// ─── 标签位置 ─────────────────────────────────────────────────────────────────
const tsPlacement = `<${_T}>
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="address" label-placement="top" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const address = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  street: '',
  detail: ''
})
</${_S}>`
const jsPlacement = toJs(tsPlacement)
</script>

# SmartAddress 智能地址解析

集成智能解析算法的地址填写组件。支持从一段文字（粘贴的快递地址）中自动提取姓名、电话、省市区及详细地址并自动填充表单。
省市区功能内置三种展现形态（输入框、下拉框、级联选择），并天然支持后端返回的标准树形数据源结构。

## 基础用法 (输入框模式)

默认情况下，省市区为三个输入框，粘贴地址信息到输入框（例如：张三 13800138000 广东省深圳市南山区某某大厦101），点击「智能识别」。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressBasic" />
  </div>
</DemoBlock>

## 下拉框模式 (Select)

设置 \`region-type="select"\` 并传入 \`region-options\` 数据源。此时省市区表现为并列的三个下拉框，能够根据前一个框的配置产生上下级联动。

<DemoBlock title="下拉联动选择" :ts-code="tsSelect" :js-code="jsSelect">
  <div style="max-width: 700px; height: 650px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="addressSelect"
      region-type="select"
      :region-options="regionOptions"
    />
  </div>
</DemoBlock>

## 级联组件模式 (Cascader)

设置 `region-type="cascader"` 并传入数据源，这常用于使用一体化的级联下拉面板进行深层地区选取。

<DemoBlock title="级联地址选择" :ts-code="tsCascader" :js-code="jsCascader">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="addressCascader"
      region-type="cascader"
      :region-options="regionOptions"
    />
  </div>
</DemoBlock>

## 自定义字段与 Code 绑定

在实际业务中，后端返回的数据源字段名可能不是 `label/value`（如使用 `name/code`），且 v-model 绑定的通常是行政区划代码。
通过设置 `label-field` 和 `value-field` 可以灵活兼容各种数据结构，组件内部会自动处理从“中文解析结果”到“对应 Code 值”的映射。

<DemoBlock title="自定义字段与 Code" :ts-code="tsCustom" :js-code="jsCustom">
  <div style="max-width: 700px; height: 650px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address
      v-model="addressCustom"
      region-type="select"
      :region-options="regionOptionsCode"
      label-field="name"
      value-field="code"
      children-field="items"
    />
  </div>
</DemoBlock>

## 标签位置 (Label Placement)

通过设置 \`label-placement="top"\` 可以将标签切换到输入框上方展示，适用于窄屏或特定的表单布局。

<DemoBlock title="顶部对齐标签" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressPlacement" label-placement="top" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

该组件完全支持 Nuxt 3/4 的 SSR（服务端渲染）。在 Nuxt 项目中建议配合 `@yh-ui/nuxt` 模块使用。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 500px; height: 500px; margin: 0 auto; padding: 20px; background: var(--vp-c-bg); border: 1px solid var(--yh-border-color-lighter); border-radius: 8px;">
    <yh-smart-address v-model="addressBasic" />
  </div>
</DemoBlock>

### 配置方式

在你的 `nuxt.config.ts` 中配置好模块即可自动注册样式和组件：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    // 按需添加你所需的组件或者开启全局
    components: ['YhSmartAddress']
  }
})
```

## API

### Props

| 属性名                    | 说明                 | 类型                                | 默认值                         |
| ------------------------- | -------------------- | ----------------------------------- | ------------------------------ |
| `model-value` / `v-model` | 当前地址值           | `AddressValue`                      | `{ name: '', phone: '', ... }` |
| `region-type`             | 省市区输入形态       | `'input' \| 'select' \| 'cascader'` | `'input'`                      |
| `region-options`          | 省市区级联数据源     | `RegionOption[]`                    | `[]`                           |
| `label-field`             | 选项的标签字段名     | `string`                            | `'label'`                      |
| `value-field`             | 选项的值字段名       | `string`                            | `'value'`                      |
| `children-field`          | 选项的子级字段名     | `string`                            | `'children'`                   |
| `show-name`               | 是否显示姓名字段     | `boolean`                           | `true`                         |
| `show-phone`              | 是否显示电话字段     | `boolean`                           | `true`                         |
| `show-street`             | 是否显示街道字段     | `boolean`                           | `false`                        |
| `show-parser`             | 是否显示智能解析区域 | `boolean`                           | `true`                         |
| `parse-placeholder`       | 智能解析框的占位符   | `string`                            | —                              |
| `parse-button-text`       | 智能解析按钮文字     | `string`                            | `'智能识别'`                   |
| `required`                | 是否为必填项         | `boolean`                           | `false`                        |
| `disabled`                | 是否禁用整个组件     | `boolean`                           | `false`                        |
| `label-placement`         | 标签展示位置         | `'left' \| 'top'`                   | `'left'`                       |
| `parser`                  | 自定义解析函数       | `(raw: string) => ParsedAddress`    | —                              |
| `theme-overrides`         | 主题变量覆盖         | `Record<string, string>`            | —                              |

### Events

| 事件名              | 说明               | 回调参数                       |
| ------------------- | ------------------ | ------------------------------ |
| `update:modelValue` | 数据值变化时触发   | `(val: AddressValue) => void`  |
| `parsed`            | 智能解析完成后触发 | `(val: ParsedAddress) => void` |
| `change`            | 任意字段变更时触发 | `(val: AddressValue) => void`  |

### Slots

| 插槽名       | 说明                       |
| ------------ | -------------------------- |
| `default`    | 默认插槽，用于包裹整体内容 |
| `parse-icon` | 智能解析按钮左侧的图标插槽 |
| `region`     | 省市区输入区域的自定义插槽 |
| `extra`      | 组件底部的额外扩展区域插槽 |

### Types

**AddressValue**

```typescript
interface AddressValue {
  name: string
  phone: string
  province: string
  city: string
  district: string
  street: string
  detail: string
}
```

**RegionOption**

```typescript
interface RegionOption {
  label?: string // 标签字段
  value?: string | number // 绑定值字段
  children?: RegionOption[] // 子级字段
  [key: string]: unknown // 支持任意自定义字段
}
```

**ParsedAddress**

```typescript
interface ParsedAddress {
  name: string
  phone: string
  province: string
  city: string
  district: string
  street: string
  detail: string
}
```

### 主题变量

| 变量名                            | 说明             | 默认值                            |
| --------------------------------- | ---------------- | --------------------------------- |
| `--yh-smart-address-parser-bg`    | 智能识别区域背景 | `var(--yh-color-primary-light-9)` |
| `--yh-smart-address-input-bg`     | 输入框背景       | `var(--yh-fill-color-blank)`      |
| `--yh-smart-address-parse-btn-bg` | 识别按钮背景     | `var(--yh-color-primary)`         |
| `--yh-smart-address-tip-success`  | 识别成功提示颜色 | `var(--yh-color-success)`         |
| `--yh-smart-address-tip-error`    | 识别失败提示颜色 | `var(--yh-color-danger)`          |
| `--yh-smart-address-label-width`  | 表单标签宽度     | `72px`                            |
