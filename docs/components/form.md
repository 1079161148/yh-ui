# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

## 基础用法

包含各种布局、尺寸和基本的必填验证。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
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
    <yh-form-item label="用户名" prop="username">
      <yh-input v-model="form.username" placeholder="请输入用户名" />
    </yh-form-item>
    <yh-form-item label="年龄" prop="age">
      <yh-input-number v-model="form.age" :min="1" :max="120" />
    </yh-form-item>
    <yh-form-item label="邮箱" prop="email">
      <yh-input v-model="form.email" placeholder="请输入邮箱" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="onSubmit">提交</yh-button>
      <yh-button @click="onReset">重置</yh-button>
    </yh-form-item>
  </yh-form>
</DemoBlock>

## 典型表单

包含多种类型的表单域，展示复杂的交互与联动校验。

<DemoBlock title="典型表单" :ts-code="tsTypical" :js-code="jsTypical">
  <yh-form 
    ref="typicalFormRef"
    :model="typicalForm" 
    :rules="typicalRules" 
    label-width="120px"
  >
    <yh-form-item label="活动名称" prop="name">
      <yh-input v-model="typicalForm.name" />
    </yh-form-item>
    <yh-form-item label="活动区域" prop="region">
      <yh-select v-model="typicalForm.region" placeholder="请选择活动区域">
        <yh-option label="上海" value="shanghai" />
        <yh-option label="北京" value="beijing" />
      </yh-select>
    </yh-form-item>
    <yh-form-item label="活动地点" prop="location">
      <yh-cascader 
        v-model="typicalForm.location" 
        :options="locationOptions" 
        placeholder="请选择地点"
      />
    </yh-form-item>
    <yh-form-item label="即时配送" prop="delivery">
      <yh-switch v-model="typicalForm.delivery" />
    </yh-form-item>
    <yh-form-item label="活动性质" prop="type">
      <yh-checkbox-group v-model="typicalForm.type">
        <yh-checkbox value="Online" name="type">美食/餐厅线上活动</yh-checkbox>
        <yh-checkbox value="Promotion" name="type">地推活动</yh-checkbox>
        <yh-checkbox value="Offline" name="type">线下主题活动</yh-checkbox>
      </yh-checkbox-group>
    </yh-form-item>
    <yh-form-item label="特殊资源" prop="resource">
      <yh-radio-group v-model="typicalForm.resource">
        <yh-radio value="Sponsor">线上品牌商赞助</yh-radio>
        <yh-radio value="Venue">线下场地免费</yh-radio>
      </yh-radio-group>
    </yh-form-item>
    <yh-form-item label="满意度评分" prop="rate">
      <yh-rate v-model="typicalForm.rate" />
    </yh-form-item>
    <yh-form-item label="活动人数" prop="count">
      <yh-slider v-model="typicalForm.count" :step="10" show-stops />
    </yh-form-item>
    <yh-form-item label="活动形式" prop="desc">
      <yh-input v-model="typicalForm.desc" type="textarea" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="onTypicalSubmit">立即创建</yh-button>
      <yh-button @click="onTypicalReset">取消</yh-button>
    </yh-form-item>
  </yh-form>
</DemoBlock>

## 行内表单

设置 `layout="inline"` 可以让表单项在一行内水平排列。Label 与 Input 已通过 Flex 布局实现了精准的垂直居中对齐。

<DemoBlock title="行内表单" :ts-code="tsInline" :js-code="jsInline">
  <yh-form layout="inline" :model="formInline">
    <yh-form-item label="审批人">
      <yh-input v-model="formInline.user" placeholder="审批人" />
    </yh-form-item>
    <yh-form-item label="活动区域">
      <yh-input v-model="formInline.region" placeholder="活动区域" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary">查询</yh-button>
    </yh-form-item>
  </yh-form>
</DemoBlock>

## 栅格布局

利用内置的 24 栅格系统，可以轻松实现复杂的表单自适应布局。

