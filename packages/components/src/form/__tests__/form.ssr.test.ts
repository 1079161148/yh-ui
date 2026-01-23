/**
 * Form Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'
import Input from '../../input/src/input.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'
import { h } from 'vue'

describe('YhForm SSR', () => {
  it('should render form correctly in SSR', async () => {
    const html = await renderSSR(
      Form,
      {
        model: { name: '' },
        labelWidth: '100px'
      },
      {
        default: () =>
          h(
            FormItem,
            { label: 'Name', prop: 'name' },
            {
              default: () => h(Input, { modelValue: '' })
            }
          )
      }
    )

    expectSSRHasClass(html, 'yh-form')
    expect(html).toContain('Name')
  })

  it('should render inline form in SSR', async () => {
    const html = await renderSSR(Form, {
      layout: 'inline',
      model: {}
    })
    expectSSRHasClass(html, 'yh-form--inline')
  })

  it('should render different label positions in SSR', async () => {
    const positions = ['left', 'right', 'top'] as const
    for (const pos of positions) {
      const html = await renderSSR(Form, {
        labelPosition: pos,
        model: {}
      })
      expectSSRHasClass(html, `yh-form--label-${pos}`)
    }
  })

  it('should hydrate form without mismatch', async () => {
    const result = await testHydration(
      Form,
      {
        model: { test: '123' }
      },
      {
        default: () =>
          h(
            FormItem,
            { label: 'Test', prop: 'test' },
            {
              default: () => h(Input, { modelValue: '123' })
            }
          )
      }
    )
    expect(result.isMatch).toBe(true)
  })

  it('should render validation states in SSR', async () => {
    const html = await renderSSR(FormItem, {
      label: 'Email',
      error: 'Invalid email',
      showMessage: true,
      validateStatus: 'error'
    })
    expectSSRHasClass(html, 'is-error')
    expect(html).toContain('Invalid email')
  })
})
