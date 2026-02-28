/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiThoughtChain from '../src/ai-thought-chain.vue'

describe('YhAiThoughtChain SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiThoughtChain))
    expect(html).toContain('yh-ai-thought-chain')
  })

  it('should render single node header on server', async () => {
    const html = await renderToString(h(AiThoughtChain, { title: 'SSR Thought' }))
    expect(html).toContain('SSR Thought')
    expect(html).toContain('yh-ai-thought-chain__header')
  })

  it('should render thinking is-thinking class on server', async () => {
    const html = await renderToString(h(AiThoughtChain, { thinking: true }))
    expect(html).toContain('is-thinking')
  })

  it('should render timeline items on server', async () => {
    const items = [
      { title: 'Step One', status: 'complete', content: 'Done' },
      { title: 'Step Two', status: 'thinking', content: 'In progress' }
    ]
    const html = await renderToString(h(AiThoughtChain, { items }))
    expect(html).toContain('Step One')
    expect(html).toContain('Step Two')
    expect(html).toContain('yh-ai-thought-chain__item')
    expect(html).toContain('is-timeline')
  })

  it('should render is-last class on last item on server', async () => {
    const items = [
      { title: 'First', status: 'complete' },
      { title: 'Last', status: 'complete' }
    ]
    const html = await renderToString(h(AiThoughtChain, { items }))
    expect(html).toContain('is-last')
  })

  it('should render is-active class for thinking item on server', async () => {
    const items = [{ title: 'Running', status: 'thinking' }]
    const html = await renderToString(h(AiThoughtChain, { items }))
    expect(html).toContain('is-active')
  })

  it('should render content text on server', async () => {
    const html = await renderToString(h(AiThoughtChain, { content: 'SSR thought content' }))
    expect(html).toContain('SSR thought content')
  })

  it('should render status icon wrappers on server in timeline mode', async () => {
    const items = [{ title: 'Done', status: 'complete' }]
    const html = await renderToString(h(AiThoughtChain, { items }))
    expect(html).toContain('yh-ai-thought-chain__item-dot-wrapper')
  })
})
