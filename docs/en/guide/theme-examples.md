# Theme System Examples

This page demonstrates the full functionality of the YH-UI theme system.

<script setup lang="ts">
import { ref } from 'vue'
import { 
  setThemeColor, 
  toggleDarkMode, 
  useTheme, 
  setThemePreset,
} from '@yh-ui/theme'
import type { 
  PresetTheme, 
  ThemeDensity, 
  ColorAlgorithm, 
  ColorBlindMode 
} from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/components/message'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const theme = useTheme()
const currentDensity = ref<ThemeDensity>('comfortable')
const currentAlgorithm = ref<ColorAlgorithm>('default')
const currentColorBlind = ref<ColorBlindMode>('none')
const customColor = ref('#409eff')
const exportedTheme = ref('')

// Preset theme list
const presets = [
  { name: 'default', label: 'Default', color: '#409eff' },
  { name: 'blue', label: 'Blue', color: '#1890ff' },
  { name: 'green', label: 'Green', color: '#10b981' },
  { name: 'purple', label: 'Purple', color: '#8b5cf6' },
  { name: 'orange', label: 'Orange', color: '#f97316' },
  { name: 'rose', label: 'Rose', color: '#f43f5e' },
  { name: 'amber', label: 'Amber', color: '#f59e0b' },
  { name: 'teal', label: 'Teal', color: '#14b8a6' },
  { name: 'indigo', label: 'Indigo', color: '#6366f1' },
  { name: 'slate', label: 'Slate', color: '#475569' },
  { name: 'zinc', label: 'Zinc', color: '#52525b' }
]

// --- Interaction logic ---

const handleThemeChange = (color: string, name: string) => {
  setThemeColor(color)
  YhMessage.success('Switched to ' + name + ' theme')
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage.info(isDark ? 'Dark mode enabled' : 'Light mode enabled')
}

const changePreset = (name: PresetTheme) => {
  theme.enableTransition({ duration: 300 })
  setThemePreset(name)
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

const applyColor = () => setThemeColor(customColor.value)

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
  YhMessage.info('All settings reset')
}

// --- Demo code string definitions ---

const C = '/'
const buildSfc = (template: string, script: string) => {
  return `<${_T}>\n${template}\n<${C}${_T}>\n\n<${_S} setup lang="ts">\n${script}\n<${C}${_S}>`
}

// 1. Basic Usage
const basicTpl = `  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button type="primary" @click="handleThemeChange('#722ed1', 'Purple')">Purple Theme</yh-button>
    <yh-button type="primary" @click="handleThemeChange('#409eff', 'Blue')">Blue Theme</yh-button>
    <yh-button type="primary" @click="handleThemeChange('#10b981', 'Green')">Green Theme</yh-button>
    <yh-button type="primary" @click="handleThemeChange('#f97316', 'Orange')">Orange Theme</yh-button>
    <yh-button @click="handleToggleDark">Toggle Dark/Light</yh-button>
  <${C}div>`

const basicScript = `import { setThemeColor, toggleDarkMode } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/components/message'

const handleThemeChange = (color: string, name: string) => {
  setThemeColor(color)
  YhMessage.success('Switched to ' + name + ' theme')
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage.info(isDark ? 'Dark mode enabled' : 'Light mode enabled')
}`

const tsBasicUsage = buildSfc(basicTpl, basicScript)
const jsBasicUsage = toJs(tsBasicUsage)

// 2. Preset Themes
const presetTpl = `  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button 
      v-for="preset in presets" 
      :key="preset.name"
      size="small"
      :style="{ backgroundColor: preset.color, borderColor: preset.color, color: '#fff' }"
      @click="changePreset(preset.name)"
    >
      {{ preset.label }}
    <${C}yh-button>
  <${C}div>`

