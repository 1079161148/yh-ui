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

通过 `schema` 配置驱动表单渲染，支持分组、栅格、异步数据、联动显隐、自定义插槽等完整特性。

::: tip 校验说明

- `required: true` 会自动在校验规则中补充必填约束。对于 **Switch (布尔值)** 等组件，建议直接在 `rules` 中配置 `validator` 以实现精准逻辑，避免简写属性导致的提示冲突。
- `rules` 数组可精细配置正则、长度、自定义函数等校验逻辑。
- `formRef.validate()` 会触发所有已注册字段的完整校验。
  :::

### 基础 Schema

配置 `schema` 数组即可生成表单，支持 `required` 简写和 `footer` 插槽绑定 `formRef.validate()` 进行表单校验。

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
      <yh-button type="primary" @click="handleValidate(formRef)">验证 Schema</yh-button>
      <yh-button @click="addConfig">动态增加项</yh-button>
      <yh-button @click="() => formRef.resetFields()">重置</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

### 高级 Schema (异步/联动/折叠/Tooltip)

`asyncOptions` 异步加载选项（自动注入 `loading`），`props` 函数联动字段状态，`collapsible` 可折叠分组，`tooltip` 字段提示文案。

<DemoBlock title="高级特性" :ts-code="tsAdvancedSchema" :js-code="jsAdvancedSchema">
  <yh-form-schema v-model="proModel" :schema="proSchema">
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleProValidate(formRef)">验证联动</yh-button>
      <yh-button @click="formRef.resetFields()">重置表单</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

### 字段类型扩展 (divider / text / list / render)

- `type: 'divider'`：插入分隔线，可配置标题
- `type: 'text'`：只读展示字段值，支持 `emptyValue` 自定义空态占位符（默认 `'-'`）
- `type: 'list'`：动态增减列表，通过 `listSchema` 定义子字段结构，`listProps` 控制增删行为
- `render`：函数式自定义渲染，返回 VNode

<DemoBlock title="字段类型扩展（divider / text / emptyValue / render）" :ts-code="tsSchemaTypes" :js-code="jsSchemaTypes">
  <yh-form-schema v-model="typeModel" :schema="typeSchema" :form-props="{ labelWidth: '100px' }" />
</DemoBlock>

### 动态增减列表 (type: 'list')

配置 `type: 'list'` 实现"联系人"等动态增减场景。`listProps.max`/`min` 约束可增删项数上下限，超限时按钮自动禁用。列表行内子字段完整支持所有 `FormSchemaItem` 配置（分列栅格、联动 `props`、校验 `rules` 等），校验路径会自动拼接为 `contacts.0.name`。

<DemoBlock title="动态增减列表" :ts-code="tsListSchema" :js-code="jsListSchema">
  <yh-form-schema
    v-model="listModel"
    :schema="listSchemaDemo"
    :form-props="{ labelWidth: '80px' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleListValidate(formRef)">提交</yh-button>
      <yh-button @click="formRef.resetFields()">重置</yh-button>
      <span style="margin-left: 12px; color: var(--yh-text-color-secondary); font-size: 13px;">
        当前共 {{ listModel.contacts?.length ?? 0 }} 条联系人（最多 5 条）
      </span>
    </template>
  </yh-form-schema>
</DemoBlock>

### 滚动偏移 (scroll-to-error-offset)

在带有固定顶部导航栏的页面中，校验失败后滚动到第一个错误项时，可能会被 `sticky` 头部遮挡。配置 `scroll-to-error-offset` 即可设置顶部偏移量（单位 px）：

<DemoBlock title="滚动偏移" :ts-code="tsScrollOffset" :js-code="jsScrollOffset">
  <div style="padding: 12px; background: var(--yh-bg-color-page); border-radius: 6px; margin-bottom: 12px; font-size: 13px; color: var(--yh-text-color-secondary);">
    以下为一个超长表单。当您滚动到底部点击提交时，由于部分必填项未填，页面会平滑回滚至第一个报错字段。得益于 <code>scroll-to-error-offset="64"</code> 配置，该报错字段不会被浏览器顶部遮挡。
  </div>
  <yh-form-schema
    v-model="offsetModel"
    :schema="offsetSchema"
    :form-props="{ scrollToError: true, scrollToErrorOffset: 64, labelPosition: 'top' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" style="width: 100%" @click="formRef.validate()">提交校验并回滚顶部</yh-button>
    </template>
  </yh-form-schema>
