/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhBreadcrumb from '../src/breadcrumb.vue'
import YhBreadcrumbItem from '../src/breadcrumb-item.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhBreadcrumb', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhBreadcrumb, {
      slots: {
        default: `
          <yh-breadcrumb-item>Home</yh-breadcrumb-item>
          <yh-breadcrumb-item>Components</yh-breadcrumb-item>
        `
      },
      global: {
        components: { YhBreadcrumbItem }
      }
    })
    expect(wrapper.classes()).toContain('yh-breadcrumb')
    expect(wrapper.findAll('.yh-breadcrumb-item').length).toBe(2)
  })

  it('should render custom separator', () => {
    const wrapper = mount(YhBreadcrumb, {
      props: { separator: '>' },
      slots: {
        default: '<yh-breadcrumb-item>Home</yh-breadcrumb-item>'
      },
      global: {
        components: { YhBreadcrumbItem }
      }
    })
    expect(wrapper.find('.yh-breadcrumb-item__separator').text()).toBe('>')
  })

  it('should collapse items when maxItems is exceeded', () => {
    const wrapper = mount(YhBreadcrumb, {
      props: { maxItems: 3 },
      slots: {
        default: `
          <yh-breadcrumb-item>1</yh-breadcrumb-item>
          <yh-breadcrumb-item>2</yh-breadcrumb-item>
          <yh-breadcrumb-item>3</yh-breadcrumb-item>
          <yh-breadcrumb-item>4</yh-breadcrumb-item>
          <yh-breadcrumb-item>5</yh-breadcrumb-item>
        `
      },
      global: {
        components: { YhBreadcrumbItem }
      }
    })
    // For maxItems=3, should show: 1 + ... + (last 2 items) = 4 items total in this implementation?
    // Let's check our logic: result = [first, ellipsis, ...items.slice(items.length - (maxItems - 1))]
    // items.slice(5 - (3 - 1)) = items.slice(3) = [4, 5]
    // result = [1, ellipsis, 4, 5] (Total 4)
    expect(wrapper.find('.yh-breadcrumb__ellipsis').exists()).toBe(true)
  })
  it('should use config-provider locale text', () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () =>
          h(
            YhBreadcrumb,
            { maxItems: 2 },
            {
              default: () => [
                h(YhBreadcrumbItem, null, () => 'Home'),
                h(YhBreadcrumbItem, null, () => 'Library'),
                h(YhBreadcrumbItem, null, () => 'Data')
              ]
            }
          )
      },
      global: {
        components: { YhBreadcrumbItem }
      }
    })

    expect(wrapper.find('.yh-breadcrumb').attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.find('.yh-breadcrumb__ellipsis').attributes('title')).toBe('More')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(YhBreadcrumb, {
      props: {
        themeOverrides: {
          'font-size': '15px'
        }
      },
      slots: {
        default: '<yh-breadcrumb-item>Home</yh-breadcrumb-item>'
      },
      global: {
        components: { YhBreadcrumbItem }
      }
    })

    expect(wrapper.find('.yh-breadcrumb').attributes('style')).toContain(
      '--yh-breadcrumb-font-size: 15px'
    )
  })
})
