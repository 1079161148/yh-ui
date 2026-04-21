# Theme System Examples

This page demonstrates the full interactive capabilities of the YH-UI theme system. Every example responds immediately after clicking, without refreshing the page.

<script setup lang="ts">
import { computed, ref } from 'vue'
import { presetThemes, setThemeColor, toggleDarkMode, useTheme } from '@yh-ui/theme'
import type {
  PresetTheme,
  ThemeDensity,
  ColorAlgorithm,
  ColorBlindMode
} from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

type QuickThemeName = 'purple' | 'blue' | 'green' | 'orange'

const theme = useTheme()
const currentQuickTheme = ref<QuickThemeName>('blue')
const currentPreset = ref<PresetTheme>('default')
const currentDensity = ref<ThemeDensity>('comfortable')
const currentAlgorithm = ref<ColorAlgorithm>('default')
const currentColorBlind = ref<ColorBlindMode>('none')
const customColor = ref('#409eff')
const exportedTheme = ref('')

const quickThemes = [
  { name: 'purple' as const, label: 'Purple Theme', color: '#722ed1' },
  { name: 'blue' as const, label: 'Blue Theme', color: '#409eff' },
  { name: 'green' as const, label: 'Green Theme', color: '#10b981' },
  { name: 'orange' as const, label: 'Orange Theme', color: '#f97316' }
]

const presets = [
  { name: 'default' as const, label: 'Default', color: '#409eff' },
  { name: 'dark' as const, label: 'Dark', color: '#141414' },
  { name: 'blue' as const, label: 'Blue', color: '#1890ff' },
  { name: 'green' as const, label: 'Green', color: '#10b981' },
  { name: 'purple' as const, label: 'Purple', color: '#8b5cf6' },
  { name: 'orange' as const, label: 'Orange', color: '#f97316' },
  { name: 'rose' as const, label: 'Rose', color: '#f43f5e' },
  { name: 'amber' as const, label: 'Amber', color: '#f59e0b' },
  { name: 'teal' as const, label: 'Teal', color: '#14b8a6' },
  { name: 'indigo' as const, label: 'Indigo', color: '#6366f1' },
  { name: 'slate' as const, label: 'Slate', color: '#475569' },
  { name: 'zinc' as const, label: 'Zinc', color: '#52525b' }
]

const currentPrimaryLabel = computed(() => {
  const quick = quickThemes.find(item => item.name === currentQuickTheme.value)
  return quick?.label ?? 'Current Theme'
})

const getFixedButtonStyle = (color: string) => ({
  backgroundColor: color,
  borderColor: color,
  color: '#fff'
})

const getQuickThemeButtonStyle = (name: QuickThemeName, color: string) => {
  return currentQuickTheme.value === name ? {} : getFixedButtonStyle(color)
}

const getPresetButtonStyle = (name: PresetTheme, color: string) => {
  return currentPreset.value === name ? {} : getFixedButtonStyle(color)
}

const handleThemeChange = (item: { name: QuickThemeName; label: string; color: string }) => {
  currentQuickTheme.value = item.name
  currentPreset.value = 'default'
  setThemeColor(item.color)
  YhMessage.success('Switched to ' + item.label)
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage.info(isDark ? 'Dark mode enabled' : 'Light mode enabled')
}

const changePreset = (name: PresetTheme) => {
  currentPreset.value = name
  theme.setPreset(name)
  theme.setColors({ ...presetThemes[name] })
  theme.setDarkMode(name === 'dark')
  YhMessage.success('Switched to preset: ' + name)
}

const setDensity = (val: ThemeDensity) => {
  currentDensity.value = val
  theme.setDensity(val)
}

const setAlgo = (val: ColorAlgorithm) => {
  currentAlgorithm.value = val
  theme.setAlgorithm(val)
}

const setMode = (val: ColorBlindMode) => {
  currentColorBlind.value = val
  theme.setColorBlindMode(val)
}

const applyColor = () => {
  setThemeColor(customColor.value)
  currentPreset.value = 'default'
  YhMessage.success('Applied custom primary color')
}

const applyOverride = () => {
  theme.setComponentTheme('button', { 'border-radius': '20px' })
  YhMessage.success('Applied scoped styles')
}

