# 表单设计最佳实践

YH-UI 的表单组件，尤其是 `FormSchema`，适合用于需要统一字段定义、校验规则和渲染逻辑的 schema 驱动表单场景。

## 为什么选择 YH-UI 表单？

### 1. 逻辑高度聚合

在传统开发模式中，表单的布局、数据联动、校验逻辑往往分散在 `template`、`script` 和冗长的 `watch` 中。YH-UI 通过 `FormSchema` 将这些逻辑统一收敛到一份 JSON 配置中：

- **声明式联动**：通过 `props`、`hidden` 函数直接根据当前模型状态计算 UI 表现。
- **内聚布局**：Schema 支持基于列的布局配置，便于将相关表单结构集中维护。

### 2. 极致的类型安全 (DX)

表单相关包同时暴露了实例类型，便于在业务中直接使用：

- **精确推断**：导出的 `FormSchemaInstance` 提供了完整的 API 补全。
- **公开实例类型**：可以从公开导出中引入 `FormSchemaInstance` 和 `FormInstance`。

### 3. 表单实力的安全性

- **校验 API**：schema/form 实例都暴露了 `validate`、`resetFields`、`clearValidate`、`scrollToField`。
- **模型访问**：`FormSchemaInstance` 还暴露了 `getModel`、`setFieldValue` 和 `formRef`。

## 高级应用示例

这个示例展示了 YH-UI 表单引擎处理复杂逻辑的能力：**动态分组、多级联动、异步验证、自定义渲染、以及完善的类型安全。**

<DemoBlock title="企业级入驻表单" :ts-code="tsStep" :js-code="jsStep">
  <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color-overlay); border-radius: 8px; border: 1px solid var(--yh-border-color-light);">
    <yh-form-schema 
      ref="formRef"
      v-model="model" 
      :schema="schema" 
      :form-props="{ labelPosition: 'top', scrollToError: true }"
    >
      <template #footer="{ formRef }">
        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <yh-button type="primary" @click="handleValidate(formRef)">提交申请</yh-button>
          <yh-button @click="resetForm(formRef)">重置表单</yh-button>
          <yh-button @click="addContact">动态增加联系人</yh-button>
        </div>
      </template>
    </yh-form-schema>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'
import type { FormSchemaInstance } from '@yh-ui/yh-ui'

// 数据模型
const model = ref<Record<string, unknown>>({
  company: '',
  type: 'private',
  contacts: [{ name: '', phone: '' }],
  agreement: false,
  industry: ''
})

// 校验处理
const handleValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('提交成功！企业入驻申请已受理。')
  } catch (err) {
    console.warn('校验不通过', err)
  }
}

const resetForm = (formRef: FormSchemaInstance) => formRef.resetFields()

// 动态增减逻辑
const addContact = () => {
  schema.value.forEach(group => {
    if (group.title === '联系人信息') {
      const id = Date.now()
      const field = `contact_${id}`
      group.items.push({
        field,
        label: '紧急联系人',
        component: 'input',
        col: 12,
        required: true,
        props: { placeholder: '请输入联系人姓名' }
      })
      // 同步更新 model
      if (model.value) {
        model.value[field] = ''
      }
    }
  })
}

// 复杂 Schema 配置
const schema = ref([
  {
    title: '企业基本信息',
    items: [
      {
        field: 'company',
        label: '企业全称',
        component: 'input',
        col: 16,
        required: true,
        props: { placeholder: '请输入工商注册全称' }
      },
      {
        field: 'type',
        label: '企业性质',
        component: 'radio-group',
        col: 8,
        props: { 
          options: [
            { label: '民营', value: 'private' },
            { label: '国企', value: 'state' },
            { label: '外企', value: 'foreign' }
          ] 
        }
      },
      {
        field: 'industry',
        label: '所属行业',
        component: 'select',
        col: 12,
        required: true,
        asyncOptions: () => new Promise(r => setTimeout(() => r([
          { label: '人工智能', value: 'ai' },
          { label: '生物医药', value: 'bio' },
          { label: '新能源', value: 'energy' }
        ]), 800)),
        props: { placeholder: '远程加载行业列表中...' }
      }
    ]
  },
  {
    title: '联系人信息',
    items: [
      {
        field: 'contacts[0].name',
        label: '首席联系人',
        component: 'input',
        col: 12,
        required: true
      },
      {
        field: 'contacts[0].phone',
        label: '联系电话',
        component: 'input',
        col: 12,
        rules: [
          { required: true, message: '必填' },
          { pattern: /^1[3-9]\d{9}$/, message: '格式错误' }
        ]
      }
    ]
  },
  {
    title: '认证协议',
    collapsible: true,
    items: [
      {
        field: 'agreement',
        label: '入驻协议',
        component: 'switch',
        col: 24,
        rules: [{ required: true, validator: (_, v, cb) => v ? cb() : cb(new Error('须同意协议')) }]
      },
      {
        field: 'custom_tips',
        label: '特别规则',
        col: 24,
        hidden: (m) => !m.agreement,
        render: () => h('div', { style: 'color: #e6a23c; font-size: 12px;' }, '💡 协议已激活：您已获得优先审核权。')
      }
    ]
  }
])

const tsStep = `
<${_T}>
  <yh-form-schema 
    v-model="model" 
    :schema="schema" 
    :form-props="{ labelPosition: 'top', scrollToError: true }"
  >
    <template #footer="{ formRef }">
      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <yh-button type="primary" @click="handleValidate(formRef)">提交申请</yh-button>
        <yh-button @click="resetForm(formRef)">重置表单</yh-button>
        <yh-button @click="addContact">动态增加联系人</yh-button>
      </div>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { FormSchemaInstance } from '@yh-ui/yh-ui'

// 数据模型
const model = ref<Record<string, unknown>>({
  company: '',
  type: 'private',
  contacts: [{ name: '', phone: '' }],
  agreement: false,
  industry: ''
})

const schema = ref([
  {
    title: '企业基本信息',
    items: [
      { field: 'company', label: '企业全称', component: 'input', col: 16, required: true },
      {
        field: 'type',
        label: '企业性质',
        component: 'radio-group',
        col: 8,
        props: { 
          options: [
            { label: '民营', value: 'private' },
            { label: '国企', value: 'state' },
            { label: '外企', value: 'foreign' }
          ] 
        }
      },
      { field: 'industry', label: '所属行业', component: 'select', col: 12, required: true }
    ]
  },
  {
    title: '联系人信息',
    items: [
      { field: 'contacts[0].name', label: '首席联系人', component: 'input', col: 12, required: true },
      { field: 'contacts[0].phone', label: '联系电话', component: 'input', col: 12, required: true }
    ]
  },
  {
    title: '认证协议',
    items: [
      { field: 'agreement', label: '入驻协议', component: 'switch', col: 24, required: true }
    ]
  }
])

const handleValidate = async (formRef: FormSchemaInstance) => {
  const valid = await formRef.validate()
  if (valid) alert('Success!')
}

const resetForm = (formRef: FormSchemaInstance) => formRef.resetFields()

const addContact = () => {
  schema.value.forEach(group => {
    if (group.title === '联系人信息') {
      const field = \`contact_\${Date.now()}\`
      group.items.push({ field, label: '紧急联系人', component: 'input', col: 12, required: true })
      if (model.value) model.value[field] = ''
    }
  })
}
<\/script>
`.trim()
const jsStep = toJs(tsStep)
</script>
