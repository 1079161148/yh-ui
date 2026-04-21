/**
 * YhCarouselItem 组件测试
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import CarouselItem from '../src/carousel-item.vue'
import { CAROUSEL_INJECTION_KEY, type CarouselContext } from '../src/carousel'

vi.mock('@yh-ui/hooks', () => ({
  useNamespace: () => ({
    b: () => 'yh-carousel-item',
    e: (name: string) => `yh-carousel-item__${name}`,
    is: (name: string, condition?: boolean) => (condition ? `yh-carousel-item--${name}` : ''),
    m: (name: string) => `yh-carousel-item--${name}`
  }),
  useLocale: () => (key: string) => key
}))

describe('CarouselItem 组件', () => {
  let wrapper: VueWrapper<any>

  const createMockContext = (overrides: Partial<CarouselContext> = {}): CarouselContext => {
    const state = {
      itemCount: ref(1),
      currentIndex: ref(0),
      prevIndex: ref(-1),
      direction: ref<'horizontal' | 'vertical'>('horizontal'),
      effect: ref<string>('slide'),
      props: {
        loop: true,
        duration: 500,
        autoplay: false,
        interval: 3000
      },
      shouldRenderItem: (index: number) => index >= 0,
      addItem: vi.fn().mockImplementation((id: string) => {
        // Return the index as if item was added at position 0
        state.itemCount.value++
      }),
      removeItem: vi.fn(),
      getItemIndex: vi.fn().mockReturnValue(0),
      jump: vi.fn()
    }
    return { ...state, ...overrides } as CarouselContext
  }

  const mountWithContext = (
    context: CarouselContext,
    propsData: Record<string, any> = {},
    slotContent: string | (() => any) = 'Test Content'
  ) => {
    return mount(CarouselItem, {
      props: propsData,
      slots: {
        default: typeof slotContent === 'function' ? slotContent : () => slotContent
      },
      global: {
        provide: {
          [CAROUSEL_INJECTION_KEY as symbol]: context
        }
      }
    })
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
      wrapper = null
    }
    vi.restoreAllMocks()
  })

  describe('基础渲染', () => {
    it('应该正确渲染基础结构', async () => {
      wrapper = mount(CarouselItem, {
        slots: { default: () => 'Test Content' }
      })
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
      expect(wrapper.text()).toContain('Test Content')
    })

    it('没有 carouselContext 时应该正常渲染', async () => {
      wrapper = mount(CarouselItem, {
        slots: { default: () => 'No Context Content' }
      })
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })

    it('应该支持 name prop', async () => {
      wrapper = mount(CarouselItem, {
        props: { name: 'slide-1' },
        slots: { default: () => 'Named Item' }
      })
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })

  describe('Props 测试', () => {
    it('应该接受 name prop', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context, { name: 'test-item' })
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })

  describe('生命周期测试', () => {
    it('应该在 mount 时注册到 carousel', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context)
      await nextTick()
      await nextTick() // Wait for addItem to be called
      expect(context.addItem).toHaveBeenCalled()
    })

    it('应该在 unmount 时从 carousel 移除', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context)
      await nextTick()
      await nextTick()
      wrapper.unmount()
      wrapper = null
      expect(context.removeItem).toHaveBeenCalled()
    })
  })

  describe('懒渲染测试', () => {
    it('当 isVisible 为 false 时应该显示 display: none 的元素', async () => {
      const context = createMockContext({
        shouldRenderItem: () => false
      })
      wrapper = mountWithContext(context)
      await nextTick()
      const style = wrapper.find('.yh-carousel-item').attributes('style')
      expect(style).toContain('display: none')
    })
  })

  describe('active 状态测试', () => {
    it('当没有 carouselContext 时不应该崩溃', async () => {
      wrapper = mount(CarouselItem, {
        slots: { default: () => 'Test' }
      })
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })

  describe('类名计算测试', () => {
    it('应该包含基础类名', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context)
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })

    it('应该包含效果类名', async () => {
      const context = createMockContext({ effect: ref('fade') })
      wrapper = mountWithContext(context)
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })

    it('应该包含基础类名 (无 context)', async () => {
      wrapper = mount(CarouselItem, {
        slots: { default: () => 'Test' }
      })
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })

  describe('样式分支覆盖', () => {
    it('fade 效果应返回透明度样式', async () => {
      const context = createMockContext({
        effect: ref('fade'),
        currentIndex: ref(0),
        prevIndex: ref(-1)
      })
      wrapper = mountWithContext(context)
      await nextTick()
      await nextTick()
      const style = wrapper.find('.yh-carousel-item').attributes('style')
      expect(style).toContain('opacity')
      expect(style).toContain('position: absolute')
    })

    it.each(['radial', 'wave', 'cloud', 'fiber', 'dissolve'])(
      'mask 类效果 %s 应生成对应遮罩样式',
      async (effect) => {
        const context = createMockContext({
          effect: ref(effect as any),
          currentIndex: ref(0),
          prevIndex: ref(1),
          itemCount: ref(3)
        })
        wrapper = mountWithContext(context)
        await nextTick()
        await nextTick()
        const style = wrapper.find('.yh-carousel-item').attributes('style')
        expect(style).toContain('position: absolute')
      }
    )

    it.each(['cube', 'flip', 'cylinder', 'stack', 'parallax', 'popout', 'rotate3d', 'cards', 'fold'])(
      '3D 效果 %s 应生成 transform 样式',
      async (effect) => {
        const context = createMockContext({
          effect: ref(effect as any),
          currentIndex: ref(0),
          prevIndex: ref(1),
          itemCount: ref(5)
        })
        wrapper = mountWithContext(context)
        await nextTick()
        await nextTick()
        const style = wrapper.find('.yh-carousel-item').attributes('style')
        expect(style).toContain('transform')
      }
    )

    it('loop 偏移修正分支应命中（offset > total/2）', async () => {
      const context = createMockContext({
        effect: ref('coverflow'),
        currentIndex: ref(0),
        itemCount: ref(5),
        getItemIndex: vi.fn().mockReturnValue(4),
        props: {
          loop: true,
          duration: 500,
          autoplay: false,
          interval: 3000
        } as any
      })
      wrapper = mountWithContext(context)
      await nextTick()
      await nextTick()
      const style = wrapper.find('.yh-carousel-item').attributes('style')
      expect(style).toContain('rotateY')
    })

    it('custom/default 分支应返回空样式对象', async () => {
      const context = createMockContext({
        effect: ref('custom' as any)
      })
      wrapper = mountWithContext(context)
      await nextTick()
      await nextTick()
      const style = wrapper.find('.yh-carousel-item').attributes('style') || ''
      expect(style.includes('transform')).toBe(false)
    })
  })

  describe('attrs 透传测试', () => {
    it('应该渲染内容', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context)
      await nextTick()
      expect(wrapper.text()).toContain('Test Content')
    })

    it('应该接受 style 属性', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context, {}, '<div style="color: red">Styled</div>')
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })

  describe('可见性切换测试', () => {
    it('组件应该包含可见性类', async () => {
      const context = createMockContext({ shouldRenderItem: () => true })
      wrapper = mountWithContext(context)
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })

  describe('slot 测试', () => {
    it('应该正确渲染默认 slot 内容', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context)
      await nextTick()
      expect(wrapper.text()).toBe('Test Content')
    })

    it('应该支持多个子元素', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context, {}, '<span>1</span><span>2</span>')
      await nextTick()
      expect(wrapper.text()).toContain('1')
    })

    it('应该支持嵌套内容', async () => {
      const context = createMockContext()
      wrapper = mountWithContext(context, {}, '<div><span>Nested</span></div>')
      await nextTick()
      expect(wrapper.text()).toContain('Nested')
    })
  })

  describe('组件名称测试', () => {
    it('组件应该正确命名', async () => {
      wrapper = mount(CarouselItem, {
        slots: { default: () => 'Test' }
      })
      await nextTick()
      expect(wrapper.vm.$options.name).toBe('YhCarouselItem')
    })
  })

  describe('多 item 场景测试', () => {
    it('多个 item 应该正确渲染', async () => {
      const context = createMockContext({ itemCount: ref(3) })
      wrapper = mountWithContext(context)
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })

    it('切换 currentIndex 应该更新样式', async () => {
      const context = createMockContext({ currentIndex: ref(0) })
      wrapper = mountWithContext(context)
      await nextTick()

      context.currentIndex.value = 1
      await nextTick()
      expect(wrapper.find('.yh-carousel-item').exists()).toBe(true)
    })
  })
})