<DemoBlock title="栅格布局" :ts-code="tsGrid" :js-code="jsGrid">
  <yh-form :model="gridModel" label-position="top">
    <div class="yh-form--grid">
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="姓氏">
           <yh-input v-model="gridModel.firstName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="名字">
           <yh-input v-model="gridModel.lastName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--24">
        <yh-form-item label="详细地址">
           <yh-input v-model="gridModel.address" type="textarea" />
        </yh-form-item>
      </div>
    </div>
  </yh-form>
</DemoBlock>

## 校验反馈

设置 `status-icon` 后，在输入框、选择器等组件上会显示校验结果图标。

<DemoBlock title="校验图标" :ts-code="tsStatus" :js-code="jsStatus">
  <yh-form :model="statusModel" :rules="statusRules" status-icon label-width="120px">
    <yh-form-item label="成功状态" prop="success">
      <yh-input v-model="statusModel.success" />
    </yh-form-item>
    <yh-form-item label="加载中" prop="loading">
      <yh-input v-model="statusModel.loading" />
    </yh-form-item>
    <yh-form-item label="错误状态" prop="error">
      <yh-input v-model="statusModel.error" />
    </yh-form-item>
  </yh-form>
</DemoBlock>

## 嵌套字段

支持嵌套对象路径配置，如 `user.info.name`。

<DemoBlock title="嵌套属性" :ts-code="tsNested" :js-code="jsNested">
  <yh-form :model="nestedModel">
    <yh-form-item label="地区" prop="address.city">
      <yh-input v-model="nestedModel.address.city" />
    </yh-form-item>
    <yh-form-item label="街道" prop="address.street">
      <yh-input v-model="nestedModel.address.street" />
    </yh-form-item>
  </yh-form>
</DemoBlock>

## Schema 驱动 (动态表单)

通过 `schema` 配置轻松实现动态增删、分组展示和栅格占位。支持作用域插槽自定义字段渲染。

::: tip 校验规则配置
在 Schema 中配置正则校验规则时，由于 JSON 序列化问题，建议直接传入 RegExp 对象。例如：`pattern: /^1[3-9]\d{9}$/`。如果不生效，请检查是否被错误转换为字符串。
:::

### 基础 Schema

<DemoBlock title="Schema 基本用法" :ts-code="tsSchema" :js-code="jsSchema">
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
      <yh-button type="primary" @click="() => formRef.validate()">验证 Schema</yh-button>
      <yh-button @click="addConfig">动态增加项</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

### 高级 Schema (异步/联动/折叠)

支持 `asyncOptions` 异步加载选项，`props` 支持函数式动态计算，以及 `collapsible` 分组折叠。

<DemoBlock title="高级特性" :ts-code="tsAdvancedSchema" :js-code="jsAdvancedSchema">
  <yh-form-schema v-model="proModel" :schema="proSchema" />
</DemoBlock>

<script setup lang="ts">
import { reactive, ref, h } from 'vue'

const formSize = ref('default')
const form = reactive({ username: '', age: 18, email: '' })
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  age: [{ required: true, type: 'number', message: '请输入年龄', trigger: 'change' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: ['blur', 'change'] },
    { type: 'email', message: '格式不正确', trigger: ['blur', 'change'] }
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
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
  location: [{ required: true, type: 'array', message: '请选择活动地点', trigger: 'change' }],
  type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
  resource: [{ required: true, message: '请选择特殊资源', trigger: 'change' }],
  desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
}

const locationOptions = [
  { value: 'pudong', label: '浦东', children: [{ value: 'lujiazui', label: '陆家嘴' }] },
  { value: 'puxi', label: '浦西', children: [{ value: 'waitan', label: '外滩' }] }
]

const typicalFormRef = ref()
const onTypicalSubmit = () => typicalFormRef.value.validate((v) => v && alert('Success!'))
const onTypicalReset = () => typicalFormRef.value.resetFields()

const formInline = reactive({ user: '', region: '' })

const gridModel = reactive({ firstName: '', lastName: '', address: '' })

const rulesForm = reactive({ phone: '', desc: '', count: 0, password: '', username: '' })
const statusModel = reactive({ success: 'Valid Content', loading: '', error: 'invalid' })
const nestedModel = reactive({ address: { city: 'Shanghai', street: '' } })

