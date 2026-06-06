import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import YhSteps from '../src/steps.vue'
import YhStep from '../src/step.vue'

describe('Steps SSR', () => {
  it('should render steps container on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhSteps, { active: 1 }, () => [
          h(YhStep, { title: 'Step 1' }),
          h(YhStep, { title: 'Step 2' }),
          h(YhStep, { title: 'Step 3' })
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-steps')
  })

  it('should render vertical steps container on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhSteps, { direction: 'vertical', active: 0 }, () => [
          h(YhStep, { title: 'Step 1' }),
          h(YhStep, { title: 'Step 2' })
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-steps--vertical')
  })

  it('should render simple steps container on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhSteps, { simple: true, active: 0 }, () => [
          h(YhStep, { title: 'Step 1' }),
          h(YhStep, { title: 'Step 2' })
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('is-simple')
  })

  it('should render step content on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhSteps, { active: 0 }, () => [
          h(YhStep, { title: 'Step 1', description: 'This is step 1' })
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('Step 1')
  })
})
