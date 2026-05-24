# Deep Recipe: YhFormSchema

Use this recipe for schema-driven forms, dynamic business forms, generated forms, and admin create/edit pages with conditional fields.

## Default Choice

Use `YhFormSchema` when fields are generated from configuration or when the form needs dynamic visibility, async options, grouped fields, list fields, or custom field rendering.

Use `YhForm` + `YhFormItem` for small hand-written forms.

## Source-Aligned API Highlights

- Props: `modelValue`, `schema`, `formProps`, `gutter`.
- Events: `update:modelValue`, `submit`, `change`, `validate`.
- Schema item capabilities: `field`, `label`, `type`, `component`, `props`, `formItemProps`, `rules`, `required`, `hidden`, `disabled`, `slots`, `col`, `span`, `render`, `asyncOptions`, `optionProp`, `defaultValue`, `tooltip`.
- Special item types: `divider`, `text`, `list`.
- Expose: `validate`, `resetFields`, `clearValidate`, `scrollToField`, `getModel`, `setFieldValue`, `formRef`.

## Pattern: Dynamic Form

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhButton, YhFormSchema, YhMessage } from '@yh-ui/components'
import type { FormSchema } from '@yh-ui/components'

const model = ref({
  name: '',
  role: '',
  enabled: true
})

const schema: FormSchema = [
  {
    field: 'name',
    label: 'Name',
    component: 'input',
    required: true,
    props: { clearable: true, placeholder: 'User name' }
  },
  {
    field: 'role',
    label: 'Role',
    component: 'select',
    required: true,
    asyncOptions: async () => [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' }
    ]
  },
  {
    field: 'enabled',
    label: 'Enabled',
    component: 'switch',
    defaultValue: true
  }
]

function submit() {
  YhMessage.success('Saved')
}
</script>

<template>
  <YhFormSchema
    v-model="model"
    :schema="schema"
    :form-props="{ labelWidth: 120 }"
    @submit="submit"
  />
  <YhButton type="primary" @click="submit">Save</YhButton>
</template>
```

## Agent Rules

- Use `v-model` with `modelValue`.
- Use `required` for simple required rules and `rules` for custom validation.
- Use `hidden`/`disabled` functions for dynamic behavior.
- Use `asyncOptions` for remote options instead of manually wiring loading state for each field.
- Use `type: 'list'` for repeatable field groups.
- Do not use `YhFormSchema` for a tiny static form unless schema generation is useful.
