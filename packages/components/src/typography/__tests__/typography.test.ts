import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Title from '../src/title.vue'
import Text from '../src/text.vue'
import Paragraph from '../src/paragraph.vue'
import Link from '../src/link.vue'

describe('YhTypographyTitle', () => {
  it('应该渲染正确的标题级别', () => {
    const wrapper = mount(Title, { props: { level: 2 }, slots: { default: '标题' } })
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.text()).toBe('标题')
  })

  it('默认渲染 h1', () => {
    const wrapper = mount(Title, { slots: { default: '标题' } })
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('应该支持 h1-h6 全部级别', () => {
    for (let level = 1; level <= 6; level++) {
      const wrapper = mount(Title, {
        props: { level: level as 1 | 2 | 3 | 4 | 5 | 6 },
        slots: { default: 'T' }
      })
      expect(wrapper.find(`h${level}`).exists()).toBe(true)
    }
  })

  it('应该支持 type 类型', () => {
    const wrapper = mount(Title, { props: { type: 'danger' }, slots: { default: '错误' } })
    expect(wrapper.find('h1').classes()).toContain('yh-typography__title--danger')
  })

  it('应该支持 bold 修饰', () => {
    const wrapper = mount(Title, { props: { bold: true }, slots: { default: '加粗' } })
    expect(wrapper.find('h1').classes()).toContain('is-bold')
  })

  it('应该支持 delete 修饰', () => {
    const wrapper = mount(Title, { props: { delete: true }, slots: { default: '删除' } })
    expect(wrapper.find('h1').classes()).toContain('is-delete')
  })

  it('应该支持 italic 修饰', () => {
    const wrapper = mount(Title, { props: { italic: true }, slots: { default: '斜体' } })
    expect(wrapper.find('h1').classes()).toContain('is-italic')
  })

  it('应该支持 mark 标记', () => {
    const wrapper = mount(Title, { props: { mark: true }, slots: { default: '标记' } })
    expect(wrapper.find('mark').exists()).toBe(true)
  })

  it('应该支持 code 代码', () => {
    const wrapper = mount(Title, { props: { code: true }, slots: { default: '代码' } })
    expect(wrapper.find('code').exists()).toBe(true)
  })

  it('应该支持 ellipsis 省略', () => {
    const wrapper = mount(Title, { props: { ellipsis: true }, slots: { default: '省略' } })
    expect(wrapper.find('h1').classes()).toContain('is-ellipsis')
  })

  it('应该支持自定义 tag', () => {
    const wrapper = mount(Title, { props: { tag: 'div' }, slots: { default: '自定义' } })
    expect(wrapper.find('div').exists()).toBe(true)
  })
})

describe('YhTypographyText', () => {
  it('应该默认渲染 span', () => {
    const wrapper = mount(Text, { slots: { default: '文本' } })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('文本')
  })

  it('应该支持 type', () => {
    const wrapper = mount(Text, { props: { type: 'success' }, slots: { default: '成功' } })
    expect(wrapper.find('span').classes()).toContain('yh-typography__text--success')
  })

  it('应该支持 size', () => {
    const wrapper = mount(Text, { props: { size: 'large' }, slots: { default: '大号' } })
    expect(wrapper.find('span').classes()).toContain('yh-typography__text--large')
  })

  it('应该支持 keyboard 样式', () => {
    const wrapper = mount(Text, { props: { keyboard: true }, slots: { default: 'Ctrl' } })
    expect(wrapper.find('kbd').exists()).toBe(true)
  })

  it('应该支持 bold 修饰', () => {
    const wrapper = mount(Text, { props: { bold: true }, slots: { default: '加粗' } })
    expect(wrapper.find('span').classes()).toContain('is-bold')
  })

  it('应该支持 mark 标记', () => {
    const wrapper = mount(Text, { props: { mark: true }, slots: { default: '标记' } })
    expect(wrapper.find('mark').exists()).toBe(true)
  })

  it('应该支持自定义 tag', () => {
    const wrapper = mount(Text, { props: { tag: 'strong' }, slots: { default: '强调' } })
    expect(wrapper.find('strong').exists()).toBe(true)
  })
})

describe('YhTypographyParagraph', () => {
  it('应该渲染 p 标签', () => {
    const wrapper = mount(Paragraph, { slots: { default: '段落' } })
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('应该支持 type', () => {
    const wrapper = mount(Paragraph, { props: { type: 'warning' }, slots: { default: '警告' } })
    expect(wrapper.find('p').classes()).toContain('yh-typography__paragraph--warning')
  })

  it('应该支持 align', () => {
    const wrapper = mount(Paragraph, { props: { align: 'center' }, slots: { default: '居中' } })
    expect(wrapper.find('p').classes()).toContain('yh-typography__paragraph--center')
  })

  it('应该支持 spacing', () => {
    const wrapper = mount(Paragraph, { props: { spacing: 'compact' }, slots: { default: '紧凑' } })
    expect(wrapper.find('p').classes()).toContain('yh-typography__paragraph--compact')
  })

  it('应该支持 mark 标记', () => {
    const wrapper = mount(Paragraph, { props: { mark: true }, slots: { default: '高亮' } })
    expect(wrapper.find('mark').exists()).toBe(true)
  })

  it('应该支持多行省略 (number)', () => {
    const wrapper = mount(Paragraph, { props: { ellipsis: 3 }, slots: { default: '多行省略' } })
    const style = wrapper.find('p').attributes('style') || ''
    // happy-dom 不渲染 -webkit- 前缀属性，但 overflow: hidden 一定存在
    expect(style).toContain('overflow: hidden')
  })
})

describe('YhTypographyLink', () => {
  it('应该渲染 a 标签', () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com' },
      slots: { default: '链接' }
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
  })

  it('应该支持 target', () => {
    const wrapper = mount(Link, {
      props: { href: '#', target: '_blank' },
      slots: { default: '新窗口' }
    })
    expect(wrapper.find('a').attributes('target')).toBe('_blank')
  })

  it('应该支持 underline', () => {
    const wrapper = mount(Link, { props: { underline: true }, slots: { default: '下划线' } })
    expect(wrapper.find('a').classes()).toContain('is-underline')
  })

  it('应该支持 disabled', () => {
    const wrapper = mount(Link, {
      props: { href: '#', disabled: true },
      slots: { default: '禁用' }
    })
    expect(wrapper.find('a').classes()).toContain('is-disabled')
    expect(wrapper.find('a').attributes('href')).toBeUndefined()
    expect(wrapper.find('a').attributes('aria-disabled')).toBe('true')
    expect(wrapper.find('a').attributes('tabindex')).toBe('-1')
  })

  it('应该支持 type', () => {
    const wrapper = mount(Link, { props: { type: 'danger' }, slots: { default: '危险' } })
    expect(wrapper.find('a').classes()).toContain('yh-typography__link--danger')
  })

  it('禁用时点击不触发事件', async () => {
    const wrapper = mount(Link, { props: { disabled: true }, slots: { default: '禁用' } })
    await wrapper.find('a').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('启用时点击应触发事件', async () => {
    const wrapper = mount(Link, { props: { href: '#' }, slots: { default: '链接' } })
    await wrapper.find('a').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
