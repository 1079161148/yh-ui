# 主题系统示例

本页面展示 YH-UI 主题系统的完整交互能力。所有示例都会在点击后立即生效，无需刷新页面。

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
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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
  { name: 'purple' as const, label: '紫色主题', color: '#722ed1' },
  { name: 'blue' as const, label: '蓝色主题', color: '#409eff' },
  { name: 'green' as const, label: '绿色主题', color: '#10b981' },
  { name: 'orange' as const, label: '橙色主题', color: '#f97316' }
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
  return quick?.label ?? '当前主题'
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
  YhMessage.success('已切换为 ' + item.label)
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage.info(isDark ? '已开启暗黑模式' : '已切换为亮色模式')
}

const changePreset = (name: PresetTheme) => {
  currentPreset.value = name
  theme.setPreset(name)
  theme.setColors({ ...presetThemes[name] })
  theme.setDarkMode(name === 'dark')
  YhMessage.success('已切换到预设主题：' + name)
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
  YhMessage.success('已应用自定义主色')
}

const applyOverride = () => {
  theme.setComponentTheme('button', { 'border-radius': '20px' })
  YhMessage.success('已应用局部样式覆盖')
}

const clearOverride = () => {
  theme.clearComponentTheme('button')
  YhMessage.info('已清除局部覆盖')
}

