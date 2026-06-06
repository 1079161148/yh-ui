<template>
  <div class="container">
    <h1>ColorPicker Nuxt 测试</h1>

    <div class="demo-block">
      <h3>基础用法</h3>
      <YhColorPicker v-model="color" />
      <p>当前颜色: {{ color }}</p>
    </div>

    <div class="demo-block">
      <h3>透明度支持</h3>
      <YhColorPicker v-model="colorAlpha" show-alpha />
      <p>当前颜色: {{ colorAlpha }}</p>
    </div>

    <div class="demo-block">
      <h3>尺寸演示</h3>
      <div class="flex-row">
        <YhColorPicker v-model="color" size="large" />
        <YhColorPicker v-model="color" />
        <YhColorPicker v-model="color" size="small" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const color = ref('#6366f1')
const colorAlpha = ref('rgba(99, 102, 241, 0.8)')
</script>

<style scoped>
.container {
  padding: 40px;
}

.demo-block {
  margin-bottom: 24px;
  padding: 24px;
  background: #fafafa;
  border-radius: 8px;
}

.flex-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
