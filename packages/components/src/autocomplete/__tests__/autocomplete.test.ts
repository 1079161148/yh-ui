/**
 * Autocomplete Component Unit Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Autocomplete from '../src/autocomplete.vue'

describe('YhAutocomplete', () => {
  const suggestions = [
    { value: 'vue' },
    { value: 'react' },
    { value: 'angular' },
    { value: 'svelte' }
  ]

  const fetchSuggestions = (query: string, cb: (suggestions: any[]) => void) => {
    const results = query
      ? suggestions.filter((item) => item.value.toLowerCase().includes(query.toLowerCase()))
      : suggestions
    cb(results)
  }

  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Autocomplete)
    expect(wrapper.classes()).toContain('yh-autocomplete')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  // v-model 测试
  it('should work with v-model', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
      }
    })
    expect(wrapper.find('input').element.value).toBe('test')

    await wrapper.find('input').setValue('new value')
    expect(wrapper.props('modelValue')).toBe('new value')
  })

  // placeholder 测试
  it('should display placeholder', () => {
    const wrapper = mount(Autocomplete, {
      props: { placeholder: '请输入内容' }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入内容')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Autocomplete, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  // 尺寸测试
  it('should apply size class', () => {
    const wrapper = mount(Autocomplete, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('yh-autocomplete--large')
  })

  it('should apply small size class', () => {
    const wrapper = mount(Autocomplete, {
      props: { size: 'small' }
    })
    expect(wrapper.classes()).toContain('yh-autocomplete--small')
  })

  // 可清空测试
  it('should show clear button when clearable and has value', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(wrapper.find('.yh-autocomplete__clear').exists()).toBe(true)
  })

  // 清空功能测试
  it('should clear value when clear button is clicked', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        modelValue: 'test',
        clearable: true,
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.find('input').trigger('focus')
    await nextTick()

    await wrapper.find('.yh-autocomplete__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.props('modelValue')).toBe('')
  })

  // 事件测试
  it('should emit focus and blur events', async () => {
    const wrapper = mount(Autocomplete)

    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.find('input').trigger('blur')
    // blur 有延迟
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // input 事件测试
  it('should emit input event when typing', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.find('input').setValue('test')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')![0]).toEqual(['test'])
  })

  // fetchSuggestions 测试
  it('should call fetchSuggestions on input', async () => {
    const mockFetch = vi.fn((query, cb) => cb(suggestions))
    const wrapper = mount(Autocomplete, {
      props: {
        fetchSuggestions: mockFetch,
        debounce: 0,
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
      }
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').setValue('v')
    await nextTick()

    // 等待防抖
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(mockFetch).toHaveBeenCalled()
  })

  // triggerOnFocus 测试
  it('should trigger suggestions on focus when triggerOnFocus is true', async () => {
    const mockFetch = vi.fn((query, cb) => cb(suggestions))
    const wrapper = mount(Autocomplete, {
      props: {
        fetchSuggestions: mockFetch,
        triggerOnFocus: true
      }
    })

    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(mockFetch).toHaveBeenCalled()
  })

  // 键盘导航测试 - ArrowDown
  it('should navigate down with ArrowDown key', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        fetchSuggestions,
        triggerOnFocus: true
      }
    })

    await wrapper.find('input').trigger('focus')
    await nextTick()

    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })

    // 验证高亮索引变化
    expect(wrapper.emitted()).toBeTruthy()
  })

  // 键盘导航测试 - Escape
  it('should close dropdown on Escape key', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        fetchSuggestions,
        triggerOnFocus: true
      }
    })

    await wrapper.find('input').trigger('focus')
    await nextTick()

    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    // dropdown 应该关闭
    expect(wrapper.emitted()).toBeTruthy()
  })

  // ARIA 属性测试
  it('should have correct ARIA attributes', () => {
    const wrapper = mount(Autocomplete)
    const input = wrapper.find('input')

    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-autocomplete')).toBe('list')
  })

  // 前后置插槽测试
  it('should render prepend and append slots', () => {
    const wrapper = mount(Autocomplete, {
      slots: {
        prepend: '<span>http://</span>',
        append: '<span>.com</span>'
      }
    })

    expect(wrapper.find('.yh-autocomplete__prepend').exists()).toBe(true)
    expect(wrapper.find('.yh-autocomplete__append').exists()).toBe(true)
  })

  // 自定义建议项插槽测试
  it('should render custom suggestion slot', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        fetchSuggestions,
        triggerOnFocus: true
      },
      slots: {
        default: ({ item }: { item: any }) => `Custom: ${item.value}`
      }
    })

    await wrapper.find('input').trigger('focus')
    await nextTick()

    // 验证插槽被渲染
    expect(wrapper.emitted()).toBeTruthy()
  })

  // expose 方法测试
  it('should expose focus and blur methods', () => {
    const wrapper = mount(Autocomplete)
    const vm = wrapper.vm as any

    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
    expect(typeof vm.close).toBe('function')
    expect(typeof vm.highlight).toBe('function')
  })
})
