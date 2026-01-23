/**
 * Nuxt 集成测试
 * @description 测试 YH-UI 在 Nuxt 环境下的集成和自动导入功能
 */
import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createPage } from '@nuxt/test-utils/e2e'

describe('YH-UI Nuxt Integration', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../../../playground-nuxt', import.meta.url)),
    server: true
  })

  it('should render the homepage', async () => {
    const html = await $fetch('/')

    expect(html).toContain('YH-UI Nuxt')
    expect(html).toBeTruthy()
  })

  it('should auto-import components', async () => {
    const html = await $fetch('/')

    // 检查组件是否正确渲染
    expect(html).toContain('yh-button')
    expect(html).toContain('yh-input')
  })

  it('should render components with correct classes', async () => {
    const html = await $fetch('/')

    // 检查 BEM 类名
    expect(html).toContain('yh-button--primary')
    expect(html).toContain('yh-input')
  })

  it('should inject styles', async () => {
    const page = await createPage('/')

    // 检查样式是否加载
    const hasStyles = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets)
      return styles.some((sheet) => {
        try {
          const rules = Array.from(sheet.cssRules || [])
          return rules.some(
            (rule) =>
              rule.cssText.includes('.yh-button') || rule.cssText.includes('--yh-color-primary')
          )
        } catch {
          return false
        }
      })
    })

    expect(hasStyles).toBe(true)

    await page.close()
  })

  it('should have consistent SSR and CSR rendering', async () => {
    const page = await createPage('/')

    // 检查是否有 hydration 错误
    const errors: string[] = []
    page.on('console', (msg) => {
      const text = msg.text()
      if (text.includes('Hydration') && text.includes('mismatch')) {
        errors.push(text)
      }
    })

    // 等待页面加载完成
    await page.waitForLoadState('networkidle')

    // 不应该有 hydration 错误
    expect(errors).toHaveLength(0)

    await page.close()
  })

  it('should support user interactions', async () => {
    const page = await createPage('/')

    // 查找并点击按钮
    const button = await page.locator('.yh-button--primary').first()
    await button.click()

    // 检查是否触发了 Message（通过检查 DOM）
    await page.waitForTimeout(500)
    const hasMessage = (await page.locator('.yh-message').count()) > 0

    expect(hasMessage).toBe(true)

    await page.close()
  })

  it('should bind data correctly', async () => {
    const page = await createPage('/')

    // 查找输入框
    const input = await page.locator('.yh-input__inner').first()

    // 输入文本
    await input.fill('Test Input')

    // 检查值是否更新
    const value = await input.inputValue()
    expect(value).toBe('Test Input')

    await page.close()
  })

  it('should handle form interactions', async () => {
    const page = await createPage('/')

    // 操作 Switch
    const switchElement = await page.locator('.yh-switch').first()
    await switchElement.click()

    // 检查是否有 is-checked 类
    await page.waitForTimeout(100)
    const isChecked = await switchElement.evaluate((el) => el.classList.contains('is-checked'))

    expect(isChecked).toBe(true)

    await page.close()
  })

  it('should support Select component', async () => {
    const page = await createPage('/')

    // 点击 Select
    const select = await page.locator('.yh-select').first()
    await select.click()

    // 等待下拉菜单出现
    await page.waitForTimeout(300)

    // 检查下拉选项
    const optionCount = await page.locator('.yh-select__option').count()
    expect(optionCount).toBeGreaterThan(0)

    await page.close()
  })
})