const handleExport = () => {
  exportedTheme.value = theme.exportTheme({ name: 'My Custom Theme' })
  YhMessage.success('主题配置已导出')
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
  YhMessage.info('已重置全部主题设置')
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
      <yh-button @click="handleToggleDark">切换暗黑/亮色<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">{{ currentPrimaryLabel }}<${C}yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">点击上方按钮后，当前主题按钮会立即切换到新的主题色。<${C}span>
    <${C}div>
  <${C}div>`

const basicScript = `import { computed, ref } from 'vue'
import { setThemeColor, toggleDarkMode } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'

type QuickThemeName = 'purple' | 'blue' | 'green' | 'orange'

const currentQuickTheme = ref<QuickThemeName>('blue')
const quickThemes = [
  { name: 'purple' as const, label: '紫色主题', color: '#722ed1' },
  { name: 'blue' as const, label: '蓝色主题', color: '#409eff' },
  { name: 'green' as const, label: '绿色主题', color: '#10b981' },
  { name: 'orange' as const, label: '橙色主题', color: '#f97316' }
]

const currentPrimaryLabel = computed(() => {
  const quick = quickThemes.find(item => item.name === currentQuickTheme.value)
  return quick?.label ?? '当前主题'
})

const handleThemeChange = (item: { name: QuickThemeName; label: string; color: string }) => {
  currentQuickTheme.value = item.name
  setThemeColor(item.color)
  YhMessage.success('已切换为 ' + item.label)
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage.info(isDark ? '已开启暗黑模式' : '已切换为亮色模式')
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
      <yh-button type="primary">预设主题预览<${C}yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">当前选中的预设按钮和预览按钮都会立即进入当前主题态。<${C}span>
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
  YhMessage.success('已切换到预设主题：' + name)
}`

const tsPresetUsage = buildSfc(presetTpl, presetScript)
const jsPresetUsage = toJs(tsPresetUsage)

const densityTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="density === 'comfortable' ? 'primary' : 'default'" @click="setDensity('comfortable')">舒适模式<${C}yh-button>
      <yh-button :type="density === 'compact' ? 'primary' : 'default'" @click="setDensity('compact')">紧凑模式<${C}yh-button>
      <yh-button :type="density === 'dense' ? 'primary' : 'default'" @click="setDensity('dense')">密集模式<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">主要按钮<${C}yh-button>
      <yh-input placeholder="输入框尺寸预览" style="width: 200px;" />
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
      <yh-button :type="algo === 'default' ? 'primary' : 'default'" @click="setAlgo('default')">默认算法<${C}yh-button>
      <yh-button :type="algo === 'vibrant' ? 'primary' : 'default'" @click="setAlgo('vibrant')">鲜艳模式<${C}yh-button>
      <yh-button :type="algo === 'muted' ? 'primary' : 'default'" @click="setAlgo('muted')">柔和模式<${C}yh-button>
      <yh-button :type="algo === 'pastel' ? 'primary' : 'default'" @click="setAlgo('pastel')">粉彩模式<${C}yh-button>
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
      <yh-button type="primary" @click="applyColor">应用主色<${C}yh-button>
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
    <yh-button :type="mode === 'none' ? 'primary' : 'default'" @click="setMode('none')">正常视觉<${C}yh-button>
    <yh-button :type="mode === 'protanopia' ? 'primary' : 'default'" @click="setMode('protanopia')">红色盲模式<${C}yh-button>
    <yh-button :type="mode === 'deuteranopia' ? 'primary' : 'default'" @click="setMode('deuteranopia')">绿色盲模式<${C}yh-button>
    <yh-button :type="mode === 'tritanopia' ? 'primary' : 'default'" @click="setMode('tritanopia')">蓝色盲模式<${C}yh-button>
    <yh-button :type="mode === 'achromatopsia' ? 'primary' : 'default'" @click="setMode('achromatopsia')">全色盲模式<${C}yh-button>
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
      <yh-button type="primary" @click="applyOverride">按钮圆角覆盖<${C}yh-button>
      <yh-button @click="clearOverride">清除局部覆盖<${C}yh-button>
    <${C}div>
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary">样式预览<${C}yh-button>
      <yh-button>默认按钮<${C}yh-button>
    <${C}div>
  <${C}div>`

const overrideScript = `import { useTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/yh-ui'

const theme = useTheme()

const applyOverride = () => {
  theme.setComponentTheme('button', { 'border-radius': '20px' })
  YhMessage.success('已应用局部样式覆盖')
}

const clearOverride = () => {
  theme.clearComponentTheme('button')
  YhMessage.info('已清除局部覆盖')
}`

const tsComponentOverride = buildSfc(overrideTpl, overrideScript)
const jsComponentOverride = toJs(tsComponentOverride)

const exportTpl = `  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="handleExport">导出当前配置<${C}yh-button>
      <yh-button @click="resetEverything">重置全部<${C}yh-button>
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
  YhMessage.success('主题配置已导出')
}

const resetEverything = () => {
  theme.reset()
  exportedTheme.value = ''
  YhMessage.info('已重置全部主题设置')
}`

const tsExportImport = buildSfc(exportTpl, exportScript)
const jsExportImport = toJs(tsExportImport)
</script>

## 基础用法

动态切换主色和暗黑模式。

<DemoBlock title="基础用法" :ts-code="tsBasicUsage" :js-code="jsBasicUsage">
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
      <yh-button @click="handleToggleDark">切换暗黑/亮色</yh-button>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">{{ currentPrimaryLabel }}</yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">点击上方按钮后，当前主题按钮会立即切换到新的主题色。</span>
    </div>
  </div>
</DemoBlock>

## 预设主题

内置常用配色预设，支持一键快速切换。

<DemoBlock title="预设主题" :ts-code="tsPresetUsage" :js-code="jsPresetUsage">
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
      <yh-button type="primary">预设主题预览</yh-button>
      <span style="font-size: 13px; color: var(--yh-text-color-secondary);">当前选中的预设按钮和预览按钮都会立即进入当前主题态。</span>
    </div>
  </div>
</DemoBlock>

## 密度/紧凑度系统

支持舒适、紧凑、密集三种视觉模式。

<DemoBlock title="密度系统" :ts-code="tsDensityUsage" :js-code="jsDensityUsage">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="currentDensity === 'comfortable' ? 'primary' : 'default'" @click="setDensity('comfortable')">舒适模式</yh-button>
      <yh-button :type="currentDensity === 'compact' ? 'primary' : 'default'" @click="setDensity('compact')">紧凑模式</yh-button>
      <yh-button :type="currentDensity === 'dense' ? 'primary' : 'default'" @click="setDensity('dense')">密集模式</yh-button>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <yh-button type="primary">主要按钮</yh-button>
      <yh-input placeholder="输入框尺寸预览" style="width: 200px;" />
    </div>
  </div>
</DemoBlock>

## 色彩算法

提供默认、鲜艳、柔和、粉彩四种生成逻辑。

<DemoBlock title="色彩算法" :ts-code="tsAlgorithmUsage" :js-code="jsAlgorithmUsage">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button :type="currentAlgorithm === 'default' ? 'primary' : 'default'" @click="setAlgo('default')">默认算法</yh-button>
      <yh-button :type="currentAlgorithm === 'vibrant' ? 'primary' : 'default'" @click="setAlgo('vibrant')">鲜艳模式</yh-button>
      <yh-button :type="currentAlgorithm === 'muted' ? 'primary' : 'default'" @click="setAlgo('muted')">柔和模式</yh-button>
      <yh-button :type="currentAlgorithm === 'pastel' ? 'primary' : 'default'" @click="setAlgo('pastel')">粉彩模式</yh-button>
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary</yh-button>
      <yh-button type="success">Success</yh-button>
      <yh-button type="warning">Warning</yh-button>
      <yh-button type="danger">Danger</yh-button>
    </div>
  </div>
</DemoBlock>

## 智能色彩生成

从单一主色自动计算并应用一组语义色。

<DemoBlock title="智能生成" :ts-code="tsColorGenUsage" :js-code="jsColorGenUsage">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px; align-items: center;">
      <input type="color" v-model="customColor" style="width: 50px; height: 36px; border: none; cursor: pointer;" />
      <yh-button type="primary" @click="applyColor">应用主色</yh-button>
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary">Primary</yh-button>
      <yh-button type="success">Success</yh-button>
    </div>
  </div>
</DemoBlock>

## 色盲友好模式

内置色盲模式支持，用于辅助验证可访问性体验。

<DemoBlock title="色盲模式" :ts-code="tsColorBlindUsage" :js-code="jsColorBlindUsage">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-button :type="currentColorBlind === 'none' ? 'primary' : 'default'" @click="setMode('none')">正常视觉</yh-button>
    <yh-button :type="currentColorBlind === 'protanopia' ? 'primary' : 'default'" @click="setMode('protanopia')">红色盲模式</yh-button>
    <yh-button :type="currentColorBlind === 'deuteranopia' ? 'primary' : 'default'" @click="setMode('deuteranopia')">绿色盲模式</yh-button>
    <yh-button :type="currentColorBlind === 'tritanopia' ? 'primary' : 'default'" @click="setMode('tritanopia')">蓝色盲模式</yh-button>
    <yh-button :type="currentColorBlind === 'achromatopsia' ? 'primary' : 'default'" @click="setMode('achromatopsia')">全色盲模式</yh-button>
  </div>
</DemoBlock>

## 组件级主题覆盖

无需修改全局主题，即可精确控制特定组件的样式变量。

<DemoBlock title="组件覆盖" :ts-code="tsComponentOverride" :js-code="jsComponentOverride">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="applyOverride">按钮圆角覆盖</yh-button>
      <yh-button @click="clearOverride">清除局部覆盖</yh-button>
    </div>
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary">样式预览</yh-button>
      <yh-button>默认按钮</yh-button>
    </div>
  </div>
</DemoBlock>

## 主题配置导出

支持将当前主题状态导出为 JSON 配置。

<DemoBlock title="配置导出" :ts-code="tsExportImport" :js-code="jsExportImport">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 12px;">
      <yh-button type="primary" @click="handleExport">导出当前配置</yh-button>
      <yh-button @click="resetEverything">重置全部</yh-button>
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
