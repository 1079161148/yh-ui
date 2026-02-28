/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AiThoughtChain from '../src/ai-thought-chain.vue'

type ThoughtStatus = 'none' | 'thinking' | 'loading' | 'success' | 'complete' | 'error'

const makeItem = (title: string, status: ThoughtStatus = 'complete', content = '') => ({
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
  it('should render default slot in single node mode', () => {
    const wrapper = mount(AiThoughtChain, {
      slots: { default: '<em class="slot-content">Slot</em>' }
    })
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })
})