const presetScript = `import { setThemePreset, useTheme } from '@yh-ui/theme'
import type { PresetTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/components/message'

const theme = useTheme()
const presets = [
  { name: 'default', label: 'Default', color: '#409eff' },
  { name: 'blue', label: 'Blue', color: '#1890ff' },
  { name: 'green', label: 'Green', color: '#10b981' },
  { name: 'purple', label: 'Purple', color: '#8b5cf6' },
  { name: 'orange', label: 'Orange', color: '#f97316' },
  { name: 'rose', label: 'Rose', color: '#f43f5e' },
  { name: 'amber', label: 'Amber', color: '#f59e0b' },
  { name: 'teal', label: 'Teal', color: '#14b8a6' },
  { name: 'indigo', label: 'Indigo', color: '#6366f1' },
  { name: 'slate', label: 'Slate', color: '#475569' },
  { name: 'zinc', label: 'Zinc', color: '#52525b' }
]

const changePreset = (name: PresetTheme) => {
  theme.enableTransition({ duration: 300 })
  setThemePreset(name)
  YhMessage.success('Switched to preset: ' + name)
}`

const tsPresetUsage = buildSfc(presetTpl, presetScript)
const jsPresetUsage = toJs(tsPresetUsage)

// 3. Density System
const densityTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="density === 'comfortable' ? 'primary' : 'default'" @click="setDensity('comfortable')">Comfortable Mode</yh-button>
      <yh-button :type="density === 'compact' ? 'primary' : 'default'" @click="setDensity('compact')">Compact Mode</yh-button>
      <yh-button :type="density === 'dense' ? 'primary' : 'default'" @click="setDensity('dense')">Dense Mode</yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">Primary Button</yh-button>
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

// 4. Color algorithms
const algoTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="algo === 'default' ? 'primary' : 'default'" @click="setAlgo('default')">Default Algorithm</yh-button>
      <yh-button :type="algo === 'vibrant' ? 'primary' : 'default'" @click="setAlgo('vibrant')">Vibrant Mode</yh-button>
      <yh-button :type="algo === 'muted' ? 'primary' : 'default'" @click="setAlgo('muted')">Muted Mode</yh-button>
      <yh-button :type="algo === 'pastel' ? 'primary' : 'default'" @click="setAlgo('pastel')">Pastel Mode</yh-button>
    <${C}div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary</yh-button>
      <yh-button type="success">Success</yh-button>
      <yh-button type="warning">Warning</yh-button>
      <yh-button type="danger">Danger</yh-button>
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

// 5. Intelligent generation
const colorGenTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <input type="color" v-model="color" style="width: 50px; height: 32px;" />
      <yh-button type="primary" @click="applyColor">Apply Primary</yh-button>
    <${C}div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary</yh-button>
      <yh-button type="success">Success</yh-button>
    <${C}div>
  <${C}div>`

const colorGenScript = `import { ref } from 'vue'
import { setThemeColor } from '@yh-ui/theme'

const color = ref('#409eff')
const applyColor = () => setThemeColor(color.value)`

const tsColorGenUsage = buildSfc(colorGenTpl, colorGenScript)
const jsColorGenUsage = toJs(tsColorGenUsage)

// 6. Colorblind friendly modes
const blindTpl = `  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button :type="mode === 'none' ? 'primary' : 'default'" @click="setMode('none')">Normal Vision</yh-button>
    <yh-button :type="mode === 'protanopia' ? 'primary' : 'default'" @click="setMode('protanopia')">Protanopia Mode</yh-button>
    <yh-button :type="mode === 'deuteranopia' ? 'primary' : 'default'" @click="setMode('deuteranopia')">Deuteranopia Mode</yh-button>
    <yh-button :type="mode === 'tritanopia' ? 'primary' : 'default'" @click="setMode('tritanopia')">Tritanopia Mode</yh-button>
    <yh-button :type="mode === 'achromatopsia' ? 'primary' : 'default'" @click="setMode('achromatopsia')">Achromatopsia Mode</yh-button>
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