const statusRules = {
  success: [{ required: true, message: 'Required', trigger: 'blur' }],
  loading: [{ asyncValidator: () => new Promise(res => setTimeout(res, 3000)) }],
  error: [{ validator: (r, v, cb) => cb(new Error('Invalid Value')) }]
}

const advancedRules = {
  phone: [{ pattern: /^1[3-9]\d{9}$/, message: '不合法的手机号', trigger: 'blur' }],
  desc: [{ min: 3, max: 5, message: '长度需在3到5之间', trigger: 'change' }],
  count: [{ type: 'number', min: 10, max: 20, message: '需在10-20之间', trigger: 'change' }],
  password: [{ validator: (r, v, cb) => !v ? cb(new Error('必填')) : (v.length < 6 ? cb(new Error('太短')) : cb()) }],
  username: [{ asyncValidator: (r, v) => new Promise((res, rej) => setTimeout(() => v === 'admin' ? rej('占用') : res(), 1000)) }]
}

const dynamicModel = ref({ email: '', custom: 'Initial Value', type: 'base' })
const dynamicSchema = ref([
  {
    title: '基础信息',
    items: [
      { field: 'email', label: '邮箱地址', component: 'input', col: 12, required: true },
      { field: 'type', label: '账户类型', component: 'radio', col: 12, props: { options: [{ label: '基础', value: 'base' }, { label: '高级', value: 'pro' }] } }
    ]
  },
  { field: 'custom', label: '自定义插槽', component: 'input' }
])
const addConfig = () => {
  dynamicSchema.value.push({
    field: `ext_${Date.now()}`, 
    label: '扩展项', 
    component: 'input',
    col: 12
  })
}

const proModel = ref({ category: '', product: '', remark: '' })
const proSchema = [
  {
    title: '产品配置 (可折叠)',
    collapsible: true, // 开启折叠
    items: [
      { 
        field: 'category', 
        label: '产品分类', 
        component: 'select', // 假设 select 组件存在，或者使用 input 模拟
        col: 12,
        // 模拟异步加载
        asyncOptions: () => new Promise(r => setTimeout(() => r([{ label: '电子', value: 'elec' }, { label: '家居', value: 'home' }]), 1000)),
        props: { placeholder: '异步加载中...' }
      },
      {
        field: 'product',
        label: '具体产品',
        component: 'input',
        col: 12,
        // 动态 Props：依赖 category 的值
        props: (model) => ({
          disabled: !model.category,
          placeholder: model.category ? '请输入产品名' : '请先选择分类'
        })
      }
    ]
  },
  {
    title: '其他信息',
    items: [
      { field: 'remark', label: '备注', component: 'input', props: { type: 'textarea' } }
    ]
  }
]

// Nuxt 使用示例
const nuxtForm = reactive({ username: '', role: 'admin' })

// Nuxt 使用示例
const tsNuxt = `<template>
  <yh-form :model="form" label-width="80px">
    <yh-form-item label="用户名">
      <yh-input v-model="form.username" placeholder="自动导入组件" />
    </yh-form-item>
    <yh-form-item label="角色">
      <yh-radio-group v-model="form.role">
        <yh-radio value="admin">管理员</yh-radio>
        <yh-radio value="user">用户</yh-radio>
      </yh-radio-group>
    </yh-form-item>
  </yh-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// 无需导入 Form, FormItem 等组件
const form = reactive({ 
  username: '', 
  role: 'admin' 
})
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// 代码定义 (使用 \u003C 规避 VPC 潜在冲突并修复 &lt; 显示问题)
const tsBasic = `
<template>
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
    <yh-form-item label="用户名" prop="username">
      <yh-input v-model="form.username" placeholder="请输入用户名" />
    </yh-form-item>
    <yh-form-item label="年龄" prop="age">
      <yh-input-number v-model="form.age" :min="1" :max="120" />
    </yh-form-item>
    <yh-form-item label="邮箱" prop="email">
      <yh-input v-model="form.email" placeholder="请输入邮箱" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="submit">提交</yh-button>
      <yh-button @click="reset">重置</yh-button>
    </yh-form-item>
  </yh-form>
</template>

