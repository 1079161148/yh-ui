/**
 * 组件文档批量更新脚本
 * 为所有组件文档添加 Nuxt 使用示例
 */

export const components = [
  {
    name: 'Input',
    fileName: 'input',
    title: '输入框',
    nuxtExample: `\`\`\`vue
<template>
  <div>
    <!-- 基础输入框 -->
    <YhInput v-model="username" placeholder="请输入用户名" />
    
    <!-- 密码输入框 -->
    <YhInput
      v-model="password"
      type="password"
      show-password
      placeholder="请输入密码"
    />
    
    <!-- 结合表单验证 -->
    <YhInput
      v-model="email"
      :maxlength="50"
      show-word-limit
      placeholder="请输入邮箱"
    />
  </div>
</template>

<script setup lang="ts">
// 无需导入组件
const username = ref('')
const password = ref('')
const email = ref('')

// 监听输入变化
watch(email, (newVal) => {
  if (newVal && !newVal.includes('@')) {
    YhMessage.warning('请输入有效的邮箱地址')
  }
})
</script>
\`\`\``,
    ssrNotes: [
      '✅ 所有输入类型（text, password, textarea 等）',
      '✅ Props 和样式',
      '✅ v-model 双向绑定',
      '✅ 前缀/后缀图标',
      '⚠️ autofocus 仅客户端生效',
      '⚠️ DOM 方法（focus、blur）需在 onMounted 中调用'
    ],
    clientOnlyFeatures: ['autofocus', 'focus()', 'blur()', 'select()']
  },
  {
    name: 'Select',
    fileName: 'select',
    title: '选择器',
    nuxtExample: `\`\`\`vue
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
    
    <!-- 结合数据获取 -->
    <YhSelect v-model="cityId" :loading="pending" placeholder="选择城市">
      <YhOption
        v-for="city in cities"
        :key="city.id"
        :label="city.name"
        :value="city.id"
      />
    </YhSelect>
  </div>
</template>

<script setup lang="ts">
const value = ref('')
const multiValue = ref([])
const cityId = ref('')

// 使用 Nuxt 数据获取
const { data: cities, pending } = await useFetch('/api/cities')
</script>
\`\`\``,
    ssrNotes: [
      '✅ 基础选择功能',
      '✅ 多选模式',
      '✅ 可搜索选项',
      '✅ 选项分组',
      '⚠️ 虚拟滚动在 SSR 时初始化为关闭'
    ],
    clientOnlyFeatures: ['focus()', 'blur()']
  },
  {
    name: 'Checkbox',
    fileName: 'checkbox',
    title: '多选框',
    nuxtExample: `\`\`\`vue
<template>
  <div>
    <!-- 单个复选框 -->
    <YhCheckbox v-model="checked">同意条款</YhCheckbox>
    
    <!-- 复选框组 -->
    <YhCheckboxGroup v-model="selectedItems">
      <YhCheckbox label="item1">选项1</YhCheckbox>
      <YhCheckbox label="item2">选项2</YhCheckbox>
      <YhCheckbox label="item3">选项3</YhCheckbox>
    </YhCheckboxGroup>
    
    <!-- 动态选项 -->
    <YhCheckboxGroup v-model="selectedTags">
      <YhCheckbox
        v-for="tag in tags"
        :key="tag.id"
        :label="tag.id"
      >
        {{ tag.name }}
      </YhCheckbox>
    </YhCheckboxGroup>
  </div>
</template>

<script setup lang="ts">
const checked = ref(false)
const selectedItems = ref([])
const selectedTags = ref([])

// 服务端数据
const { data: tags } = await useFetch('/api/tags')
</script>
\`\`\``,
    ssrNotes: ['✅ 所有复选框状态', '✅ 复选框组', '✅ 禁用状态', '✅ 中间状态'],
    clientOnlyFeatures: []
  },
  {
    name: 'Radio',
    fileName: 'radio',
    title: '单选框',
    nuxtExample: `\`\`\`vue
<template>
  <div>
    <!-- 基础单选 -->
    <YhRadioGroup v-model="gender">
      <YhRadio label="male">男</YhRadio>
      <YhRadio label="female">女</YhRadio>
    </YhRadioGroup>
    
    <!-- 按钮样式 -->
    <YhRadioGroup v-model="size">
      <YhRadioButton label="small">小</YhRadioButton>
      <YhRadioButton label="medium">中</YhRadioButton>
      <YhRadioButton label="large">大</YhRadioButton>
    </YhRadioGroup>
  </div>
</template>

<script setup lang="ts">
const gender = ref('male')
const size = ref('medium')

// 监听变化
watch(size, (newSize) => {
  YhMessage.info(\`已选择: \${newSize}\`)
})
</script>
\`\`\``,
    ssrNotes: ['✅ 所有单选状态', '✅ 单选组', '✅ 按钮样式', '✅ 禁用状态'],
    clientOnlyFeatures: []
  },
  {
    name: 'Switch',
    fileName: 'switch',
    title: '开关',
    nuxtExample: `\`\`\`vue
<template>
  <div>
    <!-- 基础开关 -->
    <YhSwitch v-model="enabled" />
    
    <!-- 带文字 -->
    <YhSwitch
      v-model="status"
      active-text="开启"
      inactive-text="关闭"
    />
    
    <!-- 异步切换 -->
    <YhSwitch
      v-model="active"
      :loading="switching"
      @change="handleStatusChange"
    />
  </div>
</template>

<script setup lang="ts">
const enabled = ref(false)
const status = ref(true)
const active = ref(false)
const switching = ref(false)

const handleStatusChange = async (val: boolean) => {
  switching.value = true
  try {
    await $fetch('/api/status', {
      method: 'POST',
      body: { status: val }
    })
    YhMessage.success('状态更新成功')
  } catch (error) {
    active.value = !val // 回滚
    YhMessage.error('状态更新失败')
  } finally {
    switching.value = false
  }
}
</script>
\`\`\``,
    ssrNotes: ['✅ 开关状态', '✅ 加载状态', '✅ 禁用状态', '✅ 自定义值'],
    clientOnlyFeatures: ['focus()']
  }
]

// 为每个组件生成完整的文档章节
export function generateNuxtSection(component: (typeof components)[0]) {
  return `
## 在 Nuxt 中使用

${component.name} 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

${component.nuxtExample}

### SSR 注意事项

${component.name} 组件的所有功能都支持 SSR，包括：

${component.ssrNotes.map((note) => `- ${note}`).join('\n')}

${
  component.clientOnlyFeatures.length > 0
    ? `
以下方法仅在客户端有效，需要在 \`onMounted\` 中调用：

${component.clientOnlyFeatures.map((feature) => `- \`${feature}\``).join('\n')}
`
    : ''
}

::: tip SSR 安全性
${component.name} 组件已通过完整的 SSR 测试，确保服务端和客户端渲染的 HTML 结构完全一致，不会出现 Hydration Mismatch 错误。
:::
`
}