const clearOverride = () => {
  theme.clearComponentTheme('button')
  YhMessage.info('Cleared overrides')
}

const handleExport = () => {
  exportedTheme.value = theme.exportTheme({ name: 'My Custom Theme' })
  YhMessage.success('Theme configuration exported')
}

const resetEverything = () => {
  theme.reset()
  currentQuickTheme.value = 'blue'
  currentPreset.value = 'default'
  currentDensity.value = 'comfortable'
  currentAlgorithm.value = 'default'
  currentColorBlind.value = 'none'
  customColor.value = '#409eff'
  exportedTheme.value = ''
  YhMessage.info('All settings reset')
}

const C = '/'
const buildSfc = (template: string, script: string) => {
  return `<${_T}>\n${template}\n<${C}${_T}>\n\n<${_S} setup lang="ts">\n${script}\n<${C}${_S}>`
}

const basicTpl = `  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <yh-button
        v-for="item in quickThemes"
        :key="item.name"
        :type="currentQuickTheme === item.name ? 'primary' : 'default'"
        :style="currentQuickTheme === item.name ? {} : { backgroundColor: item.color, borderColor: item.color, color: '#fff' }"
        @click="handleThemeChange(item)"
      >
        {{ item.label }}
      <${C}yh-button>
      <yh-button @click="handleToggleDark">Toggle Dark/Light<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">{{ currentPrimaryLabel }}<${C}yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">After clicking above, the current theme button switches immediately to the new theme color.<${C}span>
    <${C}div>
  <${C}div>`

const basicScript = `import { computed, ref } from 'vue'
import { setThemeColor, toggleDarkMode } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'

type QuickThemeName = 'purple' | 'blue' | 'green' | 'orange'

const currentQuickTheme = ref<QuickThemeName>('blue')
const quickThemes = [
  { name: 'purple' as const, label: 'Purple Theme', color: '#722ed1' },
  { name: 'blue' as const, label: 'Blue Theme', color: '#409eff' },
  { name: 'green' as const, label: 'Green Theme', color: '#10b981' },
  { name: 'orange' as const, label: 'Orange Theme', color: '#f97316' }
]

const currentPrimaryLabel = computed(() => {
  const quick = quickThemes.find(item => item.name === currentQuickTheme.value)
  return quick?.label ?? 'Current Theme'
})

const handleThemeChange = (item: { name: QuickThemeName; label: string; color: string }) => {
  currentQuickTheme.value = item.name
  setThemeColor(item.color)
  YhMessage.success('Switched to ' + item.label)
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage.info(isDark ? 'Dark mode enabled' : 'Light mode enabled')
}`

const tsBasicUsage = buildSfc(basicTpl, basicScript)
const jsBasicUsage = toJs(tsBasicUsage)

const presetTpl = `  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-button
        v-for="preset in presets"
        :key="preset.name"
        size="small"
        :type="currentPreset === preset.name ? 'primary' : 'default'"
        :style="currentPreset === preset.name ? {} : { backgroundColor: preset.color, borderColor: preset.color, color: '#fff' }"
        @click="changePreset(preset.name)"
      >
        {{ preset.label }}
      <${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">Preset Preview<${C}yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">The selected preset button and preview button both switch into the active theme instantly.<${C}span>
    <${C}div>
  <${C}div>`

const presetScript = `import { ref } from 'vue'
import { presetThemes, useTheme } from '@yh-ui/theme'
import type { PresetTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'

const theme = useTheme()
const currentPreset = ref<PresetTheme>('default')
const presets = [
  { name: 'default' as const, label: 'Default', color: '#409eff' },
  { name: 'dark' as const, label: 'Dark', color: '#141414' },
  { name: 'blue' as const, label: 'Blue', color: '#1890ff' },
  { name: 'green' as const, label: 'Green', color: '#10b981' },
  { name: 'purple' as const, label: 'Purple', color: '#8b5cf6' },
  { name: 'orange' as const, label: 'Orange', color: '#f97316' },
  { name: 'rose' as const, label: 'Rose', color: '#f43f5e' },
  { name: 'amber' as const, label: 'Amber', color: '#f59e0b' },
  { name: 'teal' as const, label: 'Teal', color: '#14b8a6' },
  { name: 'indigo' as const, label: 'Indigo', color: '#6366f1' },
  { name: 'slate' as const, label: 'Slate', color: '#475569' },
  { name: 'zinc' as const, label: 'Zinc', color: '#52525b' }
]

const changePreset = (name: PresetTheme) => {
  currentPreset.value = name
  theme.setPreset(name)
  theme.setColors({ ...presetThemes[name] })
  theme.setDarkMode(name === 'dark')
  YhMessage.success('Switched to preset: ' + name)
}`

