import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

export function useTheme() {
  const appStore = useAppStore()

  const isDark = computed(() => appStore.isDark)

  function toggle() {
    appStore.toggleTheme()
  }

  function setTheme(theme: 'light' | 'dark') {
    appStore.setTheme(theme)
  }

  return {
    theme: computed(() => appStore.theme),
    isDark,
    toggle,
    setTheme
  }
}