\u003Cscript setup lang="ts">
import { reactive, ref } from 'vue'

const size = ref('default')
const form = reactive({ username: '', age: 18, email: '' })
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '格式不正确', trigger: 'change' }
  ]
}
const formRef = ref()

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) alert('Success!')
  })
}
const reset = () => formRef.value.resetFields()
\u003C/script>
`.trim()
const jsBasic = tsBasic.replace('lang="ts"', '')

const tsTypical = `
<template>
  <yh-form 
    ref="typicalFormRef"
    :model="typicalForm" 
    :rules="typicalRules" 
    label-width="120px"
  >
    <yh-form-item label="活动名称" prop="name">
      <yh-input v-model="typicalForm.name" />
    </yh-form-item>
    <yh-form-item label="活动区域" prop="region">
      <yh-select v-model="typicalForm.region" placeholder="请选择活动区域">
        <yh-option label="上海" value="shanghai" />
        <yh-option label="北京" value="beijing" />
      </yh-select>
    </yh-form-item>
    <yh-form-item label="活动地点" prop="location">
      <yh-cascader v-model="typicalForm.location" :options="locationOptions" />
    </yh-form-item>
    <yh-form-item label="即时配送" prop="delivery">
      <yh-switch v-model="typicalForm.delivery" />
    </yh-form-item>
    <yh-form-item label="活动性质" prop="type">
      <yh-checkbox-group v-model="typicalForm.type">
        <yh-checkbox value="Online">线上活动</yh-checkbox>
        <yh-checkbox value="Promotion">地推活动</yh-checkbox>
      </yh-checkbox-group>
    </yh-form-item>
    <yh-form-item label="满意度" prop="rate">
      <yh-rate v-model="typicalForm.rate" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary" @click="onSubmit">提交</yh-button>
    </yh-form-item>
  </yh-form>
</template>

\u003Cscript setup lang="ts">
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
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择区域', trigger: 'change' }]
}

const locationOptions = [
  { value: 'pudong', label: '浦东', children: [{ value: 'lujiazui', label: '陆家嘴' }] }
]

const typicalFormRef = ref()
const onSubmit = () => typicalFormRef.value.validate((v) => v && alert('Success!'))
\u003C/script>
`.trim()
const jsTypical = tsTypical.replace('lang="ts"', '')

const tsInline = `
<template>
  <yh-form layout="inline" :model="form">
    <yh-form-item label="审批人">
      <yh-input v-model="form.user" placeholder="审批人" />
    </yh-form-item>
    <yh-form-item label="活动区域">
      <yh-input v-model="form.region" placeholder="活动区域" />
    </yh-form-item>
    <yh-form-item>
      <yh-button type="primary">查询</yh-button>
    </yh-form-item>
  </yh-form>
</template>

\u003Cscript setup lang="ts">
import { reactive } from 'vue'
const form = reactive({ user: '', region: '' })
\u003C/script>
`.trim()
const jsInline = tsInline.replace('lang="ts"', '')

const tsGrid = `
<template>
  <yh-form :model="model" label-position="top">
    <div class="yh-form--grid">
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="姓氏">
           <yh-input v-model="model.firstName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--12">
        <yh-form-item label="名字">
           <yh-input v-model="model.lastName" />
        </yh-form-item>
      </div>
      <div class="yh-form-col yh-form-col--24">
        <yh-form-item label="详细地址">
           <yh-input v-model="model.address" type="textarea" />
        </yh-form-item>
      </div>
    </div>
  </yh-form>
</template>

\u003Cscript setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ firstName: '', lastName: '', address: '' })
\u003C/script>
`.trim()
const jsGrid = tsGrid.replace('lang="ts"', '')

const tsStatus = `
<template>
  <yh-form :model="model" :rules="rules" status-icon label-width="120px">
    <yh-form-item label="成功状态" prop="success">
      <yh-input v-model="model.success" />
    </yh-form-item>
    <yh-form-item label="加载中" prop="loading">
      <yh-input v-model="model.loading" />
    </yh-form-item>
    <yh-form-item label="错误状态" prop="error">
      <yh-input v-model="model.error" />
    </yh-form-item>
  </yh-form>