const tsPresetUsage = buildSfc(presetTpl, presetScript)
const jsPresetUsage = toJs(tsPresetUsage)

const densityTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="density === 'comfortable' ? 'primary' : 'default'" @click="setDensity('comfortable')">Comfortable Mode<${C}yh-button>
      <yh-button :type="density === 'compact' ? 'primary' : 'default'" @click="setDensity('compact')">Compact Mode<${C}yh-button>
      <yh-button :type="density === 'dense' ? 'primary' : 'default'" @click="setDensity('dense')">Dense Mode<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">Primary Button<${C}yh-button>
      <yh-input placeholder="Input size preview" style="width: 200px;" />
    <${C}div>
  <${C}div>`

const densityScript = `import { ref } from 'vue'
import { useTheme } from '@yh-ui/theme'
import type { ThemeDensity } from '@yh-ui/theme'

const theme = useTheme()
const density = ref<ThemeDensity>('comfortable')

const setDensity = (val: ThemeDensity) => {
  density.value = val
  theme.setDensity(val)
}`

const tsDensityUsage = buildSfc(densityTpl, densityScript)
const jsDensityUsage = toJs(tsDensityUsage)

const algoTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="algo === 'default' ? 'primary' : 'default'" @click="setAlgo('default')">Default Algorithm<${C}yh-button>
      <yh-button :type="algo === 'vibrant' ? 'primary' : 'default'" @click="setAlgo('vibrant')">Vibrant Mode<${C}yh-button>
      <yh-button :type="algo === 'muted' ? 'primary' : 'default'" @click="setAlgo('muted')">Muted Mode<${C}yh-button>
      <yh-button :type="algo === 'pastel' ? 'primary' : 'default'" @click="setAlgo('pastel')">Pastel Mode<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary<${C}yh-button>
      <yh-button type="success">Success<${C}yh-button>
      <yh-button type="warning">Warning<${C}yh-button>
      <yh-button type="danger">Danger<${C}yh-button>
    <${C}div>
  <${C}div>`

const algoScript = `import { ref } from 'vue'
import { useTheme } from '@yh-ui/theme'
import type { ColorAlgorithm } from '@yh-ui/theme'

const theme = useTheme()
const algo = ref<ColorAlgorithm>('default')

const setAlgo = (val: ColorAlgorithm) => {
  algo.value = val
  theme.setAlgorithm(val)
}`

const tsAlgorithmUsage = buildSfc(algoTpl, algoScript)
const jsAlgorithmUsage = toJs(tsAlgorithmUsage)

const colorGenTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <input type="color" v-model="color" style="width: 50px; height: 32px;" />
      <yh-button type="primary" @click="applyColor">Apply Primary<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary<${C}yh-button>
      <yh-button type="success">Success<${C}yh-button>
    <${C}div>
  <${C}div>`

const colorGenScript = `import { ref } from 'vue'
import { setThemeColor } from '@yh-ui/theme'

const color = ref('#409eff')

const applyColor = () => setThemeColor(color.value)`

const tsColorGenUsage = buildSfc(colorGenTpl, colorGenScript)
const jsColorGenUsage = toJs(tsColorGenUsage)

const blindTpl = `  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button :type="mode === 'none' ? 'primary' : 'default'" @click="setMode('none')">Normal Vision<${C}yh-button>
    <yh-button :type="mode === 'protanopia' ? 'primary' : 'default'" @click="setMode('protanopia')">Protanopia Mode<${C}yh-button>
    <yh-button :type="mode === 'deuteranopia' ? 'primary' : 'default'" @click="setMode('deuteranopia')">Deuteranopia Mode<${C}yh-button>
    <yh-button :type="mode === 'tritanopia' ? 'primary' : 'default'" @click="setMode('tritanopia')">Tritanopia Mode<${C}yh-button>
    <yh-button :type="mode === 'achromatopsia' ? 'primary' : 'default'" @click="setMode('achromatopsia')">Achromatopsia Mode<${C}yh-button>
  <${C}div>`

const blindScript = `import { ref } from 'vue'
import { useTheme } from '@yh-ui/theme'
import type { ColorBlindMode } from '@yh-ui/theme'

