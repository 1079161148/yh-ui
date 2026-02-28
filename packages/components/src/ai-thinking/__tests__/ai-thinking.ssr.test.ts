/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiThinking from '../src/ai-thinking.vue'

describe('YhAiThinking SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiThinking))
    expect(html).toContain('yh-ai-thinking')
  })

  it('should render header on server', async () => {
    const html = await renderToString(h(AiThinking))
    expect(html).toContain('yh-ai-thinking__header')
  })

  it('should render thinking status class on server', async () => {
    const html = await renderToString(h(AiThinking, { status: 'thinking' }))
    expect(html).toContain('yh-ai-thinking--thinking')
  })

  it('should render end status class on server', async () => {
    const html = await renderToString(h(AiThinking, { status: 'end' }))
    expect(html).toContain('yh-ai-thinking--end')
  })

  it('should render error status class on server', async () => {
    const html = await renderToString(h(AiThinking, { status: 'error' }))
    expect(html).toContain('yh-ai-thinking--error')
  })

  it('should render custom title on server', async () => {
    const html = await renderToString(
      h(AiThinking, { title: 'SSR Thinking Title', status: 'thinking' })
    )
    expect(html).toContain('SSR Thinking Title')
  })

  it('should render expanded class on server when modelValue=true', async () => {
    const html = await renderToString(h(AiThinking, { modelValue: true, content: 'some thought' }))
    expect(html).toContain('is-expanded')
  })

  it('should render content on server', async () => {
    const html = await renderToString(
      h(AiThinking, { modelValue: true, content: 'Server thought content' })
    )
    expect(html).toContain('Server thought content')
  })
})
