import { describe, it, expect, vi } from 'vitest'
import { parseIconName, iconExists, getIconData, createIconifyComponent } from '../src/iconify'
import { YhIcon, __test__ as iconInternal } from '../src/vue/icon'
import { getPreset, PRESETS, PREFIX_ALIAS, COMMON_ICONS } from '../src/presets'
import { getCollectionPrefixes } from '../src/config'
import { ICON_COLLECTIONS, getCollection, getAllPrefixes } from '../src/collections'
import { AVAILABLE_COLLECTIONS, RECOMMENDED_COLLECTIONS } from '../src/types'
import { mount } from '@vue/test-utils'
import { h, markRaw } from 'vue'

// Mock @iconify/vue
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'IconifyIcon',
    render: () => h('svg', { 'data-iconify': '' })
  },
  loadIcon: vi.fn(async (name) => {
    if (name === 'mdi:exists') return { body: '<svg></svg>' }
    return null
  }),
  getIcon: vi.fn((name) => {
    if (name === 'mdi:cached') return { body: '<svg></svg>' }
    return null
  })
}))

describe('Icons Package', () => {
  describe('iconify.ts utilities', () => {
    it('parseIconName should handle various formats', () => {
      expect(parseIconName('mdi:home')).toBe('mdi:home')
      expect(parseIconName('mdi/home')).toBe('mdi:home')
      expect(parseIconName('home')).toBe('mdi:home')
    })

    it('createIconifyComponent should render Iconify component with props', () => {
      const Icon = createIconifyComponent()
      const wrapper = mount(Icon as any, {
        props: {
          icon: 'mdi:home',
          size: 24,
          color: 'red',
          rotate: 90,
          spin: true
        }
      })

      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      const style = svg.attributes('style')
      expect(style).toContain('width: 24px')
      expect(style).toContain('color: red')
      expect(style).toContain('transform: rotate(90deg)')
      expect(style).toContain('animation: spin 1s linear infinite')

      // size as string
      const wrapper2 = mount(Icon as any, {
        props: { icon: 'mdi:home', size: '2em' }
      })
      expect(wrapper2.find('svg').attributes('style')).toContain('width: 2em')
    })

    it('createIconifyComponent should render without style when no visual props', () => {
      const Icon = createIconifyComponent()
      const wrapper = mount(Icon as any, {
        props: { icon: 'mdi:home' }
      })
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.find('svg').attributes('style')).toBeUndefined()
    })

    it('iconExists should return boolean', async () => {
      expect(await iconExists('mdi:home')).toBe(true)
    })

    it('iconExists should return false when parse throws', async () => {
      const badName = {
        includes() {
          throw new Error('boom')
        }
      } as unknown as string
      expect(await iconExists(badName)).toBe(false)
    })

    it('getIconData should return icon data or throw', async () => {
      const cached = await getIconData('mdi:cached')
      expect(cached).toBeDefined()

      const loaded = await getIconData('mdi:exists')
      expect(loaded).toBeDefined()

      // 修正：原代码中 try 块里的报错会被 catch 捕获并重写为 "Failed to load icon"
      await expect(getIconData('mdi:nonexistent')).rejects.toThrow('Failed to load icon')
    })
  })

  describe('presets.ts', () => {
    it('getPreset should return correct preset', () => {
      expect(getPreset('mdi')).toEqual(PRESETS[0])
      expect(getPreset('unknown')).toBeUndefined()
    })

    it('should have correct aliases', () => {
      expect(PREFIX_ALIAS['element-plus']).toBe('ep')
    })

    it('should have common icons', () => {
      expect(COMMON_ICONS['arrow-up']).toBe('mdi:arrow-up')
    })
  })

  describe('config.ts', () => {
    it('should return popular prefixes', () => {
      expect(getCollectionPrefixes().length).toBeGreaterThan(0)
      expect(getCollectionPrefixes()).toContain('mdi')
    })
  })

  describe('collections.ts', () => {
    it('should have collections defined', () => {
      expect(ICON_COLLECTIONS.length).toBeGreaterThan(0)
    })

    it('getCollection should return collection metadata', () => {
      expect(getCollection('mdi')).toBeDefined()
      expect(getCollection('ep')).toBeDefined()
      expect(getCollection('nonexistent')).toBeUndefined()
      expect(getAllPrefixes()).toContain('mdi')
    })
  })

  describe('types.ts', () => {
    it('should have types constants', () => {
      expect(AVAILABLE_COLLECTIONS.length).toBeGreaterThan(0)
      expect(RECOMMENDED_COLLECTIONS.length).toBeGreaterThan(0)
    })
  })

  describe('YhIcon component', () => {
    it('should render SVG from svg prop', () => {
      const wrapper = mount(YhIcon, {
        props: { svg: '<path d="M0 0h24v24H0z"/>' }
      })
      expect(wrapper.find('svg').exists()).toBe(true)
      expect(wrapper.html()).toContain('path d="M0 0h24v24H0z"')
    })

    it('should render custom component', () => {
      const Custom = markRaw({ render: () => h('div', 'custom') })
      const wrapper = mount(YhIcon, {
        props: { component: Custom }
      })
      expect(wrapper.text()).toBe('custom')
    })

    it('should handle spin and resolve names', () => {
      const wrapper = mount(YhIcon, {
        props: { name: 'home', spin: true }
      })
      expect(wrapper.classes()).toContain('yh-icons--spin')
      expect(wrapper.html()).toContain('mdi:home')
    })

    it('should resolve common icon aliases', () => {
      const wrapper = mount(YhIcon, {
        props: { name: 'arrow-up' }
      })
      expect(wrapper.html()).toContain('mdi:arrow-up')
    })

    it('should handle rotate and color', () => {
      const wrapper = mount(YhIcon, {
        props: { icon: 'ep:search', rotate: 180, color: 'blue' }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('transform: rotate(180deg)')
      expect(style).toContain('color: blue')
    })

    it('should apply numeric size styles', () => {
      const wrapper = mount(YhIcon, {
        props: { icon: 'mdi:home', size: 20 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 20px')
      expect(style).toContain('height: 20px')
      expect(style).toContain('font-size: 20px')
    })

    it('should inject spin style only once', () => {
      const id = 'yh-icon-spin-style'
      document.getElementById(id)?.remove()
      mount(YhIcon, { props: { name: 'home', spin: true } })
      mount(YhIcon, { props: { name: 'home', spin: true } })
      expect(document.querySelectorAll(`#${id}`).length).toBe(1)
    })

    it('setup should be safe when document is unavailable', () => {
      const prevDocument = (globalThis as any).document
      ;(globalThis as any).document = undefined
      const setup = (YhIcon as any).setup
      const render = setup({ name: 'home', spin: true }, { attrs: {} })
      expect(typeof render).toBe('function')
      expect(() => render()).not.toThrow()
      ;(globalThis as any).document = prevDocument
    })

    it('internal resolveIconName handles empty string', () => {
      expect(iconInternal.resolveIconName('')).toBe('')
    })

    it('internal createIconStyle handles numeric size conversion', () => {
      const style = iconInternal.createIconStyle({ size: 18 })
      expect(style?.width).toBe('18px')
      expect(style?.height).toBe('18px')
      expect(style?.fontSize).toBe('18px')
    })

    it('internal createIconStyle handles string size without px conversion', () => {
      const style = iconInternal.createIconStyle({ size: '2em' })
      expect(style?.width).toBe('2em')
      expect(style?.height).toBe('2em')
      expect(style?.fontSize).toBe('2em')
    })

    it('should render placeholder span if nothing provided', () => {
      const wrapper = mount(YhIcon)
      expect(wrapper.find('span').exists()).toBe(true)
    })
  })
})
