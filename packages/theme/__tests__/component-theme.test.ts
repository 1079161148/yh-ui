import { describe, it, expect } from 'vitest'
import {
  provideComponentThemes,
  createComponentThemes,
  mergeComponentThemes,
  useComponentTheme
} from '../src/component-theme'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'

describe('component-theme', () => {
  it('should create component themes', () => {
    const themes = createComponentThemes({
      button: { textColor: '#000' }
    })
    expect(themes.button?.textColor).toBe('#000')
  })

  it('should merge component themes', () => {
    const base = { button: { textColor: '#000', bgColor: '#fff' } }
    const overrides = { button: { textColor: '#f00' }, input: { placeholderColor: '#ccc' } }
    const result = mergeComponentThemes(base, overrides)
    expect(result.button?.textColor).toBe('#f00')
    expect(result.button?.bgColor).toBe('#fff')
    expect(result.input?.placeholderColor).toBe('#ccc')

    // fallback test
    const rb = mergeComponentThemes({}, {})
    expect(rb).toEqual({})
  })

  it('should provide component themes and use them', async () => {
    const TestComp = defineComponent({
      setup() {
        const { themeStyle, hasCustomTheme, themeVars } = useComponentTheme(
          'button',
          ref({ hoverBgColor: '#111' })
        )
        return { themeStyle, hasCustomTheme, themeVars }
      },
      render() {
        return h('div', { style: this.themeStyle })
      }
    })

    const Provider = defineComponent({
      setup() {
        provideComponentThemes({
          button: { textColor: '#000', bgColor: '#fff' }
        })
      },
      render() {
        return h(TestComp, { ref: 'comp' })
      }
    })

    const wrapper = mount(Provider)
    const comp = wrapper.findComponent(TestComp).vm as any
    expect(comp.hasCustomTheme).toBe(true)
    expect(comp.themeVars.textColor).toBe('#000')
    expect(comp.themeStyle['--yh-button-text-color']).toBe('#000')
    expect(comp.themeStyle['--yh-button-hover-bg-color']).toBe('#111')
  })

  it('should handle kebab-case conversion for multi-word properties', () => {
    const TestComp = defineComponent({
      setup() {
        const { themeStyle } = useComponentTheme('dialog', {
          headerPadding: '20px',
          closeIconHoverColor: 'red'
        })
        return { themeStyle }
      },
      render() {
        return null
      }
    })
    const wrapper = mount(TestComp)
    const vm = wrapper.vm as any
    expect(vm.themeStyle['--yh-dialog-header-padding']).toBe('20px')
    expect(vm.themeStyle['--yh-dialog-close-icon-hover-color']).toBe('red')
  })

  it('should use default values when no global theme provided', () => {
    const TestComp = defineComponent({
      setup() {
        // no local overrides either
        const { themeStyle, hasCustomTheme, themeVars } = useComponentTheme('unknown')
        return { themeStyle, hasCustomTheme, themeVars }
      },
      render() {
        return null
      }
    })
    const wrapper = mount(TestComp)
    const vm = wrapper.vm as any
    expect(vm.hasCustomTheme).toBe(false)
    expect(vm.themeVars).toEqual({})
    expect(vm.themeStyle).toEqual({})
  })

  it('should correctly merge nested themes and handle empty or undefined overrides', () => {
    const base = { button: { textColor: '#000' } }
    const overrides = { button: { bgColor: '#fff' }, input: {}, dialog: undefined }
    const result = mergeComponentThemes(base, overrides as any)
    expect(result.button).toEqual({ textColor: '#000', bgColor: '#fff' })
    expect(result.input).toEqual({})
    expect(result.dialog).toEqual({})
  })

  it('should skip undefined values in themeStyle', () => {
    const TestComp = defineComponent({
      setup() {
        const { themeStyle } = useComponentTheme('button', {
          textColor: '#000',
          bgColor: undefined
        } as any)
        return { themeStyle }
      },
      render() {
        return null
      }
    })
    const wrapper = mount(TestComp)
    const vm = wrapper.vm as any
    expect(vm.themeStyle['--yh-button-text-color']).toBe('#000')
    expect(vm.themeStyle['--yh-button-bg-color']).toBeUndefined()
  })
})