</template>

\u003Cscript setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ success: 'Valid Content', loading: '', error: 'invalid' })
const rules = {
  success: [{ required: true, message: 'Required', trigger: 'blur' }],
  loading: [{ asyncValidator: () => new Promise(res => setTimeout(res, 3000)) }],
  error: [{ validator: (r, v, cb) => cb(new Error('Invalid Value')) }]
}
\u003C/script>
`.trim()
const jsStatus = tsStatus.replace('lang="ts"', '')

const tsNested = `
<template>
  <yh-form :model="model">
    <yh-form-item label="地区" prop="address.city">
      <yh-input v-model="model.address.city" />
    </yh-form-item>
    <yh-form-item label="街道" prop="address.street">
      <yh-input v-model="model.address.street" />
    </yh-form-item>
  </yh-form>
</template>

\u003Cscript setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ 
  address: { city: 'Shanghai', street: '' } 
})
\u003C/script>
`.trim()
const jsNested = tsNested.replace('lang="ts"', '')

const tsRules = `
\u003Cscript setup lang="ts">
const rules = {
  // 正则校验
  phone: [{ pattern: /^1\\d{10}$/, message: '格式错误' }],
  // 自定义校验函数
  password: [{ validator: (rule, value, callback) => {
    if (value.length < 6) callback(new Error('太短'))
    else callback()
  }}],
  // 异步校验
  username: [{ asyncValidator: (rule, value) => {
    return Promise.resolve() // 或 reject('已占用')
  }}]
}
\u003C/script>
`.trim()
const jsRules = tsRules.replace('lang="ts"', '')

const tsSchema = `
<template>
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
      <yh-button type="primary" @click="() => formRef.validate()">验证 Schema</yh-button>
      <yh-button @click="addConfig">动态增加项</yh-button>
    </template>
  </yh-form-schema>
</template>

\u003Cscript setup lang="ts">
import { ref } from 'vue'

const model = ref({ email: '', custom: 'Initial Value', type: 'base' })
const schema = ref([
  {
    title: '基础信息',
    items: [
      { field: 'email', label: '邮箱地址', component: 'input', col: 12, required: true },
      { field: 'type', label: '账户类型', component: 'radio', col: 12, props: { options: [{ label: '基础', value: 'base' }, { label: '高级', value: 'pro' }] } }
    ]
  },
  { field: 'custom', label: '自定义插槽', component: 'input' }
])

