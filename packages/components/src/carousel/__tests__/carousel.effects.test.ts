/**
 * Mount carousel with each effect to exercise carousel-item.vue style branches.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Carousel from '../src/carousel.vue'
import CarouselItem from '../src/carousel-item.vue'
import { nextTick } from 'vue'
import type { CarouselEffect } from '../src/carousel'

const EFFECTS: CarouselEffect[] = [
  'slide',
  'fade',
  'card',
  'coverflow',
  'zoom',
  'perspective',
  'dissolve',
  'cloud',
  'wave',
  'radial',
  'fiber',
  'custom',
  'cube',
  'flip',
  'cylinder',
  'stack',
  'parallax',
  'popout',
  'rotate3d',
  'cards',
  'fold'
]

describe('CarouselItem — all effect modes mount', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it.each(EFFECTS)('effect %s renders items', async (effect) => {
    const wrapper = mount(Carousel, {
      props: {
        effect,
        loop: true,
        autoplay: false
      },
      slots: {
        default: `
          <y-carousel-item>A</y-carousel-item>
          <y-carousel-item>B</y-carousel-item>
        `
      },
      global: {
        components: { 'y-carousel-item': CarouselItem }
      }
    })

    await nextTick()
    expect(wrapper.findAll('.yh-carousel-item').length).toBe(2)
    expect(wrapper.find('.yh-carousel').exists()).toBe(true)
  })
})
