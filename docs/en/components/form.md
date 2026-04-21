# Form

Consists of input fields, selectors, radio buttons, checkboxes, and other controls, used for collecting, validating, and submitting data.

## Basic Usage

Includes various layouts, sizes, and basic required field validation.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="margin-bottom: 20px;">
    <yh-radio-group v-model="formSize">
      <yh-radio-button value="large">Large</yh-radio-button>
      <yh-radio-button value="default">Default</yh-radio-button>
      <yh-radio-button value="small">Small</yh-radio-button>
    </yh-radio-group>
  </div>
  <yh-form 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    :size="formSize"
    label-width="100px" 
    scroll-to-error
  >
    <yh-form-item label="Username" prop="username">
      <yh-input v-model="form.username" placeholder="Please enter username" />
    </yh-form-item>
    <yh-form-item label="Age" prop="age">
      <yh-input-number v-model="form.age" :min="1" :max="120" />
    </yh-form-item>
    <yh-form-item label="Email" prop="email">
      <yh-input v-model="form.email" placeholder="Please enter email" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="onSubmit">Submit</yh-button>
      <yh-button @click="onReset">Reset</yh-button>
    </yh-form-item>
  </yh-form>
</DemoBlock>

## Typical Form

Contains multiple types of form fields, demonstrating complex interactions and linked validation.

<DemoBlock title="Typical Form" :ts-code="tsTypical" :js-code="jsTypical">
  <yh-form 
    ref="typicalFormRef"
    :model="typicalForm" 
    :rules="typicalRules" 
    label-width="120px"
  >
    <yh-form-item label="Activity Name" prop="name">
      <yh-input v-model="typicalForm.name" />
    </yh-form-item>
    <yh-form-item label="Activity Zone" prop="region">
      <yh-select v-model="typicalForm.region" placeholder="Please select activity zone">
        <yh-option label="Shanghai" value="shanghai" />
        <yh-option label="Beijing" value="beijing" />
      </yh-select>
    </yh-form-item>
    <yh-form-item label="Activity Location" prop="location">
      <yh-cascader 
        v-model="typicalForm.location" 
        :options="locationOptions" 
        placeholder="Please select location"
      />
    </yh-form-item>
    <yh-form-item label="Instant Delivery" prop="delivery">
      <yh-switch v-model="typicalForm.delivery" />
    </yh-form-item>
    <yh-form-item label="Activity Type" prop="type">
      <yh-checkbox-group v-model="typicalForm.type">
        <yh-checkbox value="Online" name="type">Food/Restaurant online activity</yh-checkbox>
        <yh-checkbox value="Promotion" name="type">Ground promotion</yh-checkbox>
        <yh-checkbox value="Offline" name="type">Offline theme activity</yh-checkbox>
      </yh-checkbox-group>
    </yh-form-item>
    <yh-form-item label="Special Resource" prop="resource">
      <yh-radio-group v-model="typicalForm.resource">
        <yh-radio value="Sponsor">Online brand sponsorship</yh-radio>
        <yh-radio value="Venue">Offline venue free</yh-radio>
      </yh-radio-group>
    </yh-form-item>
    <yh-form-item label="Satisfaction Rating" prop="rate">
      <yh-rate v-model="typicalForm.rate" />
    </yh-form-item>
    <yh-form-item label="Activity Count" prop="count">
      <yh-slider v-model="typicalForm.count" :step="10" show-stops />
    </yh-form-item>
    <yh-form-item label="Activity Form" prop="desc">
      <yh-input v-model="typicalForm.desc" type="textarea" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="onTypicalSubmit">Create Now</yh-button>
      <yh-button @click="onTypicalReset">Cancel</yh-button>
    </yh-form-item>
  </yh-form>
</DemoBlock>

## Inline Form

Setting `layout="inline"` allows form items to be arranged horizontally. Label and Input are precisely aligned vertically via Flex layout.

<DemoBlock title="Inline Form" :ts-code="tsInline" :js-code="jsInline">
  <yh-form layout="inline" :model="formInline">
    <yh-form-item label="Approver">
      <yh-input v-model="formInline.user" placeholder="Approver" />
    </yh-form-item>
    <yh-form-item label="Activity Zone">
      <yh-input v-model="formInline.region" placeholder="Activity zone" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary">Query</yh-button>
    </yh-form-item>
  </yh-form>
</DemoBlock>

## Grid Layout

Utilizing the built-in 24-grid system, you can easily achieve complex responsive form layouts.

<DemoBlock title="Grid Layout" :ts-code="tsGrid" :js-code="jsGrid">
  <yh-form :model="gridModel" label-position="top">
    <div class="yh-form--grid">
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="First Name">
           <yh-input v-model="gridModel.firstName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="Last Name">
           <yh-input v-model="gridModel.lastName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--24">
        <yh-form-item label="Detailed Address">
           <yh-input v-model="gridModel.address" type="textarea" />
        </yh-form-item>
      </div>
    </div>
  </yh-form>
</DemoBlock>

## Validation Feedback

After setting `status-icon`, validation result icons will be displayed on components like input fields and selectors.

<DemoBlock title="Validation Icon" :ts-code="tsStatus" :js-code="jsStatus">
  <yh-form :model="statusModel" :rules="statusRules" status-icon label-width="120px">
    <yh-form-item label="Success Status" prop="success">
      <yh-input v-model="statusModel.success" />
    </yh-form-item>
    <yh-form-item label="Loading" prop="loading">
      <yh-input v-model="statusModel.loading" />
    </yh-form-item>
    <yh-form-item label="Error Status" prop="error">
      <yh-input v-model="statusModel.error" />
    </yh-form-item>
  </yh-form>
</DemoBlock>

## Nested Fields

Supports nested object path configuration, such as `user.info.name`.

