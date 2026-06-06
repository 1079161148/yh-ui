/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiMention from '../src/ai-mention.vue'
import type { AiMentionOption } from '../src/ai-mention'

const options: AiMentionOption[] = [{ label: 'DeepSeek', value: 'deepseek', type: 'agent' }]

describe('YhAiMention SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(
      h(AiMention, {
        modelValue: 'hello',
        options: options as AiMentionOption[]
      })
    )
    expect(html).toContain('yh-ai-mention')
    // Should contain the mention base component or its rendered output
    // Since YhMention is a component, renderToString will render its contents
    expect(html).toMatch(/textarea|input/)
  })

  it('should render custom placeholder on server', async () => {
    const html = await renderToString(
      h(AiMention, {
        modelValue: '',
        options: options as AiMentionOption[],
        placeholder: 'Custom SSR Placeholder'
      })
    )
    expect(html).toContain('Custom SSR Placeholder')
  })

  it('should apply disabled state on server', async () => {
    const html = await renderToString(
      h(AiMention, {
        modelValue: '',
        options: options as AiMentionOption[],
        disabled: true
      })
    )
    expect(html).toContain('disabled')
  })
})
