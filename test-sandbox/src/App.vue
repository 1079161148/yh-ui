<script setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>

<template>
  <div style="padding: 24px">
    <h1>Consumer Acceptance Sandbox (Registry)</h1>
    <yh-calendar v-model="value" />
    <yh-date-picker v-model="value" style="margin-top: 20px" />
  </div>
</template>