<DemoBlock title="Nested Fields" :ts-code="tsNested" :js-code="jsNested">
  <yh-form :model="nestedModel">
    <yh-form-item label="City" prop="address.city">
      <yh-input v-model="nestedModel.address.city" />
    </yh-form-item>
    <yh-form-item label="Street" prop="address.street">
      <yh-input v-model="nestedModel.address.street" />
    </yh-form-item>
  </yh-form>
</DemoBlock>

## Schema Driven (Dynamic Form)

Schema-driven form rendering with full support for grouping, grid layout, async data, conditional visibility, and custom slots.

::: tip Validation Notes

- `required: true` automatically adds mandatory constraints. For components like **Switch (Boolean)**, it is recommended to use `validator` within `rules` for precise control and to avoid message conflicts.
- `rules` array supports fine-grained configuration of regex, length, custom functions, and other logic.
- `formRef.validate()` triggers complete validation for all registered fields.
  :::

### Basic Schema

Configure the `schema` array to generate a form with `required` shorthand and `footer` slot bound to `formRef.validate()` for form validation.

<DemoBlock title="Basic Schema Usage" :ts-code="tsSchema" :js-code="jsSchema">
  <yh-form-schema
    v-model="dynamicModel"
    :schema="dynamicSchema"
    :form-props="{ labelPosition: 'top' }"
  >
    <template #field-custom="{ model, handleUpdate }">
      <yh-input :model-value="model.custom" @update:model-value="v => handleUpdate('custom', v)">
        <template #prepend>Slot</template>
      </yh-input>
    </template>
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleValidate(formRef)">Validate Schema</yh-button>
      <yh-button @click="addConfig">Add Item Dynamically</yh-button>
      <yh-button @click="() => formRef.resetFields()">Reset</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

### Advanced Schema (Async/Linkage/Collapse/Tooltip)

`asyncOptions` loads options asynchronously (auto-injects `loading`), `props` functions for field linkage, `collapsible` for collapsible groups, `tooltip` for field hints.

<DemoBlock title="Advanced Features" :ts-code="tsAdvancedSchema" :js-code="jsAdvancedSchema">
  <yh-form-schema v-model="proModel" :schema="proSchema">
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleProValidate(formRef)">Validate Form</yh-button>
      <yh-button @click="formRef.resetFields()">Reset</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

### Field Type Extensions (divider / text / list / render)

- `type: 'divider'` inserts a separator line
- `type: 'text'` renders the field value as read-only, with `emptyValue` for placeholder when empty (default `'-'`)
- `type: 'list'` enables dynamic add/remove sub-item lists. Use `listSchema` to define sub-fields and `listProps` for controls.
- `render` function for fully custom rendering

<DemoBlock title="Field Type Extensions (divider / text / emptyValue / render)" :ts-code="tsSchemaTypes" :js-code="jsSchemaTypes">
  <yh-form-schema v-model="typeModel" :schema="typeSchema" :form-props="{ labelWidth: '100px' }" />
</DemoBlock>

### Dynamic List (type: 'list')

Use `type: 'list'` to handle scenarios like a "contacts" dynamic list. `listProps.max`/`min` constrain how many items can be added or removed. Each row fully supports `FormSchemaItem` config including linked `props` and validation `rules`.

<DemoBlock title="Dynamic List" :ts-code="tsListSchema" :js-code="jsListSchema">
  <yh-form-schema
    v-model="listModel"
    :schema="listSchemaDemo"
    :form-props="{ labelWidth: '80px' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleListValidate(formRef)">Submit</yh-button>
      <yh-button @click="formRef.resetFields()">Reset</yh-button>
      <span style="margin-left: 12px; color: var(--yh-text-color-secondary); font-size: 13px;">
        Total {{ listModel.contacts?.length ?? 0 }} contacts (max 5)
      </span>
    </template>
  </yh-form-schema>
</DemoBlock>

### Scroll Offset (scroll-to-error-offset)

In pages with a fixed top navigation bar, scrolling to the first error item after validation failure might be obscured by the `sticky` header. Configure `scroll-to-error-offset` to set the top offset (in px):

<DemoBlock title="Scroll Offset" :ts-code="tsScrollOffset" :js-code="jsScrollOffset">
  <div style="padding: 12px; background: var(--yh-bg-color-page); border-radius: 6px; margin-bottom: 12px; font-size: 13px; color: var(--yh-text-color-secondary);">
    The following is a long form. When you scroll to the bottom and click validate, the page will smoothly scroll back to the first error field. Thanks to the <code>scroll-to-error-offset="64"</code> configuration, the error field will not be obscured by the browser's top bar.
  </div>
  <yh-form-schema
    v-model="offsetModel"
    :schema="offsetSchema"
    :form-props="{ scrollToError: true, scrollToErrorOffset: 64, labelPosition: 'top' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" style="width: 100%" @click="formRef.validate()">Validate and Scroll Back</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

