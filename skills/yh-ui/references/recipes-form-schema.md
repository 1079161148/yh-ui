# Deep Recipe: YhFormSchema

Use this recipe when building complex forms generated dynamically from schemas, including repeating item lists, custom field renderers, layout grids, or conditional field visibility/dependencies.

## Default Choice

Use `YhFormSchema` when forms are configuration-driven, require repeating group elements, or need layout grid scaling. Use `YhForm` + `YhFormItem` only for simple static fields.

## Schema Item Configurations

Each field schema object supports:

- `field`: The key name in the model object.
- `label`: Form label description.
- `component`: Native component identifier (e.g. `'input'`, `'select'`, `'switch'`, `'date-picker'`).
- `props`: Target component props passed dynamically.
- `formItemProps`: Props passed directly to the containing `YhFormItem` (e.g. `labelWidth`).
- `required` / `rules`: Form validation constraints.
- `hidden`: A boolean or function `(model) => boolean` determining field visibility.
- `disabled`: A boolean or function `(model) => boolean` determining disabled state.
- `span` / `col`: Control grid widths (e.g. `12` for half column, `24` for full width).
- `asyncOptions`: Fetch options dynamically from APIs.
- `render`: A custom function `(h, { model, field }) => VNode` for custom render logic.
- `type`: Set to `'list'` for repeatable sub-form fields.

## Pattern: Advanced Dynamic Form

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import { YhFormSchema, YhButton, YhMessage, YhInput } from '@yh-ui/components'
import type { FormSchema } from '@yh-ui/components'

// Define typed form state
const formModel = ref({
  projectName: '',
  deploymentType: 'cloud',
  cloudProvider: '',
  scaleNodes: 3,
  environments: [{ name: 'staging', domain: 'staging.company.com' }]
})

// Define schema configuration
const schema: FormSchema = [
  {
    field: 'projectName',
    label: 'Project Name',
    component: 'input',
    required: true,
    span: 24, // Full width row
    props: {
      placeholder: 'Enter project name',
      clearable: true
    }
  },
  {
    field: 'deploymentType',
    label: 'Deployment Type',
    component: 'select',
    required: true,
    span: 12,
    props: {
      options: [
        { label: 'Cloud Hosted', value: 'cloud' },
        { label: 'On-Premises', value: 'on-premise' }
      ]
    }
  },
  {
    field: 'cloudProvider',
    label: 'Cloud Provider',
    component: 'select',
    span: 12,
    // Conditional visibility: only show if deploymentType is cloud
    hidden: (model) => model.deploymentType !== 'cloud',
    required: (model) => model.deploymentType === 'cloud',
    asyncOptions: async () => [
      { label: 'AWS', value: 'aws' },
      { label: 'Google Cloud Platform', value: 'gcp' },
      { label: 'Microsoft Azure', value: 'azure' }
    ]
  },
  {
    field: 'scaleNodes',
    label: 'Scale Nodes Count',
    component: 'input-number',
    span: 12,
    props: {
      min: 1,
      max: 100
    },
    // Conditional disabled state: lock count if cloudProvider is not GCP
    disabled: (model) => model.cloudProvider !== 'gcp'
  },
  {
    field: 'customRenderer',
    label: 'Custom Field',
    span: 12,
    // Custom render method returning standard VNode
    render: (h, { model, field }) => {
      return h(YhInput, {
        modelValue: model[field],
        'onUpdate:modelValue': (val: string) => {
          model[field] = val
        },
        placeholder: 'Generated via render()'
      })
    }
  },
  {
    field: 'divider1',
    type: 'divider',
    span: 24
  },
  {
    field: 'environments',
    label: 'Target Environments',
    type: 'list', // Repeating sub-form group
    span: 24,
    props: {
      // Define schemas for elements inside list array rows
      schema: [
        {
          field: 'name',
          label: 'Env Name',
          component: 'input',
          required: true,
          span: 8
        },
        {
          field: 'domain',
          label: 'Access Domain',
          component: 'input',
          required: true,
          span: 16
        }
      ]
    }
  }
]

const formRef = ref<InstanceType<typeof YhFormSchema> | null>(null)

async function handleSave() {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (valid) {
      YhMessage.success('Form configurations validated successfully!')
      console.log('Final Model:', formModel.value)
    }
  } catch (err: any) {
    YhMessage.error(`Validation failed: ${err.message || err}`)
  }
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="form-container">
    <!-- gutter specifies spacing between form grid components -->
    <YhFormSchema
      ref="formRef"
      v-model="formModel"
      :schema="schema"
      :gutter="20"
      :form-props="{ labelPosition: 'top' }"
    />

    <div class="form-buttons">
      <YhButton type="primary" @click="handleSave">Submit Configuration</YhButton>
      <YhButton @click="handleReset">Reset Fields</YhButton>
    </div>
  </div>
</template>
```

## Agent Rules

- **Use Model Value**: Always bind data using `v-model` (equivalent to `v-model:modelValue`).
- **Define Render Returns**: Custom field `render` methods must accept `h` function parameters and return a valid VNode using actual components imported from `@yh-ui/components`.
- **List Sub-schema**: When using `type: 'list'`, nested schema arrays must be defined inside `props.schema`.
- **Gutter Config**: Set layout spacings using the `:gutter` prop on the wrapper `YhFormSchema`.
