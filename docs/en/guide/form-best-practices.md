# Form Design Advantages

YH-UI's Form component (especially `FormSchema`) is not just a simple UI wrapper, but a "high-performance rendering engine" designed for complex business scenarios.

## Why Choose YH-UI Form?

### 1. High Logic Cohesion

In traditional development, form layout, data linkage, and validation logic are often scattered across `template`, `script`, and lengthy `watch` blocks. YH-UI consolidates this logic into a single JSON configuration via `FormSchema`:

- **Declarative Linkage**: Calculate UI behavior directly from the current model state using `props` and `hidden` functions.
- **Integrated Layout**: Built-in 24-column grid system eliminates the need for manual `Row`/`Col` nesting, reducing code volume by approximately 60%.

### 2. Ultimate Type Safety (DX)

We provide industry-grade TypeScript support for forms:

- **Precise Inference**: The exported `FormSchemaInstance` provides complete API autocompletion.
- **Zero-any Convention**: All validation and rendering functions have explicit parameter types, preventing runtime errors.

### 3. Robustness and Safety

- **Ref Fallback Protection**: Built-in `footerFormRef` proxy solves potential page crashes caused by accessing the instance before the component is mounted.
- **Auto Type Correction**: Automatic type recognition for booleans (Switch) avoids common validation message conflicts.

## Advanced Application Example

This example demonstrates the YH-UI form engine's ability to handle complex logic: **Dynamic grouping, multi-level linkage, async validation, custom rendering, and full type safety.**

<DemoBlock title="Enterprise Onboarding Form" :ts-code="tsStep" :js-code="jsStep">
  <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: var(--yh-bg-color-overlay); border-radius: 8px; border: 1px solid var(--yh-border-color-light);">
    <yh-form-schema 
      ref="formRef"
      v-model="model" 
      :schema="schema" 
      :form-props="{ labelPosition: 'top', scrollToError: true }"
    >
      <template #footer="{ formRef }">
        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <yh-button type="primary" @click="handleValidate(formRef)">Submit Application</yh-button>
          <yh-button @click="resetForm(formRef)">Reset Form</yh-button>
          <yh-button @click="addContact">Add Contact Dynamically</yh-button>
        </div>
      </template>
    </yh-form-schema>
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { FormSchemaInstance } from '@yh-ui/components'

// Data Model
const model = ref<Record<string, unknown>>({
  company: '',
  type: 'private',
  contacts: [{ name: '', phone: '' }],
  agreement: false,
  industry: ''
})

// Validation Handler
const handleValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('Submission successful! Your enterprise application has been received.')
  } catch (err) {
    console.warn('Validation failed', err)
  }
}

const resetForm = (formRef: FormSchemaInstance) => formRef.resetFields()

// Dynamic Add Logic
const addContact = () => {
  schema.value.forEach(group => {
    if ('title' in group && group.title === 'Contact Information') {
      const id = Date.now()
      const field = `contact_${id}`
      group.items.push({
        field,
        label: 'Emergency Contact',
        component: 'input',
        col: 12,
        required: true,
        props: { placeholder: 'Enter contact name' }
      })
      // Sync model
      if (model.value) {
        (model.value as any)[field] = ''
      }
    }
  })
}

// Complex Schema Config
const schema = ref([
  {
    title: 'Enterprise Basic Info',
    items: [
      {
        field: 'company',
        label: 'Enterprise Full Name',
        component: 'input',
        col: 16,
        required: true,
        props: { placeholder: 'Enter registered full name' }
      },
      {
        field: 'type',
        label: 'Enterprise Type',
        component: 'radio-group',
        col: 8,
        props: { 
          options: [
            { label: 'Private', value: 'private' },
            { label: 'State-owned', value: 'state' },
            { label: 'Foreign', value: 'foreign' }
          ] 
        }
      },
      {
        field: 'industry',
        label: 'Industry',
        component: 'select',
        col: 12,
        required: true,
        asyncOptions: () => new Promise(r => setTimeout(() => r([
          { label: 'AI', value: 'ai' },
          { label: 'Biotech', value: 'bio' },
          { label: 'Energy', value: 'energy' }
        ]), 800)),
        props: { placeholder: 'Loading industries...' }
      }
    ]
  },
  {
    title: 'Contact Information',
    items: [
      {
        field: 'contacts[0].name',
        label: 'Main Contact',
        component: 'input',
        col: 12,
        required: true
      },
      {
        field: 'contacts[0].phone',
        label: 'Phone Number',
        component: 'input',
        col: 12,
        rules: [
          { required: true, message: 'Required' },
          { pattern: /^1[3-9]\d{9}$/, message: 'Invalid format' }
        ]
      }
    ]
  },
  {
    title: 'Certifications & Terms',
    collapsible: true,
    items: [
      {
        field: 'agreement',
        label: 'Onboarding Terms',
        component: 'switch',
        col: 24,
        rules: [{ required: true, validator: (_, v, cb) => v ? cb() : cb(new Error('Terms must be agreed')) }]
      },
      {
        field: 'custom_tips',
        label: 'Special Rules',
        col: 24,
        hidden: (m) => !m.agreement,
        render: () => h('div', { style: 'color: #e6a23c; font-size: 12px;' }, '💡 Agreement active: You have prioritized review rights.')
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
        <yh-button type="primary" @click="handleValidate(formRef)">Submit Application</yh-button>
        <yh-button @click="resetForm(formRef)">Reset Form</yh-button>
        <yh-button @click="addContact">Add Contact Dynamically</yh-button>
      </div>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { FormSchemaInstance } from '@yh-ui/components'

// Data Model
const model = ref<Record<string, unknown>>({
  company: '',
  type: 'private',
  contacts: [{ name: '', phone: '' }],
  agreement: false,
  industry: ''
})

const schema = ref([
  {
    title: 'Enterprise Basic Info',
    items: [
      { field: 'company', label: 'Full Name', component: 'input', col: 16, required: true },
      {
        field: 'type',
        label: 'Type',
        component: 'radio-group',
        col: 8,
        props: { 
          options: [
            { label: 'Private', value: 'private' },
            { label: 'State', value: 'state' },
            { label: 'Foreign', value: 'foreign' }
          ] 
        }
      },
      { field: 'industry', label: 'Industry', component: 'select', col: 12, required: true }
    ]
  },
  {
    title: 'Contact Information',
    items: [
      { field: 'contacts[0].name', label: 'Main Contact', component: 'input', col: 12, required: true },
      { field: 'contacts[0].phone', label: 'Phone Number', component: 'input', col: 12, required: true }
    ]
  },
  {
    title: 'Terms',
    items: [
      { field: 'agreement', label: 'Terms', component: 'switch', col: 24, required: true }
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
    if ('title' in group && group.title === 'Contact Information') {
      const field = \`contact_\${Date.now()}\`
      group.items.push({ field, label: 'Emergency Contact', component: 'input', col: 12, required: true })
      if (model.value) (model.value as any)[field] = ''
    }
  })
}
<\/script>
`.trim()
const jsStep = toJs(tsStep)
</script>
