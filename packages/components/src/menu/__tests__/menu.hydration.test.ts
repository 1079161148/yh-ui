import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { testHydration } from '../../__tests__/utils/ssr'
import { YhMenu, YhMenuItem } from '../index'

const normalizeTooltipFlex = (html: string) =>
  html.replace(
    /flex-basis:0;flex-grow:1;flex-shrink:1;min-width:0;overflow:hidden/g,
    'flex:1;min-width:0;overflow:hidden'
  )

const SlotMenu = defineComponent({
  name: 'MenuHydrationSlotHost',
  props: {
    mode: {
      type: String,
      default: 'vertical'
    }
  },
  setup(props) {
    return () =>
      h(
        YhMenu,
        { mode: props.mode, defaultActive: 'guide' },
        {
          default: () => [
            h(YhMenuItem, { index: 'home' }, () => 'Home'),
            h(YhMenuItem, { index: 'guide' }, () => 'Guide')
          ]
        }
      )
  }
})

describe('YhMenu Hydration', () => {
  it('hydrates vertical slot-driven menus without mismatch', async () => {
    const result = await testHydration(SlotMenu, {
      mode: 'vertical'
    })

    expect(normalizeTooltipFlex(result.csrHtml)).toBe(normalizeTooltipFlex(result.ssrHtml))
  })

  it('hydrates options-driven horizontal menus without mismatch', async () => {
    const result = await testHydration(YhMenu, {
      mode: 'horizontal',
      value: 'guide',
      options: [
        { index: 'home', label: 'Home' },
        { index: 'guide', label: 'Guide' }
      ]
    })

    expect(normalizeTooltipFlex(result.csrHtml)).toBe(normalizeTooltipFlex(result.ssrHtml))
  })
})
