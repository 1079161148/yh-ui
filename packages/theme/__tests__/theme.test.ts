import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeManager, useTheme } from '../src/theme'

describe('Theme System', () => {
  let theme: ThemeManager

  beforeEach(() => {
    // 模拟 DOM 环境
    document.documentElement.className = ''
    document.documentElement.style.cssText = ''
    theme = useTheme()
  })

  it('应该能正确初始化默认主题', () => {
    theme.initTheme()
    expect(document.documentElement.style.getPropertyValue('--yh-color-primary')).toBe('#409eff')
  })

  it('应该能动态修改主题色', () => {
    const newColor = '#ff0000'
    theme.setThemeColor(newColor)

    // 检查主色
    expect(document.documentElement.style.getPropertyValue('--yh-color-primary')).toBe(newColor)

    // 检查渐变色是否生成 (light-9)
    expect(
      document.documentElement.style.getPropertyValue('--yh-color-primary-light-9')
    ).toBeTruthy()
  })

  it('应该能切换暗黑模式', () => {
    theme.toggleDarkMode()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(theme.dark).toBe(true)

    theme.toggleDarkMode()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(theme.dark).toBe(false)
  })

  it('应该能应用预设主题', () => {
    theme.setThemePreset('purple')
    // 紫色预设的主色现在是 #8b5cf6
    expect(document.documentElement.style.getPropertyValue('--yh-color-primary')).toBe('#8b5cf6')
  })

  it('组件语义变量应正确挂载', () => {
    theme.initTheme()
    // 检查基础颜色变量（确定存在的变量）
    expect(document.documentElement.style.getPropertyValue('--yh-color-primary')).toBeTruthy()
    expect(document.documentElement.style.getPropertyValue('--yh-color-success')).toBeTruthy()
    // 验证阴影或圆角等基础 token
    const styles = document.documentElement.style.cssText
    expect(styles.length).toBeGreaterThan(0)
  })
})