</DemoBlock>

<script setup lang="ts">
import { reactive, ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { FormSchemaInstance } from '@yh-ui/components'

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
    if (valid) window.alert('验证通过！')
  } catch (err) {
    console.warn('验证失败:', err)
  }
}

const dynamicSchema = ref([
  {
    title: '基础信息',
    items: [
      {
        field: 'email',
        label: '邮箱地址',
        component: 'input',
        col: 12,
        required: true,
        rules: [{ type: 'email', message: '正确的邮箱格式', trigger: ['blur', 'change'] }]
      },
      {
        field: 'type',
        label: '账户类型',
        component: 'radio',
        col: 12,
        props: { options: [{ label: '基础', value: 'base' }, { label: '高级', value: 'pro' }] }
      }
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

const proModel = ref({ category: '', product: '', agree: false, remark: '', reasonType: '', otherReason: '', idCard: '' })

const handleProValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert('验证通过！此部分具有复杂联动，校验已成功通过。')
  } catch (err) {
    window.alert('验证失败：部分字段被强关联为必填项且不符合规制。')
  }
}
const proSchema = [
  {
    title: '产品配置 (可折叠)',
    collapsible: true,
    items: [
      {
        field: 'category',
        label: '产品分类',
        component: 'select',
        col: 12,
        tooltip: '请选择一个产品分类，将影响具体产品列表',
        asyncOptions: () => new Promise(r => setTimeout(() => r([{ label: '电子', value: 'elec' }, { label: '家居', value: 'home' }]), 1000)),
        props: { placeholder: '异步加载中...' },
        required: true
      },
      {
        field: 'product',
        label: '具体产品',
        component: 'input',
        col: 12,
        props: (model) => ({
          disabled: !model.category,
          placeholder: model.category ? '请输入产品名' : '请先选择分类'
        })
      },
      {
        field: 'agree',
        label: '同意协议',
        component: 'switch',
        col: 12,
        rules: [{ validator: (r, v, cb) => v ? cb() : cb(new Error('请阅读并同意协议')) }]
      }
    ]
  },
  {
    title: '备注信息',
    items: [
      { field: 'remark', label: '备注', component: 'input', props: { type: 'textarea', rows: 3 } }
    ]
  },
  {
    title: '动态联动演示',
    items: [
      {
        field: 'reasonType',
        label: '申请原因类型',
        component: 'select',
        col: 12,
        props: {
          options: [
            { label: '事假', value: 'personal' },
            { label: '病假', value: 'sick' },
            { label: '其他', value: 'other' }
          ]
        },
        required: true
      },
      {
        field: 'otherReason',
        label: '其他原因说明',
        component: 'input',
        col: 12,
        // 动态隐藏：仅 reasonType 为 other 时显示
        hidden: (model) => model.reasonType !== 'other',
        // 动态必填和动态规则：如果是 other 则原因必填，且必须超过 5 个字
        required: (model) => model.reasonType === 'other',
        rules: (model) => {
          if (model.reasonType === 'other') {
            return [{ min: 5, message: '其他原因说明至少需要 5 个字', trigger: 'blur' }]
          }
          return []
        }
      },
      {
        field: 'idCard',
        label: '身份证号',
        component: 'input',
        col: 12,
        // 动态禁用：如果是病假不需要录入
        disabled: (model) => model.reasonType === 'sick',
        props: (model) => ({
          placeholder: model.reasonType === 'sick' ? '病假免填身份证' : '请输入身份证号'
        })
      }
    ]
  }
]

// 字段类型扩展演示（含 emptyValue 空态）
const typeModel = ref({ name: 'Alice', dept: '研发部', city: '', phone: null as null | string })
const typeSchema = [
  { type: 'divider', label: '基本信息', field: '_d1' },
  { field: 'name', label: '姓名', type: 'text' },
  { field: 'dept', label: '部门', type: 'text' },
  // emptyValue: phone 为 null 时显示 '暂无'
  { field: 'phone', label: '手机号', type: 'text', emptyValue: '暂无' },
  { type: 'divider', label: '可编辑内容', field: '_d2' },
  { field: 'city', label: '城市', component: 'input', placeholder: '请输入城市', col: 12 },
  {
    field: 'custom_render',
    label: 'Render',
    col: 12,
    render: (model) => h('div', {
      style: 'color: var(--yh-color-primary); font-weight: bold; line-height: 32px;'
    }, `当前城市：${model.city || '未设置'}`)
  }
]

// 动态列表演示
const listModel = ref<{ contacts: { name: string; phone: string; type: string }[] }>({ contacts: [] })
const listSchemaDemo = [
  {
    field: 'contacts',
    label: '联系人',
    type: 'list',
    listSchema: [
      { field: 'name', label: '姓名', component: 'input', col: 8, required: true },
      {
        field: 'phone',
        label: '手机号',
        component: 'input',
        col: 8,
        rules: [{ pattern: /^1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }]
      },
      {
        field: 'type',
        label: '类型',
        component: 'select',
        col: 8,
        props: { options: [{ label: '家人', value: 'family' }, { label: '朋友', value: 'friend' }, { label: '同事', value: 'colleague' }] }
      }
    ],
    listProps: {
      addButtonText: '添加联系人',
      max: 5,
      min: 0
    }
  }
]

const handleListValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) window.alert(`提交成功！共 ${listModel.value.contacts.length} 条联系人`)
  } catch {
    window.alert('请检查联系人信息是否填写完整')
  }
}


