<template>
  <div class="container">
    <h1>YH-UI Nuxt 3/4 测试页面</h1>

    <section class="section">
      <h2>基础组件测试</h2>

      <div class="demo-block">
        <h3>Button 按钮</h3>
        <div class="button-group">
          <YhButton>默认按钮</YhButton>
          <YhButton type="primary">主要按钮</YhButton>
          <YhButton type="success">成功按钮</YhButton>
          <YhButton type="warning">警告按钮</YhButton>
          <YhButton type="danger">危险按钮</YhButton>
        </div>
      </div>

      <div class="demo-block">
        <h3>Input 输入框</h3>
        <YhInput v-model="inputValue" placeholder="请输入内容" />
        <p>当前值: {{ inputValue }}</p>
      </div>

      <div class="demo-block">
        <h3>Select 选择器</h3>
        <YhSelect v-model="selectValue" placeholder="请选择">
          <YhOption label="选项1" value="1" />
          <YhOption label="选项2" value="2" />
          <YhOption label="选项3" value="3" />
        </YhSelect>
        <p>当前值: {{ selectValue }}</p>
      </div>

      <div class="demo-block">
        <h3>Switch 开关</h3>
        <YhSwitch v-model="switchValue" />
        <p>当前状态: {{ switchValue }}</p>
      </div>

      <div class="demo-block">
        <h3>Image 图片</h3>
        <YhImage
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='24' fill='%23eff6ff'/%3E%3Cpath d='M40 138l32-38 24 28 20-22 44 52H40z' fill='%2360a5fa'/%3E%3Ccircle cx='132' cy='68' r='18' fill='%23f59e0b'/%3E%3Ctext x='100' y='178' text-anchor='middle' font-size='18' fill='%231e3a8a' font-family='Arial'%3EYH-UI%3C/text%3E%3C/svg%3E"
          style="width: 100px; height: 100px; border-radius: 8px"
          :preview-src-list="[
            'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 800 800%27%3E%3Crect width=%27800%27 height=%27800%27 rx=%2796%27 fill=%27%23eff6ff%27/%3E%3Cpath d=%27M140 560l140-170 110 126 92-104 178 218H140z%27 fill=%27%2360a5fa%27/%3E%3Ccircle cx=%27528%27 cy=%27256%27 r=%2772%27 fill=%27%23f59e0b%27/%3E%3Ctext x=%27400%27 y=%27690%27 text-anchor=%27middle%27 font-size=%2784%27 fill=%27%231e3a8a%27 font-family=%27Arial%27%3EYH-UI Preview%3C/text%3E%3C/svg%3E'
          ]"
        />
      </div>

      <div class="demo-block">
        <h3>Pagination 分页</h3>
        <YhPagination v-model:current-page="currentPage" :total="100" layout="prev, pager, next" />
      </div>

      <div class="demo-block">
        <h3>Descriptions 描述列表</h3>
        <YhDescriptions title="用户信息" border>
          <YhDescriptionsItem label="用户名">YH-UI</YhDescriptionsItem>
          <YhDescriptionsItem label="版本">0.0.1</YhDescriptionsItem>
          <YhDescriptionsItem label="环境">Nuxt 3</YhDescriptionsItem>
        </YhDescriptions>
      </div>
    </section>

    <section class="section">
      <h2>表单组件测试</h2>

      <YhForm :model="form" label-width="100px">
        <YhFormItem label="用户名">
          <YhInput v-model="form.username" />
        </YhFormItem>

        <YhFormItem label="年龄">
          <YhInputNumber v-model="form.age" :min="1" :max="120" />
        </YhFormItem>

        <YhFormItem label="爱好">
          <YhCheckboxGroup v-model="form.hobbies">
            <YhCheckbox label="reading">阅读</YhCheckbox>
            <YhCheckbox label="sports">运动</YhCheckbox>
            <YhCheckbox label="music">音乐</YhCheckbox>
          </YhCheckboxGroup>
        </YhFormItem>

        <YhFormItem label="性别">
          <YhRadioGroup v-model="form.gender">
            <YhRadio label="male">男</YhRadio>
            <YhRadio label="female">女</YhRadio>
          </YhRadioGroup>
        </YhFormItem>
      </YhForm>
    </section>

    <section class="section">
      <h2>消息提示测试</h2>

      <div class="button-group">
        <YhButton @click="showSuccess">成功消息</YhButton>
        <YhButton @click="showWarning">警告消息</YhButton>
        <YhButton @click="showError">错误消息</YhButton>
        <YhButton @click="showNotification">通知</YhButton>
      </div>
    </section>

    <section class="section">
      <h2>SSR 测试信息</h2>

      <div class="info-block">
        <p><strong>渲染环境:</strong> {{ renderMode }}</p>
        <p><strong>组件 ID:</strong> {{ componentId }}</p>
        <p><strong>Z-Index:</strong> {{ currentZIndex }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 这些 hooks 会被自动导入
// const ns = useNamespace('test-page')
const componentId = useId()
const { currentZIndex } = useZIndex()

// 响应式数据
const inputValue = ref('')
const selectValue = ref('')
const switchValue = ref(false)
const currentPage = ref(1)

const form = ref({
  username: '',
  age: 18,
  hobbies: [],
  gender: ''
})

// SSR 检测
const renderMode = ref('unknown')

onMounted(() => {
  renderMode.value = 'Client Side Rendering'
})

onServerPrefetch(() => {
  renderMode.value = 'Server Side Rendering'
})

// 消息提示方法（YhMessage 会被自动导入）
const showSuccess = () => {
  YhMessage.success('操作成功！')
}

const showWarning = () => {
  YhMessage.warning('警告提示！')
}

const showError = () => {
  YhMessage.error('发生错误！')
}

const showNotification = () => {
  YhNotification({
    title: '通知标题',
    message: '这是一条通知消息的内容',
    type: 'info'
  })
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #333;
}

h2 {
  font-size: 24px;
  margin: 32px 0 20px;
  color: #409eff;
}

h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #666;
}

.section {
  margin-bottom: 48px;
}

.demo-block {
  margin-bottom: 32px;
  padding: 24px;
  background: #fafafa;
  border-radius: 8px;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.info-block {
  padding: 20px;
  background: #f0f9ff;
  border-left: 4px solid #409eff;
  border-radius: 4px;
}

.info-block p {
  margin: 8px 0;
  font-size: 14px;
}
</style>