<script setup lang="ts">
import { reactive, ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { FormSchemaInstance } from '@yh-ui/components'

const formSize = ref('default')
const form = reactive({ username: '', age: 18, email: '' })
const rules = {
  username: [{ required: true, message: 'Username cannot be empty', trigger: 'blur' }],
  age: [{ required: true, type: 'number', message: 'Please enter age', trigger: 'change' }],
  email: [
    { required: true, message: 'Email cannot be empty', trigger: ['blur', 'change'] },
    { type: 'email', message: 'Invalid format', trigger: ['blur', 'change'] }
  ]
}
const formRef = ref()
const onSubmit = () => formRef.value.validate((v) => v && alert('Success!'))
const onReset = () => formRef.value.resetFields()

const typicalForm = reactive({
  name: '',
  region: '',
  location: [],
  delivery: false,
  type: [],
  resource: '',
  rate: 0,
  count: 30,
  desc: ''
})

const typicalRules = {
  name: [{ required: true, message: 'Please enter activity name', trigger: 'blur' }],
  region: [{ required: true, message: 'Please select activity zone', trigger: 'change' }],
  location: [{ required: true, type: 'array', message: 'Please select activity location', trigger: 'change' }],
  type: [{ type: 'array', required: true, message: 'Please select at least one activity nature', trigger: 'change' }],
  resource: [{ required: true, message: 'Please select special resource', trigger: 'change' }],
  desc: [{ required: true, message: 'Please fill in activity form', trigger: 'blur' }]
}

const locationOptions = [
  { value: 'pudong', label: 'Pudong', children: [{ value: 'lujiazui', label: 'Lujiazui' }] },
  { value: 'puxi', label: 'Puxi', children: [{ value: 'waitan', label: 'Waitan' }] }
]

const typicalFormRef = ref()
const onTypicalSubmit = () => typicalFormRef.value.validate((v) => v && alert('Success!'))
const onTypicalReset = () => typicalFormRef.value.resetFields()

const formInline = reactive({ user: '', region: '' })

const gridModel = reactive({ firstName: '', lastName: '', address: '' })

const statusModel = reactive({ success: 'Valid Content', loading: '', error: 'invalid' })
const nestedModel = reactive({ address: { city: 'Shanghai', street: '' } })

const statusRules = {
  success: [{ required: true, message: 'Required', trigger: 'blur' }],
  loading: [{ asyncValidator: () => new Promise(res => setTimeout(res, 3000)) }],
  error: [{ validator: (r, v, cb) => cb(new Error('Invalid Value')) }]
}

const dynamicModel = ref({ email: '', custom: 'Initial Value', type: 'base' })

const handleValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('Validation Passed!')
  } catch (err) {
    console.warn('Validation Failed:', err)
  }
}

const dynamicSchema = ref([
  {
    title: 'Basic Info',
    items: [
      {
        field: 'email',
        label: 'Email',
        component: 'input',
        col: 12,
        required: true,
        rules: [{ type: 'email', message: 'Valid email format required', trigger: ['blur', 'change'] }]
      },
      {
        field: 'type',
        label: 'Account Type',
        component: 'radio',
        col: 12,
        props: { options: [{ label: 'Basic', value: 'base' }, { label: 'Pro', value: 'pro' }] }
      }
    ]
  },
  { field: 'custom', label: 'Custom Slot', component: 'input' }
])
const addConfig = () => {
  dynamicSchema.value.push({
    field: `ext_${Date.now()}`,
    label: 'Extension',
    component: 'input',
    col: 12
  })
}

const proModel = ref({ category: '', product: '', agree: false, remark: '', reasonType: '', otherReason: '', idCard: '' })

const handleProValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('Validation passed! Dynamic linkage constraints are met.')
  } catch (err) {
    window.alert('Validation failed: Missing conditionally required fields or failing dynamic rules.')
  }
}
const proSchema = [
  {
    title: 'Product Config (Collapsible)',
    collapsible: true,
    items: [
      {
        field: 'category',
        label: 'Category',
        component: 'select',
        col: 12,
        tooltip: 'Select a product category to filter the product list',
        asyncOptions: () => new Promise(r => setTimeout(() => r([{ label: 'Electronics', value: 'elec' }, { label: 'Home', value: 'home' }]), 1000)),
        props: { placeholder: 'Loading async...' },
        required: true
      },
      {
        field: 'product',
        label: 'Product',
        component: 'input',
        col: 12,
        props: (model) => ({
          disabled: !model.category,
          placeholder: model.category ? 'Please enter product name' : 'Please select category first'
        })
      },
      {
        field: 'agree',
        label: 'Agree to Terms',
        component: 'switch',
        col: 12,
        rules: [{ validator: (r, v, cb) => v ? cb() : cb(new Error('Please read and agree to the terms')) }]
      }
    ]
  },
  {
    title: 'Remarks',
    items: [
      { field: 'remark', label: 'Remark', component: 'input', props: { type: 'textarea', rows: 3 } }
    ]
  },
  {
    title: 'Dynamic Linkage Demo',
    items: [
      {
        field: 'reasonType',
        label: 'Reason Type',
        component: 'select',
        col: 12,
        props: {
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Sick', value: 'sick' },
            { label: 'Other', value: 'other' }
          ]
        },
        required: true
      },
      {
        field: 'otherReason',
        label: 'Other Reason',
        component: 'input',
        col: 12,
        // Dynamic hidden: only show when reasonType is 'other'
        hidden: (model) => model.reasonType !== 'other',
        // Dynamic required and rules
        required: (model) => model.reasonType === 'other',
        rules: (model) => {
          if (model.reasonType === 'other') {
            return [{ min: 5, message: 'Please provide at least 5 characters', trigger: 'blur' }]
          }
          return []
        }
      },
      {
        field: 'idCard',
        label: 'ID Card',
        component: 'input',
        col: 12,
        // Dynamic disabled: disabled if reasonType is 'sick'
        disabled: (model) => model.reasonType === 'sick',
        props: (model) => ({
          placeholder: model.reasonType === 'sick' ? 'Not needed for sick leave' : 'Enter your ID Card'
        })
      }
    ]
  }
]