// Nuxt 使用示例
const nuxtForm = reactive({ username: '', role: 'admin' })

// Nuxt 使用示例
const tsNuxt = `<${_T}>
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
</${_T}>

<${_S} setup lang="ts">
import { reactive } from 'vue'

// 无需导入 Form, FormItem 等组件
const form = reactive({ 
  username: '', 
  role: 'admin' 
})
<\/script>`

const jsNuxt = toJs(tsNuxt)

// 代码定义 (使用 \u003C 规避 VPC 潜在冲突并修复 &lt; 显示问题)
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
</${_T}>

<${_S} setup lang="ts">
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
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择区域', trigger: 'change' }]
}

const locationOptions = [
  { value: 'pudong', label: '浦东', children: [{ value: 'lujiazui', label: '陆家嘴' }] }
]

const typicalFormRef = ref()
const onSubmit = () => typicalFormRef.value.validate((v) => v && alert('Success!'))
</${_S}>
`.trim()
const jsTypical = toJs(tsTypical)

const tsInline = `
<${_T}>
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
    <yh-form-item label="地区" prop="address.city">
      <yh-input v-model="model.address.city" />
    </yh-form-item>
    <yh-form-item label="街道" prop="address.street">
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
      <yh-button type="primary" @click="handleValidate(formRef)">验证 Schema</yh-button>
      <yh-button @click="addConfig">动态增加项</yh-button>
      <yh-button @click="() => formRef.resetFields()">重置</yh-button>
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
    if (valid) window.alert('验证通过！')
  } catch (err) {
    console.warn('验证失败:', err)
  }
}

