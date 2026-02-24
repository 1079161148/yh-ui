/**
 * useLocale Hook Tests
 * @description 测试 useLocale hook 在不同场景下的行为
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref, nextTick } from 'vue'
import {
  useLocale,
  setDayjsLocale,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from '../index'
import { zhCn } from '@yh-ui/locale'
import { configProviderContextKey } from '../../use-config'
import { computed } from 'vue'
import { en } from '@yh-ui/locale'
import dayjs from 'dayjs'

describe('useLocale', () => {
  // 先提供默认的 config provider
  const TestComponent = defineComponent({
    setup() {
      const { locale, lang, t, tRaw } = useLocale()
      return { locale, lang, t, tRaw }
    },
    render() {
      return h('div')
    }
  })

  beforeEach(() => {
    // 设置默认 locale
    setDayjsLocale('zh-cn')
  })

  afterEach(() => {
    setDayjsLocale('zh-cn')
  })

  it('should return default locale zhCn', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    expect(vm.locale.name).toBe('zh-cn')
    expect(vm.lang).toBe('zh-cn')
  })

  it('should return translation using t function', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    // 测试基本翻译
    const result = vm.t('common.confirm')
    expect(result).toBe('确认')
  })

  it('should return translation with interpolation', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    // 测试插值翻译
    const result = vm.t('pagination.total', { total: 100 })
    expect(result).toContain('100')
  })

  it('should return raw translation using tRaw function', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    // 测试 tRaw 函数
    const result = vm.tRaw('common.confirm')
    expect(result).toBe('确认')

    // 测试数组数据
    const texts = vm.tRaw('rate.texts') as string[]
    expect(Array.isArray(texts)).toBe(true)
    expect(texts.length).toBe(5)
  })

  it('should return translation with missing interpolation options', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any
    await nextTick()

    // 测试插值缺失情况
    const result = vm.t('pagination.total', {})
    expect(result).toBe('共 {total} 条')
  })

  it('should return path when translation not found', async () => {
    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    // 测试不存在的翻译键
    const result = vm.t('non.existent.key')
    expect(result).toBe('non.existent.key')

    // 测试 tRaw 不存在的翻译键
    const resultRaw = vm.tRaw('non.existent.key')
    expect(resultRaw).toBe('non.existent.key')
  })

  it('should handle locale overrides', async () => {
    const localeOverrides = ref(en)

    const TestComponentWithOverride = defineComponent({
      setup() {
        const { lang } = useLocale(localeOverrides)
        return { lang }
      },
      render() {
        return h('div')
      }
    })

    const wrapper = mount(TestComponentWithOverride)
    const vm = wrapper.vm as any

    await nextTick()

    expect(vm.lang).toBe('en')

    // 动态切换
    localeOverrides.value = zhCn
    await nextTick()
    expect(vm.lang).toBe('zh-cn')
  })

  it('should work with ConfigProvider', async () => {
    const TestComp = defineComponent({
      setup() {
        const { lang } = useLocale()
        return { lang }
      },
      render() {
        return h('div')
      }
    })

    const wrapper = mount(TestComp, {
      global: {
        provide: {
          [configProviderContextKey as any]: computed(() => ({
            locale: en
          }))
        }
      }
    })

    await nextTick()
    expect((wrapper.vm as any).lang).toBe('en')
  })
})

describe('setDayjsLocale', () => {
  afterEach(() => {
    // 重置为默认
    setDayjsLocale('zh-cn')
  })

  it('should set and get dayjs locale', async () => {
    await setDayjsLocale('en')
    expect(dayjs.locale()).toBe('en')

    await setDayjsLocale('zh-cn')
    expect(dayjs.locale()).toBe('zh-cn')
  })

  it('should return correct dayjs locale mapping', () => {
    expect(getDayjsLocale('zh-cn')).toBe('zh-cn')
    expect(getDayjsLocale('en')).toBe('en')
    expect(getDayjsLocale('unknown')).toBe('en')
  })

  it('setDayjsLocaleSync should work with known locale', () => {
    setDayjsLocaleSync('zh-tw')
    expect(dayjs.locale()).toBe('zh-tw')
  })

  it('setDayjsLocaleSync should fallback to en and load for unknown locale', () => {
    setDayjsLocaleSync('ru') // ru is not in loadedLocales by default
    // It will synchronously set to 'en' then trigger async loading
    expect(['en', 'ru']).toContain(dayjs.locale())
  })

  it('setDayjsLocale should load async locales', async () => {
    await setDayjsLocale('ru')
    expect(dayjs.locale()).toBe('ru')
  })

  it('setDayjsLocale should fallback to en on import error', async () => {
    // 强制触发抛出异常
    await setDayjsLocale('invalid-locale-code-123')
    expect(dayjs.locale()).toBe('en')
  })

  it('updateDayjsMonths should override month names when updateLocale is available', () => {
    // Note: requires dayjs/plugin/updateLocale to be active for real update,
    // but we can test that it doesn't throw and calls the method if exists.
    const customMonths = {
      jan: 'J1',
      feb: 'F2',
      mar: 'M3',
      apr: 'A4',
      may: 'M5',
      jun: 'J6',
      jul: 'J7',
      aug: 'A8',
      sep: 'S9',
      oct: 'O10',
      nov: 'N11',
      dec: 'D12'
    }

    const mockUpdateLocale = vi.fn()
    const originalUpdateLocale = (dayjs as any).updateLocale
    ;(dayjs as any).updateLocale = mockUpdateLocale

    expect(() => updateDayjsMonths('en', customMonths)).not.toThrow()
    expect(mockUpdateLocale).toHaveBeenCalled()
    ;(dayjs as any).updateLocale = originalUpdateLocale
  })

  it('updateDayjsMonths should gracefully ignore errors if updateLocale is missing or throws', () => {
    const oldUpdate = (dayjs as any).updateLocale
    ;(dayjs as any).updateLocale = () => {
      throw new Error('mock error')
    }

    expect(() =>
      updateDayjsMonths('en', {
        jan: 'J1',
        feb: 'F2',
        mar: 'M3',
        apr: 'A4',
        may: 'M5',
        jun: 'J6',
        jul: 'J7',
        aug: 'A8',
        sep: 'S9',
        oct: 'O10',
        nov: 'N11',
        dec: 'D12'
      })
    ).not.toThrow()
    ;(dayjs as any).updateLocale = oldUpdate
  })
})