// Field type extensions demo (including emptyValue)
const typeModel = ref({ name: 'Alice', dept: 'Engineering', city: '', phone: null as null | string })
const typeSchema = [
  { type: 'divider', label: 'Basic Info', field: '_d1' },
  { field: 'name', label: 'Name', type: 'text' },
  { field: 'dept', label: 'Department', type: 'text' },
  // emptyValue: show 'Not set' when phone is null
  { field: 'phone', label: 'Phone', type: 'text', emptyValue: 'Not set' },
  { type: 'divider', label: 'Editable Content', field: '_d2' },
  { field: 'city', label: 'City', component: 'input', col: 12 },
  {
    field: 'custom_render',
    label: 'Render',
    col: 12,
    render: (model) => h('div', {
      style: 'color: var(--yh-color-primary); font-weight: bold; line-height: 32px;'
    }, `Current City: ${model.city || 'Not set'}`)
  }
]

// Nuxt usage example
const nuxtForm = reactive({ username: '', role: 'admin' })

const tsNuxt = `<${_T}>
  <yh-form :model="form" label-width="80px">
    <yh-form-item label="Username">
      <yh-input v-model="form.username" placeholder="Auto-imported component" />
    </yh-form-item>
    <yh-form-item label="Role">
      <yh-radio-group v-model="form.role">
        <yh-radio value="admin">Admin</yh-radio>
        <yh-radio value="user">User</yh-radio>
      </yh-radio-group>
    </yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'

// No need to import Form, FormItem, etc.
const form = reactive({ 
  username: '', 
  role: 'admin' 
})
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsBasic = `
<${_T}>
  <div style="margin-bottom: 20px;">
    <yh-radio-group v-model="size">
      <yh-radio-button value="large">Large</yh-radio-button>
      <yh-radio-button value="default">Default</yh-radio-button>
      <yh-radio-button value="small">Small</yh-radio-button>
    </yh-radio-group>
  </div>
  <yh-form 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    :size="size"
    label-width="100px" 
    scroll-to-error
  >
    <yh-form-item label="Username" prop="username">
      <yh-input v-model="form.username" placeholder="Please enter username" />
    </yh-form-item>
    <yh-form-item label="Age" prop="age">
      <yh-input-number v-model="form.age" :min="1" :max="120" />
    </yh-form-item>
    <yh-form-item label="Email" prop="email">
      <yh-input v-model="form.email" placeholder="Please enter email" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="submit">Submit</yh-button>
      <yh-button @click="reset">Reset</yh-button>
    </yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive, ref } from 'vue'

const size = ref('default')
const form = reactive({ username: '', age: 18, email: '' })
const rules = {
  username: [{ required: true, message: 'Username cannot be empty', trigger: 'blur' }],
  age: [{ required: true, message: 'Please enter age', trigger: 'change' }],
  email: [
    { required: true, message: 'Email cannot be empty', trigger: 'blur' },
    { type: 'email', message: 'Invalid format', trigger: 'change' }
  ]
}
const formRef = ref()

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) alert('Success!')
  })
}
const reset = () => formRef.value.resetFields()
</${_S}>
`.trim()
const jsBasic = toJs(tsBasic)

const tsTypical = `
<${_T}>
  <yh-form 
    ref="typicalFormRef"
    :model="typicalForm" 
    :rules="typicalRules" 
    label-width="120px"
  >
    <yh-form-item label="Activity Name" prop="name">
      <yh-input v-model="typicalForm.name" />
    </yh-form-item>
    <yh-form-item label="Region" prop="region">
      <yh-select v-model="typicalForm.region" placeholder="Please select region">
        <yh-option label="Shanghai" value="shanghai" />
        <yh-option label="Beijing" value="beijing" />
      </yh-select>
    </yh-form-item>
    <yh-form-item label="Location" prop="location">
      <yh-cascader v-model="typicalForm.location" :options="locationOptions" />
    </yh-form-item>
    <yh-form-item label="Delivery" prop="delivery">
      <yh-switch v-model="typicalForm.delivery" />
    </yh-form-item>
    <yh-form-item label="Nature" prop="type">
      <yh-checkbox-group v-model="typicalForm.type">
        <yh-checkbox value="Online">Online Activity</yh-checkbox>
        <yh-checkbox value="Promotion">Promotion</yh-checkbox>
      </yh-checkbox-group>
    </yh-form-item>
    <yh-form-item label="Satisfaction" prop="rate">
      <yh-rate v-model="typicalForm.rate" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="onSubmit">Submit</yh-button>
    </yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive, ref } from 'vue'

const typicalForm = reactive({
  name: '',
  region: '',
  location: [],
  delivery: false,
  type: [],
  rate: 0
})

const typicalRules = {
  name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
  region: [{ required: true, message: 'Please select region', trigger: 'change' }]
}

const locationOptions = [
  { value: 'pudong', label: 'Pudong', children: [{ value: 'lujiazui', label: 'Lujiazui' }] }
]

const typicalFormRef = ref()
const onSubmit = () => typicalFormRef.value.validate((v) => v && alert('Success!'))
</${_S}>
`.trim()
const jsTypical = toJs(tsTypical)

const tsInline = `
<${_T}>
  <yh-form layout="inline" :model="form">
    <yh-form-item label="Approver">
      <yh-input v-model="form.user" placeholder="Approver" />
    </yh-form-item>
    <yh-form-item label="Region">
      <yh-input v-model="form.region" placeholder="Region" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary">Query</yh-button>
    </yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'
const form = reactive({ user: '', region: '' })
</${_S}>
`.trim()
const jsInline = toJs(tsInline)

const tsGrid = `
<${_T}>
  <yh-form :model="model" label-position="top">
    <div class="yh-form--grid">
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="First Name">
           <yh-input v-model="model.firstName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="Last Name">
           <yh-input v-model="model.lastName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--24">
        <yh-form-item label="Detailed Address">
           <yh-input v-model="model.address" type="textarea" />
        </yh-form-item>
      </div>
    </div>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ firstName: '', lastName: '', address: '' })
