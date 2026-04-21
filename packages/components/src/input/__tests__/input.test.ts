/**
 * Input Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Input from '../src/input.vue'
import { inputTypes, inputSizes, inputVariants, inputStatuses } from '../src/input'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhInput', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Input)
    expect(wrapper.classes()).toContain('yh-input')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  // v-model 测试
  it('should work with v-model', async () => {
    const wrapper = mount(Input, {
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
    const wrapper = mount(Input, {
      props: { placeholder: '请输入内容' }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入内容')
  })

  // 禁用状态测试
  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Input, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  // 只读状态测试
  it('should be readonly when readonly prop is true', () => {
    const wrapper = mount(Input, {
      props: { readonly: true }
    })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  // 尺寸测试
  it('should apply size class', () => {
    const wrapper = mount(Input, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('yh-input--large')
  })

  // 可清空测试
  it('should show clear button when clearable', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    // 模拟聚焦以显示清除按钮
    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(wrapper.find('.yh-input__clear').exists()).toBe(true)
  })

  // 密码切换测试
  it('should toggle password visibility', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'password',
        modelValue: 'password123',
        showPassword: true
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')

    await wrapper.find('.yh-input__password').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('should export valid constants', () => {
    expect(inputTypes).toBeTruthy()
    expect(inputSizes).toBeTruthy()
    expect(inputVariants).toBeTruthy()
    expect(inputStatuses).toBeTruthy()
  })
  // 字数统计测试
  it('should show word limit count', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'hello',
        maxlength: 10,
        showWordLimit: true
      }
    })

    expect(wrapper.find('.yh-input__count').exists()).toBe(true)
    expect(wrapper.find('.yh-input__count').text()).toBe('5 / 10')
  })

  // 文本域测试
  it('should render textarea when type is textarea', () => {
    const wrapper = mount(Input, {
      props: { type: 'textarea' }
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
  })

  // 事件测试
  it('should emit focus and blur events', async () => {
    const wrapper = mount(Input)

    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  // 前后置插槽测试
  it('should render prepend and append slots', () => {
    const wrapper = mount(Input, {
      slots: {
        prepend: '<span>http://</span>',
        append: '<span>.com</span>'
      }
    })

    expect(wrapper.find('.yh-input__prepend').exists()).toBe(true)
    expect(wrapper.find('.yh-input__append').exists()).toBe(true)
  })
  it('should use config-provider locale placeholder', () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(Input)
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Please input')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(Input, {
      props: {
        themeOverrides: {
          'border-color': '#123456'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-input-border-color: #123456')
  })

  it('should expose input methods and refs', () => {
    const wrapper = mount(Input)

    expect(typeof wrapper.vm.focus).toBe('function')
    expect(typeof wrapper.vm.blur).toBe('function')
    expect(typeof wrapper.vm.select).toBe('function')
    expect(typeof wrapper.vm.clear).toBe('function')
  })

  it('should apply formatter for display value', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 1234,
        formatter: (value) => `#${value}`
      }
    })

    expect(wrapper.find('input').element.value).toBe('#1234')
  })

  it('should apply parser and trim modifier on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        parser: (value) => value.replace(/\$/g, ''),
        modelModifiers: { trim: true }
      }
    })

    await wrapper.find('input').setValue('  $42  ')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['42'])
    expect(wrapper.emitted('input')?.at(-1)).toEqual(['42'])
  })

  it('should apply number modifier when input can be parsed', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        modelModifiers: { number: true }
      }
    })

    await wrapper.find('input').setValue('12.5')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([12.5])
    expect(wrapper.emitted('input')?.at(-1)).toEqual([12.5])
  })

  it('should keep string value when number modifier receives invalid input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        modelModifiers: { number: true }
      }
    })

    await wrapper.find('input').setValue('abc')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['abc'])
  })

  it('should clear on escape when enabled', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'escape-me',
        clearOnEscape: true
      }
    })

    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
  })

  it('should emit keydown and keyup events', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')

    await input.trigger('keydown', { key: 'A' })
    await input.trigger('keyup', { key: 'A' })

    expect(wrapper.emitted('keydown')).toBeTruthy()
    expect(wrapper.emitted('keyup')).toBeTruthy()
  })

  it('should select text on focus when selectOnFocus is enabled', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'selected',
        selectOnFocus: true
      }
    })

    const selectSpy = vi.spyOn(HTMLInputElement.prototype, 'select').mockImplementation(() => {})

    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(selectSpy).toHaveBeenCalled()
    selectSpy.mockRestore()
  })

  it('should render loading indicator inside suffix area', () => {
    const wrapper = mount(Input, {
      props: {
        loading: true
      }
    })

    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.yh-input__loading').exists()).toBe(true)
  })

  it('should render prefix and suffix string props', () => {
    const wrapper = mount(Input, {
      props: {
        prefix: '$',
        suffix: 'USD'
      }
    })

    expect(wrapper.find('.yh-input__prefix-text').text()).toBe('$')
    expect(wrapper.find('.yh-input__suffix-text').text()).toBe('USD')
  })

  it('should trigger composition events and defer input until compositionend', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.trigger('compositionstart')
    await input.setValue('中')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    await input.trigger('compositionupdate')
    await input.trigger('compositionend')

    expect(wrapper.emitted('compositionstart')).toBeTruthy()
    expect(wrapper.emitted('compositionupdate')).toBeTruthy()
    expect(wrapper.emitted('compositionend')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['中'])
  })

  it('should expose textarea count and autosize style', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: 'line1\nline2',
        autosize: { minRows: 2, maxRows: 4 },
        showWordLimit: true,
        maxlength: 20
      }
    })

    await nextTick()
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('.yh-input__count--textarea').exists()).toBe(true)
    expect(wrapper.vm.textLength).toBe(11)
  })
})
