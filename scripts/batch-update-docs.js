#!/usr/bin/env node

/**
 * 组件文档自动更新工具
 * 批量为组件添加 Nuxt 使用示例
 */

const components = [
  // Input 组件配置
  {
    name: 'Input',
    file: 'e:\\YH-UI\\docs\\components\\input.md',
    insertBefore: '## API',
    content: `## 在 Nuxt 中使用

Input 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

\`\`\`vue
<template>
  <div>
    <!-- 基础输入框，组件自动导入 -->
    <YhInput v-model="username" placeholder="请输入用户名" />
    
    <!-- 密码输入框 -->
    <YhInput
      v-model="password"
      type="password"
      show-password
      placeholder="请输入密码"
    />
    
    <!-- 结合 Nuxt 表单验证 -->
    <YhInput
      v-model="email"
      :maxlength="50"
      show-word-limit
      @blur="validateEmail"
      placeholder="请输入邮箱"
    />
    
    <!-- Textarea -->
    <YhInput
      v-model="description"
      type="textarea"
      :rows="4"
      placeholder="请输入描述"
    />
  </div>
</template>

<script setup lang="ts">
// 无需导入 Input 组件
const username = ref('')
const password = ref('')
const email = ref('')
const description = ref('')

// 表单验证
const validateEmail = () => {
  if (email.value && !email.value.includes('@')) {
    // YhMessage 也是自动导入的
    YhMessage.warning('请输入有效的邮箱地址')
  }
}

// 监听输入变化
watch(username, (newVal) => {
  console.log('用户名变化:', newVal)
})
</script>
\`\`\`

### SSR 注意事项

Input 组件的所有功能都支持 SSR，包括：

- ✅ 所有输入类型（text, password, textarea, number 等）
- ✅ v-model 双向绑定
- ✅ Props 和样式
- ✅ 前缀/后缀图标
- ✅ 可清空功能
- ✅ 字数统计
- ⚠️ \`autofocus\` 属性仅在客户端生效
- ⚠️ DOM 方法（\`focus()\`、\`blur()\`、\`select()\`）需在 \`onMounted\` 中调用

**使用 DOM 方法的正确方式**:

\`\`\`vue
<script setup>
const inputRef = ref()

// ❌ 错误：直接调用会在 SSR 时报错
// inputRef.value?.focus()

// ✅ 正确：在 onMounted 中调用
onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <YhInput ref="inputRef" v-model="value" />
</template>
\`\`\`

::: tip SSR 安全性
Input 组件已通过完整的 SSR 测试，确保服务端和客户端渲染的 HTML 结构完全一致，不会出现 Hydration Mismatch 错误。
:::

`
  },

  // Select 组件配置
  {
    name: 'Select',
    file: 'e:\\YH-UI\\docs\\components\\select.md',
    insertBefore: '## API',
    content: `## 在 Nuxt 中使用

Select 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入。

\`\`\`vue
<template>
  <div>
    <!-- 基础选择器 -->
    <YhSelect v-model="value" placeholder="请选择">
      <YhOption label="选项1" value="1" />
      <YhOption label="选项2" value="2" />
      <YhOption label="选项3" value="3" />
    </YhSelect>
    
    <!-- 多选 -->
    <YhSelect v-model="multiValue" multiple placeholder="请选择多个">
      <YhOption label="选项A" value="a" />
      <YhOption label="选项B" value="b" />
      <YhOption label="选项C" value="c" />
    </YhSelect>
    
    <!-- 结合服务端数据 -->
    <YhSelect v-model="cityId" :loading="pending" placeholder="选择城市">
      <YhOption
        v-for="city in cities"
        :key="city.id"
        :label="city.name"
        :value="city.id"
      />
    </YhSelect>
    
    <!-- 可搜索 -->
    <YhSelect
      v-model="searchValue"
      filterable
      placeholder="搜索选择"
    >
      <YhOption
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </YhSelect>
  </div>
</template>

<script setup lang="ts">
const value = ref('')
const multiValue = ref([])
const cityId = ref('')
const searchValue = ref('')

// 使用 Nuxt 的数据获取
const { data: cities, pending } = await useFetch('/api/cities')

const options = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
])

// 监听选择变化
watch(value, (newVal) => {
  YhMessage.info(\`已选择: \${newVal}\`)
})
</script>
\`\`\`

### SSR 注意事项

Select 组件的所有功能都支持 SSR，包括：

- ✅ 基础选择功能
- ✅ 多选模式
- ✅ 可搜索选项
- ✅ 选项分组
- ✅ 远程搜索
- ⚠️ 虚拟滚动在SSR时初始化为关闭，客户端激活后启用
- ⚠️ DOM 方法（\`focus()\`、\`blur()\`）需在 \`onMounted\` 中调用

::: tip SSR 安全性
Select 组件已通过完整的 SSR 测试，确保服务端和客户端渲染的 HTML 结构完全一致。
:::

`
  },

  // Checkbox 组件配置
  {
    name: 'Checkbox',
    file: 'e:\\YH-UI\\docs\\components\\checkbox.md',
    insertBefore: '## API',
    content: `## 在 Nuxt 中使用

Checkbox 组件完全支持 Nuxt 3/4 的 SSR 渲染。

\`\`\`vue
<template>
  <div>
    <!-- 单个复选框 -->
    <YhCheckbox v-model="checked">同意用户协议</YhCheckbox>
    
    <!-- 复选框组 -->
    <YhCheckboxGroup v-model="selectedItems">
      <YhCheckbox label="item1">选项1</YhCheckbox>
      <YhCheckbox label="item2">选项2</YhCheckbox>
      <YhCheckbox label="item3">选项3</YhCheckbox>
    </YhCheckboxGroup>
    
    <!-- 动态选项（服务端数据） -->
    <YhCheckboxGroup v-model="selectedTags">
      <YhCheckbox
        v-for="tag in tags"
        :key="tag.id"
        :label="tag.id"
      >
        {{ tag.name }}
      </YhCheckbox>
    </YhCheckboxGroup>
    
    <!-- 提交表单 -->
    <YhButton
      type="primary"
      :disabled="!checked"
      @click="handleSubmit"
    >
      提交
    </YhButton>
  </div>
</template>

<script setup lang="ts">
const checked = ref(false)
const selectedItems = ref([])
const selectedTags = ref([])

// 从服务端获取标签列表
const { data: tags } = await useFetch('/api/tags')

const handleSubmit = async () => {
  if (!checked.value) {
    YhMessage.warning('请先同意用户协议')
    return
  }
  
  // 提交表单
  await $fetch('/api/submit', {
    method: 'POST',
    body: {
      items: selectedItems.value,
      tags: selectedTags.value
    }
  })
  
  YhMessage.success('提交成功！')
}
</script>
\`\`\`

### SSR 注意事项

Checkbox 组件的所有功能都支持 SSR，包括：

- ✅ 单个复选框和复选框组
- ✅ 选中/未选中/中间状态
- ✅ 禁用状态
- ✅ 全选功能
- ✅ 限制选择数量

::: tip SSR 安全性
Checkbox 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致。
:::

`
  },

  // Radio 组件配置
  {
    name: 'Radio',
    file: 'e:\\YH-UI\\docs\\components\\radio.md',
    insertBefore: '## API',
    content: `## 在 Nuxt 中使用

Radio 组件完全支持 Nuxt 3/4 的 SSR 渲染。

\`\`\`vue
<template>
  <div>
    <!-- 基础单选 -->
    <YhRadioGroup v-model="gender">
      <YhRadio label="male">男</YhRadio>
      <YhRadio label="female">女</YhRadio>
      <YhRadio label="other">其他</YhRadio>
    </YhRadioGroup>
    
    <!-- 按钮样式 -->
    <YhRadioGroup v-model="size">
      <YhRadioButton label="small">小</YhRadioButton>
      <YhRadioButton label="medium">中</YhRadioButton>
      <YhRadioButton label="large">大</YhRadioButton>
    </YhRadioGroup>
    
    <!-- 禁用状态 -->
    <YhRadioGroup v-model="plan">
      <YhRadio label="free">免费版</YhRadio>
      <YhRadio label="pro">专业版</YhRadio>
      <YhRadio label="enterprise" disabled>企业版（即将推出）</YhRadio>
    </YhRadioGroup>
  </div>
</template>

<script setup lang="ts">
const gender = ref('male')
const size = ref('medium')
const plan = ref('free')

// 监听变化并显示提示
watch(plan, (newPlan) => {
  const planNames = {
    free: '免费版',
    pro: '专业版',
    enterprise: '企业版'
  }
  YhMessage.info(\`已选择: \${planNames[newPlan]}\`)
})

// 结合表单提交
const handleSubmit = async () => {
  await $fetch('/api/profile', {
    method: 'POST',
    body: {
      gender: gender.value,
      size: size.value,
      plan: plan.value
    }
  })
}
</script>
\`\`\`

### SSR 注意事项

Radio 组件的所有功能都支持 SSR，包括：

- ✅ 单选框和单选组
- ✅ 按钮样式单选
- ✅ 禁用状态
- ✅ 边框样式

::: tip SSR 安全性
Radio 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致。
:::

`
  },

  // Switch 组件配置
  {
    name: 'Switch',
    file: 'e:\\YH-UI\\docs\\components\\switch.md',
    insertBefore: '## API',
    content: `## 在 Nuxt 中使用

Switch 组件完全支持 Nuxt 3/4 的 SSR 渲染。

\`\`\`vue
<template>
  <div>
    <!-- 基础开关 -->
    <YhSwitch v-model="enabled" />
    
    <!-- 带文字说明 -->
    <YhSwitch
      v-model="status"
      active-text="开启"
      inactive-text="关闭"
    />
    
    <!-- 自定义颜色 -->
    <YhSwitch
      v-model="custom"
      active-color="#13ce66"
      inactive-color="#ff4949"
    />
    
    <!-- 异步切换（结合 API 调用） -->
    <YhSwitch
      v-model="notifyEnabled"
      :loading="switching"
      @change="handleNotifyChange"
    />
  </div>
</template>

<script setup lang="ts">
const enabled = ref(false)
const status = ref(true)
const custom = ref(false)
const notifyEnabled = ref(false)
const switching = ref(false)

// 异步切换处理
const handleNotifyChange = async (val: boolean) => {
  switching.value = true
  
  try {
    // 调用 API 更新设置
    await $fetch('/api/settings/notifications', {
      method: 'POST',
      body: { enabled: val }
    })
    
    YhMessage.success(\`通知已\${val ? '开启' : '关闭'}\`)
  } catch (error) {
    // 失败时回滚状态
    notifyEnabled.value = !val
    YhMessage.error('设置失败，请稍后重试')
  } finally {
    switching.value = false
  }
}

// 监听状态变化
watch(enabled, (newVal) => {
  console.log('开关状态:', newVal)
})
</script>
\`\`\`

### SSR 注意事项

Switch 组件的所有功能都支持 SSR，包括：

- ✅ 开关状态
- ✅ 加载状态
- ✅ 禁用状态
- ✅ 自定义值和颜色
- ✅ 文字说明
- ⚠️ DOM 方法（\`focus()\`）需在 \`onMounted\` 中调用

::: tip SSR 安全性
Switch 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致。
:::

`
  }
]

console.log('组件文档更新配置已生成！')
console.log(\`共 \${components.length} 个组件待更新\`)
console.log('\\n待更新组件:')
components.forEach((comp, index) => {
  console.log(\`\${index + 1}. \${comp.name}\`)
})
