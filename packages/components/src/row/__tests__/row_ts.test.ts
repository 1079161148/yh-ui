import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Row from '../src/row'

describe('YhRow (Functional Component)', () => {
  it('should render correctly with various props', () => {
    const wrapper = mount(Row, {
      props: {
        tag: 'section',
        gutter: 20,
        justify: 'center',
        align: 'middle'
      },
      slots: {
        default: () => 'Content'
      }
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('section')
    expect(wrapper.classes()).toContain('yh-row')
    expect(wrapper.classes()).toContain('is-justify-center')
    expect(wrapper.classes()).toContain('is-align-middle')
    expect(wrapper.attributes('style')).toContain('margin-left: -10px')
    expect(wrapper.text()).toBe('Content')
  })

  it('should render without gutter', () => {
    const wrapper = mount(Row)
    expect(wrapper.attributes('style')).toBeUndefined()
  })
})