const theme = useTheme()
const mode = ref<ColorBlindMode>('none')

const setMode = (val: ColorBlindMode) => {
  mode.value = val
  theme.setColorBlindMode(val)
}`

const tsColorBlindUsage = buildSfc(blindTpl, blindScript)
const jsColorBlindUsage = toJs(tsColorBlindUsage)

const overrideTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="applyOverride">Button Rounded Override<${C}yh-button>
      <yh-button @click="clearOverride">Clear Scoped Override<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary">Style Preview<${C}yh-button>
      <yh-button>Default Button<${C}yh-button>
    <${C}div>
  <${C}div>`

const overrideScript = `import { useTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'

const theme = useTheme()

const applyOverride = () => {
  theme.setComponentTheme('button', { 'border-radius': '20px' })
  YhMessage.success('Applied scoped styles')
}

const clearOverride = () => {
  theme.clearComponentTheme('button')
  YhMessage.info('Cleared overrides')
}`

const tsComponentOverride = buildSfc(overrideTpl, overrideScript)
const jsComponentOverride = toJs(tsComponentOverride)

const exportTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="handleExport">Export Current Config<${C}yh-button>
      <yh-button @click="resetEverything">Reset Everything<${C}yh-button>
    <${C}div>
    <div v-if="exportedTheme" style="margin-top: 12px;">
      <pre style="background: var(--yh-fill-color-light); padding: 12px; border-radius: 8px; font-size: 12px; max-height: 200px; overflow: auto;">{{ exportedTheme }}<${C}pre>
    <${C}div>
  <${C}div>`

const exportScript = `import { ref } from 'vue'
import { useTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'

const theme = useTheme()
const exportedTheme = ref('')

const handleExport = () => {
  exportedTheme.value = theme.exportTheme({ name: 'My Custom Theme' })
  YhMessage.success('Theme configuration exported')
}

const resetEverything = () => {
  theme.reset()
  exportedTheme.value = ''
  YhMessage.info('All settings reset')
}`

const tsExportImport = buildSfc(exportTpl, exportScript)
const jsExportImport = toJs(tsExportImport)
</script>

## Basic Usage

Dynamically switch primary colors and dark mode.

<DemoBlock title="Basic Usage" :ts-code="tsBasicUsage" :js-code="jsBasicUsage">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <yh-button
        v-for="item in quickThemes"
        :key="item.name"
        :type="currentQuickTheme === item.name ? 'primary' : 'default'"
        :style="getQuickThemeButtonStyle(item.name, item.color)"
        @click="handleThemeChange(item)"
      >
        {{ item.label }}
      </yh-button>
      <yh-button @click="handleToggleDark">Toggle Dark/Light</yh-button>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">{{ currentPrimaryLabel }}</yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">After clicking above, the current theme button switches immediately to the new theme color.</span>
    </div>
  </div>
</DemoBlock>

## Preset Themes

Built-in preset palettes for one-click switching.

<DemoBlock title="Preset Themes" :ts-code="tsPresetUsage" :js-code="jsPresetUsage">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <yh-button
        v-for="preset in presets"
        :key="preset.name"
        size="small"
        :type="currentPreset === preset.name ? 'primary' : 'default'"
        :style="getPresetButtonStyle(preset.name, preset.color)"
        @click="changePreset(preset.name)"
      >
        {{ preset.label }}
      </yh-button>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">Preset Preview</yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">The selected preset button and preview button both switch into the active theme instantly.</span>
    </div>
  </div>
</DemoBlock>

## Density / Compactness System

Supports Comfortable, Compact, and Dense visual modes.

<DemoBlock title="Density System" :ts-code="tsDensityUsage" :js-code="jsDensityUsage">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="currentDensity === 'comfortable' ? 'primary' : 'default'" @click="setDensity('comfortable')">Comfortable Mode</yh-button>
      <yh-button :type="currentDensity === 'compact' ? 'primary' : 'default'" @click="setDensity('compact')">Compact Mode</yh-button>
      <yh-button :type="currentDensity === 'dense' ? 'primary' : 'default'" @click="setDensity('dense')">Dense Mode</yh-button>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">Primary Button</yh-button>
      <yh-input placeholder="Input size preview" style="width: 200px;" />
    </div>
  </div>
</DemoBlock>

## Color Algorithms

Provides four generation modes: Default, Vibrant, Muted, and Pastel.

<DemoBlock title="Color Algorithms" :ts-code="tsAlgorithmUsage" :js-code="jsAlgorithmUsage">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="currentAlgorithm === 'default' ? 'primary' : 'default'" @click="setAlgo('default')">Default Algorithm</yh-button>
      <yh-button :type="currentAlgorithm === 'vibrant' ? 'primary' : 'default'" @click="setAlgo('vibrant')">Vibrant Mode</yh-button>
      <yh-button :type="currentAlgorithm === 'muted' ? 'primary' : 'default'" @click="setAlgo('muted')">Muted Mode</yh-button>
      <yh-button :type="currentAlgorithm === 'pastel' ? 'primary' : 'default'" @click="setAlgo('pastel')">Pastel Mode</yh-button>
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary</yh-button>
      <yh-button type="success">Success</yh-button>
      <yh-button type="warning">Warning</yh-button>
      <yh-button type="danger">Danger</yh-button>
    </div>
  </div>
</DemoBlock>

## Intelligent Color Generation

Automatically derives semantic colors from a single primary color.

<DemoBlock title="Intelligent Generation" :ts-code="tsColorGenUsage" :js-code="jsColorGenUsage">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <input type="color" v-model="customColor" style="width: 50px; height: 36px; border: none; cursor: pointer;" />
      <yh-button type="primary" @click="applyColor">Apply Primary</yh-button>
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary</yh-button>
      <yh-button type="success">Success</yh-button>
    </div>
  </div>
</DemoBlock>

## Colorblind Friendly Mode

Built-in simulation modes help verify accessibility quickly.

<DemoBlock title="Colorblind Mode" :ts-code="tsColorBlindUsage" :js-code="jsColorBlindUsage">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button :type="currentColorBlind === 'none' ? 'primary' : 'default'" @click="setMode('none')">Normal Vision</yh-button>
    <yh-button :type="currentColorBlind === 'protanopia' ? 'primary' : 'default'" @click="setMode('protanopia')">Protanopia Mode</yh-button>
    <yh-button :type="currentColorBlind === 'deuteranopia' ? 'primary' : 'default'" @click="setMode('deuteranopia')">Deuteranopia Mode</yh-button>
    <yh-button :type="currentColorBlind === 'tritanopia' ? 'primary' : 'default'" @click="setMode('tritanopia')">Tritanopia Mode</yh-button>
    <yh-button :type="currentColorBlind === 'achromatopsia' ? 'primary' : 'default'" @click="setMode('achromatopsia')">Achromatopsia Mode</yh-button>
  </div>
</DemoBlock>

## Component-Level Theme Override

Override specific component variables without changing the global theme.

<DemoBlock title="Component Override" :ts-code="tsComponentOverride" :js-code="jsComponentOverride">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="applyOverride">Button Rounded Override</yh-button>
      <yh-button @click="clearOverride">Clear Scoped Override</yh-button>
    </div>
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary">Style Preview</yh-button>
      <yh-button>Default Button</yh-button>
    </div>
  </div>
</DemoBlock>

## Theme Config Export

Export the current theme state as JSON.

<DemoBlock title="Config Export" :ts-code="tsExportImport" :js-code="jsExportImport">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="handleExport">Export Current Config</yh-button>
      <yh-button @click="resetEverything">Reset Everything</yh-button>
    </div>
    <div v-if="exportedTheme" style="margin-top: 12px;">
      <pre style="background: var(--yh-fill-color-light); padding: 12px; border-radius: 8px; font-size: 12px; max-height: 200px; overflow: auto;">{{ exportedTheme }}</pre>
    </div>
  </div>
</DemoBlock>

<style>
.demo-block {
  padding: 24px;
  background: var(--yh-bg-color);
  border: 1px solid var(--yh-border-color-light);
  border-radius: 8px;
  margin: 16px 0;
}
</style>
