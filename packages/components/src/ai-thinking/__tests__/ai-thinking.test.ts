/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AiThinking from '../src/ai-thinking.vue'

describe('YhAiThinking', () => {
  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiThinking)
    expect(wrapper.find('.yh-ai-thinking').exists()).toBe(true)
  })

  it('should render header', () => {
    const wrapper = mount(AiThinking)
    expect(wrapper.find('.yh-ai-thinking__header').exists()).toBe(true)
  })

  // ─── Status classes ──────────────────────────────────────
  it('should apply thinking status class by default', () => {
    const wrapper = mount(AiThinking, { props: { status: 'thinking' } })
    expect(wrapper.classes()).toContain('yh-ai-thinking--thinking')
  })

  it('should apply start status class', () => {
    const wrapper = mount(AiThinking, { props: { status: 'start' } })
    expect(wrapper.classes()).toContain('yh-ai-thinking--start')
  })

  it('should apply end status class', () => {
    const wrapper = mount(AiThinking, { props: { status: 'end' } })
    expect(wrapper.classes()).toContain('yh-ai-thinking--end')
  })

  it('should apply error status class', () => {
    const wrapper = mount(AiThinking, { props: { status: 'error' } })
    expect(wrapper.classes()).toContain('yh-ai-thinking--error')
  })

  // ─── Title ───────────────────────────────────────────────
  it('should render custom title when provided', () => {
    const wrapper = mount(AiThinking, {
      props: { title: 'My Custom Title', status: 'thinking' }
    })
    expect(wrapper.find('.yh-ai-thinking__title').text()).toBe('My Custom Title')
  })

  it('should show default title based on status when no title provided', () => {
    const wrapper = mount(AiThinking, { props: { status: 'end' } })
    // Should show some text from locale
    expect(wrapper.find('.yh-ai-thinking__title').text().length).toBeGreaterThan(0)
  })

  // ─── Expand / Collapse ───────────────────────────────────
  it('should start collapsed when modelValue=false', () => {
    const wrapper = mount(AiThinking, {
      props: { modelValue: false, content: 'Some content' }
    })
    expect(wrapper.classes()).not.toContain('is-expanded')
  })

  it('should start expanded when modelValue=true', () => {
    const wrapper = mount(AiThinking, {
      props: { modelValue: true, content: 'Some content' }
    })
    expect(wrapper.classes()).toContain('is-expanded')
  })

  it('should toggle expansion on header click and emit update:modelValue', async () => {
    const wrapper = mount(AiThinking, {
      props: { modelValue: false }
    })
    await wrapper.find('.yh-ai-thinking__header').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect((wrapper.emitted('update:modelValue') as boolean[][])[0][0]).toBe(true)
  })

  it('should collapse when header clicked again', async () => {
    const wrapper = mount(AiThinking, {
      props: { modelValue: true }
    })
    await wrapper.find('.yh-ai-thinking__header').trigger('click')
    expect((wrapper.emitted('update:modelValue') as boolean[][])[0][0]).toBe(false)
  })

  // ─── Content ─────────────────────────────────────────────
  it('should render content in body when expanded', () => {
    const wrapper = mount(AiThinking, {
      props: { modelValue: true, content: 'Detailed thought process' }
    })
    expect(wrapper.find('.yh-ai-thinking__content').text()).toBe('Detailed thought process')
  })

  // ─── autoCollapse ────────────────────────────────────────
  it('should auto collapse when status changes to end and autoCollapse=true', async () => {
    const wrapper = mount(AiThinking, {
      props: { status: 'thinking', modelValue: true, autoCollapse: true }
    })
    await wrapper.setProps({ status: 'end' })
    await nextTick()
    expect((wrapper.emitted('update:modelValue') as boolean[][])[0][0]).toBe(false)
  })

  it('should NOT auto collapse when autoCollapse=false', async () => {
    const wrapper = mount(AiThinking, {
      props: { status: 'thinking', modelValue: true, autoCollapse: false }
    })
    await wrapper.setProps({ status: 'end' })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // ─── Default slot ────────────────────────────────────────
  it('should render default slot as body content', () => {
    const wrapper = mount(AiThinking, {
      props: { modelValue: true },
      slots: { default: '<p class="custom-thought">Custom content</p>' }
    })
    expect(wrapper.find('.custom-thought').exists()).toBe(true)
  })
})
