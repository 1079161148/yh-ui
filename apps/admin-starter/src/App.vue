<template>
  <YhConfigProvider :locale="zhCn" :theme="currentTheme" :size="appStore.size">
    <RouterView />
  </YhConfigProvider>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { zhCn } from '@yh-ui/yh-ui'
import { useTheme } from '@yh-ui/theme'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const currentTheme = computed(() => (appStore.isDark ? 'dark' : 'default'))
const themeManager = useTheme()

function syncGlobalThemeVars() {
  themeManager.setThemePreset(currentTheme.value)
  themeManager.setPrimaryColor(appStore.primaryColor)
}

watch([currentTheme, () => appStore.primaryColor], syncGlobalThemeVars, { immediate: true })

onMounted(() => {
  syncGlobalThemeVars()
})
</script>