</${_S}>
`.trim()
const jsGrid = toJs(tsGrid)

const tsStatus = `
<${_T}>
  <yh-form :model="model" :rules="rules" status-icon label-width="120px">
    <yh-form-item label="Success Status" prop="success">
      <yh-input v-model="model.success" />
    </yh-form-item>
    <yh-form-item label="Loading" prop="loading">
      <yh-input v-model="model.loading" />
    </yh-form-item>
    <yh-form-item label="Error Status" prop="error">
      <yh-input v-model="model.error" />
    </yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ success: 'Valid Content', loading: '', error: 'invalid' })
const rules = {
  success: [{ required: true, message: 'Required', trigger: 'blur' }],
  loading: [{ asyncValidator: () => new Promise(res => setTimeout(res, 3000)) }],
  error: [{ validator: (r, v, cb) => cb(new Error('Invalid Value')) }]
}
</${_S}>
`.trim()
const jsStatus = toJs(tsStatus)

const tsNested = `
<${_T}>
  <yh-form :model="model">
    <yh-form-item label="City" prop="address.city">
      <yh-input v-model="model.address.city" />
    </yh-form-item>
    <yh-form-item label="Street" prop="address.street">
      <yh-input v-model="model.address.street" />
    </yh-form-item>
  </yh-form>
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ 
  address: { city: 'Shanghai', street: '' } 
})
</${_S}>
`.trim()
const jsNested = toJs(tsNested)

const tsRules = `
<${_S} setup lang="ts">
const rules = {
  // Regex validation
  phone: [{ pattern: /^1\\d{10}$/, message: 'Invalid format' }],
  // Custom validator function
  password: [{ validator: (rule, value, callback) => {
    if (value.length < 6) callback(new Error('Too short'))
    else callback()
  }}],
  // Async validator
  username: [{ asyncValidator: (rule, value) => {
    return Promise.resolve() // or reject('Occupied')
  }}]
}
</${_S}>
`.trim()
const jsRules = toJs(tsRules)

const tsSchema = `
<${_T}>
  <yh-form-schema 
    v-model="model" 
    :schema="schema" 
    :form-props="{ labelPosition: 'top' }"
  >
    <template #field-custom="{ handleUpdate, model }">
      <yh-input :model-value="model.custom" @update:model-value="v => handleUpdate('custom', v)">
        <template #prepend>Slot</template>
      </yh-input>
    </template>
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleValidate(formRef)">Validate Schema</yh-button>
      <yh-button @click="addConfig">Add Item Dynamically</yh-button>
      <yh-button @click="() => formRef.resetFields()">Reset</yh-button>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { FormSchemaInstance } from '@yh-ui/components'

const model = ref({ email: '', custom: 'Initial Value', type: 'base' })

const handleValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('Validation Passed!')
  } catch (err) {
    console.warn('Validation Failed:', err)
  }
}

const schema = ref([
  {
    title: 'Basic Info',
    items: [
      {
        field: 'email',
        label: 'Email',
        component: 'input',
        col: 12,
        required: true,
        rules: [{ type: 'email', message: 'Valid email format required', trigger: ['blur', 'change'] }]
      },
      {
        field: 'type',
        label: 'Account Type',
        component: 'radio',
        col: 12,
        props: { options: [{ label: 'Basic', value: 'base' }, { label: 'Pro', value: 'pro' }] }
      }
    ]
  },
  { field: 'custom', label: 'Custom Slot', component: 'input' }
])