// 7. Component-level overrides
const overrideTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="applyOverride">Button Rounded Override</yh-button>
      <yh-button @click="clearOverride">Clear Scoped Override</yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary">Style Preview</yh-button>
      <yh-button>Default Button</yh-button>
    <${C}div>
  <${C}div>`

const overrideScript = `import { useTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/components/message'

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

// 8. Theme configuration export
const exportTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="handleExport">Export Current Config</yh-button>
      <yh-button @click="resetEverything">Reset Everything</yh-button>
    <${C}div>
    <div v-if="exportedTheme" style="margin-top: 12px;">
      <pre style="background: var(--yh-fill-color-light); padding: 12px; border-radius: 8px; font-size: 12px; max-height: 200px; overflow: auto;">{{ exportedTheme }}<${C}pre>
    <${C}div>
  <${C}div>`

const exportScript = `import { ref } from 'vue'
import { useTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/components/message'

const theme = useTheme()
const exportedTheme = ref('')

const handleExport = () => {
  exportedTheme.value = theme.exportTheme({ name: 'My Custom Theme' })
  YhMessage.success('Theme configuration exported')
}

const resetEverything = () => {
  theme.reset()
  YhMessage.info('All settings reset')
}`

const tsExportImport = buildSfc(exportTpl, exportScript)
const jsExportImport = toJs(tsExportImport)
</script>

## Basic Usage

Dynamically toggle primary colors and dark mode.

<DemoBlock title="Basic Usage" :ts-code="tsBasicUsage" :js-code="jsBasicUsage">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button type="primary" @click="handleThemeChange('#722ed1', 'Purple')">Purple Theme</yh-button>
    <yh-button type="primary" @click="handleThemeChange('#409eff', 'Blue')">Blue Theme</yh-button>
    <yh-button type="primary" @click="handleThemeChange('#10b981', 'Green')">Green Theme</yh-button>
    <yh-button type="primary" @click="handleThemeChange('#f97316', 'Orange')">Orange Theme</yh-button>
    <yh-button @click="handleToggleDark">Toggle Dark/Light</yh-button>
  </div>
</DemoBlock>

## Preset Themes

Built-in common color presets for quick one-click switching.

<DemoBlock title="Preset Themes" :ts-code="tsPresetUsage" :js-code="jsPresetUsage">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button 
      v-for="preset in presets" 
      :key="preset.name"
      size="small"
      :style="{ backgroundColor: preset.color, borderColor: preset.color, color: '#fff' }"
      @click="changePreset(preset.name as PresetTheme)"
    >
      {{ preset.label }}
    </yh-button>
  </div>
</DemoBlock>

## Density/Compactness System

Supports three visual modes: Comfortable, Compact, and Dense.

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

Provides four generation logics: Default, Vibrant, Muted, and Pastel.

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

Automatically calculate and apply a full set of semantic colors from a single primary color.

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

Built-in colorblind simulation support to ensure an accessible experience.

<DemoBlock title="Colorblind Mode" :ts-code="tsColorBlindUsage" :js-code="jsColorBlindUsage">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button :type="currentColorBlind === 'none' ? 'primary' : 'default'" @click="setMode('none')">Normal Vision</yh-button>
    <yh-button :type="currentColorBlind === 'protanopia' ? 'primary' : 'default'" @click="setMode('protanopia')">Protanopia Mode</yh-button>
    <yh-button :type="currentColorBlind === 'deuteranopia' ? 'primary' : 'default'" @click="setMode('deuteranopia')">Deuteranopia Mode</yh-button>
    <yh-button :type="currentColorBlind === 'tritanopia' ? 'primary' : 'default'" @click="setMode('tritanopia')">Tritanopia Mode</yh-button>
    <yh-button :type="currentColorBlind === 'achromatopsia' ? 'primary' : 'default'" @click="setMode('achromatopsia')">Achromatopsia Mode</yh-button>
  </div>
</DemoBlock>

## Component-Level Theme Overriding

Precisely control style variables for specific components without making global changes.

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

Supports exporting the current theme state as a JSON configuration.

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
