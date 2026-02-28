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
  <yh-form-schema v-model="proModel" :schema="proSchema" />
</DemoBlock>

### Field Type Extensions (divider / text / render)

`type: 'divider'` inserts a divider line, `type: 'text'` renders field value as read-only text, `render` function for fully custom rendering.

<DemoBlock title="Field Type Extensions" :ts-code="tsSchemaTypes" :js-code="jsSchemaTypes">
  <yh-form-schema v-model="typeModel" :schema="typeSchema" :form-props="{ labelWidth: '80px' }" />
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

const proModel = ref({ category: '', product: '', agree: false, remark: '' })
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
  }
]

// Field type extensions demo
const typeModel = ref({ name: 'Alice', dept: 'Engineering', city: '' })
const typeSchema = [
  { type: 'divider', label: 'Basic Info', field: '_d1' },
  { field: 'name', label: 'Name', type: 'text' },
  { field: 'dept', label: 'Department', type: 'text' },
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
      <yh-radio-button label="large">Large</yh-radio-button>
      <yh-radio-button label="default">Default</yh-radio-button>
      <yh-radio-button label="small">Small</yh-radio-button>
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
  <yh-form-schema v-model="model" :schema="schema" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const model = ref({ category: '', product: '', agree: false, remark: '' })
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
  }
]
</${_S}>
`.trim()
const jsAdvancedSchema = toJs(tsAdvancedSchema)

const tsSchemaTypes = `
<${_T}>
  <yh-form-schema v-model="model" :schema="schema" :form-props="{ labelWidth: '80px' }" />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const model = ref({ name: 'Alice', dept: 'Engineering', city: '' })