const addConfig = () => {
  schema.value.push({
    field: \`ext_\${Date.now()}\`,
    label: 'Extension',
    component: 'input',
    col: 12
  })
}
</${_S}>
`.trim()
const jsSchema = toJs(tsSchema)

const tsAdvancedSchema = `
<${_T}>
  <yh-form-schema v-model="model" :schema="schema">
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleProValidate(formRef)">Validate Form</yh-button>
      <yh-button @click="formRef.resetFields()">Reset</yh-button>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { FormSchemaInstance } from '@yh-ui/components'

const model = ref({ category: '', product: '', agree: false, remark: '', reasonType: '', otherReason: '', idCard: '' })

const handleProValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('Validation passed! Dynamic linkage constraints are met.')
  } catch (err) {
    window.alert('Validation failed: Missing conditionally required fields or failing dynamic rules.')
  }
}

const schema = [
  {
    title: 'Product Config (Collapsible)',
    collapsible: true,
    items: [
      {
        field: 'category',
        label: 'Category',
        component: 'select',
        col: 12,
        tooltip: 'Select a product category to filter the product list',
        // Async options loading, auto-injects loading state
        asyncOptions: () => new Promise(r => setTimeout(() => r([{ label: 'Electronics', value: 'elec' }, { label: 'Home', value: 'home' }]), 1000)),
        props: { placeholder: 'Loading async...' },
        required: true
      },
      {
        field: 'product',
        label: 'Product',
        component: 'input',
        col: 12,
        // props function for field linkage
        props: (model) => ({
          disabled: !model.category,
          placeholder: model.category ? 'Please enter product name' : 'Please select category first'
        })
      },
      {
        field: 'agree',
        label: 'Agree to Terms',
        component: 'switch',
        col: 12,
        rules: [{ validator: (r, v, cb) => v ? cb() : cb(new Error('Please read and agree to the terms')) }]
      }
    ]
  },
  {
    title: 'Remarks',
    items: [
      { field: 'remark', label: 'Remark', component: 'input', props: { type: 'textarea', rows: 3 } }
    ]
  },
  {
    title: 'Dynamic Linkage Demo',
    items: [
      {
        field: 'reasonType',
        label: 'Reason Type',
        component: 'select',
        col: 12,
        props: {
          options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Sick', value: 'sick' },
            { label: 'Other', value: 'other' }
          ]
        },
        required: true
      },
      {
        field: 'otherReason',
        label: 'Other Reason',
        component: 'input',
        col: 12,
        // Dynamic hidden: only show when reasonType is 'other'
        hidden: (model) => model.reasonType !== 'other',
        // Dynamic required and rules
        required: (model) => model.reasonType === 'other',
        rules: (model) => {
          if (model.reasonType === 'other') {
            return [{ min: 5, message: 'Please provide at least 5 characters', trigger: 'blur' }]
          }
          return []
        }
      },
      {
        field: 'idCard',
        label: 'ID Card',
        component: 'input',
        col: 12,
        // Dynamic disabled: disabled if reasonType is 'sick'
        disabled: (model) => model.reasonType === 'sick',
        props: (model) => ({
          placeholder: model.reasonType === 'sick' ? 'Not needed for sick leave' : 'Enter your ID Card'
        })
      }
    ]
  }
]
</${_S}>
`.trim()
const jsAdvancedSchema = toJs(tsAdvancedSchema)

const tsSchemaTypes = `
<${_T}>
  <yh-form-schema v-model="model" :schema="schema" :form-props="{ labelWidth: '100px' }" />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const model = ref({ name: 'Alice', dept: 'Engineering', city: '', phone: null })
const schema = [
  // type: 'divider' inserts a divider line
  { type: 'divider', label: 'Basic Info', field: '_d1' },
  // type: 'text' renders field value as read-only text
  { field: 'name', label: 'Name', type: 'text' },
  { field: 'dept', label: 'Department', type: 'text' },
  // emptyValue: placeholder when value is null/undefined
  { field: 'phone', label: 'Phone', type: 'text', emptyValue: 'Not set' },
  { type: 'divider', label: 'Editable Content', field: '_d2' },
  { field: 'city', label: 'City', component: 'input', col: 12 },
  // render function for fully custom rendering
  {
    field: 'custom_render',
    label: 'Render',
    col: 12,
    render: (model) => h('div', { style: 'color: var(--yh-color-primary); font-weight: bold;' }, \`Current City: \${model.city || 'Not set'}\`)
  }
]
</${_S}>
`.trim()
const jsSchemaTypes = toJs(tsSchemaTypes)

// Dynamic list demo
const listModel = ref({
  contacts: [] as { name: string; phone: string; type: string }[]
})
const listSchemaDemo = [
  {
    field: 'contacts',
    label: 'Contacts',
    type: 'list',
    listSchema: [
      { field: 'name', label: 'Name', component: 'input', col: 8, required: true },
      {
        field: 'phone', label: 'Phone', component: 'input', col: 8,
        rules: [{ pattern: /^1\d{10}$/, message: 'Invalid phone format', trigger: 'blur' }]
      },
      {
        field: 'type', label: 'Type', component: 'select', col: 8,
        props: { options: [{ label: 'Family', value: 'family' }, { label: 'Friend', value: 'friend' }] }
      }
    ],
    listProps: {
      addButtonText: 'Add Contact',
      max: 5,
      min: 0
    }
  }
]

const handleListValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert(`Submitted! Total ${listModel.value.contacts.length} contacts`)
  } catch {
    window.alert('Please check contact information')
  }
}

const tsListSchema = `
<${_T}>
  <yh-form-schema
    v-model="model"
    :schema="schema"
    :form-props="{ labelWidth: '80px' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleValidate(formRef)">Submit</yh-button>
      <yh-button @click="formRef.resetFields()">Reset</yh-button>
      <span style="margin-left: 12px; color: var(--yh-text-color-secondary); font-size: 13px;">
        Total {{ model.contacts?.length ?? 0 }} contacts (max 5)
      </span>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { FormSchemaInstance } from '@yh-ui/components'

const model = ref({ contacts: [] })
const schema = [
  {
    field: 'contacts',
    label: 'Contacts',
    type: 'list',
    listSchema: [
      { field: 'name',  label: 'Name',  component: 'input', col: 8, required: true },
      {
        field: 'phone', label: 'Phone', component: 'input', col: 8,
        rules: [{ pattern: /^1\\d{10}$/, message: 'Invalid format', trigger: 'blur' }]
      },
      {
        field: 'type',  label: 'Type',  component: 'select', col: 8,
        props: { options: [{ label: 'Family', value: 'family' }, { label: 'Friend', value: 'friend' }] }
      }
    ],
    listProps: { addButtonText: 'Add Contact', max: 5, min: 0 }
  }
]

const handleValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) alert('Submitted!')
  } catch {
    alert('Please check the contact information')
  }
}
</${_S}>
`.trim()
const jsListSchema = toJs(tsListSchema)
const offsetModel = ref<Record<string, unknown>>({})
const offsetSchema = Array.from({ length: 10 }).map((_, i) => ({
  field: `field_${i}`,
  label: `Form Item ${i + 1} ${i === 1 ? '(I will trigger an error and be targeted)' : ''}`,
  component: 'input',
  required: i === 1 || i === 5 || i === 9
}))

const tsScrollOffset = `
<${_T}>
  <div style="padding: 12px; background: var(--yh-bg-color-page); border-radius: 6px; margin-bottom: 12px; font-size: 13px; color: var(--yh-text-color-secondary);">
    The following is a long form. When you scroll to the bottom and click validate, the page will smoothly scroll back to the first error field. Thanks to the <code>scroll-to-error-offset="64"</code> configuration, the error field will not be obscured by the browser's top bar.
  </div>
  <yh-form-schema
    v-model="model"
    :schema="schema"
    :form-props="{ scrollToError: true, scrollToErrorOffset: 64, labelPosition: 'top' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" style="width: 100%" @click="formRef.validate()">Validate and Scroll Back</yh-button>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const model = ref<Record<string, unknown>>({})
const schema = Array.from({ length: 10 }).map((_, i) => ({
  field: \`field_\${i}\`,
  label: \`Form Item \${i + 1} \${i === 1 ? '(I will trigger an error and be targeted)' : ''}\`,
  component: 'input',
  required: i === 1 || i === 5 || i === 9
}))
</${_S}>
`.trim()
const jsScrollOffset = toJs(tsScrollOffset)
</script>

## Use in Nuxt

The Form component and its sub-components (FormItem, FormSchema) fully support Nuxt 3/4 SSR rendering. When used in a Nuxt project, all form components are automatically imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-form :model="nuxtForm" label-width="80px">
    <yh-form-item label="Username">
      <yh-input v-model="nuxtForm.username" placeholder="Auto-imported component" />
    </yh-form-item>
    <yh-form-item label="Role">
      <yh-radio-group v-model="nuxtForm.role">
        <yh-radio value="admin">Admin</yh-radio>
        <yh-radio value="user">User</yh-radio>
      </yh-radio-group>
    </yh-form-item>
  </yh-form>
</DemoBlock>

**SSR Notes**:

- Form layout modes remain consistent between SSR output and client hydration.
- Static validation styles and error text can be rendered on the server.
- Instance methods such as `validate` and async validation run after client activation.
- Use a reactive form model in Nuxt pages to keep bindings and validation state synchronized.

::: tip SSR Safety
The internal IDs and ARIA attributes generated by the Form component are based on `useId`, ensuring that in highly nested form structures, the server and client HTML associations are perfectly consistent, triggering no hydration warnings.
:::

## API

### Props

#### Form

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model | Reactive form model object. | `Record<string, unknown>` | Required |
| rules | Validation rules object. | `YhFormRules` | `{}` |
| label-width | Label width. | `string \| number` | `''` |
| label-position | Label alignment mode. | `'left' \| 'right' \| 'top'` | `'right'` |
| label-suffix | Suffix appended after each label. | `string` | `''` |
| show-message | Whether validation messages are displayed. | `boolean` | `true` |
| scroll-to-error | Whether the first invalid field is scrolled into view after validation fails. | `boolean` | `false` |
| scroll-into-view-options | Native `scrollIntoView` options used when scrolling to an invalid field. | `boolean \| ScrollIntoViewOptions` | `false` |
| scroll-to-error-offset | Top offset used by `scroll-to-error`. | `number` | `0` |
| disabled | Whether all form controls inherit the disabled state. | `boolean` | `false` |
| hide-required-asterisk | Whether required marks are hidden. | `boolean` | `false` |
| size | Shared control size. | `'large' \| 'default' \| 'small'` | `'default'` |
| status-icon | Whether validation status icons are shown. | `boolean` | `false` |
| layout | Form layout mode. | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| theme-overrides | Component-level theme overrides for `YhForm`. | `ComponentThemeVars` | `undefined` |

#### Form Item

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| prop | Field path in the parent form model. Supports nested paths such as `user.profile.name`. | `string` | `''` |
| label | Label text. | `string` | `''` |
| label-width | Label width override. | `string \| number` | `''` |
| required | Whether the item is required. | `boolean` | `false` |
| rules | Item-level validation rules. | `YhFormRule \| YhFormRule[]` | `[]` |
| show-message | Whether this item displays validation error text. | `boolean` | `true` |
| size | Size override for the current item. | `'large' \| 'default' \| 'small' \| ''` | `''` |
| validate-trigger | Validation trigger override. | `string \| string[]` | `''` |
| error-position | Alignment of the validation message. | `'left' \| 'center' \| 'right'` | `'left'` |
| disabled | Whether the current item is disabled. | `boolean` | `false` |
| validate-status | Manual validation status override. | `'' \| 'success' \| 'error' \| 'validating'` | `''` |
| error | Manual validation message override. | `string` | `''` |
| theme-overrides | Component-level theme overrides for `YhFormItem`. | `ComponentThemeVars` | `undefined` |

#### Form Schema

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| modelValue | Bound schema model value. | `Record<string, unknown>` | Required |
| schema | Schema configuration list. | `(YhFormSchemaItem \| YhFormSchemaGroup)[]` | `[]` |
| formProps | Props forwarded to `YhForm`. | `Partial<YhFormProps>` | `{}` |
| gutter | Grid spacing in pixels. | `number` | `20` |

### Events

#### Form

| Event Name | Description | Type |
| --- | --- | --- |
| validate | Triggered after a validation run completes. | `(isValid: boolean, invalidFields?: Record<string, unknown>) => void` |

#### Form Item

Current component does not expose component events.

#### Form Schema

| Event Name | Description | Type |
| --- | --- | --- |
| update:modelValue | Triggered when the schema model changes. | `(value: Record<string, unknown>) => void` |
| submit | Triggered when the internal form is submitted. | `(value: Record<string, unknown>) => void` |
| change | Triggered when a schema field changes. | `(field: string, value: unknown, model: Record<string, unknown>) => void` |
| validate | Forwarded form validation result. | `(isValid: boolean, invalidFields?: Record<string, unknown>) => void` |

### Slots

#### Form

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Form content. | - |

#### Form Item

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Form control content. | - |
| label | Custom label content. | - |

#### Form Schema

| Slot Name | Description | Parameters |
| --- | --- | --- |
| `field-{fieldName}` | Custom rendering for a specific schema field. | `{ model, item, handleUpdate }` |
| `label-{fieldName}` | Custom label rendering for a specific schema field. | `{ model, item }` |
| `footer` | Footer action area. | `{ model, formRef }` |
| `field-{listField}-{subField}` | Custom renderer for a list-row sub-field. | `{ row, index, item }` |
| `list-footer-{listField}` | Content rendered after the add button of a list field. | `{ model, item }` |

### Expose

#### Form

| Name | Description | Type |
| --- | --- | --- |
| validate | Validates the whole form or specific fields. | `(props?: string \| string[] \| ((isValid: boolean, invalidFields?: Record<string, unknown>) => void), callback?: (isValid: boolean, invalidFields?: Record<string, unknown>) => void) => Promise<boolean>` |
| resetFields | Resets all fields or specific fields. | `(props?: string \| string[]) => void` |
| clearValidate | Clears validation results. | `(props?: string \| string[]) => void` |
| scrollToField | Scrolls to a specific field. | `(prop: string) => void` |

#### Form Item

| Name | Description | Type |
| --- | --- | --- |
| validate | Validates the current form item. | `(trigger?: string, callback?: (isValid: boolean) => void) => Promise<boolean>` |
| resetField | Resets the current item value and validation state. | `() => void` |
| clearValidate | Clears the current item validation state. | `() => void` |
| validateStatus | Current validation status. | `ComputedRef<'' \| 'success' \| 'error' \| 'validating'>` |
| validateMessage | Current validation message. | `ComputedRef<string>` |
| size | Resolved item size. | `ComputedRef<string>` |

#### Form Schema

| Name | Description | Type |
| --- | --- | --- |
| validate | Validates the schema form or specific fields. | `(fields?: string \| string[], callback?: (isValid: boolean) => void) => Promise<boolean \| undefined>` |
| resetFields | Resets schema fields. | `(fields?: string \| string[]) => void` |
| clearValidate | Clears schema validation results. | `(fields?: string \| string[]) => void` |
| scrollToField | Scrolls to a schema field. | `(field: string) => void` |
| getModel | Returns the current schema model snapshot. | `() => Record<string, unknown>` |
| setFieldValue | Updates a single schema field value. | `(field: string, value: unknown) => void` |
| formRef | Underlying `YhForm` instance ref. | `Ref<YhFormInstance \| undefined>` |

### Types

#### Form Schema Item

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| field | Field path, supports nested paths. | `string` | Required |
| label | Field label. | `string` | `undefined` |
| type | Schema item type. | `'default' \| 'divider' \| 'text' \| 'list'` | `'default'` |
| component | Component name or Vue component. | `string \| Component` | `undefined` |
| props | Props passed to the rendered field component. Supports a function form. | `Record<string, unknown> \| (model: Record<string, unknown>) => Record<string, unknown>` | `undefined` |
| formItemProps | Extra props passed to `YhFormItem`. | `Partial<YhFormItemProps>` | `undefined` |
| rules | Validation rules or a rule factory based on the current model. | `YhFormRule[] \| (model: Record<string, unknown>) => YhFormRule[]` | `undefined` |
| required | Required shorthand or required factory. | `boolean \| (model: Record<string, unknown>) => boolean` | `false` |
| hidden | Whether the field is hidden. Supports a function form. | `boolean \| (model: Record<string, unknown>) => boolean` | `false` |
| disabled | Whether the field is disabled. Supports a function form. | `boolean \| (model: Record<string, unknown>) => boolean` | `undefined` |
| slots | Slot component mapping used by schema rendering. | `Record<string, unknown>` | `undefined` |
| col | Grid span from `1` to `24`. | `number` | `24` |
| span | Custom `grid-column` span. | `number` | `undefined` |
| render | Custom render function. | `(model: Record<string, unknown>) => VNode \| Component \| null` | `undefined` |
| asyncOptions | Async option loader for option-based components. | `() => Promise<Record<string, unknown>[]>` | `undefined` |
| optionProp | Prop name that receives async options. | `string` | `'options'` |
| defaultValue | Default field value used when the model field is `undefined`. | `unknown` | `undefined` |
| tooltip | Tooltip text displayed next to the label. | `string` | `undefined` |
| emptyValue | Placeholder used by `type: 'text'` when the value is empty. | `string` | `'-'` |
| listSchema | Child schema used by `type: 'list'`. | `YhFormSchemaItem[]` | `undefined` |
| listProps | Controls used by `type: 'list'`. | `{ addButtonText?: string; allowDelete?: boolean \| ((model: Record<string, unknown>, index: number) => boolean); allowAdd?: boolean \| ((model: Record<string, unknown>) => boolean); max?: number; min?: number }` | `undefined` |

#### Form Schema Group

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| title | Group title. | `string` | `undefined` |
| items | Items rendered inside the group. | `YhFormSchemaItem[]` | `[]` |
| props | Extra props passed to the wrapping `fieldset`. | `Record<string, unknown>` | `undefined` |
| collapsible | Whether the group supports collapse/expand interaction. | `boolean` | `false` |
| collapsed | Initial collapsed state. | `boolean` | `false` |

## Theme Variables

`YhForm` and `YhFormItem` support `themeOverrides`. Their runtime styles consume the following component variables:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-form-item-height` | Base height used by form items and aligned controls. | `32px` |
| `--yh-form-item-margin-bottom` | Bottom spacing between form items. | `22px` |
| `--yh-form-label-font-size` | Form label font size. | `14px` |

`YhFormSchema` mainly reuses form and global theme tokens and does not define extra dedicated component variables.

### Type Exports

| Name | Description |
| --- | --- |
| `YhFormProps` | Props type for `YhForm` |
| `YhFormItemProps` | Props type for `YhFormItem` |
| `YhFormSchemaProps` | Props type for `YhFormSchema` |
| `YhFormSchemaItem` | Schema form item type |
| `YhFormSchemaGroup` | Schema form group type |
| `YhFormRule` | Single validation rule type |
| `YhFormRules` | Form rules collection type |
| `YhFormInstance` | Public instance type for `YhForm` |
| `YhFormItemInstance` | Public instance type for `YhFormItem` |
| `YhFormSchemaInstance` | Public instance type for `YhFormSchema` |
