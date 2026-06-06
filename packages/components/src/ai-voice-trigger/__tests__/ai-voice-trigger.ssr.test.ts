/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import AiVoiceTrigger from '../src/ai-voice-trigger.vue'

describe('YhAiVoiceTrigger SSR', () => {
  it('should render successfully in SSR environment', async () => {
    const app = createSSRApp({
      components: { AiVoiceTrigger },
      template: '<ai-voice-trigger />'
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-ai-voice-trigger')
    expect(html).toContain('yh-ai-voice-trigger__trigger')
  })

  it('should render recording state correctly in SSR', async () => {
    const app = createSSRApp({
      components: { AiVoiceTrigger },
      template: '<ai-voice-trigger :recording="true" />'
    })

    const html = await renderToString(app)
    expect(html).toContain('is-recording')
    expect(html).toContain('yh-ai-voice-trigger__visualizer')
    expect(html).toContain('yh-ai-voice-trigger__bars')
  })
})