const schema = [
  // type: 'divider' inserts a divider line
  { type: 'divider', label: 'Basic Info', field: '_d1' },
  // type: 'text' renders field value as read-only text
  { field: 'name', label: 'Name', type: 'text' },
  { field: 'dept', label: 'Department', type: 'text' },
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

- ✅ Form layout (horizontal, vertical, inline) remains perfectly consistent in SSR.
- ✅ Validation error state (`is-error`) and error messages support server-side rendering.
- ✅ Static validation rules take effect on the server (error styles present on first screen).
- ⚠️ Submission validation (`validate` method) and dynamic async validation are only available after client-side activation.
- 💡 It is recommended to use `reactive` to define the form model in Nuxt pages to maintain reactivity continuity.

::: tip SSR Safety
The internal IDs and ARIA attributes generated by the Form component are based on `useId`, ensuring that in highly nested form structures, the server and client HTML associations are perfectly consistent, triggering no hydration warnings.
:::

## API

### Form Props

| Prop                     | Description                                                         | Type                                     | Default                                   |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| model                    | Form data object                                                    | `object`                                 | —                                         |
| rules                    | Form validation rules                                               | `object`                                 | —                                         |
| label-width              | Label width                                                         | `string \| number`                       | —                                         |
| label-position           | Label position                                                      | `'left' \| 'right' \| 'top'`             | `'right'`                                 |
| layout                   | Layout mode                                                         | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'`                            |
| disabled                 | Whether to disable all components in the form                       | `boolean`                                | `false`                                   |
| size                     | Unified size                                                        | `'large' \| 'default' \| 'small'`        | `'default'`                               |
| status-icon              | Whether to display validation result feedback icons in input fields | `boolean`                                | `false`                                   |
| scroll-to-error          | Whether to scroll to the first error item when validation fails     | `boolean`                                | `false`                                   |
| scroll-into-view-options | Scroll configuration items                                          | `object \| boolean`                      | `{ behavior: 'smooth', block: 'center' }` |

### Form Methods

| Method        | Description                                     | Parameters                                          |
| ------------- | ----------------------------------------------- | --------------------------------------------------- |
| validate      | Validates the form, supports partial validation | `(props?: string \| string[], callback?: Function)` |
| resetFields   | Resets the form, supports partial reset         | `(props?: string \| string[])`                      |
| clearValidate | Removes validation results for form items       | `(props?: string \| string[])`                      |
| scrollToField | Scrolls to a specified field                    | `(prop: string)`                                    |

### FormItem Props

| Prop           | Description                                               | Type                              | Default  |
| -------------- | --------------------------------------------------------- | --------------------------------- | -------- |
| prop           | Form field model key, supports nested paths (a.b.c)       | `string`                          | —        |
| label          | Label text                                                | `string`                          | —        |
| label-width    | Label width                                               | `string \| number`                | —        |
| required       | Whether it is required                                    | `boolean`                         | `false`  |
| rules          | Validation rules                                          | `object \| array`                 | —        |
| size           | Configure size for the form item (overrides Form setting) | `'large' \| 'default' \| 'small'` | —        |
| error-position | Error message alignment                                   | `'left' \| 'center' \| 'right'`   | `'left'` |
| show-message   | Whether to show validation error messages                 | `boolean`                         | `true`   |
| disabled       | Disables current item (overrides Form setting)            | `boolean`                         | `false`  |

### FormSchema Props

| Prop       | Description                                           | Type     | Default |
| ---------- | ----------------------------------------------------- | -------- | ------- |
| modelValue | Binding value (v-model)                               | `object` | —       |
| schema     | Form configuration items, supports grouping and grids | `array`  | `[]`    |
| formProps  | Props passed through to YhForm (same as Form Props)   | `object` | `{}`    |
| gutter     | Grid column spacing (px)                              | `number` | `20`    |

### FormSchema Methods

| Method        | Description                                 | Parameters                                           |
| ------------- | ------------------------------------------- | ---------------------------------------------------- |
| validate      | Triggers form validation, supports partial  | `(fields?: string \| string[], callback?: Function)` |
| resetFields   | Resets field values and validation state    | `(fields?: string \| string[])`                      |
| clearValidate | Clears validation results, supports partial | `(fields?: string \| string[])`                      |
| scrollToField | Scrolls to specified field                  | `(field: string)`                                    |
| getModel      | Returns current form data snapshot          | `() => Record<string, unknown>`                      |
| setFieldValue | Dynamically updates a single field value    | `(field: string, value: unknown)`                    |

### FormSchema Slots

| Slot Name           | Description                           | Slot Props                      |
| ------------------- | ------------------------------------- | ------------------------------- |
| `field-{fieldName}` | Custom rendering for a specific field | `{ model, item, handleUpdate }` |
| `label-{fieldName}` | Custom label rendering for a field    | `{ model, item }`               |
| `footer`            | Form footer action area               | `{ model, formRef }`            |

### FormSchemaItem (Configuration Item)

| Prop          | Description                                                               | Type                               | Default     |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| field         | Field name, supports nested paths (a.b.c)                                 | `string`                           | —           |
| label         | Label name                                                                | `string`                           | —           |
| type          | Field type: `'default'` normal, `'divider'` separator, `'text'` read-only | `'default' \| 'divider' \| 'text'` | `'default'` |
| component     | Component name (input, radio, select, etc.) or Vue Component object       | `string \| Component`              | —           |
| col           | Grid span (1-24)                                                          | `number`                           | `24`        |
| props         | Props for internal component, **supports functional linkage**             | `object \| (model) => object`      | —           |
| formItemProps | Props passed through to form-item                                         | `object`                           | —           |
| required      | Required (auto-adds required rule, no need to write `rules`)              | `boolean`                          | `false`     |
| rules         | Validation rules (merged with required)                                   | `FormRule \| FormRule[]`           | —           |
| disabled      | Whether disabled (**supports functional linkage**)                        | `boolean \| (model) => boolean`    | —           |
| hidden        | Whether hidden (**supports functional linkage**)                          | `boolean \| (model) => boolean`    | `false`     |
| defaultValue  | Default field value (applied when field value is undefined)               | `unknown`                          | —           |
| tooltip       | Tooltip text shown next to field label                                    | `string`                           | —           |
| slots         | Component slot config (key: slot name, value: component object)           | `object`                           | —           |
| render        | Custom render function (lower priority than `field-{name}` slot)          | `(model) => VNode \| Component`    | —           |
| asyncOptions  | Async options loader (auto-injects `loading` state)                       | `() => Promise<object[]>`          | —           |
| optionProp    | Prop name for receiving async options data                                | `string`                           | `'options'` |

### FormSchemaGroup (Group Config)

| Prop        | Description                           | Type               | Default |
| ----------- | ------------------------------------- | ------------------ | ------- |
| title       | Group title                           | `string`           | —       |
| items       | Form items within the group           | `FormSchemaItem[]` | `[]`    |
| props       | Props passed through to fieldset      | `object`           | —       |
| collapsible | Whether to enable collapsible feature | `boolean`          | `false` |
| collapsed   | Default collapsed state               | `boolean`          | `false` |
