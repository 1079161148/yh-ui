/**
 * Col Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import Col from '../src/col.vue'
import Row from '../../row/src/row.vue'
import { rowContextKey } from '../../row/src/row'

describe('YhCol', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Col, {
      slots: {
        default: 'Col Content'
      }
    })
    expect(wrapper.text()).toContain('Col Content')
    expect(wrapper.classes()).toContain('yh-col')
    expect(wrapper.classes()).toContain('yh-col-24') // 默认 span 为 24
  })

  // 自定义标签测试
  it('should render with custom tag', () => {
    const wrapper = mount(Col, {
      props: {
        tag: 'span'
      }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('span')
  })

  // Span, Offset, Push, Pull 测试
  it('should apply span, offset, push, pull classes', () => {
    const wrapper = mount(Col, {
      props: {
        span: 12,
        offset: 4,
        push: 2,
        pull: 2
      }
    })
    const classes = wrapper.classes()
    expect(classes).toContain('yh-col-12')
    expect(classes).toContain('yh-col-offset-4')
    expect(classes).toContain('yh-col-push-2')
    expect(classes).toContain('yh-col-pull-2')
  })

  // Gutter 注入测试
  it('should apply padding style when gutter is provided via injection', () => {
    const gutter = 20
    const wrapper = mount(Col, {
      global: {
        provide: {
          [rowContextKey as any]: {
            gutter: computed(() => gutter)
          }
        }
      }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain(`padding-left: ${gutter / 2}px`)
    expect(style).toContain(`padding-right: ${gutter / 2}px`)
  })

  // 配合 Row 组件的 Gutter 测试 (集成测试)
  it('should work with Row gutter', () => {
    const wrapper = mount(Row, {
      props: {
        gutter: 20
      },
      slots: {
        default: mount(Col).html()
      }
    })
    // 注意：mount(Row) 会渲染子组件，但 slot content 需要是真正的组件才能进行 inject
  })

  // 为了更真实的测试 inject，我们可以创建一个包裹组件
  it('should correctly inject gutter from parent Row', () => {
    const wrapper = mount({
      template: `
        <yh-row :gutter="20">
          <yh-col id="target">Content</yh-col>
        </yh-row>
      `,
      components: {
        'yh-row': Row,
        'yh-col': Col
      }
    })

    const col = wrapper.find('#target')
    const style = col.attributes('style')
    expect(style).toContain('padding-left: 10px')
    expect(style).toContain('padding-right: 10px')
  })

  // 响应式测试 (数字)
  it('should apply responsive classes (number)', () => {
    const wrapper = mount(Col, {
      props: {
        xs: 4,
        sm: 6,
        md: 8,
        lg: 10,
        xl: 12
      }
    })
    const classes = wrapper.classes()
    expect(classes).toContain('yh-col-xs-4')
    expect(classes).toContain('yh-col-sm-6')
    expect(classes).toContain('yh-col-md-8')
    expect(classes).toContain('yh-col-lg-10')
    expect(classes).toContain('yh-col-xl-12')
  })

  // 响应式测试 (对象)
  it('should apply responsive classes (object)', () => {
    const wrapper = mount(Col, {
      props: {
        xs: { span: 4, offset: 2 },
        sm: { span: 6, push: 1 },
        md: { span: 8, pull: 1 }
      }
    })
    const classes = wrapper.classes()
    expect(classes).toContain('yh-col-xs-4')
    expect(classes).toContain('yh-col-xs-offset-2')
    expect(classes).toContain('yh-col-sm-6')
    expect(classes).toContain('yh-col-sm-push-1')
    expect(classes).toContain('yh-col-md-8')
    expect(classes).toContain('yh-col-md-pull-1')
  })
})