const schema = ref([
  {
    title: '基础信息',
    items: [
      {
        field: 'email',
        label: '邮箱地址',
        component: 'input',
        col: 12,
        required: true,
        rules: [{ type: 'email', message: '正确的邮箱格式', trigger: ['blur', 'change'] }]
      },
      {
        field: 'type',
        label: '账户类型',
        component: 'radio',
        col: 12,
        props: { options: [{ label: '基础', value: 'base' }, { label: '高级', value: 'pro' }] }
      }
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
</${_S}>
`.trim()
const jsSchema = toJs(tsSchema)


const tsAdvancedSchema = `
<${_T}>
  <yh-form-schema v-model="model" :schema="schema">
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleProValidate(formRef)">验证联动</yh-button>
      <yh-button @click="formRef.resetFields()">重置表单</yh-button>
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
    if (valid) window.alert('验证通过！此部分具有复杂联动，校验已成功通过。')
  } catch (err) {
    window.alert('验证失败：部分字段被强关联为必填项且不符合规制。')
  }
}

const schema = [
  {
    title: '产品配置 (可折叠)',
    collapsible: true,
    items: [
      {
        field: 'category',
        label: '产品分类',
        component: 'select',
        col: 12,
        tooltip: '请选择一个产品分类，将影响具体产品列表',
        // 异步加载选项，自动注入 loading 状态
        asyncOptions: () => new Promise(r => setTimeout(() => r([{ label: '电子', value: 'elec' }, { label: '家居', value: 'home' }]), 1000)),
        props: { placeholder: '异步加载中...' },
        required: true
      },
      {
        field: 'product',
        label: '具体产品',
        component: 'input',
        col: 12,
        // props 函数实现字段联动
        props: (model) => ({
          disabled: !model.category,
          placeholder: model.category ? '请输入产品名' : '请先选择分类'
        })
      },
      {
        field: 'agree',
        label: '同意协议',
        component: 'switch',
        col: 12,
        rules: [{ validator: (r, v, cb) => v ? cb() : cb(new Error('请阅读并同意协议')) }]
      }
    ]
  },
  {
    title: '备注信息',
    items: [
      { field: 'remark', label: '备注', component: 'input', props: { type: 'textarea', rows: 3 } }
    ]
  },
  {
    title: '动态联动演示',
    items: [
      {
        field: 'reasonType',
        label: '申请原因类型',
        component: 'select',
        col: 12,
        props: {
          options: [
            { label: '事假', value: 'personal' },
            { label: '病假', value: 'sick' },
            { label: '其他', value: 'other' }
          ]
        },
        required: true
      },
      {
        field: 'otherReason',
        label: '其他原因说明',
        component: 'input',
        col: 12,
        // 动态隐藏：仅 reasonType 为 other 时显示
        hidden: (model) => model.reasonType !== 'other',
        // 动态必填和动态规则
        required: (model) => model.reasonType === 'other',
        rules: (model) => {
          if (model.reasonType === 'other') {
            return [{ min: 5, message: '其他原因说明至少需要 5 个字', trigger: 'blur' }]
          }
          return []
        }
      },
      {
        field: 'idCard',
        label: '身份证号',
        component: 'input',
        col: 12,
        // 动态禁用：病假无需填写
        disabled: (model) => model.reasonType === 'sick',
        props: (model) => ({
          placeholder: model.reasonType === 'sick' ? '病假免填身份证' : '请输入身份证号'
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

const model = ref({ name: 'Alice', dept: '研发部', city: '', phone: null })
const schema = [
  // type: 'divider' 插入分隔线
  { type: 'divider', label: '基本信息', field: '_d1' },
  // type: 'text' 只读展示字段值
  { field: 'name', label: '姓名', type: 'text' },
  { field: 'dept', label: '部门', type: 'text' },
  // emptyValue: 值为 null/undefined 时显示自定义占位符，默认 '-'
  { field: 'phone', label: '手机号', type: 'text', emptyValue: '暂无' },
  { type: 'divider', label: '可编辑内容', field: '_d2' },
  { field: 'city', label: '城市', component: 'input', col: 12 },
  // render 函数完全自定义渲染
  {
    field: 'custom_render',
    label: 'Render',
    col: 12,
    render: (model) => h('div', {
      style: 'color: var(--yh-color-primary); font-weight: bold; line-height: 32px;'
    }, \`当前城市：\${model.city || '未设置'}\`)
  }
]
</${_S}>
`.trim()
const jsSchemaTypes = toJs(tsSchemaTypes)

const tsListSchema = `
<${_T}>
  <yh-form-schema
    v-model="model"
    :schema="schema"
    :form-props="{ labelWidth: '80px' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" @click="handleValidate(formRef)">提交</yh-button>
      <yh-button @click="formRef.resetFields()">重置</yh-button>
      <span style="margin-left: 12px; color: var(--yh-text-color-secondary); font-size: 13px;">
        当前共 {{ model.contacts?.length ?? 0 }} 条（最多 5 条）
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
    label: '联系人',
    type: 'list',
    listSchema: [
      { field: 'name', label: '姓名', component: 'input', col: 8, required: true },
      {
        field: 'phone',
        label: '手机号',
        component: 'input',
        col: 8,
        rules: [{ pattern: /^1\\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }]
      },
      {
        field: 'type',
        label: '类型',
        component: 'select',
        col: 8,
        props: {
          options: [
            { label: '家人', value: 'family' },
            { label: '朋友', value: 'friend' },
            { label: '同事', value: 'colleague' }
          ]
        }
      }
    ],
    listProps: {
      addButtonText: '添加联系人',
      max: 5,  // 最多 5 条
      min: 0
    }
  }
]

const handleValidate = async (formRef: FormSchemaInstance) => {
  try {
    const valid = await formRef.validate()
    if (valid) alert(\`提交成功！共 \${model.value.contacts.length} 条联系人\`)
  } catch {
    alert('请检查联系人信息是否填写完整')
  }
}
</${_S}>
`.trim()
const jsListSchema = toJs(tsListSchema)
const offsetModel = ref<Record<string, unknown>>({})
const offsetSchema = Array.from({ length: 10 }).map((_, i) => ({
  field: `field_${i}`,
  label: `表单项 ${i + 1} ${i === 1 ? '（我将触发报错并被滚动定位）' : ''}`,
  component: 'input',
  required: i === 1 || i === 5 || i === 9
}))

const tsScrollOffset = `
<${_T}>
  <div style="padding: 12px; background: var(--yh-bg-color-page); border-radius: 6px; margin-bottom: 12px; font-size: 13px; color: var(--yh-text-color-secondary);">
    以下为一个超长表单。当您滚动到底部点击提交时，由于部分必填项未填，页面会平滑回滚至第一个报错字段。得益于 <code>scroll-to-error-offset="64"</code> 配置，该报错字段不会被浏览器顶部遮挡。
  </div>
  <yh-form-schema
    v-model="model"
    :schema="schema"
    :form-props="{ scrollToError: true, scrollToErrorOffset: 64, labelPosition: 'top' }"
  >
    <template #footer="{ formRef }">
      <yh-button type="primary" style="width: 100%" @click="formRef.validate()">提交校验并回滚顶部</yh-button>
    </template>
  </yh-form-schema>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const model = ref<Record<string, unknown>>({})
const schema = Array.from({ length: 10 }).map((_, i) => ({
  field: \`field_\${i}\`,
  label: \`表单项 \${i + 1} \${i === 1 ? '（我将触发报错并被滚动定位）' : ''}\`,
  component: 'input',
  required: i === 1 || i === 5 || i === 9
}))
</${_S}>
`.trim()
const jsScrollOffset = toJs(tsScrollOffset)
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

| 属性名                   | 说明                                          | 类型                                     | 默认值                                    |
| ------------------------ | --------------------------------------------- | ---------------------------------------- | ----------------------------------------- |
| model                    | 表单数据对象                                  | `object`                                 | —                                         |
| rules                    | 表单验证规则                                  | `object`                                 | —                                         |
| label-width              | 标签宽度                                      | `string \| number`                       | —                                         |
| label-position           | 标签位置                                      | `'left' \| 'right' \| 'top'`             | `'right'`                                 |
| layout                   | 布局模式                                      | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'`                            |
| disabled                 | 是否禁用表单全部组件                          | `boolean`                                | `false`                                   |
| size                     | 统一尺寸                                      | `'large' \| 'default' \| 'small'`        | `'default'`                               |
| status-icon              | 是否在输入框中显示校验结果反馈图标            | `boolean`                                | `false`                                   |
| scroll-to-error          | 校验失败时是否滚动到第一个错误项              | `boolean`                                | `false`                                   |
| scroll-into-view-options | 滚动配置项                                    | `object \| boolean`                      | `{ behavior: 'smooth', block: 'center' }` |
| scroll-to-error-offset   | 滚动到错误项的顶部偏移 (px)，防止被固定头遮挡 | `number`                                 | `0`                                       |

### Form Methods

| 方法名        | 说明                         | 参数                                                |
| ------------- | ---------------------------- | --------------------------------------------------- |
| validate      | 验证表单，支持只校验部分规则 | `(props?: string \| string[], callback?: Function)` |
| resetFields   | 重置表单，支持只重置部分字段 | `(props?: string \| string[])`                      |
| clearValidate | 移除表单项的校验结果         | `(props?: string \| string[])`                      |
| scrollToField | 滚动到指定字段               | `(prop: string)`                                    |

### FormItem Props

| 属性名         | 说明                                    | 类型                              | 默认值   |
| -------------- | --------------------------------------- | --------------------------------- | -------- |
| prop           | 表单域 model 字段，支持嵌套路径 (a.b.c) | `string`                          | —        |
| label          | 标签文本                                | `string`                          | —        |
| label-width    | 标签宽度                                | `string \| number`                | —        |
| required       | 是否必填                                | `boolean`                         | `false`  |
| rules          | 验证规则                                | `object \| array`                 | —        |
| size           | 给表单项配置尺寸（覆盖 Form 的设置）    | `'large' \| 'default' \| 'small'` | —        |
| error-position | 错误信息对齐方式                        | `'left' \| 'center' \| 'right'`   | `'left'` |
| show-message   | 是否显示校验错误信息                    | `boolean`                         | `true`   |
| disabled       | 禁用当前项（覆盖 Form 的设置）          | `boolean`                         | `false`  |

### FormSchema Props

| 属性名     | 说明                                  | 类型     | 默认值 |
| ---------- | ------------------------------------- | -------- | ------ |
| modelValue | 绑定值（v-model）                     | `object` | —      |
| schema     | 表单配置项，支持普通项和分组          | `array`  | `[]`   |
| formProps  | 透传给 YhForm 的属性（同 Form Props） | `object` | `{}`   |
| gutter     | 栅格列间距（px）                      | `number` | `20`   |

### FormSchema Methods

| 方法名        | 说明                               | 参数                                                 |
| ------------- | ---------------------------------- | ---------------------------------------------------- |
| validate      | 触发表单校验，支持指定字段         | `(fields?: string \| string[], callback?: Function)` |
| resetFields   | 重置字段值和校验状态，支持指定字段 | `(fields?: string \| string[])`                      |
| clearValidate | 清除校验结果，支持指定字段         | `(fields?: string \| string[])`                      |
| scrollToField | 滚动到指定字段                     | `(field: string)`                                    |
| getModel      | 获取当前表单数据快照               | `() => Record<string, unknown>`                      |
| setFieldValue | 动态更新单个字段值                 | `(field: string, value: unknown)`                    |

### FormSchema Slots

| 插槽名                         | 说明                              | 作用域参数                      |
| ------------------------------ | --------------------------------- | ------------------------------- |
| `field-{fieldName}`            | 自定义某字段的完整渲染            | `{ model, item, handleUpdate }` |
| `label-{fieldName}`            | 自定义某字段的标签渲染            | `{ model, item }`               |
| `footer`                       | 表单底部操作区                    | `{ model, formRef }`            |
| `field-{listField}-{subField}` | list 类型行内自定义子字段渲染     | `{ row, index, item }`          |
| `list-footer-{listField}`      | list 类型列表底部（添加按钮后方） | `{ model, item }`               |

### FormSchemaItem (配置项)

| 属性名        | 说明                                                                                 | 类型                                         | 默认值      |
| ------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- | ----------- |
| field         | 字段名，支持嵌套路径 (a.b.c)                                                         | `string`                                     | —           |
| label         | 标签名                                                                               | `string`                                     | —           |
| type          | 字段类型：`'default'` 普通，`'divider'` 分隔线，`'text'` 只读展示，`'list'` 动态列表 | `'default' \| 'divider' \| 'text' \| 'list'` | `'default'` |
| component     | 组件名 (input, radio, select, switch 等) 或 Vue 组件对象                             | `string \| Component`                        | —           |
| col           | 栅格占位 (1-24)                                                                      | `number`                                     | `24`        |
| props         | 透传给内部组件的属性，**支持函数式联动**                                             | `object \| (model) => object`                | —           |
| formItemProps | 透传给 form-item 的属性                                                              | `object`                                     | —           |
| required      | 是否必填（自动添加必填规则，无需手动写 rules）                                       | `boolean`                                    | `false`     |
| rules         | 校验规则（与 required 合并生效）                                                     | `FormRule \| FormRule[]`                     | —           |
| disabled      | 是否禁用（**支持函数式联动**）                                                       | `boolean \| (model) => boolean`              | —           |
| hidden        | 是否隐藏（**支持函数式联动**）                                                       | `boolean \| (model) => boolean`              | `false`     |
| defaultValue  | 字段默认值（在该字段值为 undefined 时自动填入）                                      | `unknown`                                    | —           |
| tooltip       | 字段 Label 旁显示的提示文案                                                          | `string`                                     | —           |
| slots         | 组件内部插槽配置（key 为插槽名，value 为组件对象）                                   | `object`                                     | —           |
| render        | 自定义渲染函数（优先级低于 `field-{name}` 具名插槽）                                 | `(model) => VNode \| Component`              | —           |
| asyncOptions  | 异步选项加载函数（自动注入 `loading` 状态）                                          | `() => Promise<object[]>`                    | —           |
| optionProp    | 接收异步选项数据的 prop 名                                                           | `string`                                     | `'options'` |
| emptyValue    | `type: 'text'` 时值为空时的占位文本                                                  | `string`                                     | `'-'`       |
| listSchema    | `type: 'list'` 时的子字段 schema 配置                                                | `FormSchemaItem[]`                           | —           |
| listProps     | `type: 'list'` 时的操作控制，含 max/min/addButtonText/allowAdd/allowDelete           | `object`                                     | `undefined` |

### FormSchemaGroup (分组配置)

| 属性名      | 说明                   | 类型               | 默认值  |
| ----------- | ---------------------- | ------------------ | ------- |
| title       | 分组标题               | `string`           | —       |
| items       | 分组内的表单项         | `FormSchemaItem[]` | `[]`    |
| props       | 透传给 fieldset 的属性 | `object`           | —       |
| collapsible | 是否开启折叠功能       | `boolean`          | `false` |
| collapsed   | 默认折叠状态           | `boolean`          | `false` |

### 主题变量

`YhForm` 和 `YhFormItem` 支持 `themeOverrides`。运行时样式主要消费以下组件变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-form-item-height` | 表单项与对齐控件的基础高度 | `32px` |
| `--yh-form-item-margin-bottom` | 表单项底部间距 | `22px` |
| `--yh-form-label-font-size` | 表单标签字体大小 | `14px` |

`YhFormSchema` 主要复用表单和全局主题令牌，不额外定义独立组件变量。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhFormProps` | `YhForm` props 类型 |
| `YhFormItemProps` | `YhFormItem` props 类型 |
| `YhFormSchemaProps` | `YhFormSchema` props 类型 |
| `YhFormSchemaItem` | Schema 表单项类型 |
| `YhFormSchemaGroup` | Schema 表单分组类型 |
| `YhFormRule` | 单条校验规则类型 |
| `YhFormRules` | 表单规则集合类型 |
| `YhFormInstance` | `YhForm` 实例类型 |
| `YhFormItemInstance` | `YhFormItem` 实例类型 |
| `YhFormSchemaInstance` | `YhFormSchema` 实例类型 |
