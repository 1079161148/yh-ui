import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useTheme } from '@yh-ui/theme'

export type LayoutMode = 'side' | 'top'
export type ContentWidth = 'fixed' | 'fluid'

const APP_SETTINGS_STORAGE_KEY = 'yh-ui-admin:app-settings'

interface AppSettingsState {
  collapsed: boolean
  theme: 'light' | 'dark'
  primaryColor: string
  size: 'large' | 'default' | 'small'
  layout: LayoutMode
  showTabs: boolean
  fixedHeader: boolean
  showHeader: boolean
  showFooter: boolean
  showLogo: boolean
  contentWidth: ContentWidth
  grayMode: boolean
  colorWeak: boolean
  accordionMenu: boolean
}

export const useAppStore = defineStore('app', () => {
  const collapsed = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  const primaryColor = ref('#1677ff')
  const size = ref<'large' | 'default' | 'small'>('default')

  const layout = ref<LayoutMode>('side')
  const showTabs = ref(true)
  const fixedHeader = ref(true)
  const showHeader = ref(true)
  const showFooter = ref(false)
  const showLogo = ref(true)
  const contentWidth = ref<ContentWidth>('fluid')
  const grayMode = ref(false)
  const colorWeak = ref(false)
  const accordionMenu = ref(true)

  const isDark = computed(() => theme.value === 'dark')
  const sidebarWidth = computed(() => (collapsed.value ? 64 : 240))

  function getSettingsSnapshot(): AppSettingsState {
    return {
      collapsed: collapsed.value,
      theme: theme.value,
      primaryColor: primaryColor.value,
      size: size.value,
      layout: layout.value,
      showTabs: showTabs.value,
      fixedHeader: fixedHeader.value,
      showHeader: showHeader.value,
      showFooter: showFooter.value,
      showLogo: showLogo.value,
      contentWidth: contentWidth.value,
      grayMode: grayMode.value,
      colorWeak: colorWeak.value,
      accordionMenu: accordionMenu.value
    }
  }

  function toRgbTuple(color: string) {
    const normalized = color.trim()

    if (/^#([0-9a-f]{3})$/i.test(normalized)) {
      const [, shortHex = ''] = normalized.match(/^#([0-9a-f]{3})$/i) || []
      return shortHex.split('').map((char) => parseInt(char + char, 16)) as [number, number, number]
    }

    if (/^#([0-9a-f]{6})$/i.test(normalized)) {
      const [, fullHex = ''] = normalized.match(/^#([0-9a-f]{6})$/i) || []
      return [
        parseInt(fullHex.slice(0, 2), 16),
        parseInt(fullHex.slice(2, 4), 16),
        parseInt(fullHex.slice(4, 6), 16)
      ] as [number, number, number]
    }

    const rgbMatch = normalized.match(/^rgba?\(([^)]+)\)$/i)
    if (rgbMatch) {
      const channels = rgbMatch[1]
        .split(',')
        .slice(0, 3)
        .map((channel) => Math.max(0, Math.min(255, Number.parseFloat(channel.trim()) || 0)))

      if (channels.length === 3) {
        return channels as [number, number, number]
      }
    }

    return [22, 119, 255] as [number, number, number]
  }

  function applyAdminPrimaryVars(color: string) {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const lightMix =
      theme.value === 'dark'
        ? `color-mix(in srgb, ${color} 18%, #141414)`
        : `color-mix(in srgb, ${color} 12%, #ffffff)`
    const [r, g, b] = toRgbTuple(color)

    root.style.setProperty('--admin-primary', color)
    root.style.setProperty('--admin-primary-rgb', `${r}, ${g}, ${b}`)
    root.style.setProperty('--admin-primary-light', lightMix)
  }

  function applyThemeMode(nextTheme: 'light' | 'dark') {
    if (typeof document === 'undefined') return

    document.documentElement.setAttribute('data-theme', nextTheme)

    const themeManager = useTheme()
    themeManager.setThemePreset(nextTheme === 'dark' ? 'dark' : 'default')
    themeManager.setPrimaryColor(primaryColor.value)

    applyAdminPrimaryVars(primaryColor.value)
  }

  function applyFilterEffects() {
    if (typeof document === 'undefined') return

    const filters: string[] = []
    if (grayMode.value) filters.push('grayscale(100%)')
    if (colorWeak.value) filters.push('invert(80%)')

    document.documentElement.style.filter = filters.join(' ')
  }

  function persistSettings() {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(APP_SETTINGS_STORAGE_KEY, JSON.stringify(getSettingsSnapshot()))
  }

  function hydrateSettings() {
    if (typeof window === 'undefined') return

    const rawSettings = window.localStorage.getItem(APP_SETTINGS_STORAGE_KEY)
    if (!rawSettings) {
      applyThemeMode(theme.value)
      applyFilterEffects()
      return
    }

    try {
      const parsedSettings = JSON.parse(rawSettings) as Partial<AppSettingsState>

      collapsed.value =
        typeof parsedSettings.collapsed === 'boolean' ? parsedSettings.collapsed : collapsed.value
      theme.value = parsedSettings.theme === 'dark' ? 'dark' : 'light'
      primaryColor.value =
        typeof parsedSettings.primaryColor === 'string'
          ? parsedSettings.primaryColor
          : primaryColor.value
      size.value =
        parsedSettings.size === 'large' || parsedSettings.size === 'small'
          ? parsedSettings.size
          : 'default'
      layout.value = parsedSettings.layout === 'top' ? 'top' : 'side'
      showTabs.value =
        typeof parsedSettings.showTabs === 'boolean' ? parsedSettings.showTabs : showTabs.value
      fixedHeader.value =
        typeof parsedSettings.fixedHeader === 'boolean'
          ? parsedSettings.fixedHeader
          : fixedHeader.value
      showHeader.value =
        typeof parsedSettings.showHeader === 'boolean'
          ? parsedSettings.showHeader
          : showHeader.value
      showFooter.value =
        typeof parsedSettings.showFooter === 'boolean'
          ? parsedSettings.showFooter
          : showFooter.value
      showLogo.value =
        typeof parsedSettings.showLogo === 'boolean' ? parsedSettings.showLogo : showLogo.value
      contentWidth.value = parsedSettings.contentWidth === 'fixed' ? 'fixed' : 'fluid'
      grayMode.value =
        typeof parsedSettings.grayMode === 'boolean' ? parsedSettings.grayMode : grayMode.value
      colorWeak.value =
        typeof parsedSettings.colorWeak === 'boolean' ? parsedSettings.colorWeak : colorWeak.value
      accordionMenu.value =
        typeof parsedSettings.accordionMenu === 'boolean'
          ? parsedSettings.accordionMenu
          : accordionMenu.value
    } catch {
      window.localStorage.removeItem(APP_SETTINGS_STORAGE_KEY)
    }

    applyThemeMode(theme.value)
    applyFilterEffects()
  }

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  function toggleTheme() {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  function setTheme(t: 'light' | 'dark') {
    theme.value = t
    applyThemeMode(t)
  }

  function setPrimaryColor(color: string) {
    primaryColor.value = color
    if (typeof document !== 'undefined') {
      useTheme().setPrimaryColor(color)
    }
    applyAdminPrimaryVars(color)
  }

  function setSize(s: 'large' | 'default' | 'small') {
    size.value = s
  }

  function setLayout(mode: LayoutMode) {
    layout.value = mode
  }

  function setGrayMode(val: boolean) {
    grayMode.value = val
    applyFilterEffects()
  }

  function setColorWeak(val: boolean) {
    colorWeak.value = val
    applyFilterEffects()
  }

  function resetAll() {
    collapsed.value = false
    theme.value = 'light'
    primaryColor.value = '#1677ff'
    size.value = 'default'
    layout.value = 'side'
    showTabs.value = true
    fixedHeader.value = true
    showHeader.value = true
    showFooter.value = false
    showLogo.value = true
    contentWidth.value = 'fluid'
    grayMode.value = false
    colorWeak.value = false
    accordionMenu.value = true
    applyThemeMode('light')
    applyFilterEffects()
  }

  hydrateSettings()

  watch(getSettingsSnapshot, persistSettings, { deep: true })

  return {
    collapsed,
    theme,
    isDark,
    primaryColor,
    size,
    layout,
    showTabs,
    fixedHeader,
    showHeader,
    showFooter,
    showLogo,
    contentWidth,
    grayMode,
    colorWeak,
    accordionMenu,
    sidebarWidth,
    toggleCollapsed,
    toggleTheme,
    setTheme,
    setPrimaryColor,
    setSize,
    setLayout,
    setGrayMode,
    setColorWeak,
    resetAll
  }
})
