/**
 * ColorPicker Nuxt 集成测试
 */
import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createPage } from '@nuxt/test-utils/e2e'

describe('ColorPicker Nuxt Integration', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../../../playground-nuxt', import.meta.url)),
    server: true
  })

  it('should render color-picker page', async () => {
    const html = await $fetch('/color-picker')
    expect(html).toContain('ColorPicker Nuxt 测试')
    expect(html).toContain('yh-color-picker')
  })

  it('should auto-import and render multiple pickers', async () => {
    const html = await $fetch('/color-picker')
    // 检查是否包含基础结构
    expect(html).toContain('yh-color-picker__trigger')
  })

  it('should handle interaction in Nuxt (CSR)', async () => {
    const page = await createPage('/color-picker')

    // 1. 检查初始状态
    const trigger = await page.locator('.yh-color-picker__trigger').first()
    expect(trigger).toBeTruthy()

    // 2. 点击触发器
    await trigger.click()

    // 3. 检查面板是否显示（由于 Teleport 到 body，需要检查 body 下的元素）
    await page.waitForTimeout(300)
    const panel = await page.locator('.yh-color-picker__panel')
    const count = await panel.count()
    expect(count).toBeGreaterThan(0)

    // 4. 断开连接并清理
    await page.close()
  })

  it('should support size modifiers in Nuxt', async () => {
    const html = await $fetch('/color-picker')
    expect(html).toContain('yh-color-picker--large')
    expect(html).toContain('yh-color-picker--small')
  })
})
