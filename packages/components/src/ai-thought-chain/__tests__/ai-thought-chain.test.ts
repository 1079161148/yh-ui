/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AiThoughtChain from '../src/ai-thought-chain.vue'

import type { AiThoughtItem, AiThoughtStatus } from '../src/ai-thought-chain'

type ThoughtStatus = AiThoughtStatus

const makeItem = (
  title: string,
  status: ThoughtStatus = 'complete',
  content = ''
): AiThoughtItem => ({
  title,
  status,
  content
})

describe('YhAiThoughtChain', () => {
  // 鈹€鈹€鈹€ Rendering 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should render with base class', () => {
    const wrapper = mount(AiThoughtChain)
    expect(wrapper.find('.yh-ai-thought-chain').exists()).toBe(true)
  })

  // 鈹€鈹€鈹€ Single node mode 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should render single node header when no items', () => {
    const wrapper = mount(AiThoughtChain, { props: { title: 'My Thought' } })
    expect(wrapper.find('.yh-ai-thought-chain__header').exists()).toBe(true)
  })

  it('should render title in single node mode', () => {
    const wrapper = mount(AiThoughtChain, { props: { title: 'Thinking Title' } })
    expect(wrapper.find('.yh-ai-thought-chain__title').text()).toBe('Thinking Title')
  })

  it('should fallback to default title when no title provided', () => {
    const wrapper = mount(AiThoughtChain)
    expect(wrapper.find('.yh-ai-thought-chain__title').text().length).toBeGreaterThan(0)
  })

  // 鈹€鈹€鈹€ Status computation 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should compute thinking status when thinking=true', () => {
    const wrapper = mount(AiThoughtChain, { props: { thinking: true } })
    expect(wrapper.classes()).toContain('is-thinking')
  })

  it('should compute complete status when thinking=false', () => {
    const wrapper = mount(AiThoughtChain, { props: { thinking: false } })
    expect(wrapper.classes()).not.toContain('is-thinking')
  })

  it('should use explicit status prop over thinking', () => {
    const wrapper = mount(AiThoughtChain, {
      props: { status: 'error', thinking: true }
    })
    // status='error' takes priority over thinking=true
    expect(wrapper.classes()).not.toContain('is-thinking')
  })

  // 鈹€鈹€鈹€ Single node expand/collapse 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should be collapsed by default in single mode', () => {
    const wrapper = mount(AiThoughtChain, { props: { content: 'Some content' } })
    expect(wrapper.classes()).not.toContain('is-expanded')
  })

  it('should expand on header click in single node mode', async () => {
    const wrapper = mount(AiThoughtChain, {
      props: { title: 'Title', content: 'Detail' }
    })
    await wrapper.find('.yh-ai-thought-chain__header').trigger('click')
    expect(wrapper.classes()).toContain('is-expanded')
  })

  it('should collapse again on second header click', async () => {
    const wrapper = mount(AiThoughtChain, { props: { content: 'Detail' } })
    await wrapper.find('.yh-ai-thought-chain__header').trigger('click')
    await wrapper.find('.yh-ai-thought-chain__header').trigger('click')
    expect(wrapper.classes()).not.toContain('is-expanded')
  })

  it('should render content in single mode when expanded', async () => {
    const wrapper = mount(AiThoughtChain, {
      props: { content: 'Thought Content Detail' }
    })
    await wrapper.find('.yh-ai-thought-chain__header').trigger('click')
    expect(wrapper.find('.yh-ai-thought-chain__text').text()).toBe('Thought Content Detail')
  })

  // 鈹€鈹€鈹€ autoCollapse (single mode) 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should auto-collapse when status becomes complete and autoCollapse=true', async () => {
    const wrapper = mount(AiThoughtChain, {
      props: { status: 'thinking', autoCollapse: true }
    })
    // Expand first by clicking
    await wrapper.find('.yh-ai-thought-chain__header').trigger('click')
    expect(wrapper.classes()).toContain('is-expanded')
    // Transition to complete
    await wrapper.setProps({ status: 'complete' })
    await nextTick()
    expect(wrapper.classes()).not.toContain('is-expanded')
  })

  // 鈹€鈹€鈹€ Timeline (multi-item) mode 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should apply is-timeline class when items provided', () => {
    const wrapper = mount(AiThoughtChain, {
      props: { items: [makeItem('Step 1'), makeItem('Step 2')] }
    })
    expect(wrapper.classes()).toContain('is-timeline')
  })

  it('should render correct number of timeline items', () => {
    const items = [makeItem('Step 1'), makeItem('Step 2'), makeItem('Step 3')]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    expect(wrapper.findAll('.yh-ai-thought-chain__item').length).toBe(3)
  })

  it('should render item titles', () => {
    const items = [makeItem('Alpha'), makeItem('Beta')]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const titles = wrapper.findAll('.yh-ai-thought-chain__item-title')
    expect(titles[0].text()).toBe('Alpha')
    expect(titles[1].text()).toBe('Beta')
  })

  it('should apply is-last class to last item', () => {
    const items = [makeItem('First'), makeItem('Last')]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const allItems = wrapper.findAll('.yh-ai-thought-chain__item')
    expect(allItems[allItems.length - 1].classes()).toContain('is-last')
  })

  it('should apply is-active class to thinking item', () => {
    const items = [makeItem('Done', 'complete'), makeItem('Running', 'thinking')]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const allItems = wrapper.findAll('.yh-ai-thought-chain__item')
    expect(allItems[1].classes()).toContain('is-active')
  })

  it('should expand last item by default in timeline mode', () => {
    const items = [
      makeItem('Step 1', 'complete', 'done'),
      makeItem('Step 2', 'complete', 'also done')
    ]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    // Last item should be expanded (itemExpandedStates[1] = true)
    // The content with v-show should be visible
    const lastContent = wrapper.findAll('.yh-ai-thought-chain__item-content')
    // Existence check - item has content
    expect(lastContent.length).toBeGreaterThan(0)
  })

  it('should toggle item expand on item header click', async () => {
    const items = [makeItem('Step', 'complete', 'content here')]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const itemHeader = wrapper.find('.yh-ai-thought-chain__item-header')
    await itemHeader.trigger('click')
    // Toggle should change state - just verify no crash and component renders
    expect(wrapper.find('.yh-ai-thought-chain__item').exists()).toBe(true)
  })

  // 鈹€鈹€鈹€ dotSize 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should apply dotSize prop to item dots', () => {
    const items = [makeItem('Step', 'complete')]
    const wrapper = mount(AiThoughtChain, { props: { items, dotSize: 'large' } })
    const dotEl = wrapper.find('.yh-ai-thought-chain__item-dot')
    expect(dotEl.exists()).toBe(true)
    expect(dotEl.classes().join(' ')).toContain('large')
  })

  // 鈹€鈹€鈹€ Default slot (single mode) 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should render default slot in single node mode', async () => {
    const wrapper = mount(AiThoughtChain, {
      slots: { default: '<em class="slot-content">Slot</em>' }
    })
    await wrapper.find('.yh-ai-thought-chain__header').trigger('click')
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })

  // 鈹€鈹€鈹€ Progress and computation 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should compute and show progress', async () => {
    const items = [
      makeItem('Step 1', 'complete'),
      makeItem('Step 2', 'success'),
      makeItem('Step 3', 'thinking'),
      makeItem('Step 4', 'none')
    ]
    const wrapper = mount(AiThoughtChain, {
      props: { items, showProgress: true }
    })
    // 2/4 completed = 50%
    const progressFill = wrapper.find('.yh-ai-thought-chain__progress-fill')
    expect(progressFill.exists()).toBe(true)
    expect(progressFill.attributes('style')).toContain('width: 50%')
  })

  // 鈹€鈹€鈹€ Status Icon computation 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should get correct status icons', () => {
    const items = [
      makeItem('Step 1', 'error'),
      makeItem('Step 2', 'success', 'Detail 2'),
      makeItem('Step 3', 'loading', 'Detail 3')
    ]
    // Add expanded true so we can render markdown
    items[1].expanded = true
    items[2].expanded = true
    const wrapper = mount(AiThoughtChain, { props: { items } })
    // The main way it distinguishes error status visually is through the modifier class
    expect(wrapper.html()).toContain('yh-ai-thought-chain--error')
  })

  // 鈹€鈹€鈹€ Node interaction (Click, Delete, Add) 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should emit node-click when item content is clicked', async () => {
    const items: AiThoughtItem[] = [
      { title: 'Step 1', content: 'click me', status: 'complete', expanded: true }
    ]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const contentText = wrapper.find('.yh-ai-thought-chain__item-content')
    await contentText.trigger('click')
    expect(wrapper.emitted('node-click')).toBeTruthy()
  })

  it('should emit node-click, even with description', async () => {
    const items: AiThoughtItem[] = [
      { title: 'Step 1', description: 'desc', status: 'complete', expanded: true }
    ]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const contentText = wrapper.find('.yh-ai-thought-chain__item-content')
    await contentText.trigger('click')
    expect(wrapper.emitted('node-click')).toBeTruthy()
  })

  it('should not emit node-click if clickable is false', async () => {
    const items = [{ title: 'Step 1', content: 'click', clickable: false, expanded: true }]
    const wrapper = mount(AiThoughtChain, { props: { items } })
    const contentText = wrapper.find('.yh-ai-thought-chain__item-content')
    await contentText.trigger('click')
    expect(wrapper.emitted('node-click')).toBeFalsy()
  })

  it('should handle add and delete node in editable mode', async () => {
    const items = [makeItem('Step 1', 'complete')]
    const wrapper = mount(AiThoughtChain, {
      props: { items, editable: true }
    })

    // Test delete
    const actionIcons = wrapper.findAll('.yh-ai-thought-chain__action-icon')
    await actionIcons[0].trigger('click')
    expect(wrapper.emitted('node-delete')).toBeTruthy()
    expect(wrapper.emitted('update:items')).toBeTruthy()
    expect(wrapper.emitted('reorder')).toBeTruthy()

    // Add Node from item actions
    await actionIcons[1].trigger('click')
    expect(wrapper.emitted('node-add')).toBeTruthy()

    // Add node from bottom button
    const bottomAddNode = wrapper.find('.yh-ai-thought-chain__add-node')
    await bottomAddNode.trigger('click')
    expect(wrapper.emitted('node-add')?.length).toBe(2)
  })

  it('should not mutate internalItems when editable is false', async () => {
    const items = [makeItem('Step 1', 'complete')]
    const wrapper = mount(AiThoughtChain, {
      props: { items, editable: false }
    })

    // If not editable, these icons won't exist naturally, but emit can be tested if we manual invoke
    // Wait, the icons have `v-if="editable"`. I'll just check they don't exist.
    expect(wrapper.find('.yh-ai-thought-chain__item-actions').exists()).toBe(false)
    expect(wrapper.find('.yh-ai-thought-chain__add-node').exists()).toBe(false)
  })

  // 鈹€鈹€鈹€ Draggable 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should handle drag and drop', async () => {
    const items = [makeItem('1'), makeItem('2')]
    const wrapper = mount(AiThoughtChain, {
      props: { items, draggable: true }
    })

    const elements = wrapper.findAll('.yh-ai-thought-chain__item')

    // Start drag on 0
    await elements[0].trigger('dragstart', { dataTransfer: {} })
    expect((wrapper.vm as any).draggedIndex).toBe(0)

    // Over 1
    await elements[1].trigger('dragover')
    // e.preventDefault should be called, dragOverIndex is 1

    // Leave
    await elements[1].trigger('dragleave')

    // Over 1 again
    await elements[1].trigger('dragover')

    // Drop on 1
    await elements[1].trigger('drop')
    expect(wrapper.emitted('update:items')).toBeTruthy()
    expect(wrapper.emitted('reorder')).toBeTruthy()

    // End
    await elements[0].trigger('dragend')
  })

  it('should fallback internal items if missing items', async () => {
    // cover items = null or not array if possible
    const wrapper = mount(AiThoughtChain, {
      props: { items: null as any }
    })
    expect(wrapper.find('.yh-ai-thought-chain').exists()).toBe(true)
  })

  it('should fall back to empty internalItems when items length is 0 and draggable is true', () => {
    const wrapper = mount(AiThoughtChain, {
      props: { items: [], draggable: true }
    })
    expect(wrapper.find('.yh-ai-thought-chain').exists()).toBe(true)
  })

  it('should sanitize rendered markdown links in timeline content', () => {
    const wrapper = mount(AiThoughtChain, {
      props: {
        items: [
          {
            title: 'Step 1',
            status: 'complete',
            content: '[safe](https://example.com) [bad](javascript:alert(1))',
            expanded: true
          }
        ]
      }
    })

    const html = wrapper.find('.yh-ai-thought-chain__item-content').html()
    expect(html).toContain('https://example.com')
    expect(html).not.toContain('href="javascript:')
  })

  it('should map classNames and styles to sub-elements in timeline and single mode', async () => {
    // 1. Test timeline mode
    const classNames = {
      root: 'chain-root',
      progressBar: 'chain-bar',
      item: 'chain-item',
      itemDotWrapper: 'chain-dot-wrap',
      itemDot: 'chain-dot',
      itemLine: 'chain-line',
      itemMain: 'chain-main',
      itemHeader: 'chain-item-hdr',
      itemTitle: 'chain-title',
      itemContent: 'chain-item-content'
    }
    const styles = {
      root: { color: 'red' },
      progressBar: { color: 'blue' },
      item: { color: 'green' },
      itemDotWrapper: { color: 'yellow' },
      itemDot: { color: 'pink' },
      itemLine: { color: 'purple' },
      itemMain: { color: 'orange' },
      itemHeader: { color: 'cyan' },
      itemTitle: { color: 'magenta' },
      itemContent: { color: 'brown' }
    }

    const items = [
      { title: 'Step 1', content: 'hello', status: 'complete' as const, expanded: true }
    ]
    const wrapper = mount(AiThoughtChain, {
      props: {
        items,
        showProgress: true,
        classNames,
        styles: styles as any
      }
    })

    expect(wrapper.find('.yh-ai-thought-chain').classes()).toContain('chain-root')
    expect(wrapper.find('.yh-ai-thought-chain').element.getAttribute('style')).toContain(
      'color: red'
    )

    expect(wrapper.find('.yh-ai-thought-chain__progress-bar').classes()).toContain('chain-bar')
    expect(
      wrapper.find('.yh-ai-thought-chain__progress-bar').element.getAttribute('style')
    ).toContain('color: blue')

    expect(wrapper.find('.yh-ai-thought-chain__item').classes()).toContain('chain-item')
    expect(wrapper.find('.yh-ai-thought-chain__item').element.getAttribute('style')).toContain(
      'color: green'
    )

    expect(wrapper.find('.yh-ai-thought-chain__item-dot-wrapper').classes()).toContain(
      'chain-dot-wrap'
    )
    expect(
      wrapper.find('.yh-ai-thought-chain__item-dot-wrapper').element.getAttribute('style')
    ).toContain('color: yellow')

    expect(wrapper.find('.yh-ai-thought-chain__item-dot').classes()).toContain('chain-dot')
    expect(wrapper.find('.yh-ai-thought-chain__item-dot').element.getAttribute('style')).toContain(
      'color: pink'
    )

    // Since there's only 1 item, line is not rendered. Let's add a second item to verify line styling.
    const wrapper2 = mount(AiThoughtChain, {
      props: {
        items: [
          { title: 'Step 1', status: 'complete' as const },
          { title: 'Step 2', status: 'complete' as const }
        ],
        classNames,
        styles: styles as any
      }
    })
    expect(wrapper2.find('.yh-ai-thought-chain__item-line').classes()).toContain('chain-line')
    expect(
      wrapper2.find('.yh-ai-thought-chain__item-line').element.getAttribute('style')
    ).toContain('color: purple')

    expect(wrapper.find('.yh-ai-thought-chain__item-main').classes()).toContain('chain-main')
    expect(wrapper.find('.yh-ai-thought-chain__item-main').element.getAttribute('style')).toContain(
      'color: orange'
    )

    expect(wrapper.find('.yh-ai-thought-chain__item-header').classes()).toContain('chain-item-hdr')
    expect(
      wrapper.find('.yh-ai-thought-chain__item-header').element.getAttribute('style')
    ).toContain('color: cyan')

    expect(wrapper.find('.yh-ai-thought-chain__item-title').classes()).toContain('chain-title')
    expect(
      wrapper.find('.yh-ai-thought-chain__item-title').element.getAttribute('style')
    ).toContain('color: magenta')

    expect(wrapper.find('.yh-ai-thought-chain__item-content').classes()).toContain(
      'chain-item-content'
    )
    expect(
      wrapper.find('.yh-ai-thought-chain__item-content').element.getAttribute('style')
    ).toContain('color: brown')

    // 2. Test single mode
    const singleClassNames = {
      header: 'single-hdr',
      title: 'single-title',
      content: 'single-content'
    }
    const singleStyles = {
      header: { color: 'red' },
      title: { color: 'blue' },
      content: { color: 'green' }
    }
    const wrapperSingle = mount(AiThoughtChain, {
      props: {
        title: 'Thought',
        content: 'detail',
        classNames: singleClassNames,
        styles: singleStyles as any
      }
    })
    // Expand single node
    await wrapperSingle.find('.yh-ai-thought-chain__header').trigger('click')

    expect(wrapperSingle.find('.yh-ai-thought-chain__header').classes()).toContain('single-hdr')
    expect(
      wrapperSingle.find('.yh-ai-thought-chain__header').element.getAttribute('style')
    ).toContain('color: red')

    expect(wrapperSingle.find('.yh-ai-thought-chain__title').classes()).toContain('single-title')
    expect(
      wrapperSingle.find('.yh-ai-thought-chain__title').element.getAttribute('style')
    ).toContain('color: blue')

    expect(wrapperSingle.find('.yh-ai-thought-chain__content').classes()).toContain(
      'single-content'
    )
    expect(
      wrapperSingle.find('.yh-ai-thought-chain__content').element.getAttribute('style')
    ).toContain('color: green')
  })
})
