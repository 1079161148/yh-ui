import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { YhIcon } from '../index'
import { registerIcon, createIconComponent, registerIconSet } from '../src/icon'
import { h, markRaw } from 'vue'

describe('Icon', () => {
  it('render test', () => {
    const wrapper = mount(YhIcon)
    expect(wrapper.find('.yh-icon').exists()).toBe(true)
  })

  it('size test', () => {
    const wrapper = mount(YhIcon, {
      props: {
        size: 20
      }
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('font-size: 20px')
    expect(style).toContain('width: 20px')
    expect(style).toContain('height: 20px')

    const wrapper2 = mount(YhIcon, {
      props: {
        size: '2em'
      }
    })
    expect(wrapper2.attributes('style')).toContain('font-size: 2em')
  })

  it('color test', () => {
    const wrapper = mount(YhIcon, {
      props: {
        color: 'rgb(255, 0, 0)'
      }
    })
    expect(wrapper.attributes('style')).toContain('color: rgb(255, 0, 0)')
  })

  it('spin test', () => {
    const wrapper = mount(YhIcon, {
      props: {
        spin: true
      }
    })
    expect(wrapper.classes()).toContain('yh-icon--spin')
  })

  it('rotate test', () => {
    const wrapper = mount(YhIcon, {
      props: {
        rotate: 90
      }
    })
    expect(wrapper.attributes('style')).toContain('transform: rotate(90deg)')
  })

  it('svg prop test', () => {
    const svgStr = '<path d="M10 10l5 5" />'
    const wrapper = mount(YhIcon, {
      props: {
        svg: svgStr
      }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').html()).toContain('d="M10 10l5 5"')
  })

  it('name registration test', () => {
    registerIcon({ name: 'test-icon', svg: '<circle cx="12" cy="12" r="10" />' })
    const wrapper = mount(YhIcon, {
      props: {
        name: 'test-icon'
      }
    })
    expect(wrapper.find('svg').html()).toContain('circle')
  })

  it('icon component test', () => {
    // 1. With extracted SVG (createIconComponent)
    const iconComp = markRaw(createIconComponent('<rect width="10" height="10" />'))

    // Call render to cover line 160 in icon.ts
    const renderResult = (iconComp as any).render()
    expect(renderResult).toBeNull()

    const wrapper = mount(YhIcon, {
      props: {
        icon: iconComp
      }
    })
    expect(wrapper.find('svg').html()).toContain('rect')

    // 2. As a normal component
    const UserIcon = markRaw({
      render() {
        return h('svg', { class: 'user-icon' }, [h('path', { d: 'M1 1l2 2' })])
      }
    })
    const wrapper2 = mount(YhIcon, {
      props: {
        icon: UserIcon
      }
    })
    expect(wrapper2.find('.user-icon').exists()).toBe(true)
  })

  it('registerIcons and registerIconSet test', async () => {
    const { registerIcons, registerIconSet } = await import('../src/icon')

    // Test registerIcons
    registerIcons([
      { name: 'batch-1', svg: '<path d="M1" />' },
      { name: 'batch-2', svg: '<path d="M2" />' }
    ])

    // Test registerIconSet
    const iconSet = {
      prefix: 'custom',
      icons: {
        'icon-1': { name: 'icon-1', svg: '<path d="M1 1" />' },
        'icon-2': { name: 'icon-2', svg: '<path d="M2 2" />' }
      }
    }
    registerIconSet(iconSet)

    const wrapper = mount(YhIcon, {
      props: {
        name: 'custom:icon-1'
      }
    })
    expect(wrapper.find('svg').html()).toContain('d="M1 1"')
  })

  it('slot test', () => {
    const wrapper = mount(YhIcon, {
      slots: {
        default: '<span class="custom-slot">custom</span>'
      }
    })
    expect(wrapper.find('.custom-slot').exists()).toBe(true)
    expect(wrapper.text()).toBe('custom')
  })
})
