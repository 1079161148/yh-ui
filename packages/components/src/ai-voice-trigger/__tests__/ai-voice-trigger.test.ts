/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AiVoiceTrigger from '../src/ai-voice-trigger.vue'

describe('YhAiVoiceTrigger', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ─── Rendering ───────────────────────────────────────────
  it('should render with base class', () => {
    const wrapper = mount(AiVoiceTrigger)
    expect(wrapper.find('.yh-ai-voice-trigger').exists()).toBe(true)
  })

  it('should render trigger button', () => {
    const wrapper = mount(AiVoiceTrigger)
    expect(wrapper.find('.yh-ai-voice-trigger__trigger').exists()).toBe(true)
  })

  // ─── Props ───────────────────────────────────────────────
  it('should apply recording class when recording is true', () => {
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: true }
    })
    expect(wrapper.classes()).toContain('is-recording')
    expect(wrapper.find('.yh-ai-voice-trigger__visualizer').exists()).toBe(true)
  })

  // ─── Events ──────────────────────────────────────────────
  it('should emit start and update:recording on click when initially false', async () => {
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: false }
    })

    await wrapper.find('.yh-ai-voice-trigger__trigger').trigger('click')

    expect(wrapper.emitted('update:recording')).toBeTruthy()
    expect(wrapper.emitted('update:recording')![0]).toEqual([true])
    expect(wrapper.emitted('start')).toBeTruthy()
  })

  it('should emit stop and update:recording on click when initially true', async () => {
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: true }
    })

    await wrapper.find('.yh-ai-voice-trigger__trigger').trigger('click')

    expect(wrapper.emitted('update:recording')).toBeTruthy()
    expect(wrapper.emitted('update:recording')![0]).toEqual([false])
    expect(wrapper.emitted('stop')).toBeTruthy()
  })

  it('should emit cancel and update:recording when cancel button is clicked', async () => {
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: true }
    })

    // cancel button inside visualizer
    await wrapper.find('.yh-ai-voice-trigger__cancel').trigger('click')

    expect(wrapper.emitted('update:recording')).toBeTruthy()
    expect(wrapper.emitted('update:recording')![0]).toEqual([false])
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  // ─── Visualizer ──────────────────────────────────────────
  it('should generate simulated amplitudes on visualizer interval', async () => {
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: false }
    })

    // Start recording effectively starts visualizer
    await wrapper.find('.yh-ai-voice-trigger__trigger').trigger('click')
    // simulate parent updating v-model so visualizer container is rendered
    await wrapper.setProps({ recording: true })

    // Initially amplitudes is [], let's wait 150ms for the interval to fire
    vi.advanceTimersByTime(150)
    await wrapper.vm.$nextTick()

    const bars = wrapper.findAll('.yh-ai-voice-trigger__bar')
    expect(bars.length).toBe(20)
    expect((wrapper.vm as any).simulatedAmplitudes.some((a: number) => a !== 5)).toBe(true)
  })

  it('should use provided amplitudes', async () => {
    const customAmplitudes = Array(20).fill(10)
    customAmplitudes[0] = 12
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: false, amplitudes: customAmplitudes }
    })

    await wrapper.find('.yh-ai-voice-trigger__trigger').trigger('click')

    // advance timer to trigger syncAmplitudes
    vi.advanceTimersByTime(150)
    await wrapper.vm.$nextTick()

    expect((wrapper.vm as any).simulatedAmplitudes).toEqual(customAmplitudes)
  })

  it('should stop visualizer on unmount', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const wrapper = mount(AiVoiceTrigger, {
      props: { recording: false }
    })

    // click will start interval
    await wrapper.find('.yh-ai-voice-trigger__trigger').trigger('click')

    wrapper.unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  // ─── Slots ───────────────────────────────────────────────
  it('should render default slot content', () => {
    const wrapper = mount(AiVoiceTrigger, {
      slots: {
        default: 'Custom Trigger Text'
      }
    })

    expect(wrapper.find('.yh-ai-voice-trigger__label').text()).toBe('Custom Trigger Text')
  })
})
