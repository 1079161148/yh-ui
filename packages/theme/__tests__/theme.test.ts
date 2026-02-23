import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  ThemeManager,
  useTheme,
  initTheme,
  setThemeColor,
  toggleDarkMode,
  setThemePreset,
  useThemeVars,
  checkContrast,
  getTextColorForBackground,
  THEME_INJECTION_KEY,
  ensureContrast,
  mixColor,
  adjustSaturation,
  adjustLightness,
  hexToRgb,
  getAnalogousColors,
  getTriadicColors,
  generatePaletteFromPrimary,
  getRelativeLuminance,
  getComplementaryColor,
  getContrastRatio
} from '../src/theme'
import ThemePlugin from '../src/theme'

describe('Theme System Comprehensive', () => {
  let theme: ThemeManager

  beforeEach(() => {
    document.documentElement.className = ''
    document.documentElement.style.cssText = ''
    vi.clearAllMocks()
    theme = initTheme({ persist: false }) // Avoid storage side-effects by default
  })

  afterEach(() => {
    theme.destroy()
  })

  // 1. Basic / Legacy
  it('应该能正确初始化默认主题', () => {
    expect(theme.getCssVar('--yh-color-primary')).toBe('#409eff')
  })

  it('应该能动态修改主题色并生成渐变', () => {
    theme.setThemeColor('#ff0000')
    expect(theme.getCssVar('--yh-color-primary')).toBe('#ff0000')
    expect(theme.getCssVar('--yh-color-primary-light-9')).toBeTruthy()
  })

  it('暗黑模式切换', () => {
    theme.toggleDarkMode()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(theme.dark).toBe(true)

    theme.setDarkMode(false)
    expect(theme.dark).toBe(false)
  })

  it('应该覆盖 ThemeManager 的各种别名方法和 Getter', () => {
    theme.setThemePreset('purple')
    expect(theme.theme).toBe('purple')
    expect(theme.presets.length).toBeGreaterThan(0)
    expect(theme.breakpoint).toBeDefined()

    expect(theme.getComplementary('#ff0000')).toBeTruthy()
    expect(theme.getAnalogous('#ff0000').length).toBe(2)
    expect(theme.getTriadic('#ff0000').length).toBe(2)
  })

  it('安全调用 preset', () => {
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    theme.setPreset('unknown' as any)
    expect(spyWarn).toHaveBeenCalled()
    spyWarn.mockRestore()
  })

  // 2. 补足 Colors & Utilities
  it('ensureContrast 各种光线对比度', () => {
    expect(ensureContrast('#000000', '#ffffff')).toBe('#000000') // already good
    expect(ensureContrast('invalid', '#000000')).toBe('invalid')
    expect(ensureContrast('#000000', 'invalid')).toBe('#000000')

    // bg is dark, fg needs to be lighter
    const brightened = ensureContrast('#222222', '#000000', 4.5)
    expect(brightened).not.toBe('#222222')

    // bg is light, fg needs to be darker
    const darkened = ensureContrast('#dddddd', '#ffffff', 4.5)
    expect(darkened).not.toBe('#dddddd')
  })

  it('Color format and adjustments', () => {
    expect(mixColor('invalid', '#000000', 50)).toBe('invalid')
    expect(mixColor('#ffffff', 'invalid', 50)).toBe('#ffffff')
    expect(adjustSaturation('invalid', 10)).toBe('invalid')
    expect(adjustLightness('invalid', 10)).toBe('invalid')
    expect(hexToRgb('#112233')).toBeTruthy()
    expect(hexToRgb('#123')).toBeNull()

    expect(getComplementaryColor('#ff0000')).toBeTruthy()
    expect(getComplementaryColor('invalid')).toBe('invalid')

    expect(getAnalogousColors('#ff0000').length).toBe(2)
    expect(getAnalogousColors('invalid')).toEqual(['invalid', 'invalid'])

    expect(getTriadicColors('#ff0000').length).toBe(2)
    expect(getTriadicColors('invalid')).toEqual(['invalid', 'invalid'])

    expect(generatePaletteFromPrimary('#409eff').primary).toBe('#409eff')
    expect(generatePaletteFromPrimary('invalid').primary).toBe('invalid')

    expect(getRelativeLuminance(255, 255, 255)).toBeCloseTo(1)
    expect(getContrastRatio('#ffffff', '#000000')).toBeGreaterThan(10)
    expect(getContrastRatio('invalid', '#000000')).toBe(1)
  })

  // 3. Algorithms & Blind mode & Density
  it('支持不同色彩生成算法与主题色变体', () => {
    theme.setAlgorithm('vibrant')
    theme.setAlgorithm('muted')
    theme.setAlgorithm('pastel')
    expect(theme.state.theme).toBe('default')
  })

  it('支持 Density (舒适度)', () => {
    theme.enableTransition() // force transition path code coverage
    theme.setDensity('dense')
    expect(theme.density).toBe('dense')
    theme.disableTransition()
  })

  it('支持 Color Blind 模式', () => {
    theme.enableTransition({ duration: 100, timing: 'linear' })
    theme.setColorBlindMode('protanopia')
    expect(theme.colorBlind).toBe('protanopia')
    theme.setColorBlindMode('none') // restore
  })

  // 4. Config & Globals & Scopes
  it('Target scopes & Clear variables', () => {
    document.body.innerHTML = '<div id="test-scope"></div>'
    theme.apply({ scope: '#test-scope', preset: 'purple' })
    const el = document.getElementById('test-scope')
    expect(el?.style.getPropertyValue('--yh-color-primary')).toBeTruthy()

    theme.apply({ scope: document.documentElement, preset: 'dark' })
  })

  it('组件级别变量覆盖 setComponentTheme', () => {
    theme.setComponentTheme('button', { testVar: 'red' })
    const map = theme.getComponentTheme('button')
    expect(map.testVar).toBe('red')
    expect(theme.getCssVar('--yh-button-testVar')).toBe('red')

    theme.clearComponentTheme('button')
    expect(theme.getComponentTheme('button').testVar).toBeUndefined()

    // safe guard
    theme.clearComponentTheme('non-exists')
  })

  it('Responsive variables & MatchMedia follower', () => {
    let mockMatches = true
    let registeredCallback: Function | null = null
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: mockMatches,
      addEventListener: (event: string, cb: Function) => {
        registeredCallback = cb
      },
      removeEventListener: vi.fn()
    }))
    window.matchMedia = matchMediaMock as any

    theme.enableSystemFollow()
    expect(theme.dark).toBe(true)

    // trigger change
    mockMatches = false
    if (registeredCallback) {
      ;(registeredCallback as any)({ matches: false })
    }
    expect(theme.dark).toBe(false)

    theme.disableSystemFollow()
    // once again to cover branches
    theme.disableSystemFollow()

    // Resize tests
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1600 })
    theme.setResponsiveTheme({
      xl: { preset: 'dark' },
      xxl: { preset: 'purple' },
      xs: { preset: 'default' }
    })

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 })
    window.dispatchEvent(new Event('resize'))

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 }) // Same BP again, expect branch skip
    window.dispatchEvent(new Event('resize'))

    theme.setResponsiveVar('--my-var', { xs: '10px', lg: '20px' })
  })

  it('应该覆盖 importTheme 和 applyFullConfig 的更多分支', () => {
    theme.enableTransition()
    const snapshot = {
      preset: 'dark',
      colors: { primary: '#123456' },
      dark: true,
      algorithm: 'vibrant',
      density: 'compact'
    }
    theme.importTheme(JSON.stringify(snapshot))
    expect(theme.theme).toBe('dark')
    // 由于 vibrant 算法会增加饱和度，颜色会从 #123456 变为 #0a345e
    expect(theme.getCssVar('--yh-color-primary')).toBe('#0a345e')

    theme.applyFullConfig({
      preset: 'default',
      density: 'comfortable'
    })
    expect(theme.state.density).toBe('comfortable')
  })

  it('Theme History (Undo/Redo)', () => {
    theme.clearHistory()
    theme.applyFullConfig({ preset: 'dark', transition: true, colorBlindMode: 'tritanopia' })
    theme.applyFullConfig({
      preset: 'purple',
      colors: { primary: '#666' },
      components: { tag: { bg: 'red' } }
    })

    const hist = theme.getHistory()
    expect(hist.length).toBeGreaterThan(0)

    expect(theme.undo()).toBe(true)
    expect(theme.theme).toBe('dark') // Reverted to previous

    // cover max length
    for (let i = 0; i < 15; i++) {
      theme.applyFullConfig({ preset: 'default' })
    }

    theme.clearHistory()
    expect(theme.undo()).toBe(false)
  })

  it('createTheme 继承行为', () => {
    const parentConfig = { preset: 'dark', extends: 'purple' } as any
    const res = theme.createTheme({ extends: parentConfig, colors: { primary: '#fff' } } as any)
    expect(res.colors?.primary).toBe('#fff')
  })

  it('Export / Import Storage Reset', () => {
    // cover JSON parse error
    const spyErr = vi.spyOn(console, 'error').mockImplementation(() => {})
    const failImport = theme.importTheme('{"bad":')
    expect(failImport).toBe(false)
    spyErr.mockRestore()

    const snapshotStr = theme.exportTheme({ name: 'my-theme' })
    expect(theme.importTheme(snapshotStr)).toBe(true)

    expect(theme.exportAsCss()).toContain(':root {\n  --yh-color-primary:')
    theme.reset()
  })

  it('Storage catch and properties', () => {
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const spySet = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('mock err')
    })
    const spyGet = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('mock res')
    })

    theme.setThemeColor('#111') // will try to saveToStorage

    // 我们强制创建一个新的管理器来测试初始化
    // @ts-ignore
    const ThemeClass = theme.constructor as any
    new ThemeClass({ persist: true })

    expect(spyWarn).toHaveBeenCalled()

    spyWarn.mockRestore()
    spySet.mockRestore()
    spyGet.mockRestore()
  })

  // 6. Vue / Utility wrappers
  it('Vue Hooks and Global methods', () => {
    const vars = useThemeVars()
    expect(vars.theme.value).toBe(theme.theme)
    vars.setCssVar('--my-custom', '1px')
    expect(vars.getCssVar('--my-custom')).toBe('1px')

    setThemeColor('#fff')
    expect((theme as any).customColors.primary).toBe('#fff')

    toggleDarkMode()
    setThemePreset('purple')
    expect(theme.theme).toBe('purple')

    expect(checkContrast('#ffffff', '#000000', 'AAA')).toBe(true)
    expect(checkContrast('#aaaaaa', '#bbbbbb')).toBe(false)

    expect(getTextColorForBackground('#000000')).toBe('#ffffff')
    expect(getTextColorForBackground('#ffffff')).toBe('#000000')
    expect(getTextColorForBackground('invalid')).toBe('#000000')

    theme.applyFromPrimary('#123123')
  })

  it('Vue 插件可以正确安装', () => {
    const appMock = { config: { globalProperties: {} }, provide: vi.fn() }
    // Pass persist: false to avoid storage access during test
    ThemePlugin.install(appMock as any, { persist: false })
    expect(appMock.provide).toHaveBeenCalledWith(THEME_INJECTION_KEY, expect.anything())
  })

  it('应该覆盖 useTheme 的首次初始化分支和 DOM 边界', () => {
    expect(useTheme()).toBeDefined()

    // 覆盖 456 行: getCssVar 在没有 target 时的分支
    // 把 document 暂时设为 undefined
    const orig = global.document
    vi.stubGlobal('document', undefined)

    // 我们必须确保模块重新加载或者使用导出的方法
    // 因为 typeof document 是在调用时检查的
    expect(theme.getCssVar('--any')).toBe('')

    vi.stubGlobal('document', orig)
  })
})
