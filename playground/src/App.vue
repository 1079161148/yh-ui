<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="playground">
    <h1>YH-UI Playground</h1>
    <p>欢迎使用 YH-UI 组件库开发环境</p>

    <section class="demo-section">
      <h2>Button 按钮</h2>

      <div class="demo-group">
        <h3>基础用法</h3>
        <div class="demo-row">
          <yh-button>默认按钮</yh-button>
          <yh-button type="primary">主要按钮</yh-button>
          <yh-button type="success">成功按钮</yh-button>
          <yh-button type="warning">警告按钮</yh-button>
          <yh-button type="danger">危险按钮</yh-button>
          <yh-button type="info">信息按钮</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>朴素按钮</h3>
        <div class="demo-row">
          <yh-button plain>朴素按钮</yh-button>
          <yh-button type="primary" plain>主要按钮</yh-button>
          <yh-button type="success" plain>成功按钮</yh-button>
          <yh-button type="warning" plain>警告按钮</yh-button>
          <yh-button type="danger" plain>危险按钮</yh-button>
          <yh-button type="info" plain>信息按钮</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>圆角按钮</h3>
        <div class="demo-row">
          <yh-button round>圆角按钮</yh-button>
          <yh-button type="primary" round>主要按钮</yh-button>
          <yh-button type="success" round>成功按钮</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>不同尺寸</h3>
        <div class="demo-row">
          <yh-button size="large">大型按钮</yh-button>
          <yh-button>默认按钮</yh-button>
          <yh-button size="small">小型按钮</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>禁用状态</h3>
        <div class="demo-row">
          <yh-button disabled>禁用按钮</yh-button>
          <yh-button type="primary" disabled>主要按钮</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>加载状态</h3>
        <div class="demo-row">
          <yh-button type="primary" :loading="loading" @click="handleClick">
            {{ loading ? '加载中...' : '点击加载' }}
          </yh-button>
          <yh-button loading>加载中</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>自定义颜色</h3>
        <div class="demo-row">
          <yh-button color="#6366f1">Indigo</yh-button>
          <yh-button color="#8b5cf6">Purple</yh-button>
          <yh-button color="#ec4899">Pink</yh-button>
          <yh-button color="#6366f1" plain>Indigo Plain</yh-button>
        </div>
      </div>

      <div class="demo-group">
        <h3>块级按钮</h3>
        <div class="demo-row" style="flex-direction: column;">
          <yh-button type="primary" block>块级按钮</yh-button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.playground {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--yh-text-color-primary);
}

p {
  color: var(--yh-text-color-secondary);
  margin-bottom: 32px;
}

.demo-section {
  margin-top: 32px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--yh-border-color);
  }
}

.demo-group {
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--yh-text-color-regular);
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