const addConfig = () => {
  schema.value.push({
    field: \`ext_\${Date.now()}\`, 
    label: '扩展项', 
    component: 'input',
    col: 12
  })
}
\u003C/script>
`.trim()
const jsSchema = tsSchema.replace('lang="ts"', '')

const tsAdvancedSchema = `
<template>
  <yh-form-schema v-model="model" :schema="schema" />
</template>

\u003Cscript setup lang="ts">
import { ref } from 'vue'

const model = ref({ category: '', product: '', remark: '' })
const schema = [
  {
    title: '产品配置 (可折叠)',
    collapsible: true, // 开启折叠
    items: [
      { 
        field: 'category', 
        label: '产品分类', 
        component: 'select', 
        col: 12,
        // 模拟异步加载
        asyncOptions: () => new Promise(r => setTimeout(() => r([{ label: '电子', value: 'elec' }, { label: '家居', value: 'home' }]), 1000)),
        props: { placeholder: '异步加载中...' }
      },
      {
        field: 'product',
        label: '具体产品',
        component: 'input',
        col: 12,
        // 动态 Props：依赖 category 的值
        props: (model) => ({
          disabled: !model.category,
          placeholder: model.category ? '请输入产品名' : '请先选择分类'
        })
      }
    ]
  },
  {
    title: '其他信息',
    items: [
      { field: 'remark', label: '备注', component: 'input', props: { type: 'textarea' } }
    ]
  }
]
\u003C/script>
`.trim()
const jsAdvancedSchema = tsAdvancedSchema.replace('lang="ts"', '')
</script>

## 在 Nuxt 中使用

Form 组件及其子组件（FormItem, FormSchema）完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，所有表单组件均会自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-form :model="nuxtForm" label-width="80px">
    <yh-form-item label="用户名">
      <yh-input v-model="nuxtForm.username" placeholder="自动导入组件" />
    </yh-form-item>
    <yh-form-item label="角色">
      <yh-radio-group v-model="nuxtForm.role">
        <yh-radio value="admin">管理员</yh-radio>
        <yh-radio value="user">用户</yh-radio>
      </yh-radio-group>
    </yh-form-item>
  </yh-form>
</DemoBlock>

**SSR 注意事项**：

- ✅ 表单布局（水平、垂直、行内）在 SSR 中完全保持一致
- ✅ 校验错误状态（is-error）及错误信息支持服务端渲染
- ✅ 静态验证规则在服务器端即可生效（首屏即有错误样式）
- ⚠️ 提交验证（validate 方法）及动态异步验证仅在客户端激活后可用
- 💡 建议在 Nuxt 页面中使用 `reactive` 定义表单模型以保持响应式连贯

::: tip SSR 安全性
Form 组件生成的内部 ID 和 ARIA 属性均基于 `useId`，确保了在高度嵌套的表单结构中，服务端和客户端的 HTML 关联完全一致，不会触发水合警告。
:::

## API

### Form Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `object` | — |
| rules | 表单验证规则 | `object` | — |
| label-width | 标签宽度 | `string \| number` | — |
| label-position | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |
| layout | 布局模式 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| disabled | 是否禁用表单全部组件 | `boolean` | `false` |
| size | 统一尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| status-icon | 是否在输入框中显示校验结果反馈图标 | `boolean` | `false` |
| scroll-to-error | 校验失败时是否滚动到第一个错误项 | `boolean` | `false` |
| scroll-into-view-options | 滚动配置项 | `object \| boolean` | `{ behavior: 'smooth', block: 'center' }` |

### Form Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 验证表单，支持只校验部分规则 | `(props?: string \| string[], callback?: Function)` |
| resetFields | 重置表单，支持只重置部分字段 | `(props?: string \| string[])` |
| clearValidate | 移除表单项的校验结果 | `(props?: string \| string[])` |
| scrollToField | 滚动到指定字段 | `(prop: string)` |

### FormItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 表单域 model 字段，支持嵌套路径 (a.b.c) | `string` | — |
| label | 标签文本 | `string` | — |
| label-width | 标签宽度 | `string \| number` | — |
| required | 是否必填 | `boolean` | `false` |
| rules | 验证规则 | `object \| array` | — |
| size | 给表单项配置尺寸（覆盖 Form 的设置） | `'large' \| 'default' \| 'small'` | — |
| error-position | 错误信息对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| show-message | 是否显示校验错误信息 | `boolean` | `true` |
| disabled | 禁用当前项（覆盖 Form 的设置） | `boolean` | `false` |

### FormSchema Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `object` | — |
| schema | 表单配置项，支持分组、栅格等 | `array` | `[]` |
| formProps | 透传给 YhForm 的属性 | `object` | `{}` |

### FormSchemaItem (配置项)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| field | 字段名 | `string` | — |
| label | 标签名 | `string` | — |
| component | 组件名 (input, radio 等) | `string \| Component` | — |
| col | 栅格占位 (1-24) | `number` | `24` |
| props | 透传给内部组件的属性或动态函数 | `object \| (model) => object` | — |
| formItemProps | 透传给 form-item 的属性 | `object` | — |
| hidden | 是否隐藏 (支持函数) | `boolean \| (model) => boolean` | `false` |
| slots | 组件内部插槽配置 | `object` | — |
| render | 自定义渲染函数 | `(model) => VNode` | — |
| asyncOptions | 异步选项加载函数 | `() => Promise<any[]>` | — |
| optionProp | 接收选项的属性名 | `string` | `'options'` |

### FormSchemaGroup (分组配置)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | — |
| items | 分组内的表单项 | `FormSchemaItem[]` | `[]` |
| props | 透传给 fieldset 的属性 | `object` | — |
| collapsible | 是否开启折叠功能 | `boolean` | `false` |
| collapsed | 默认折叠状态 | `boolean` | `false` |
