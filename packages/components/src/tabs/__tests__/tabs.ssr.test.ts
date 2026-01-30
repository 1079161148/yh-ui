import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import YhTabs from '../src/tabs.vue'
import YhTabPane from '../src/tab-pane.vue'

describe('Tabs SSR', () => {
  it('should render tabs container on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTabs, { modelValue: '1' }, () => [
          h(YhTabPane, { name: '1', label: 'Tab 1' }, () => 'Content 1'),
          h(YhTabPane, { name: '2', label: 'Tab 2' }, () => 'Content 2')
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-tabs')
  })

  it('should render card type tabs on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTabs, { type: 'card', modelValue: '1' }, () => [
          h(YhTabPane, { name: '1', label: 'Tab 1' }, () => 'Content 1')
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-tabs--card')
  })

  it('should render segment type tabs on server', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTabs, { type: 'segment', modelValue: '1' }, () => [
          h(YhTabPane, { name: '1', label: 'Tab 1' }, () => 'Content 1')
        ])
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-tabs--segment')
  })
})
